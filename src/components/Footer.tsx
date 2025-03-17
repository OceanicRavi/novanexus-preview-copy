import { Mail, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-50 border-t border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-primary-900">
              © {new Date().getFullYear()} NovaNexus. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="mailto:contact@novanexus.ai"
              className="text-primary-600 hover:text-primary-700"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/company/novanexus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}