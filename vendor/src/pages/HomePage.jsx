import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/pagescomponents/HeroSection';
import React from 'react';
import StatsSection from '@/components/pagescomponents/StatsSection';
import FeaturesSection from '@/components/pagescomponents/FeaturesSection';
import StepsSection from '@/components/pagescomponents/StepsSection';
import CTASection from '@/components/pagescomponents/CtaSection';
import Footer from '@/components/common/Footer';

const HomePage = () => {
  return (
    <div className='w-full'>
        {/* Navbar */}
        <Navbar />
        <main className='pt-10 pb-10 '>
            {/* hero section */}
            <HeroSection />
            {/* stats section */}
            <StatsSection />
            {/* features section */}
            <FeaturesSection />
            {/* steps section */}
            <StepsSection />
            {/* final cta */}
            <CTASection />
        </main>
        {/* footer */}
        <Footer />
    </div>
  );
}

export default HomePage; 

