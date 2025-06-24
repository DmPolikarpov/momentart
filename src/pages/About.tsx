import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, Target, Heart, Award } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      bio: "Passionate about beauty innovation with 15+ years in the industry."
    },
    {
      name: "Emma Chen",
      role: "Beauty Expert",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      bio: "Licensed cosmetologist specializing in nail art and skincare."
    },
    {
      name: "Maria Rodriguez",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop",
      bio: "Creating inspiring content that empowers beauty enthusiasts worldwide."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "We stay ahead of beauty trends and bring you the latest innovations in the industry."
    },
    {
      icon: Heart,
      title: "Authenticity",
      description: "We believe in honest reviews and genuine recommendations from real beauty experts."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community where everyone can learn and grow together."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from content quality to user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                About Moment Art
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about bringing you the latest in beauty trends, expert tips, and creative inspiration. 
              Our mission is to empower everyone to express their unique beauty through art and innovation.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, Moment Art began as a small blog sharing beauty tips and creative inspiration. 
                What started as a passion project has grown into a comprehensive platform serving thousands of 
                beauty enthusiasts worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that beauty is an art form, and everyone deserves access to quality information, 
                tutorials, and inspiration to express their creativity. From nail art to skincare routines, 
                we cover it all with authenticity and expertise.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop" 
                alt="About us" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-4">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name}
                  className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-green-100"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to explore the world of beauty and creativity? Join thousands of others who trust 
              Moment Art for their daily dose of inspiration.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;