"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Store, 
  ArrowLeft, 
  Sparkles, 
  BellRing,
  Smartphone,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        
        {/* ICON & BADGE */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Feature Coming Soon</span>
          </Badge>
        </div>

        {/* MAIN TEXT */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E293B] tracking-tight mb-6">
            The Marketplace is <br />
            <span className="text-primary italic">under construction.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            We're building a secure, seamless way for you to buy and sell devices. 
            Stay tuned for a premium trading experience.
          </p>
        </div>

        {/* FEATURE PREVIEWS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Verified Sellers</h3>
            <p className="text-sm text-slate-500">Only trusted vendors and inspected devices.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Instant Deals</h3>
            <p className="text-sm text-slate-500">Real-time price matching and fast checkouts.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white mb-4">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 mb-1">Trade-ins</h3>
            <p className="text-sm text-slate-500">Easily swap your old tech for the latest gear.</p>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-2xl px-8 h-14 font-bold shadow-lg shadow-primary/20">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl px-8 h-14 font-bold bg-white border-slate-200">
            <BellRing className="mr-2 h-5 w-5" />
            Notify Me
          </Button>
        </div>

        {/* BACKGROUND DECORATION */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none">
          <Store className="h-[500px] w-[500px]" />
        </div>
      </div>
    </div>
  );
}