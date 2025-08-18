import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 8s infinite'
        }}></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left column - Hero content */}
            <div className="space-y-8">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
                Advanced AI
                <span className="block">Infrastructure for</span>
                <span className="text-secondary-200">Your Business</span>
              </h1>
              <p className="text-xl text-white/80 max-w-xl">
                Join thousands of companies leveraging our AI solutions to transform their operations, enhance customer experiences, and drive innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 group">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right column - Feature cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: 'RAG Agent',
                    description: 'Intelligent document analysis',
                    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400',
                    delay: '0',
                    tab: 'rag'
                  },
                  {
                    title: 'Text-to-Video',
                    description: 'Dynamic content generation',
                    image: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&q=80&w=400',
                    delay: '100',
                    tab: 'text-to-video'
                  },
                  {
                    title: 'AI Voice',
                    description: 'Natural voice synthesis',
                    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400',
                    delay: '200',
                    tab: 'voice'
                  },
                  {
                    title: 'Sentiment Analysis',
                    description: 'Deep customer insights',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
                    delay: '300',
                    tab: 'sentiment'
                  }
                ].map((feature, index) => (
                  <Link
                    key={index}
                    to={`/services?tab=${feature.tab}`}
                    className="group relative bg-gray-800/30 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
                    style={{
                      animation: `fadeInUp 0.5s ease-out forwards ${feature.delay}ms`
                    }}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                          <p className="text-sm text-white/80">{feature.description}</p>
                          <span className="inline-flex items-center text-blue-400 mt-2 text-sm font-medium">
                            Explore more
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-gray-800/50 backdrop-blur-lg py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Comprehensive AI Solutions</h2>
              <p className="text-lg text-white/80">Transform your business with our suite of AI-powered tools</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Document Intelligence',
                  description: 'Advanced RAG system for intelligent document processing and analysis',
                  image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=400',
                  tab: 'rag'
                },
                {
                  title: 'Video Generation',
                  description: 'Transform text into engaging video content automatically',
                  image: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&q=80&w=400',
                  tab: 'text-to-video'
                },
                {
                  title: 'Voice Synthesis',
                  description: 'Natural voice generation in multiple languages and styles',
                  image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400',
                  tab: 'voice'
                }
              ].map((feature, index) => (
                <Link
                  key={index}
                  to={`/services?tab=${feature.tab}`}
                  className="group relative bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 border border-gray-700"
                >
                  <div className="aspect-video relative">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-white/80">{feature.description}</p>
                        <span className="inline-flex items-center text-blue-400 mt-4 text-sm font-medium">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}