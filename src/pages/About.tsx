import { Users, Target, Lightbulb } from 'lucide-react';

export function About() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">About NovaNexus</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're pioneering the future of AI technology, making advanced solutions accessible and practical for businesses worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To democratize AI technology and empower businesses with innovative solutions that drive growth and efficiency.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To be the global leader in AI solutions, setting new standards for innovation and technological advancement.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p className="text-gray-600">
              A diverse group of AI experts, developers, and industry professionals committed to excellence.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6">Our Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Advanced AI Development',
                description: 'Cutting-edge AI solutions tailored to specific business needs.'
              },
              {
                title: 'Natural Language Processing',
                description: 'State-of-the-art NLP models for enhanced communication and analysis.'
              },
              {
                title: 'Computer Vision',
                description: 'Advanced image and video processing capabilities.'
              },
              {
                title: 'Data Analytics',
                description: 'Comprehensive data analysis and insights generation.'
              }
            ].map((expertise, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{expertise.title}</h3>
                <p className="text-gray-600">{expertise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}