import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/pagescomponents/HeroSection';
import React from 'react';

const HomePage = () => {
  return (
    <div className='w-full'>
        {/* Navbar */}
        <Navbar />
        <main className='pt-10 pb-10'>
            {/* hero section */}
            <HeroSection />
        </main>
    </div>
  );
}

export default HomePage; 

