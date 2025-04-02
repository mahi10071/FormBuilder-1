import React from 'react';
import { Navbar } from './Navbar';

const Header = () => {
  return (
    <>
      {/* Main Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="text-2xl font-bold text-red-500">SkillGrama</div>
        <div className="flex items-center gap-4">
          <button className="bg-black text-white px-4 py-2 rounded-full">Explore</button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>John Doe</span>
          </div>
        </div>
      </header>

      {/* Subheader */}
     
      <div className="flex justify-between items-center">
        <Navbar />
      </div>
    </>
  );
};

export default Header;