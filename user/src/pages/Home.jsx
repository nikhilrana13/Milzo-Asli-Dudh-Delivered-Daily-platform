import FarmToFridge from '@/components/home/FarmToFridge';
import HeroSection from '@/components/home/HeroSection';
import OfferBanner from '@/components/home/OfferBanner';
import PuritySection from '@/components/home/PuritySection';
import React from 'react';

const Home = () => {
  return (
    <div className='w-full'>
      {/* hero section */}
      <HeroSection />
      {/* offer banner */}
      <OfferBanner />
      {/* purity section */}
      <PuritySection />
      {/* process */}
      <FarmToFridge />
    </div>
  );
}

export default Home;
