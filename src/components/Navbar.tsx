import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <img src="/novanexus_logo.png" className="h-8 w-8 animate-pulse" alt="Nova Nexus Logo" />
              <div className="absolute inset-0 h-8 w-8 mix-blend-multiply animate-pulse delay-150">
                <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
              </div>
            </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                NovaNexus
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary-900 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/services" className="text-primary-900 hover:text-primary-600 font-medium">Services</Link>
            <Link to="/about" className="text-primary-900 hover:text-primary-600 font-medium">About</Link>
            <Link to="/contact" className="text-primary-900 hover:text-primary-600 font-medium">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}