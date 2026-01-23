"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Devices', href: '/Browse' },
    { name: 'Compare', href: '/Compare' },
    { name: 'AI-Recommend', href: '/Recommend' },
    { name: 'Tips', href: '/Tips' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md' : 'border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 h-20">
          {/* Logo - Using Original Logo Component */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo />
            {/*  */}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="relative px-5 py-2 text-sm font-semibold text-gray-700 hover:text-[#4278a0] transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4278a0] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
    
          <div className="flex items-center gap-4">
            {/* Profile Section (Desktop + Tablet) */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="group relative">
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1a2b3b] to-[#4278a0] rounded-full flex items-center justify-center text-white shadow-md">
                      <User size={18} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-gray-500 font-medium">Welcome back</span>
                      <span className="text-sm font-bold text-gray-900">UserX</span>
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-[#4278a0]/5 to-transparent">
                    <p className="text-sm font-bold text-gray-900">UserX</p>
                    <p className="text-xs text-gray-500 mt-0.5">user@example.com</p>
                  </div>
                  <div className="p-2">
                    <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <User size={16} />
                      My Profile
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <span className="text-base">⚙️</span>
                      Settings
                    </Link>
                  </div>
                    <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <User size={16} />
                     Vendor Dashboard
                    </Link>
                    <Link href="/saved" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <User size={16} />
                      Become a vendor
                    </Link>
                  <div className="p-2 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm top-20"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="lg:hidden absolute left-0 right-0 bg-white border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="space-y-1 mb-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="block px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#4278a0] hover:bg-gray-50 rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Profile View */}
              <div className="pt-6 border-t border-gray-100 sm:hidden">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#4278a0]/5 to-transparent rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1a2b3b] to-[#4278a0] rounded-full flex items-center justify-center text-white shadow-md">
                    <User size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">User x</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;