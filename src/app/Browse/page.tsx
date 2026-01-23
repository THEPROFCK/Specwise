'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  SlidersHorizontal, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Tv, 
  Watch, 
  Headphones,
  LayoutGrid,
  X,
  Filter,
  ChevronDown
} from "lucide-react";
import { mockDevices } from "@/data/mockDevices";
import { DeviceType, deviceTypeLabels } from "@/types/device";

const deviceTypeIcons = {
  phone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  tv: Tv,
  smartwatch: Watch,
  earbuds: Headphones
};

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<DeviceType | "All">("All");
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
  const brands = ["All", "Apple", "Google", "Samsung", "Others"];
  const deviceTypes = ["phone", "tablet", "laptop", "tv", "smartwatch", "earbuds"] as DeviceType[];
  
  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "All" || 
                        (selectedBrand === "Others" 
                          ? !["Apple", "Google", "Samsung"].includes(device.brand) 
                          : device.brand === selectedBrand);
    const matchesType = selectedType === "All" || device.deviceType === selectedType;
    
    return matchesSearch && matchesBrand && matchesType;
  });

  const activeFiltersCount = (selectedBrand !== "All" ? 1 : 0) + (selectedType !== "All" ? 1 : 0);

  const clearFilters = () => {
    setSelectedBrand("All");
    setSelectedType("All");
  };

  return (
    <div className="min-h-screen bg-white pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="pt-6 md:pt-12 mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a2b3b] mb-2 tracking-tight">
            Check Out Devices
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            Explore our comprehensive database of Devices (mock data for demonstration purposes).
          </p>
        </div>

        {/* Search & Filter Bar - Mobile Optimized */}
        <div className="sticky top-0 z-30 bg-white pb-4 mb-6">
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 md:h-14 rounded-xl border-[#4278a0] border-2 focus-visible:ring-2 focus-visible:ring-[#4278a0] focus-visible:ring-offset-0 text-base md:text-lg placeholder:text-gray-400"
            />
          </div>

          {/* Mobile Filter Buttons */}
          <div className="flex gap-2 md:hidden">
            {/* Category Quick Select */}
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f1f5f9] border border-gray-200 text-[#1a2b3b] font-bold hover:bg-gray-200 transition-all"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="truncate">
                {selectedType === "All" ? "Category" : deviceTypeLabels[selectedType]}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="relative flex items-center gap-2 px-4 py-3 rounded-xl bg-[#4278a0] text-white font-bold hover:bg-[#3a6a8a] transition-all"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Category Dropdown Menu - Mobile */}
          {showCategoryMenu && (
            <div className="md:hidden absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-40 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="max-h-[400px] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedType("All");
                    setShowCategoryMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all ${
                    selectedType === "All" ? "bg-blue-50 text-[#4278a0] font-bold" : "text-[#1a2b3b]"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                  <span>All Devices</span>
                </button>
                {deviceTypes.map(type => {
                  const Icon = deviceTypeIcons[type];
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setShowCategoryMenu(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all border-t border-gray-100 ${
                        selectedType === type ? "bg-blue-50 text-[#4278a0] font-bold" : "text-[#1a2b3b]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{deviceTypeLabels[type]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Desktop Category Filter - Horizontal Scroll */}
          <div className="hidden md:flex items-center gap-4 mb-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap mr-2">
              <LayoutGrid className="h-5 w-5" />
              <span className="font-bold">Category:</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedType("All")}
                className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold transition-all duration-200 whitespace-nowrap ${
                  selectedType === "All" 
                    ? "bg-[#4278a0] text-white shadow-md" 
                    : "bg-[#f1f5f9] text-[#1a2b3b] border border-gray-200 hover:bg-gray-200"
                }`}
              >
                All Devices
              </button>
              {deviceTypes.map(type => {
                const Icon = deviceTypeIcons[type];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-200 whitespace-nowrap ${
                      selectedType === type 
                        ? "bg-[#4278a0] text-white shadow-md" 
                        : "bg-[#f1f5f9] text-[#1a2b3b] border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {deviceTypeLabels[type]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Brand Filter */}
          <div className="hidden md:flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-2 text-gray-500 whitespace-nowrap mr-2">
              <SlidersHorizontal className="h-5 w-5" />
              <span className="font-bold">Filter by brand:</span>
            </div>
            <div className="flex gap-3">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-8 py-2.5 rounded-full font-bold transition-all duration-200 whitespace-nowrap ${
                    selectedBrand === brand 
                      ? "bg-[#4278a0] text-white shadow-md shadow-blue-900/20" 
                      : "bg-[#1a2b3b] text-white hover:bg-[#253d54]"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Chips - Mobile */}
          {activeFiltersCount > 0 && (
            <div className="md:hidden flex flex-wrap gap-2 mt-3">
              <span className="text-xs text-gray-500 font-bold flex items-center">
                Active filters:
              </span>
              {selectedBrand !== "All" && (
                <button
                  onClick={() => setSelectedBrand("All")}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4278a0] text-white text-xs font-bold rounded-full"
                >
                  {selectedBrand}
                  <X className="h-3 w-3" />
                </button>
              )}
              {selectedType !== "All" && (
                <button
                  onClick={() => setSelectedType("All")}
                  className="flex items-center gap-1 px-3 py-1 bg-[#4278a0] text-white text-xs font-bold rounded-full"
                >
                  {deviceTypeLabels[selectedType]}
                  <X className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-gray-500 underline font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600 font-medium">
          {filteredDevices.length} {filteredDevices.length === 1 ? 'device' : 'devices'} found
        </div>

        {/* Device Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredDevices.map(device => (
            <Card 
              key={device.id} 
              className="bg-[#1a2b3b] border-none rounded-3xl md:rounded-[2.5rem] overflow-hidden text-white flex flex-col h-full shadow-xl md:shadow-2xl group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={device.image}
                  alt={device.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 md:p-8 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest block mb-1">
                      {device.brand}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold leading-tight truncate">
                      {device.name}
                    </h3>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-white tracking-tighter flex-shrink-0">
                    ${device.price}
                  </span>
                </div>

                {/* Specs */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-sm flex-grow">
                  <div className="flex justify-between items-center border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400 font-bold">Display:</span>
                    <span className="font-bold text-right">
                      {device.screenSize}&quot; {device.refreshRate > 0 && `${device.refreshRate}Hz`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400 font-bold">Processor:</span>
                    <span className="font-bold text-right truncate ml-4">{device.processor}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400 font-bold">RAM:</span>
                    <span className="font-bold text-right">{device.ram}GB</span>
                  </div>
                  
                  {/* Show fewer specs on mobile */}
                  <div className="hidden sm:flex justify-between items-center border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400 font-bold">Camera:</span>
                    <span className="font-bold text-right">{device.mainCamera}MP</span>
                  </div>
                  <div className="hidden sm:flex justify-between items-center border-b border-gray-700/50 pb-2">
                    <span className="text-gray-400 font-bold">Battery:</span>
                    <span className="font-bold text-right">{device.batteryCapacity}mAh</span>
                  </div>
                </div>

                {/* Score */}
                <div className="mb-6 md:mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-gray-300">Overall Score:</span>
                    <span className="font-black text-white">{device.overallScore}/100</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-1000"
                      style={{ width: `${device.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Button */}
                <Link href={`/Compare?ids=${device.id}`} className="w-full mt-auto">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a2b3b] rounded-xl md:rounded-2xl py-5 md:py-7 font-black text-base md:text-lg transition-all duration-300 uppercase tracking-tight cursor-pointer"
                  >
                    Add to Compare
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDevices.length === 0 && (
          <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1a2b3b] mb-2">No devices found</h2>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters.</p>
            {activeFiltersCount > 0 && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="rounded-xl"
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
            onClick={() => setShowFilters(false)}
          />
          
          {/* Drawer */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-3xl">
              <h3 className="text-lg font-bold text-[#1a2b3b]">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Brand Filter */}
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-bold text-[#1a2b3b] mb-3 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Brand
              </h4>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-5 py-2.5 rounded-full font-bold transition-all ${
                      selectedBrand === brand 
                        ? "bg-[#4278a0] text-white shadow-md" 
                        : "bg-gray-100 text-[#1a2b3b] hover:bg-gray-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex gap-3">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="flex-1 rounded-xl h-12 font-bold"
              >
                Clear All
              </Button>
              <Button
                onClick={() => setShowFilters(false)}
                className="flex-1 rounded-xl h-12 font-bold bg-[#4278a0] hover:bg-[#3a6a8a]"
              >
                Show {filteredDevices.length} Results
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;