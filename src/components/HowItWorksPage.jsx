import React, { useEffect } from 'react';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';

export const HowItWorksPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* ─── 1. THE SAME INTERACTIVE HERO SLIDER ─── */}
      <Hero />

      {/* ─── 2. HOW IT WORKS 4 STEPS + QUOTE + APP BANNER ─── */}
      <HowItWorks />

      {/* ─── 3. WHAT PEOPLE SAY / TRUSTED BY THOUSANDS TESTIMONIALS ─── */}
      <Testimonials />
    </div>
  );
};

export default HowItWorksPage;
