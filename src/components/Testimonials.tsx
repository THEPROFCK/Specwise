"use client";

import React from 'react';
import { Star, User, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  { name: "James Kabaye", text: "The AI recommendation engine is a game changer. Found my laptop in under 2 minutes.", rating: 5 },
  { name: "John Cullian", text: "Finally, a site that compares specs without the technical jargon. Highly intuitive!", rating: 5 },
  { name: "Pedro Van", text: "Saved me nearly $200 by connecting me with a verified local vendor I didn't know about.", rating: 5 },
  { name: "Anna L.", text: "The interface is beautiful and the device data is incredibly accurate. 10/10 experience.", rating: 5 },
  { name: "Sarah M.", text: "I was overwhelmed by options until I used this. The personalized suggestions are spot on.", rating: 5 },
];

const Testimonials = () => {
  // Triple the array for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#4278a0] uppercase mb-3">
            Testimonials
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-[#1a2b3b]">
            Trusted by tech enthusiasts
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroller Container */}
      <div className="relative flex items-center">
        {/* The Track */}
        <motion.div 
          className="flex gap-6 hover:[animation-play-state:paused] cursor-pointer" 
          animate={{ 
            x: [0, "-50%"], 
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedReviews.map((r, i) => (
            <div 
              key={i} 
              className="group relative bg-[#1a2b3b] p-8 rounded-3xl w-[320px] md:w-[400px] shrink-0 flex flex-col justify-between border border-white/10 transition-all duration-300 hover:border-[#4278a0]/50 shadow-xl"
            >
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4278a0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <Quote className="text-[#4278a0] mb-6 opacity-50" size={32} />
                <p className="text-lg md:text-xl text-blue-50/90 leading-relaxed font-medium mb-10">
                  "{r.text}"
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#4278a0] to-[#1a2b3b] rounded-full flex items-center justify-center border border-white/20">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white whitespace-nowrap">{r.name}</span>
                    <span className="text-[10px] text-blue-200/50 uppercase tracking-wider font-semibold">Verified User</span>
                  </div>
                </div>
                
                <div className="flex gap-1 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} size={12} fill={starIdx < r.rating ? "#4278a0" : "none"} stroke={starIdx < r.rating ? "#4278a0" : "#666"} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-400 text-sm">Join over <span className="text-[#1a2b3b] font-bold">50,000+</span> users making better tech choices.</p>
      </div>
    </section>
  );
};

export default Testimonials;