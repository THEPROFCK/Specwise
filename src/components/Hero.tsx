"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="px-4 py-6 md:px-10 md:py-8">
      {/* Container with updated colors */}
      <div className="relative w-full max-w-7xl mx-auto rounded-[2rem] bg-[#1a2b3b] overflow-hidden min-h-[auto] md:min-h-[600px] flex flex-col items-center justify-center text-center p-6 py-16 md:p-16 border border-white/5">
        
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 z-0">
          {/* Subtle Radial Gradient Glow */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at center, #4278a0 0%, transparent 70%)`
            }}
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem]"></div>
          
          {/* Floating Orbs using your colors */}
          <motion.div
            className="absolute top-10 left-10 w-48 h-48 md:w-80 md:h-80 rounded-full blur-[100px] opacity-30"
            style={{ backgroundColor: '#4278a0' }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: '#4278a0' }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Floating Icons - Modern Glassmorphism */}
        <motion.div
          className="hidden md:flex absolute top-[20%] left-[12%]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
            <Sparkles className="w-6 h-6 text-blue-300/80" />
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex absolute bottom-[25%] right-[12%]"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
            <TrendingUp className="w-6 h-6 text-blue-300/80" />
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="relative z-10 w-full max-w-4xl">
  

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
          >
            Find Your <br className="hidden md:block" />
            <span className="text-[#4278a0] brightness-125">
              Perfect Device
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100/70 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto px-4"
          >
            Compare specs, get AI-driven recommendations, and connect with trusted vendors — all in one simple platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-6"
          >
            <Link href="/Recommend" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl bg-white text-[#1a2b3b] font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 justify-center"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/Compare" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                Compare Devices
              </motion.button>
            </Link>
          </motion.div>

          {/* Minimalist Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-12 mt-16 pt-8 border-t border-white/5"
          >
            {[
              { val: '500', label: 'Devices' },
              { val: '50K+', label: 'Mock Users' },
              { val: '98%', label: 'Happy' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{stat.val}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-blue-100/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;