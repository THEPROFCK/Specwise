"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Search, Laptop, ShieldCheck, Database } from 'lucide-react';

const features = [
  { id: '01', title: 'Expert Tips & Guides', icon: Zap, text: 'Learn how to extend battery life, optimize performance, and maintain your devices for long-term use.' },
  { id: '02', title: 'AI Recommendations', icon: Search, text: 'Get personalized suggestions based on your budget, usage patterns, based preferences, and specific needs.' },
  { id: '03', title: 'Side-by-Side Comparison', icon: Laptop, text: 'Compare multiple phones at once with detailed specs, features, and pricing in an easy-to-read format.' },
  { id: '04', title: 'Vendor Access', icon: ShieldCheck, text: 'Find trusted sellers across Africa. With the best and affordable prices you can ever think of.' },
  { id: '05', title: 'Comprehensive Database', icon: Database, text: 'Compare multiple devices at once with detailed specs, features, and pricing in an easy-to-read format.' },
];

const howItWorks = [
  {
    icon: Zap,
    title: 'Tell Us Your Needs',
    description: 'Answer a few quick questions about your budget, usage, and preferences.',
  },
  {
    icon: Laptop,
    title: 'Compare Top Matches',
    description: 'Review side-by-side comparisons of devices that match your criteria.',
  },
  {
    icon: ShieldCheck,
    title: 'Pick The Best Device',
    description: 'Make an informed decision with confidence and find trusted vendors.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Features = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Why Choose Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-[#1a2b3b]/10 text-[#1a2b3b] font-semibold text-sm mb-4">
          Why Choose Us
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a2b3b]">Why Choose Specwise?</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Our platform combines comprehensive data with AI Intelligence to help you make the best device choice.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 mb-32"
      >
        {features.map((f, index) => (
          <motion.div
            key={f.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -5 }}
            className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#1a2b3b]/30 transition-all shadow-sm hover:shadow-xl"
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2b3b]/5 to-white opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            
            <div className="relative">
              {/* Number Badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a2b3b] text-white font-bold text-lg mb-4 shadow-lg">
                {f.id}
              </div>

              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a2b3b]/10 flex items-center justify-center">
                  <f.icon size={24} className="text-[#1a2b3b]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a2b3b]">{f.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{f.text}</p>

              {/* Hover Arrow */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="mt-4 text-[#1a2b3b] font-semibold flex items-center gap-2"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* How it Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-[#1a2b3b]/10 text-[#1a2b3b] font-semibold text-sm mb-4">
          Simple Process
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a2b3b]">How it Works</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get started in three easy steps
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 relative"
      >
        {/* Connection Lines (Desktop) */}
        <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-[#1a2b3b]/20" />

        {howItWorks.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, translateY: -10 }}
            className="relative bg-gradient-to-br from-[#1a2b3b]/5 to-white border-2 border-[#1a2b3b]/20 p-8 rounded-3xl flex flex-col items-center text-center gap-6 shadow-lg hover:shadow-2xl transition-all"
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#1a2b3b] flex items-center justify-center font-bold text-sm text-[#1a2b3b]">
              {index + 1}
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 bg-[#1a2b3b]/10 rounded-2xl flex items-center justify-center shadow-md"
            >
              <step.icon className="text-[#1a2b3b]" size={40} />
            </motion.div>

            {/* Title */}
            <h3 className="text-xl font-bold text-[#1a2b3b]">{step.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

            {/* Decorative Element */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#1a2b3b]/10 rounded-full blur-xl opacity-50"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;