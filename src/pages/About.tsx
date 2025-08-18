import { Handshake , Target, Lightbulb } from 'lucide-react';

export function About() {
  return (
    <div className="py-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">About <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                NovaNexus
              </span></h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hi there! We're Ravi and Tirth—a couple of IT guys who started NovaNexus with one simple goal: to help fellow Kiwis easily understand and use AI technology. We're not here to make big profits—instead, our passion is about supporting local small businesses and individuals to succeed using AI. We truly believe that adopting AI can make our lives easier, improve productivity, and help grow our communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Our Mission</h3>
            <p className="text-gray-400">
              To make AI simple, approachable, and useful for everyone in New Zealand, empowering local businesses and individuals to harness technology and thrive.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Lightbulb className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Our Vision</h3>
            <p className="text-gray-400">
            A New Zealand where every Kiwi feels confident and excited about using AI to improve their daily life and business, contributing positively to our local economy.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Handshake  className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Our Commitment</h3>
            <p className="text-gray-400">
            At NovaNexus, it's just us—working day and night to create practical AI workflows and easy-to-follow resources. We're here to personally support you on your AI journey, answer your questions, and help you get the most out of the technology.
            </p>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-lg shadow-sm border border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Why Connect with NovaNexus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Friendly Support',
                description: `We're easy to approach, genuinely happy to help, and always ready for a chat.`
              },
              {
                title: 'Practical Solutions',
                description: 'Simple, effective, and tailored specifically for Kiwi businesses and individuals.'
              },
              {
                title: 'Community First',
                description: 'Our priority is building a supportive network and helping fellow Kiwis succeed.'
              }
            ].map((expertise, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-lg font-semibold mb-3 text-white">{expertise.title}</h3>
                <p className="text-gray-400">{expertise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}