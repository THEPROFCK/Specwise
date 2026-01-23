// app/recommend/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Tv, 
  Watch, 
  Headphones, 
  Loader2,
  DollarSign
} from "lucide-react";
 import LoadingOverlay from "@/components/LoadingOverlay";

interface FormData {
  deviceType: string;
  budget: string;
  currency: string;
  useCases: string[];
  brands: string[];
  priorities: {
    battery: number;
    camera: number;
    performance: number;
    storage: number;
    display: number;
    durability: number;
  };
  screenSize: string;
  osPreference: string;
  connectivity: string[];
  specialFeatures: string[];
  upgradeFrequency: string;
  importanceFactors: {
    priceValue: number;
    brandReputation: number;
    futureProofing: number;
    ecoFriendly: number;
  };
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
];

const budgetPresets: Record<string, string[]> = {
  USD: ["300", "500", "800", "1300"],
  NGN: ["150000", "250000", "400000", "700000"],
  EUR: ["300", "450", "700", "1200"],
  GBP: ["250", "400", "650", "1100"],
  CAD: ["400", "650", "1000", "1700"],
  AUD: ["450", "700", "1100", "1900"],
  INR: ["25000", "40000", "65000", "100000"],
  JPY: ["40000", "65000", "100000", "170000"],
  CNY: ["2000", "3500", "5500", "9000"],
};

export default function RecommendPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    deviceType: "",
    budget: "",
    currency: "USD",
    useCases: [],
    brands: [],
    priorities: {
      battery: 5,
      camera: 5,
      performance: 5,
      storage: 5,
      display: 5,
      durability: 5
    },
    screenSize: "",
    osPreference: "",
    connectivity: [],
    specialFeatures: [],
    upgradeFrequency: "",
    importanceFactors: {
      priceValue: 5,
      brandReputation: 5,
      futureProofing: 5,
      ecoFriendly: 5
    }
  });

  const deviceTypes = [
    { id: "phone", label: "Smartphone", icon: Smartphone },
    { id: "laptop", label: "Laptop", icon: Laptop },
    { id: "tablet", label: "Tablet", icon: Tablet },
    { id: "tv", label: "Smart TV", icon: Tv },
    { id: "smartwatch", label: "Smartwatch", icon: Watch },
    { id: "earbuds", label: "Earbuds", icon: Headphones }
  ];

  const useCaseOptions: Record<string, string[]> = {
    phone: ["Gaming", "Photography", "Business", "Student Use", "Social Media", "Video Streaming", "Content Creation", "Fitness Tracking", "Navigation"],
    laptop: ["Gaming", "Video Editing", "Programming", "Office Work", "Graphic Design", "3D Modeling", "Music Production", "Casual Browsing", "Data Science"],
    tablet: ["Drawing/Art", "Note Taking", "Reading", "Gaming", "Video Streaming", "Kids Use", "Business Presentations", "Photo Editing"],
    tv: ["Movies", "Gaming", "Sports", "Streaming Services", "Smart Home Hub", "Casual Viewing"],
    smartwatch: ["Fitness Tracking", "Health Monitoring", "Notifications", "Sleep Tracking", "GPS Navigation", "Music Playback", "Contactless Payments"],
    earbuds: ["Music", "Podcasts", "Calls", "Gaming", "Workouts", "Noise Cancellation", "Work From Home"]
  };

  const brandOptions: Record<string, string[]> = {
    phone: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Motorola", "Sony", "Nothing"],
    laptop: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "Microsoft", "Razer"],
    tablet: ["Apple", "Samsung", "Microsoft", "Lenovo", "Amazon", "Xiaomi"],
    tv: ["Samsung", "LG", "Sony", "TCL", "Hisense", "Vizio"],
    smartwatch: ["Apple", "Samsung", "Garmin", "Fitbit", "Google", "Amazfit"],
    earbuds: ["Apple", "Sony", "Samsung", "Bose", "Sennheiser", "Jabra", "Google", "Nothing"]
  };

  const screenSizeOptions: Record<string, { value: string; label: string }[]> = {
    phone: [
      { value: "compact", label: "Compact (< 6.1\")" },
      { value: "standard", label: "Standard (6.1\" - 6.5\")" },
      { value: "large", label: "Large (> 6.5\")" },
      { value: "foldable", label: "Foldable" }
    ],
    laptop: [
      { value: "ultraportable", label: "Ultraportable (11-13\")" },
      { value: "standard", label: "Standard (14-15\")" },
      { value: "large", label: "Large (16-17\")" }
    ],
    tablet: [
      { value: "mini", label: "Mini (7-8\")" },
      { value: "standard", label: "Standard (10-11\")" },
      { value: "large", label: "Large (12\"+)" }
    ],
    tv: [
      { value: "small", label: "Small (32-43\")" },
      { value: "medium", label: "Medium (50-55\")" },
      { value: "large", label: "Large (65-75\")" },
      { value: "xl", label: "Extra Large (77\"+)" }
    ],
    smartwatch: [
      { value: "small", label: "Small (38-41mm)" },
      { value: "large", label: "Large (44-49mm)" }
    ],
    earbuds: [
      { value: "in-ear", label: "In-Ear" },
      { value: "on-ear", label: "On-Ear" },
      { value: "over-ear", label: "Over-Ear" }
    ]
  };

  const osOptions: Record<string, { value: string; label: string }[]> = {
    phone: [
      { value: "ios", label: "iOS (Apple)" },
      { value: "android", label: "Android" },
      { value: "no-preference", label: "No Preference" }
    ],
    laptop: [
      { value: "macos", label: "macOS" },
      { value: "windows", label: "Windows" },
      { value: "chromeos", label: "ChromeOS" },
      { value: "linux", label: "Linux-friendly" },
      { value: "no-preference", label: "No Preference" }
    ],
    tablet: [
      { value: "ipados", label: "iPadOS (Apple)" },
      { value: "android", label: "Android" },
      { value: "windows", label: "Windows" },
      { value: "no-preference", label: "No Preference" }
    ],
    tv: [],
    smartwatch: [
      { value: "watchos", label: "watchOS (Apple)" },
      { value: "wearos", label: "Wear OS (Google)" },
      { value: "fitbit", label: "Fitbit OS" },
      { value: "proprietary", label: "Proprietary" },
      { value: "no-preference", label: "No Preference" }
    ],
    earbuds: []
  };

  const connectivityOptions: Record<string, string[]> = {
    phone: ["5G", "Dual SIM", "eSIM", "WiFi 6E", "Bluetooth 5.3", "NFC", "Wireless Charging", "Reverse Wireless Charging"],
    laptop: ["Thunderbolt 4", "USB-C", "HDMI", "SD Card Slot", "WiFi 6E", "Ethernet Port", "Fingerprint Reader"],
    tablet: ["Cellular (5G/LTE)", "WiFi 6", "USB-C", "Apple Pencil Support", "Keyboard Support"],
    tv: ["HDMI 2.1", "eARC", "WiFi 6", "Bluetooth", "Ethernet", "USB Ports"],
    smartwatch: ["LTE/Cellular", "GPS", "NFC Payments", "Bluetooth", "WiFi"],
    earbuds: ["Bluetooth 5.3", "Multipoint Connection", "USB-C Charging", "Wireless Charging Case"]
  };

  const specialFeatures: Record<string, string[]> = {
    phone: ["Water Resistance (IP68)", "Stylus Support", "Expandable Storage", "Headphone Jack", "IR Blaster", "Stereo Speakers", "High Refresh Rate (120Hz+)", "Under-Display Fingerprint", "Face ID"],
    laptop: ["Touchscreen", "2-in-1 Convertible", "Backlit Keyboard", "Dedicated GPU", "High Refresh Display", "OLED Screen", "Military Grade Durability", "Long Battery (10h+)"],
    tablet: ["Stylus Included", "Desktop Mode", "Multi-Window Support", "High Refresh Display", "OLED Screen", "Cellular Connectivity"],
    tv: ["OLED", "QLED", "MiniLED", "120Hz Gaming Mode", "Dolby Vision", "Dolby Atmos", "Voice Control", "Built-in Camera"],
    smartwatch: ["Always-On Display", "ECG Monitor", "Blood Oxygen Sensor", "Temperature Sensor", "Fall Detection", "Crash Detection", "Underwater Mode"],
    earbuds: ["Active Noise Cancellation", "Transparency Mode", "Spatial Audio", "Wireless Charging", "Sweat/Water Resistance", "Long Battery Life", "Customizable EQ"]
  };

  const handleUseCaseToggle = (useCase: string) => {
    setFormData(prev => ({
      ...prev,
      useCases: prev.useCases.includes(useCase)
        ? prev.useCases.filter(uc => uc !== useCase)
        : [...prev.useCases, useCase]
    }));
  };

  const handleBrandToggle = (brand: string) => {
    setFormData(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handleConnectivityToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      connectivity: prev.connectivity.includes(feature)
        ? prev.connectivity.filter(f => f !== feature)
        : [...prev.connectivity, feature]
    }));
  };

  const handleSpecialFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      specialFeatures: prev.specialFeatures.includes(feature)
        ? prev.specialFeatures.filter(f => f !== feature)
        : [...prev.specialFeatures, feature]
    }));
  };

  const currentUseCases = useCaseOptions[formData.deviceType] || [];
  const currentBrands = brandOptions[formData.deviceType] || [];
  const currentScreenSizes = screenSizeOptions[formData.deviceType] || [];
  const currentOsOptions = osOptions[formData.deviceType] || [];
  const currentConnectivity = connectivityOptions[formData.deviceType] || [];
  const currentSpecialFeatures = specialFeatures[formData.deviceType] || [];
  const currentBudgetPresets = budgetPresets[formData.currency] || budgetPresets.USD;
  const currentCurrency = currencies.find(c => c.code === formData.currency) || currencies[0];

  const formatCurrency = (amount: string) => {
    return `${currentCurrency.symbol}${parseFloat(amount).toLocaleString()}`;
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!formData.deviceType;
      case 2: return !!formData.budget && !!formData.currency;
      case 3: return formData.useCases.length > 0;
      case 4: return true;
      case 5: return !!formData.screenSize;
      case 6: return currentOsOptions.length === 0 || !!formData.osPreference;
      case 7: return true;
      case 8: return true;
      default: return true;
    }
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      sessionStorage.setItem('recommendationData', JSON.stringify(data));
      sessionStorage.setItem('recommendationPreferences', JSON.stringify(formData));
      router.push('/Recommend/results');
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError(error instanceof Error ? error.message : "Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <LoadingOverlay isLoading={loading} />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#297EA6] text-white mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Recommendation</span>
          </div>
          <h1 className="text-4xl font-bold text-[#15384F] mb-2">Find Your Perfect Device</h1>
          <p className="text-lg text-slate-600">
            Answer a few questions to get personalized recommendations
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-slate-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#297EA6] to-[#1a2b3b] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-700">{error}</p>
          </Card>
        )}

        {step === 1 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">What type of device are you looking for?</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {deviceTypes.map(({ id, label, icon: Icon }) => (
                <div
                  key={id}
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    deviceType: id, 
                    useCases: [], 
                    brands: [], 
                    screenSize: "", 
                    osPreference: "",
                    connectivity: [],
                    specialFeatures: []
                  }))}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.deviceType === id
                      ? "border-[#297EA6] bg-blue-50 shadow-lg scale-105"
                      : "border-slate-200 hover:border-[#297EA6] hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`h-10 w-10 mb-3 ${formData.deviceType === id ? "text-[#297EA6]" : "text-slate-400"}`} />
                  <span className={`font-medium ${formData.deviceType === id ? "text-[#297EA6]" : "text-slate-700"}`}>{label}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-8">
              <Button onClick={() => setStep(2)} disabled={!canProceed()} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">What's your budget?</h2>
            
            <div className="space-y-6">
              {/* Currency Selector */}
              <div>
                <Label htmlFor="currency" className="text-base text-[#15384F] mb-3 flex items-center gap-2 font-semibold">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-[#297EA6]" />
                  </div>
                  Select Your Currency
                </Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value, budget: "" })}>
                  <SelectTrigger className="h-14 text-base border-2 border-slate-300 hover:border-[#297EA6] transition-colors rounded-xl bg-white shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#297EA6] to-[#1a2b3b] flex items-center justify-center shadow-md">
                        <span className="text-white text-lg font-bold">{currentCurrency.symbol}</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-bold text-[#15384F]">{currentCurrency.code}</span>
                        <span className="text-xs text-slate-500">{currentCurrency.name}</span>
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-2 border-slate-200 shadow-2xl bg-white">
                    <div className="p-2">
                      {currencies.map((currency, index) => (
                        <SelectItem 
                          key={currency.code} 
                          value={currency.code}
                          className="rounded-lg my-1 cursor-pointer hover:bg-blue-50 focus:bg-blue-50 py-3 px-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                              formData.currency === currency.code 
                                ? 'bg-gradient-to-br from-[#297EA6] to-[#1a2b3b]' 
                                : 'bg-slate-100'
                            }`}>
                              <span className={`text-lg font-bold ${
                                formData.currency === currency.code ? 'text-white' : 'text-slate-600'
                              }`}>
                                {currency.symbol}
                              </span>
                            </div>
                            <div className="flex flex-col items-start flex-1">
                              <span className="font-bold text-[#15384F] text-sm">{currency.code}</span>
                              <span className="text-xs text-slate-500">{currency.name}</span>
                            </div>
                            {formData.currency === currency.code && (
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                                  <path d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget Input */}
              <div>
                <Label htmlFor="budget" className="text-base text-[#15384F]">
                  Maximum Budget ({currentCurrency.code})
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500">
                    {currentCurrency.symbol}
                  </span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder={formData.currency === "NGN" ? "e.g., 400000" : "e.g., 800"}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="pl-10 h-12 text-lg border-slate-300"
                  />
                </div>
              </div>
              
              {/* Quick Select Buttons */}
              <div>
                <Label className="text-sm text-slate-600 mb-3 block">Quick select:</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentBudgetPresets.map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setFormData({ ...formData, budget: amount })}
                      className={`h-12 border-slate-300 hover:border-[#297EA6] hover:bg-blue-50 ${
                        formData.budget === amount ? "border-[#297EA6] bg-blue-50" : ""
                      }`}
                    >
                      {formatCurrency(amount)}+
                    </Button>
                  ))}
                </div>
              </div>

              {/* Currency Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Note:</strong> Prices will be shown in {currentCurrency.name} ({currentCurrency.symbol}). 
                  We'll convert and match devices based on current exchange rates.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canProceed()} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Rest of the steps remain the same... */}
        {step === 3 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">How will you use your {formData.deviceType}?</h2>
            <p className="text-slate-600 mb-6">Select all that apply</p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {currentUseCases.map(useCase => (
                <div
                  key={useCase}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.useCases.includes(useCase)
                      ? "border-[#297EA6] bg-blue-50"
                      : "border-slate-200 hover:border-[#297EA6]"
                  }`}
                  onClick={() => handleUseCaseToggle(useCase)}
                >
                  <Checkbox
                    checked={formData.useCases.includes(useCase)}
                    onCheckedChange={() => handleUseCaseToggle(useCase)}
                  />
                  <Label className="cursor-pointer flex-1">{useCase}</Label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!canProceed()} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Steps 4-8 continue as before... I'll include a few key ones */}
        
        {step === 4 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">Any brand preferences?</h2>
            <p className="text-slate-600 mb-6">Select your preferred brands (optional)</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentBrands.map(brand => (
                <div
                  key={brand}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.brands.includes(brand)
                      ? "border-[#297EA6] bg-blue-50"
                      : "border-slate-200 hover:border-[#297EA6]"
                  }`}
                  onClick={() => handleBrandToggle(brand)}
                >
                  <Checkbox
                    checked={formData.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label className="cursor-pointer flex-1 text-sm">{brand}</Label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(3)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(5)} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 5 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">
              {formData.deviceType === "earbuds" ? "What form factor do you prefer?" : "What screen size do you prefer?"}
            </h2>
            
            <RadioGroup
              value={formData.screenSize}
              onValueChange={(value) => setFormData(prev => ({ ...prev, screenSize: value }))}
              className="grid md:grid-cols-2 gap-3"
            >
              {currentScreenSizes.map(({ value, label }) => (
                <div
                  key={value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.screenSize === value
                      ? "border-[#297EA6] bg-blue-50"
                      : "border-slate-200 hover:border-[#297EA6]"
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, screenSize: value }))}
                >
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="cursor-pointer flex-1">{label}</Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(4)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(6)} disabled={!canProceed()} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 6 && (
          <Card className="p-8 shadow-xl">
            {currentOsOptions.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold text-[#15384F] mb-6">Operating system preference?</h2>

                <RadioGroup
                  value={formData.osPreference}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, osPreference: value }))}
                  className="grid md:grid-cols-2 gap-3"
                >
                  {currentOsOptions.map(({ value, label }) => (
                    <div
                      key={value}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.osPreference === value
                          ? "border-[#297EA6] bg-blue-50"
                          : "border-slate-200 hover:border-[#297EA6]"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, osPreference: value }))}
                    >
                      <RadioGroupItem value={value} id={`os-${value}`} />
                      <Label htmlFor={`os-${value}`} className="cursor-pointer flex-1">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-[#15384F] mb-6">Connectivity & Features</h2>
                <p className="text-slate-600 mb-6">What connectivity options are important to you?</p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {currentConnectivity.map(feature => (
                    <div
                      key={feature}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.connectivity.includes(feature)
                          ? "border-[#297EA6] bg-blue-50"
                          : "border-slate-200 hover:border-[#297EA6]"
                      }`}
                      onClick={() => handleConnectivityToggle(feature)}
                    >
                      <Checkbox
                        checked={formData.connectivity.includes(feature)}
                        onCheckedChange={() => handleConnectivityToggle(feature)}
                      />
                      <Label className="cursor-pointer flex-1 text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(5)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(7)} disabled={!canProceed()} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 7 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">Must-have features?</h2>
            <p className="text-slate-600 mb-6">Select features that are important to you</p>
            
            {currentOsOptions.length > 0 && (
              <>
                <h3 className="text-lg font-medium text-[#15384F] mb-3">Connectivity</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {currentConnectivity.map(feature => (
                    <div
                      key={feature}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.connectivity.includes(feature)
                          ? "border-[#297EA6] bg-blue-50"
                          : "border-slate-200 hover:border-[#297EA6]"
                      }`}
                      onClick={() => handleConnectivityToggle(feature)}
                    >
                      <Checkbox
                        checked={formData.connectivity.includes(feature)}
                        onCheckedChange={() => handleConnectivityToggle(feature)}
                      />
                      <Label className="cursor-pointer flex-1 text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </>
            )}

            <h3 className="text-lg font-medium text-[#15384F] mb-3">Special Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {currentSpecialFeatures.map(feature => (
                <div
                  key={feature}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.specialFeatures.includes(feature)
                      ? "border-[#297EA6] bg-blue-50"
                      : "border-slate-200 hover:border-[#297EA6]"
                  }`}
                  onClick={() => handleSpecialFeatureToggle(feature)}
                >
                  <Checkbox
                    checked={formData.specialFeatures.includes(feature)}
                    onCheckedChange={() => handleSpecialFeatureToggle(feature)}
                  />
                  <Label className="cursor-pointer flex-1 text-sm">{feature}</Label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(6)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(8)} className="gap-2 bg-[#297EA6] hover:opacity-90 text-white">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {step === 8 && (
          <Card className="p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#15384F] mb-6">What matters most to you?</h2>
            <p className="text-slate-600 mb-6">Rate these factors from 1-10</p>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-[#15384F]">Device Specifications</h3>
              {[
                { key: "battery" as const, label: "Battery Life", icon: "🔋" },
                { key: "camera" as const, label: "Camera Quality", icon: "📷" },
                { key: "performance" as const, label: "Performance", icon: "⚡" },
                { key: "storage" as const, label: "Storage Capacity", icon: "💾" },
                { key: "display" as const, label: "Display Quality", icon: "📱" },
                { key: "durability" as const, label: "Build & Durability", icon: "🛡️" }
              ].map(({ key, label, icon }) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base flex items-center gap-2">
                      <span>{icon}</span>
                      {label}
                    </Label>
                    <Badge variant="outline" className="text-black">
                      {formData.priorities[key]}/10
                    </Badge>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.priorities[key]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      priorities: { ...prev.priorities, [key]: parseInt(e.target.value) }
                    }))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#297EA6]"
                  />
                </div>
              ))}
              
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-[#15384F] mb-4">Other Factors</h3>
                {[
                  { key: "priceValue" as const, label: "Price-to-Value Ratio", icon: "💰" },
                  { key: "brandReputation" as const, label: "Brand Reputation", icon: "⭐" },
                  { key: "futureProofing" as const, label: "Future-Proofing", icon: "🚀" },
                  { key: "ecoFriendly" as const, label: "Eco-Friendliness", icon: "🌱" }
                ].map(({ key, label, icon }) => (
                  <div key={key} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-base flex items-center gap-2">
                        <span>{icon}</span>
                        {label}
                      </Label>
                      <Badge variant="outline" className="text-black">
                        {formData.importanceFactors[key]}/10
                      </Badge>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.importanceFactors[key]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        importanceFactors: { ...prev.importanceFactors, [key]: parseInt(e.target.value) }
                      }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#297EA6]"
                    />
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h3 className="text-lg font-medium text-[#15384F] mb-4">How often do you upgrade?</h3>
                <RadioGroup
                  value={formData.upgradeFrequency}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, upgradeFrequency: value }))}
                  className="grid md:grid-cols-2 gap-3"
                >
                  {[
                    { value: "yearly", label: "Every year" },
                    { value: "2-3years", label: "Every 2-3 years" },
                    { value: "4-5years", label: "Every 4-5 years" },
                    { value: "until-broken", label: "Until it breaks" }
                  ].map(({ value, label }) => (
                    <div
                      key={value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.upgradeFrequency === value
                          ? "border-[#297EA6] bg-blue-50"
                          : "border-slate-200 hover:border-[#297EA6]"
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, upgradeFrequency: value }))}
                    >
                      <RadioGroupItem value={value} id={`upgrade-${value}`} />
                      <Label htmlFor={`upgrade-${value}`} className="cursor-pointer flex-1">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(7)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button 
                onClick={getRecommendations}
                disabled={loading}
                className="gap-2 bg-[#297EA6] hover:opacity-90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
    </>
  );
}