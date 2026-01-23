import React from 'react';
import { Smartphone, Target } from 'lucide-react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* The Icon Part */}
      <div className="relative flex items-center justify-center">
        {/* Outer Phone Frame */}
        <Image src="/logo.png" alt="Phone Frame" width={50} height={50} />
        
        {/* Small detail dots around the phone */}
        <div className="absolute -left-1 top-2 w-1 h-1 bg-blue-400 rounded-full" />
        <div className="absolute -right-1 bottom-3 w-1 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* The Text Part */}
      <div className="flex flex-col leading-none">
        <h1 className="text-2xl font-black tracking-tighter text-gray-900">
          SPECWISE
        </h1>
        <p className="text-[10px] font-medium italic text-gray-500 mt-0.5">
          Buy smart. Choose wise.
        </p>
      </div>
    </div>
  );
};

export default Logo;