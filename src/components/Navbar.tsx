import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2">
            <div className="relative">
              <img src="/novanexus_logo.png" className="h-8 w-8 animate-pulse" alt="Nova Nexus Logo" />
              <div className="absolute inset-0 h-8 w-8 mix-blend-multiply animate-pulse delay-150">
                <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
              </div>
            </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                NovaNexus
              </span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-white hover:text-gray-300 font-medium">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-white hover:text-gray-300 font-medium">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-gray-300 font-medium">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-gray-300 font-medium">Contact</button>
          </div>
        </div>
      </div>
    </nav>
  );
}