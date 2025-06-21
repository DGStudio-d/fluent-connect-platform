
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LanguageGrid from '@/components/LanguageGrid';
import FeaturedSessions from '@/components/FeaturedSessions';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import PaymentSection from '@/components/PaymentSection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-background text-foreground transition-colors duration-300">
        <Header 
          language={language} 
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <HeroSection language={language} />
        <LanguageGrid language={language} />
        <FeaturedSessions language={language} />
        <PaymentSection language={language} />
        <TestimonialsCarousel language={language} />
        <Footer language={language} />
        <WhatsAppFloat language={language} />
      </div>
    </div>
  );
};

export default Index;
