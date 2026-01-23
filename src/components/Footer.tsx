import React from 'react';
import Link from 'next/link';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Address Section - Using Original Logo Component */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Logo />
            </Link>
            
            <p className="text-xs text-gray-500 leading-relaxed max-w-[240px] mt-2">
              5, Oyeunmi close, Off Fatade road, Baruwa Lagos Nigeria.
            </p>
            
            <div className="flex gap-3 mt-2">
              <Link 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-[#4278a0] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Twitter size={16} fill="currentColor" />
              </Link>
              <Link 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-[#4278a0] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Facebook size={16} fill="currentColor" />
              </Link>
              <Link 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-400 hover:bg-[#4278a0] hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Instagram size={16} />
              </Link>
            </div>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">About</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Why Specwise
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm">Support</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#4278a0] transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-[#4278a0] group-hover:w-4 transition-all duration-300"></span>
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} Specwise. Helping you find the perfect device.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="#" className="hover:text-[#4278a0] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#4278a0] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#4278a0] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;