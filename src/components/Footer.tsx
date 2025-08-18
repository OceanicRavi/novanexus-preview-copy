import { Mail, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800/50 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">
              © {new Date().getFullYear()} NovaNexus. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="mailto:18ravibhatt@gmail.com"
              className="text-gray-400 hover:text-white"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ravi-bhatt-219a10ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}