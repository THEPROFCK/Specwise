"use client"
import React, { useState } from "react";
import { 
  Battery, Shield, HardDrive, Laptop, Zap, Settings, 
  Sparkles, Smartphone, ChevronDown, ChevronUp, Info, Clock
} from "lucide-react";

const DeviceTips = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

  const tipCategories = [
    {
      icon: Battery,
      title: "Battery Optimization",
      tips: [
        "Enable adaptive battery and optimize battery usage in settings",
        "Reduce screen brightness and use dark mode when possible",
        "Disable unnecessary background app refresh",
        "Turn off vibration and haptic feedback to save power",
        "Use WiFi instead of mobile data when available",
        "Avoid extreme temperatures - keep devices between 32° to 95° F"
      ]
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      tips: [
        "Always use strong passwords or biometric authentication",
        "Keep your device's software updated regularly",
        "Only download apps from official app stores",
        "Review app permissions and disable unnecessary access",
        "Enable Find My Device or similar tracking features",
        "Use a VPN on public WiFi networks"
      ]
    },
    {
      icon: HardDrive,
      title: "Storage Management",
      tips: [
        "Regularly clear cache and temporary files",
        "Use cloud storage for photos and videos",
        "Uninstall unused apps and games",
        "Move media files to external storage or computer",
        "Enable automatic photo backup and delete local copies",
        "Review and delete old downloads and documents"
      ]
    },
    {
      icon: Laptop,
      title: "Device Longevity",
      tips: [
        "Use a quality protective case and screen protector",
        "Avoid charging device overnight or to 100% constantly",
        "Keep charging ports clean and free of debris",
        "Don't use device while charging when possible",
        "Restart your device weekly to clear memory",
        "Avoid water damage - even 'waterproof' devices can fail"
      ]
    },
    {
      icon: Zap,
      title: "Performance Boost",
      tips: [
        "Close apps you're not actively using",
        "Disable or reduce animations in developer settings",
        "Clear RAM periodically by restarting device",
        "Limit widgets on home screen",
        "Disable live wallpapers and use static images",
        "Turn off auto-sync for apps you don't need updated constantly"
      ]
    },
    {
      icon: Settings,
      title: "Maintenance Tips",
      tips: [
        "Clean screen and ports regularly with microfiber cloth",
        "Avoid exposing device to direct sunlight for extended periods",
        "Don't use device with wet hands or in humid environments",
        "Back up your data regularly to cloud or computer",
        "Monitor battery health and replace when degraded",
        "Factory reset annually to keep system running smoothly"
      ]
    }
  ];

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-[#4278a0]/10 rounded-full">
            <Sparkles className="h-5 w-5 text-[#4278a0]" />
            <span className="text-sm font-semibold text-[#4278a0]">Expert Advice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a2b3b] mb-3 sm:mb-4">
            Device Tips & Guides
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Expert advice to help you get the most out of your devices and extend their lifespan
          </p>
        </div>

        {/* Tips Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-12">
          {tipCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-[#4278a0] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 bg-slate-50 border-b-2 border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#1a2b3b]">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-[#1a2b3b]">{category.title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex gap-3 items-start">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#4278a0] text-white text-xs font-bold shrink-0 mt-0.5">
                        {tipIdx + 1}
                      </span>
                      <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Accordion - Mobile & Tablet */}
        <div className="lg:hidden space-y-4 mb-12">
          {tipCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(idx)}
                className="w-full p-4 sm:p-5 bg-slate-50 flex items-center justify-between gap-4 transition-colors hover:bg-slate-100"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-xl bg-[#1a2b3b]">
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#1a2b3b] text-left">{category.title}</h2>
                </div>
                {expandedCategory === idx ? (
                  <ChevronUp className="h-5 w-5 text-[#4278a0] shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600 shrink-0" />
                )}
              </button>
              
              {expandedCategory === idx && (
                <div className="p-4 sm:p-6 border-t-2 border-slate-200">
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIdx) => (
                      <li key={tipIdx} className="flex gap-3 items-start">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-[#4278a0] text-white text-xs font-bold shrink-0 mt-0.5">
                          {tipIdx + 1}
                        </span>
                        <p className="text-slate-700 text-sm leading-relaxed">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon - AI Tips Section */}
        <div className="mb-12 bg-gradient-to-br from-[#1a2b3b] to-[#2a3b4b] rounded-2xl shadow-lg overflow-hidden border-2 border-[#1a2b3b]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#4278a0]/20 rounded-xl border border-[#4278a0]/30">
                  <Sparkles className="h-6 w-6 text-[#4278a0]" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">AI-Powered Device Assistant</h2>
                  <p className="text-slate-300 text-sm mt-1">Get personalized tips for your specific device</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4278a0]/20 rounded-full border border-[#4278a0]/40">
                <Clock className="h-4 w-4 text-[#4278a0]" />
                <span className="text-sm font-semibold text-[#4278a0]">Coming Soon</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#0f1a24] rounded-xl p-4 sm:p-6 border-2 border-[#2a3b4b]">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-[#4278a0]/20 rounded-lg border border-[#4278a0]/30">
                    <Info className="h-5 w-5 text-[#4278a0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">What's Coming?</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-[#4278a0] mt-1">•</span>
                        <span>Ask questions about your specific device model and get instant answers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#4278a0] mt-1">•</span>
                        <span>Personalized optimization tips based on your usage patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#4278a0] mt-1">•</span>
                        <span>Troubleshooting assistance for common device issues</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#4278a0] mt-1">•</span>
                        <span>Real-time recommendations to improve battery life and performance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Preview Input (Disabled) */}
                <div className="relative opacity-50 pointer-events-none">
                  <input
                    disabled
                    placeholder="Ask AI anything about your device..."
                    className="w-full px-4 py-3 bg-[#1a2b3b] border-2 border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#4278a0] text-white text-sm font-semibold rounded-lg">
                    Ask AI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips Footer Section */}
        <div className="bg-gradient-to-br from-[#4278a0] to-[#1a2b3b] rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl border border-white/30">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Quick Tips</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Daily Habits</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Small daily actions like closing unused apps and adjusting brightness can significantly extend your device's lifespan.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-3">
                  <Battery className="h-5 w-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Charging Best Practices</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Keep battery between 20-80% when possible. Avoid charging to 100% every night to maximize battery health.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/20 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Protection First</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Invest in quality protection. A good case and screen protector cost less than repairs or replacement.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeviceTips;