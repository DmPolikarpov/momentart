import React, { useState } from 'react';
import { Star, Award, MessageCircle, Instagram, Play, Sparkles } from 'lucide-react';

const ExpertRecommends = () => {
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  const experts = [
    {
      id: 1,
      name: "Emma Rodriguez",
      title: "Celebrity Nail Artist",
      specialization: "Manicure & Nail Art",
      experience: "12+ years",
      rating: 4.9,
      reviews: 2341,
      image: "https://images.unsplash.com/photo-1494790108755-2616c7e6b56f?w=400&h=400&fit=crop&crop=face",
      interview: "The secret to perfect nails isn't just in the technique—it's in understanding each client's lifestyle and personality. Every nail tells a story.",
      tips: [
        "Always prep the nail bed properly",
        "Use thin coats for lasting results",
        "Seal the edges for chip resistance"
      ],
      instagram: "@emmabeautynails"
    },
    {
      id: 2,
      name: "Sophia Chen",
      title: "Master Lash Technician",
      specialization: "Eyelash Extensions",
      experience: "8+ years",
      rating: 5.0,
      reviews: 1876,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      interview: "Creating beautiful lashes is an art form. It's about enhancing natural beauty while ensuring comfort and longevity.",
      tips: [
        "Map lashes for perfect symmetry",
        "Choose length based on eye shape",
        "Proper isolation prevents damage"
      ],
      instagram: "@sophialashes"
    },
    {
      id: 3,
      name: "Dr. Maria Santos",
      title: "Dermatologist & Beauty Expert",
      specialization: "Advanced Skincare",
      experience: "15+ years",
      rating: 4.8,
      reviews: 3250,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      interview: "Skincare is not just about products—it's about understanding your skin's unique needs and creating a personalized routine.",
      tips: [
        "Consistency is key to results",
        "Less is often more with actives",
        "Always patch test new products"
      ],
      instagram: "@drmariaskincare"
    },
    {
      id: 4,
      name: "Isabella Marie",
      title: "Color Theory Specialist",
      specialization: "Nail Color Matching",
      experience: "10+ years",
      rating: 4.9,
      reviews: 1954,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      interview: "Color has the power to transform not just how you look, but how you feel. Finding your perfect shade is like finding your signature.",
      tips: [
        "Consider undertones when choosing colors",
        "Seasonal changes affect what looks best",
        "Don't be afraid to mix and match"
      ],
      instagram: "@isabellacolors"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-indigo-200/20 to-purple-200/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full animate-float-reverse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-600">Expert Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Experts Recommend
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get exclusive tips and insights from the industry's leading beauty professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div
              key={expert.id}
              className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer animate-fade-in ${
                hoveredExpert === expert.id ? 'animate-pulse-glow' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredExpert(expert.id)}
              onMouseLeave={() => setHoveredExpert(null)}
              onClick={() => setSelectedExpert(expert.id)}
            >
              {/* Pulsating Glow Effect */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                hoveredExpert === expert.id 
                  ? 'bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 animate-pulse' 
                  : 'bg-transparent'
              }`}></div>

              <div className="relative z-10 p-6">
                <div className="relative mb-6">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className={`w-24 h-24 rounded-full mx-auto object-cover transition-all duration-500 ${
                      hoveredExpert === expert.id ? 'scale-110 ring-4 ring-purple-300/50' : ''
                    }`}
                  />
                  {hoveredExpert === expert.id && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/30 to-purple-400/30 animate-ping"></div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {expert.experience}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                    {expert.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-2 text-sm">
                    {expert.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {expert.specialization}
                  </p>

                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(expert.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({expert.reviews})</span>
                  </div>

                  <div className="flex items-center justify-center space-x-1 text-purple-600 mb-4">
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm font-medium">{expert.instagram}</span>
                  </div>

                  <button className={`flex items-center space-x-2 mx-auto px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    hoveredExpert === expert.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}>
                    <MessageCircle className="w-4 h-4" />
                    <span>View Interview</span>
                  </button>
                </div>
              </div>

              {/* Sparkle Effects */}
              {hoveredExpert === expert.id && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <Sparkles
                      key={i}
                      className="absolute text-purple-400/60 animate-ping"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 10}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: '1.5s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expert Interview Modal */}
      {selectedExpert && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedExpert(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {experts.filter(e => e.id === selectedExpert).map(expert => (
              <div key={expert.id} className="p-8">
                <div className="flex items-center space-x-6 mb-8">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{expert.name}</h3>
                    <p className="text-purple-600 font-semibold">{expert.title}</p>
                    <p className="text-gray-600">{expert.specialization}</p>
                  </div>
                  <button
                    onClick={() => setSelectedExpert(null)}
                    className="ml-auto w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Play className="w-5 h-5 text-purple-600" />
                    <h4 className="text-lg font-semibold text-gray-800">Expert Interview</h4>
                  </div>
                  <blockquote className="text-gray-700 text-lg italic leading-relaxed border-l-4 border-purple-300 pl-6 bg-purple-50 p-4 rounded-r-lg">
                    "{expert.interview}"
                  </blockquote>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Pro Tips</h4>
                  <ul className="space-y-3">
                    {expert.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpertRecommends;