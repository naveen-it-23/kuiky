import React, { Component } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { AllServicesPage } from './components/AllServicesPage';
import { ProfilePage } from './components/ProfilePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { Footer } from './components/Footer';
import { AutoModal } from './components/modals/AutoModal';
import { AmbulanceModal } from './components/modals/AmbulanceModal';
import { PunctureModal } from './components/modals/PunctureModal';
import { AuthModal } from './components/modals/AuthModal';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
          <h2 style={{ color: '#ef4444' }}>Something went wrong</h2>
          <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', overflow: 'auto', maxWidth: '600px', margin: '1rem auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.6rem 1.2rem', backgroundColor: '#10a349', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const { currentPage } = useLanguage();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {currentPage === 'services' ? (
          <AllServicesPage />
        ) : currentPage === 'profile' ? (
          <ProfilePage />
        ) : currentPage === 'about' ? (
          <AboutPage />
        ) : currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'how-it-works' ? (
          <HowItWorksPage />
        ) : (
          <>
            <Hero />
            <ServicesSection />
            <AboutSection />
            <HowItWorks />
            <Testimonials />
          </>
        )}
      </main>
      <Footer />

      {/* Interactive Modals */}
      <AutoModal />
      <AmbulanceModal />
      <PunctureModal />
      <AuthModal />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
