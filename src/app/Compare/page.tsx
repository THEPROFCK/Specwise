'use client';

import { useState } from "react";

// Force dynamic rendering for pages using useSearchParams
export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  X, 
  Plus, 
  Search, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { mockDevices } from "@/data/mockDevices";

const Compare = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const idsFromUrl = searchParams.get("ids")?.split(",").filter(Boolean) || [];
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<string[]>(idsFromUrl);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const selectedDevices = mockDevices.filter(device => selectedDeviceIds.includes(device.id));
  const availableDevices = mockDevices.filter(device => !selectedDeviceIds.includes(device.id));
  
  // Filter available devices by search query
  const filteredAvailableDevices = availableDevices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group devices by brand
  const devicesByBrand = filteredAvailableDevices.reduce((acc, device) => {
    if (!acc[device.brand]) {
      acc[device.brand] = [];
    }
    acc[device.brand].push(device);
    return acc;
  }, {} as Record<string, typeof mockDevices>);

  const updateUrl = (newIds: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newIds.length > 0) {
      params.set("ids", newIds.join(","));
    } else {
      params.delete("ids");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const addDevice = (deviceId: string) => {
    if (selectedDeviceIds.length < 4) {
      const newIds = [...selectedDeviceIds, deviceId];
      setSelectedDeviceIds(newIds);
      updateUrl(newIds);
      setIsDropdownOpen(false);
      setSearchQuery("");
    }
  };

  const removeDevice = (deviceId: string) => {
    const newIds = selectedDeviceIds.filter(id => id !== deviceId);
    setSelectedDeviceIds(newIds);
    updateUrl(newIds);
    if (currentDeviceIndex >= newIds.length && currentDeviceIndex > 0) {
      setCurrentDeviceIndex(currentDeviceIndex - 1);
    }
  };

  const specs = [
    { label: "Price", key: "price", format: (v: number) => `$${v}` },
    { label: "Screen Size", key: "screenSize", format: (v: number) => `${v}"` },
    { label: "Refresh Rate", key: "refreshRate", format: (v: number) => `${v}Hz` },
    { label: "Display Type", key: "displayType" },
    { label: "Processor", key: "processor" },
    { label: "RAM", key: "ram", format: (v: number) => `${v}GB` },
    { label: "Main Camera", key: "mainCamera", format: (v: number | undefined) => v ? `${v}MP` : "N/A" },
    { label: "Battery", key: "batteryCapacity", format: (v: number) => `${v}mAh` },
    { label: "Charging Speed", key: "chargingSpeed", format: (v: number) => `${v}W` },
    { label: "Weight", key: "weight", format: (v: number) => `${v}g` },
    { label: "OS", key: "os" },
  ];

  const scores = ["overallScore", "performanceScore", "cameraScore", "batteryScore", "valueScore"];

  const nextDevice = () => {
    if (currentDeviceIndex < selectedDevices.length - 1) {
      setCurrentDeviceIndex(currentDeviceIndex + 1);
    }
  };

  const prevDevice = () => {
    if (currentDeviceIndex > 0) {
      setCurrentDeviceIndex(currentDeviceIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-1">Compare Devices</h1>
          <p className="text-gray-500 font-medium">Select up to four devices to compare side by side (mock data for demonstration purposes).</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or brand...." 
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#4278a0] focus:ring-2 focus:ring-[#1a365d] outline-none transition-all shadow-sm"
          />
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {selectedDevices.map(device => (
            <div key={device.id} className="relative group animate-in fade-in zoom-in duration-300">
              <Card className="overflow-hidden border-none bg-[#1e293b] text-white rounded-2xl shadow-xl">
                <div className="relative h-44 w-full bg-white p-6">
                  <Image src={device.image} alt={device.name} fill className="object-contain p-4" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{device.brand}</span>
                  <h3 className="font-bold text-md mb-1 truncate">{device.name}</h3>
                  <p className="text-lg font-black text-white">${device.price}</p>
                </div>
              </Card>
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-lg z-20 hover:bg-[#4278a0] hover:text-white"
                onClick={() => removeDevice(device.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {/* Add Device Card */}
          {selectedDeviceIds.length < 4 && (
            <>
              <Card 
                onClick={() => setIsDropdownOpen(true)}
                className="flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 hover:border-[#3a7ca5] rounded-2xl p-6 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3a7ca5] to-[#1e293b] flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Add Device</h3>
                <p className="text-sm text-gray-500 text-center">Click to browse and compare</p>
              </Card>

              {/* Modern Modal Dropdown */}
              {isDropdownOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                  {/* Backdrop with blur */}
                  <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setSearchQuery("");
                    }}
                  />
                  
                  {/* Modal Content */}
                  <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-[#3a7ca5] to-[#1e293b]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Plus className="text-white" size={20} />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-white">Add Device to Compare</h2>
                            <p className="text-sm text-white/80 mt-0.5">
                              {filteredAvailableDevices.length} device{filteredAvailableDevices.length !== 1 ? 's' : ''} available
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-sm"
                        >
                          <X className="text-white" size={20} />
                        </button>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search by device name or brand..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-white/20 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-base shadow-lg"
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Device Grid */}
                    <div className="overflow-y-auto flex-1 p-6">
                      {filteredAvailableDevices.length > 0 ? (
                        <div className="space-y-6">
                          {Object.entries(devicesByBrand).map(([brand, devices]) => (
                            <div key={brand}>
                              {/* Brand Header */}
                              <div className="flex items-center gap-3 mb-4">
                                <div className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1" />
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider px-3 py-1.5 bg-gray-100 rounded-full">
                                  {brand}
                                </h3>
                                <div className="h-px bg-gradient-to-l from-gray-300 to-transparent flex-1" />
                              </div>
                              
                              {/* Device Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {devices.map(device => (
                                  <button
                                    key={device.id}
                                    onClick={() => addDevice(device.id)}
                                    className="group relative bg-white border-2 border-gray-200 hover:border-[#3a7ca5] rounded-2xl p-4 transition-all hover:shadow-xl hover:scale-[1.02] text-left"
                                  >
                                    {/* Device Image */}
                                    <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                                      <Image 
                                        src={device.image} 
                                        alt={device.name}
                                        fill
                                        className="object-contain p-4"
                                      />
                                      {/* Overlay on Hover */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                                        <span className="text-white font-bold text-sm flex items-center gap-2">
                                          <Plus className="w-4 h-4" />
                                          Add to Compare
                                        </span>
                                      </div>
                                    </div>

                                    {/* Device Info */}
                                    <div className="space-y-2">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#3a7ca5] transition-colors line-clamp-2">
                                          {device.name}
                                        </h4>
                                      </div>

                                      {/* Price */}
                                      <div className="text-2xl font-black text-[#3a7ca5]">
                                        ${device.price}
                                      </div>

                                      {/* Key Specs */}
                                      <div className="flex flex-wrap gap-2 pt-2">
                                        <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                                          {device.screenSize}"
                                        </span>
                                        <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                                          {device.ram}GB
                                        </span>
                                        <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
                                          {device.processor.split(' ').slice(0, 2).join(' ')}
                                        </span>
                                      </div>

                                      {/* Score Badge */}
                                      <div className="pt-2">
                                        <div className="flex items-center gap-2">
                                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-gradient-to-r from-[#3a7ca5] to-[#1e293b] rounded-full transition-all"
                                              style={{ width: `${device.overallScore}%` }}
                                            />
                                          </div>
                                          <span className="text-xs font-black text-gray-900">{device.overallScore}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Add Icon Badge */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-2 border-gray-200 group-hover:border-[#3a7ca5] group-hover:bg-[#3a7ca5] flex items-center justify-center transition-all shadow-lg">
                                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20">
                          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-10 h-10 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">No devices found</h3>
                          <p className="text-gray-500 text-center max-w-sm">
                            Try adjusting your search term or browse all available devices
                          </p>
                          <button
                            onClick={() => setSearchQuery("")}
                            className="mt-6 px-6 py-2.5 bg-[#3a7ca5] text-white rounded-xl font-semibold hover:bg-[#2d6283] transition-colors"
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Selected: <strong>{selectedDeviceIds.length}/4</strong> devices
                      </p>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                        }}
                        className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl font-semibold transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Comparison Section */}
        {selectedDevices.length >= 2 ? (
          <>
            {/* Desktop Table View - Hidden on Mobile */}
            <div className="hidden lg:block rounded-2xl border border-gray-100 overflow-hidden shadow-2xl bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#3a7ca5] text-white">
                      <th className="p-5 font-bold text-sm uppercase tracking-wider sticky left-0 bg-[#3a7ca5] z-10">Specification</th>
                      {selectedDevices.map(device => (
                        <th key={device.id} className="p-5 text-center font-bold border-l border-white/10 text-sm min-w-[200px]">
                          {device.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {specs.map((spec, idx) => (
                      <tr key={spec.key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="p-4 font-bold text-gray-900 border-b border-gray-100 text-sm sticky left-0 bg-inherit z-10">{spec.label}</td>
                        {selectedDevices.map(device => {
                          const value = device[spec.key as keyof typeof device];
                          return (
                            <td key={device.id} className="p-4 text-center border-l border-gray-100 border-b text-sm">
                              {spec.format && typeof value === 'number' ? spec.format(value) : (value || "-")}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    
                    <tr className="bg-white">
                      <td colSpan={selectedDevices.length + 1} className="p-5 font-black text-[#1a365d] border-b-2 border-gray-100 uppercase text-xs tracking-tighter">
                        Performance Score
                      </td>
                    </tr>

                    {scores.map((scoreKey) => (
                      <tr key={scoreKey} className="bg-white">
                        <td className="p-4 font-bold text-gray-500 text-sm border-b border-gray-100 sticky left-0 bg-white z-10">
                          {scoreKey.replace("Score", "").replace(/^\w/, (c) => c.toUpperCase())}
                        </td>
                        {selectedDevices.map(device => {
                          const value = (device as any)[scoreKey] || 0;
                          return (
                            <td key={device.id} className="p-4 border-l border-gray-100 border-b">
                              <div className="flex items-center justify-center gap-3">
                                <div className="flex-1 max-w-[120px] h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#3a7ca5] rounded-full transition-all duration-1000"
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                                <span className="font-black text-gray-800 text-sm">{value}</span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View - Hidden on Desktop */}
            <div className="lg:hidden space-y-6">
              {/* Device Selector for Mobile */}
              <div className="bg-white rounded-2xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevDevice}
                    disabled={currentDeviceIndex === 0}
                    className="p-2 rounded-lg bg-[#3a7ca5] text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="text-center flex-1">
                    <h3 className="font-bold text-lg text-[#1a365d]">
                      {selectedDevices[currentDeviceIndex]?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Device {currentDeviceIndex + 1} of {selectedDevices.length}
                    </p>
                  </div>
                  
                  <button
                    onClick={nextDevice}
                    disabled={currentDeviceIndex === selectedDevices.length - 1}
                    className="p-2 rounded-lg bg-[#3a7ca5] text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2">
                  {selectedDevices.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentDeviceIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentDeviceIndex ? 'bg-[#3a7ca5] w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Current Device Specs Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-[#3a7ca5] text-white p-4">
                  <h3 className="font-bold uppercase text-sm tracking-wider">Specifications</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {specs.map((spec, idx) => {
                    const device = selectedDevices[currentDeviceIndex];
                    const value = device?.[spec.key as keyof typeof device];
                    return (
                      <div key={spec.key} className={`p-4 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 text-sm">{spec.label}</span>
                          <span className="text-gray-700 text-sm">
                            {spec.format && typeof value === 'number' ? spec.format(value) : (value || "-")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Device Performance Scores */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-[#3a7ca5] text-white p-4">
                  <h3 className="font-bold uppercase text-sm tracking-wider">Performance Scores</h3>
                </div>
                <div className="p-4 space-y-4">
                  {scores.map((scoreKey) => {
                    const device = selectedDevices[currentDeviceIndex];
                    const value = (device as any)?.[scoreKey] || 0;
                    return (
                      <div key={scoreKey}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-700 text-sm">
                            {scoreKey.replace("Score", "").replace(/^\w/, (c) => c.toUpperCase())}
                          </span>
                          <span className="font-black text-[#3a7ca5] text-sm">{value}</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3a7ca5] rounded-full transition-all duration-1000"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Compare All Button */}
              <button
                onClick={() => {
                  // Scroll to comparison on desktop or show modal
                  const table = document.querySelector('.lg\\:block');
                  if (table) {
                    table.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full p-4 bg-[#1e293b] text-white rounded-2xl font-bold hover:bg-[#3a7ca5] transition-all shadow-lg"
              >
                View Full Comparison Table
              </button>
            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <p className="text-gray-400 font-medium text-lg">Select at least 2 devices to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;