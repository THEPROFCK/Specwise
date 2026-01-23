"use client";

import { Sparkles, Zap, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: Sparkles, text: "Analyzing your preferences...", color: "text-[#4278a0]" },
    { icon: Zap, text: "Searching thousands of devices...", color: "text-[#4278a0]" },
    { icon: CheckCircle, text: "Finding the perfect matches...", color: "text-[#1a2b3b]" },
  ];

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
      
      {/* Loading Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-slate-200">
        {/* Animated gradient border effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#4278a0] via-[#1a2b3b] to-[#4278a0] rounded-2xl opacity-20 blur-xl animate-pulse" />
        
        <div className="relative">
          {/* Main spinner with icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Rotating ring */}
              <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-[#4278a0] animate-spin" />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4278a0] to-[#1a2b3b] rounded-full flex items-center justify-center shadow-lg">
                  <CurrentIcon className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1a2b3b] text-center mb-3">
            Generating Recommendations
          </h2>
          
          {/* Subtitle */}
          <p className="text-slate-600 text-center mb-6">
            This will just take a few seconds...
          </p>

          {/* Progress steps */}
          <div className="space-y-3 mb-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-[#4278a0]/10 border-2 border-[#4278a0]" 
                      : isCompleted
                      ? "bg-slate-100"
                      : "bg-slate-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#4278a0]"
                      : isCompleted
                      ? "bg-[#1a2b3b]"
                      : "bg-slate-300"
                  }`}>
                    <StepIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className={`text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#1a2b3b]"
                      : isCompleted
                      ? "text-slate-700"
                      : "text-slate-500"
                  }`}>
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-[#4278a0] animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}