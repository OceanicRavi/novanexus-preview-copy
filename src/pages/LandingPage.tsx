import React, { useState } from 'react';
import { ArrowRight, Bot, Video, Mic, BarChart3, MessageSquare, FileText, Zap, Mail, Phone, MapPin, CheckCircle, Radio, Map, Hourglass } from 'lucide-react';
import { Button } from '../components/Button';
import { config } from '../config';

export function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const services = [
    {
      id: 'rag',
      title: 'RAG Agent',
      description: 'Intelligent document analysis and question answering',
      icon: <Bot className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-500',
      examples: [
        {
          title: 'Document Q&A',
          description: 'Upload PDFs, Word docs, or text files and ask questions about their content.',
          example: 'Q: "What are the key findings in this research paper?"\nA: "The research identifies three main findings: 1) AI adoption increased by 40% in 2023, 2) Companies using AI saw 25% productivity gains, 3) The main barrier is lack of technical expertise."'
        },
        {
          title: 'Contract Analysis',
          description: 'Analyze legal documents and extract key information.',
          example: 'Q: "What are the termination clauses in this contract?"\nA: "The contract includes two termination clauses: 1) Either party may terminate with 30 days written notice, 2) Immediate termination is allowed for material breach of contract terms."'
        },
        {
          title: 'Research Assistant',
          description: 'Get insights from multiple documents simultaneously.',
          example: 'Q: "Compare the methodologies across these three studies"\nA: "Study A used quantitative surveys (n=500), Study B employed qualitative interviews (n=25), while Study C combined both approaches with mixed-methods design."'
        }
      ]
    },
    {
      id: 'text-to-video',
      title: 'Text-to-Video',
      description: 'Transform text into engaging video content',
      icon: <Video className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-500',
      examples: [
        {
          title: 'Marketing Videos',
          description: 'Create promotional videos from product descriptions.',
          example: 'Input: "Introducing our new eco-friendly water bottle made from recycled materials"\nOutput: 30-second video with product showcase, environmental benefits, and call-to-action',
          videoUrl: 'https://example-bucket.r2.dev/marketing-video-sample.mp4'
        },
        {
          title: 'Educational Content',
          description: 'Turn educational text into visual learning materials.',
          example: 'Input: "The water cycle consists of evaporation, condensation, and precipitation"\nOutput: Animated video showing water cycle stages with narration and visual effects',
          videoUrl: 'https://example-bucket.r2.dev/educational-video-sample.mp4'
        },
        {
          title: 'Social Media Content',
          description: 'Generate engaging social media videos from posts.',
          example: 'Input: "5 tips for better productivity: 1) Plan your day 2) Take breaks 3) Eliminate distractions"\nOutput: Dynamic video with animated text, icons, and background music',
          videoUrl: 'https://example-bucket.r2.dev/social-media-video-sample.mp4'
        }
      ]
    },
    {
      id: 'voice',
      title: 'AI Voice',
      description: 'Natural voice synthesis and audio generation',
      icon: <Mic className="h-8 w-8" />,
      color: 'from-green-500 to-teal-500',
      examples: [
        {
          title: 'Podcast Generation',
          description: 'Convert articles into natural-sounding podcast episodes.',
          example: 'Input: Blog post about AI trends\nOutput: 10-minute podcast episode with natural voice, proper pacing, and emphasis on key points',
          audioUrl: 'https://example-bucket.r2.dev/podcast-sample.mp3'
        },
        {
          title: 'Multilingual Narration',
          description: 'Generate voiceovers in multiple languages and accents.',
          example: 'Input: "Welcome to our company presentation"\nOutput: Professional narration available in English, Spanish, French, German, and more',
          audioUrl: 'https://example-bucket.r2.dev/multilingual-sample.mp3'
        },
        {
          title: 'Audiobook Creation',
          description: 'Transform written content into engaging audiobooks.',
          example: 'Input: Chapter from business book\nOutput: Professional audiobook narration with chapter breaks and consistent voice quality',
          audioUrl: 'https://example-bucket.r2.dev/audiobook-sample.mp3'
        }
      ]
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis',
      description: 'Analyze emotions and opinions in text data',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-orange-500 to-red-500',
      examples: [
        {
          title: 'Customer Feedback Analysis',
          description: 'Analyze customer reviews and feedback for insights.',
          example: 'Input: "The product is amazing but shipping was slow"\nOutput: Overall: Mixed (60% Positive, 40% Negative)\nProduct: Positive (95%)\nShipping: Negative (80%)'
        },
        {
          title: 'Social Media Monitoring',
          description: 'Track brand sentiment across social platforms.',
          example: 'Input: 1000 tweets about your brand\nOutput: 65% Positive, 25% Neutral, 10% Negative\nKey themes: Great customer service (+), High prices (-)'
        },
        {
          title: 'Survey Analysis',
          description: 'Extract insights from open-ended survey responses.',
          example: 'Input: Employee satisfaction survey responses\nOutput: 78% positive sentiment, main concerns: work-life balance, career growth opportunities'
        }
      ]
    },
    {
      id: 'chatbot',
      title: 'Custom Chatbots',
      description: 'Intelligent conversational AI for your business',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'from-indigo-500 to-purple-500',
      examples: [
        {
          title: 'Customer Support Bot',
          description: 'Handle common customer inquiries 24/7.',
          example: 'Customer: "How do I reset my password?"\nBot: "I can help you reset your password. Please click the \'Forgot Password\' link on the login page and enter your email address. You\'ll receive reset instructions within 5 minutes."'
        },
        {
          title: 'Sales Assistant',
          description: 'Qualify leads and provide product information.',
          example: 'Visitor: "What pricing plans do you offer?"\nBot: "We have three plans: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). Which features are most important to you?"'
        },
        {
          title: 'FAQ Bot',
          description: 'Instantly answer frequently asked questions.',
          example: 'User: "What are your business hours?"\nBot: "We\'re open Monday-Friday 9 AM to 6 PM EST. For urgent matters outside business hours, please email support@company.com"'
        }
      ]
    },
    {
      id: 'content',
      title: 'Content Generation',
      description: 'AI-powered content creation and optimization',
      icon: <FileText className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      examples: [
        {
          title: 'Blog Post Writing',
          description: 'Generate SEO-optimized blog posts on any topic.',
          example: 'Topic: "Benefits of Remote Work"\nOutput: 1500-word article with introduction, 5 main benefits, statistics, examples, and conclusion with proper SEO optimization'
        },
        {
          title: 'Product Descriptions',
          description: 'Create compelling product descriptions that convert.',
          example: 'Product: Wireless Headphones\nOutput: "Experience crystal-clear audio with our premium wireless headphones. Featuring 30-hour battery life, noise cancellation, and comfortable over-ear design perfect for work or travel."'
        },
        {
          title: 'Email Campaigns',
          description: 'Craft engaging email marketing campaigns.',
          example: 'Campaign: Product Launch\nOutput: Subject line, personalized greeting, product benefits, social proof, clear CTA, and follow-up sequence'
        }
      ]
    },
    {
      id: 'automation',
      title: 'Workflow Automation',
      description: 'Streamline business processes with AI',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-cyan-500 to-blue-500',
      examples: [
        {
          title: 'Email Processing',
          description: 'Automatically categorize and respond to emails.',
          example: 'Incoming email: Customer complaint\nAutomation: Categorizes as "Support - High Priority", creates ticket, sends acknowledgment, routes to appropriate team member'
        },
        {
          title: 'Data Entry Automation',
          description: 'Extract and input data from documents automatically.',
          example: 'Input: Invoice PDF\nAutomation: Extracts vendor name, amount, date, line items, and automatically enters into accounting system'
        },
        {
          title: 'Lead Qualification',
          description: 'Automatically score and route leads based on criteria.',
          example: 'New lead: Company size 500+, budget $50k+, timeline immediate\nAutomation: Scores as "Hot Lead", assigns to senior sales rep, schedules follow-up call'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img src="/novanexus_logo.png" className="h-8 w-8 animate-pulse" alt="Nova Nexus Logo" />
                  <div className="absolute inset-0 h-8 w-8 mix-blend-multiply animate-pulse delay-150">
                    <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  NovaNexus
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white hover:text-gray-300 font-medium">Services</a>
              <a href="#about" className="text-white hover:text-gray-300 font-medium">About</a>
              <a href="#contact" className="text-white hover:text-gray-300 font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 8s infinite'
          }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        </div>

        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight mb-8">
                Advanced AI
                <span className="block">Infrastructure for</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Your Business</span>
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
                Transform your operations with our comprehensive AI solutions. From intelligent document analysis to automated workflows, we help businesses leverage cutting-edge AI technology to drive growth and innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:text-gray-100 group">
                  <a href="#services" className="flex items-center">
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="hover:text-gray-100">
                  <a href="#contact">Get Started</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">AI Solutions & Examples</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our AI solutions can transform your business operations with real-world examples and demonstrations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:bg-gray-800/50 transition-all">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} mr-4`}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                      <p className="text-gray-300">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {service.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                        <h4 className="text-lg font-semibold text-white mb-2">{example.title}</h4>
                        <p className="text-gray-300 text-sm mb-3">{example.description}</p>
                        <div className="bg-gray-800/50 rounded p-3 text-sm text-gray-300 font-mono whitespace-pre-line">
                          {example.example}
                        </div>
                        {example.videoUrl && (
                          <div className="mt-4">
                            <video 
                              controls 
                              className="w-full rounded-lg"
                              poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=400"
                            >
                              <source src={example.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        {example.audioUrl && (
                          <div className="mt-4">
                            <audio 
                              controls 
                              className="w-full"
                            >
                              <source src={example.audioUrl} type="audio/mpeg" />
                              Your browser does not support the audio tag.
                            </audio>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-8 mt-12">
            <p className="text-gray-300 text-center">These are purely created by AI.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">NovaNexus</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're Ravi and Tirth—passionate IT professionals dedicated to making AI accessible and practical for New Zealand businesses. Our mission is to help fellow Kiwis harness the power of AI to grow their businesses and improve their operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Mission</h3>
              <p className="text-gray-400">
                To make AI simple, approachable, and useful for everyone in New Zealand, empowering local businesses to thrive with technology.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Vision</h3>
              <p className="text-gray-400">
                A New Zealand where every business feels confident using AI to improve their operations and contribute to our local economy.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Our Values</h3>
              <p className="text-gray-400">
                Transparency, reliability, and genuine care for our clients' success. We believe in building lasting partnerships, not just transactions.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-white text-center">Why Choose NovaNexus?</h3>
              <ul className="space-y-4 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Local New Zealand team with deep understanding of Kiwi business needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Proven track record in delivering practical AI solutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Community-first approach with fair pricing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Ongoing support and training included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-300">
              Ready to transform your business with AI? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-green-400 mb-2">Thank you for your message!</h4>
                  <p className="text-gray-300">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">hello@novanexus.co.nz</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">+64 21 123 4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">Auckland, New Zealand</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/novanexus_logo.png" className="h-8 w-8" alt="Nova Nexus Logo" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                NovaNexus
              </span>
            </div>
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} NovaNexus. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}