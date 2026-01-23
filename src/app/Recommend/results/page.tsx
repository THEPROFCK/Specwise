"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Sparkles, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Battery, 
  Camera, 
  Cpu, 
  HardDrive, 
  Monitor,
  ShoppingCart,
  RefreshCw,
  Share2,
  Bookmark,
  ExternalLink
} from "lucide-react";

interface DeviceSpecs {
  battery?: string;
  camera?: string;
  display?: string;
  storage?: string;
  processor?: string;
  ram?: string;
}

interface DeviceRecommendation {
  rank: number;
  name: string;
  brand: string;
  price: string;
  matchScore: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  keySpecs: DeviceSpecs;
  whyRecommended: string;
}

interface RecommendationsResponse {
  recommendations: DeviceRecommendation[];
  summary: string;
}

interface UserPreferences {
  deviceType: string;
  budget: string;
  currency: string;
  useCases: string[];
  brands: string[];
  screenSize: string;
  osPreference: string;
  connectivity: string[];
  specialFeatures: string[];
  upgradeFrequency: string;
}

interface CurrencyInfo {
  symbol: string;
  name: string;
  rate: number;
}

const currencies: Record<string, CurrencyInfo> = {
  USD: { symbol: "$", name: "US Dollar", rate: 1 },
  NGN: { symbol: "₦", name: "Nigerian Naira", rate: 1650 }, // Updated: 1 USD = 1650 NGN
  EUR: { symbol: "€", name: "Euro", rate: 0.92 },
  GBP: { symbol: "£", name: "British Pound", rate: 0.79 },
  CAD: { symbol: "C$", name: "Canadian Dollar", rate: 1.36 },
  AUD: { symbol: "A$", name: "Australian Dollar", rate: 1.52 },
  INR: { symbol: "₹", name: "Indian Rupee", rate: 83 },
  JPY: { symbol: "¥", name: "Japanese Yen", rate: 149 },
  CNY: { symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
};

export default function RecommendResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<RecommendationsResponse | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedDevices, setSavedDevices] = useState<Set<number>>(new Set());
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [currencyRate, setCurrencyRate] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const storedData = sessionStorage.getItem('recommendationData');
    const storedPreferences = sessionStorage.getItem('recommendationPreferences');

    if (!storedData || !storedPreferences) {
      router.push('/recommend');
      return;
    }

    try {
      const parsedData = JSON.parse(storedData);
      const parsedPreferences = JSON.parse(storedPreferences);
      
      setResults(parsedData);
      setPreferences(parsedPreferences);
      
      // Set currency symbol based on user's selection
      const userCurrency = parsedPreferences.currency || 'USD';
      const currencyInfo = currencies[userCurrency];
      
      if (currencyInfo) {
        setCurrencySymbol(currencyInfo.symbol);
        setCurrencyRate(currencyInfo.rate);
        setSelectedCurrency(userCurrency);
      }
      
      const saved = localStorage.getItem('savedDevices');
      if (saved) {
        setSavedDevices(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      router.push('/recommend');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-[#4278a0]";
    if (score >= 75) return "text-[#4278a0]";
    if (score >= 60) return "text-[#1a2b3b]";
    return "text-slate-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-[#4278a0]";
    if (score >= 75) return "bg-[#4278a0]";
    if (score >= 60) return "bg-[#1a2b3b]";
    return "bg-slate-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 75) return "Great Match";
    if (score >= 60) return "Good Match";
    return "Fair Match";
  };

  const toggleSaveDevice = (rank: number) => {
    const newSaved = new Set(savedDevices);
    if (newSaved.has(rank)) {
      newSaved.delete(rank);
    } else {
      newSaved.add(rank);
    }
    setSavedDevices(newSaved);
    localStorage.setItem('savedDevices', JSON.stringify(Array.from(newSaved)));
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Device Recommendations',
      text: 'Check out my personalized device recommendations!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const getSpecIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'battery':
        return <Battery className="h-4 w-4 text-[#4278a0]" />;
      case 'camera':
        return <Camera className="h-4 w-4 text-[#4278a0]" />;
      case 'display':
        return <Monitor className="h-4 w-4 text-[#4278a0]" />;
      case 'storage':
        return <HardDrive className="h-4 w-4 text-[#4278a0]" />;
      case 'processor':
      case 'ram':
        return <Cpu className="h-4 w-4 text-[#4278a0]" />;
      default:
        return null;
    }
  };

  // Format price with the user's selected currency and conversion
  const formatPrice = (price: string) => {
    try {
      // Log for debugging
      console.log('Original price from API:', price);
      console.log('Selected currency:', selectedCurrency);
      console.log('Currency rate:', currencyRate);
      
      // Extract numeric values from price string (handles ranges like "$800 - $1200")
      const numbers = price.match(/\d+/g);
      if (!numbers || numbers.length === 0) return price;

      // If user selected USD, return the original price as-is
      if (selectedCurrency === 'USD') {
        if (numbers.length === 2) {
          return `${parseInt(numbers[0], 10).toLocaleString()} - ${parseInt(numbers[1], 10).toLocaleString()}`;
        } else {
          return `${parseInt(numbers[0], 10).toLocaleString()}`;
        }
      }

      // Convert to selected currency
      const convertedPrices = numbers.map(num => {
        const usdPrice = parseInt(num, 10);
        const convertedPrice = Math.round(usdPrice * currencyRate);
        console.log(`Converting ${usdPrice} to ${selectedCurrency}: ${currencySymbol}${convertedPrice}`);
        return convertedPrice.toLocaleString();
      });

      // Format based on whether it's a range or single price
      if (convertedPrices.length === 2) {
        return `${currencySymbol}${convertedPrices[0]}`;
      } else {
        return `${currencySymbol}${convertedPrices[0]}`;
      }
    } catch (error) {
      console.error('Error formatting price:', error);
      return price;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-6 sm:py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4278a0] text-white mb-4 animate-pulse">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Loading recommendations...</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a2b3b] mb-2">Finding Your Perfect Devices</h1>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              Analyzing your preferences...
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 sm:p-6 border-2 border-slate-200">
                <div className="space-y-4">
                  <div className="flex gap-4 sm:gap-6">
                    <Skeleton className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 sm:h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-16 sm:h-20 w-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!results || !preferences) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-6 sm:p-8 text-center border-2 border-slate-200">
            <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a2b3b] mb-2">No Results Found</h2>
            <p className="text-slate-600 mb-6 text-sm sm:text-base px-4">
              We couldn't find your recommendation data. Please start a new search.
            </p>
            <Button 
              onClick={() => router.push('/recommend')}
              className="bg-[#4278a0] hover:bg-[#1a2b3b]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start New Search
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Button 
              variant="outline" 
              onClick={() => router.push('/Recommend')}
              className="border-2 border-[#1a2b3b] hover:bg-[#1a2b3b] hover:text-white w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start New Search
            </Button>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleShare}
                className="flex-1 sm:flex-none border-2 hover:border-[#4278a0] hover:bg-[#4278a0] hover:text-white"
              >
                <Share2 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.print()}
                className="flex-1 sm:flex-none border-2 hover:border-[#4278a0] hover:bg-[#4278a0] hover:text-white"
              >
                <ExternalLink className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4278a0] text-white mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">AI-Powered Results</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2b3b] mb-3">
              Your Perfect Devices
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Based on your preferences, here are our top recommendations tailored just for you
            </p>
          </div>
        </div>

        {/* Summary Card */}
        {results.summary && (
          <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-r from-[#4278a0] to-[#1a2b3b] border-0">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Expert Analysis</h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">{results.summary}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Preferences Summary */}
        <Card className="p-4 sm:p-5 mb-6 sm:mb-8 border-2 border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-1 rounded-full bg-[#4278a0]"></div>
            <h4 className="text-xs sm:text-sm font-semibold text-[#4278a0] uppercase tracking-wide">Your Search Criteria</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-[#4278a0]/10 text-[#4278a0] border-0 text-xs">
              <Monitor className="h-3 w-3 mr-1" />
              {preferences.deviceType.charAt(0).toUpperCase() + preferences.deviceType.slice(1)}
            </Badge>
            <Badge variant="secondary" className="bg-[#1a2b3b]/10 text-[#1a2b3b] border-0 text-xs">
              💰 Budget: {currencySymbol}{preferences.budget}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 text-xs">
              💵 Currency: {selectedCurrency}
            </Badge>
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 text-xs">
              📱 {preferences.screenSize}
            </Badge>
            {preferences.osPreference && preferences.osPreference !== 'no-preference' && (
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 text-xs">
                💻 {preferences.osPreference.toUpperCase()}
              </Badge>
            )}
            {preferences.useCases?.slice(0, 2).map((uc: string) => (
              <Badge key={uc} variant="outline" className="bg-white border-slate-200 text-xs">
                {uc}
              </Badge>
            ))}
            {preferences.useCases?.length > 2 && (
              <Badge variant="outline" className="bg-white border-slate-200 text-xs">
                +{preferences.useCases.length - 2} more
              </Badge>
            )}
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
          {results.recommendations?.map((device, index) => (
            <Card 
              key={index} 
              className={`p-4 sm:p-6 transition-all duration-300 ${
                index === 0 ? "ring-2 ring-[#4278a0] shadow-lg border-[#4278a0]" : "border-2 border-slate-200 hover:border-[#4278a0]"
              }`}
            >
              {/* Top Badge */}
              {index === 0 && (
                <div className="mb-4">
                  <Badge className="bg-gradient-to-r from-[#4278a0] to-[#1a2b3b] text-white text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Best Match
                  </Badge>
                </div>
              )}

              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#4278a0] to-[#1a2b3b] text-white font-bold text-base sm:text-xl">
                    #{device.rank}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-[#1a2b3b]">{device.name}</h2>
                    <p className="text-sm sm:text-base text-slate-600 font-medium">{device.brand}</p>
                  </div>
                </div>

                {/* Match Score Circle */}
                <div className="flex flex-col items-center sm:items-end">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-slate-200 sm:hidden"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-200 hidden sm:block"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${device.matchScore * 2.26} 226`}
                        className={`${getScoreColor(device.matchScore)} sm:hidden`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${device.matchScore * 2.64} 264`}
                        className={`${getScoreColor(device.matchScore)} hidden sm:block`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(device.matchScore)}`}>
                        {device.matchScore}
                      </span>
                      <span className="text-xs text-slate-500">match</span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 ${getScoreBgColor(device.matchScore)} text-white border-0 text-xs`}
                  >
                    {getScoreLabel(device.matchScore)}
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#4278a0]/10 rounded-lg border-2 border-[#4278a0]/20">
                  <span className="text-xs sm:text-sm font-medium text-[#4278a0]">Price:</span>
                  <span className="text-lg sm:text-2xl font-bold text-[#1a2b3b]">{formatPrice(device.price)}</span>
                </div>
              </div>

              {/* Best For Section */}
              <div className="bg-[#4278a0]/5 rounded-xl p-3 sm:p-4 mb-4 border-2 border-[#4278a0]/10">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#4278a0] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#1a2b3b] mb-1">Perfect For:</p>
                    <p className="text-xs sm:text-base text-slate-700">{device.bestFor}</p>
                  </div>
                </div>
              </div>

              {/* Why Recommended */}
              <div className="mb-4 p-3 sm:p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                <h3 className="text-sm sm:text-base font-semibold text-[#1a2b3b] mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#4278a0]" />
                  Why We Recommend This
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{device.whyRecommended}</p>
              </div>

              {/* Key Specifications */}
              {device.keySpecs && Object.keys(device.keySpecs).length > 0 && (
                <div className="mb-4 p-3 sm:p-4 bg-white rounded-lg border-2 border-slate-200">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1a2b3b] mb-3 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#4278a0]" />
                    Key Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {Object.entries(device.keySpecs).map(([key, value]) => (
                      value && (
                        <div key={key} className="flex items-start gap-2 p-2 sm:p-3 bg-slate-50 rounded-lg border border-slate-200">
                          {getSpecIcon(key)}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-slate-500 uppercase font-medium truncate">{key}</p>
                            <p className="text-xs sm:text-sm font-semibold text-[#1a2b3b]">{value}</p>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Pros and Cons */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {/* Pros */}
                <div className="p-3 sm:p-4 bg-[#4278a0]/5 rounded-lg border-2 border-[#4278a0]/20">
                  <h3 className="text-sm font-semibold text-[#1a2b3b] mb-3 flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#4278a0]" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {device.pros?.map((pro, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-[#4278a0] mt-0.5 flex-shrink-0">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-3 sm:p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                  <h3 className="text-sm font-semibold text-[#1a2b3b] mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-slate-600" />
                    Considerations
                  </h3>
                  <ul className="space-y-2">
                    {device.cons?.map((con, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-slate-600 mt-0.5 flex-shrink-0">⚠</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t-2 border-slate-200">
                <Button 
                  asChild 
                  className="flex-1 bg-gradient-to-r from-[#4278a0] to-[#1a2b3b] hover:from-[#1a2b3b] hover:to-[#4278a0] text-white text-sm"
                >
                  <Link href="/marketplace">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Find in Marketplace
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    asChild
                    className="flex-1 hover:bg-[#1a2b3b] hover:text-white border-2 text-sm"
                  >
                    <Link href="/compare">
                      Compare
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleSaveDevice(device.rank)}
                    className={`border-2 ${savedDevices.has(device.rank) ? "bg-[#4278a0]/10 border-[#4278a0]" : ""}`}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${savedDevices.has(device.rank) ? "fill-[#4278a0] text-[#4278a0]" : ""}`} 
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        
        {/* Bottom CTA */}
        <Card className="p-6 sm:p-8 text-center bg-slate-50 border-2 border-slate-200">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1a2b3b] mb-3">Ready to Make Your Purchase?</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 px-4">
              Browse our marketplace to find trusted vendors or compare specifications side-by-side.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#4278a0] to-[#1a2b3b] hover:from-[#1a2b3b] hover:to-[#4278a0] text-white w-full sm:w-auto"
              >
                <Link href="/marketplace">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Browse Marketplace
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                size="lg"
                className="border-2 border-[#1a2b3b] hover:bg-[#1a2b3b] hover:text-white w-full sm:w-auto"
              >
                <Link href="/compare">
                  <Monitor className="h-5 w-5 mr-2" />
                  Compare Devices
                </Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/Recommend')}
                size="lg"
                className="border-2 border-slate-300 hover:border-[#1a2b3b] hover:bg-[#1a2b3b] hover:text-white w-full sm:w-auto"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Start New Search
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-500 px-4">
          <p>💡 Tip: Bookmark this page to save your recommendations for later</p>
        </div>
      </div>
    </div>
  );
}