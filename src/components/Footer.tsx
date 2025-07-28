import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();


  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-emerald-500" },
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-500" }
  ];

  // const footerLinks = {
  //   // 'Art Categories': ['Digital Art', 'Paintings', 'Sculptures', 'Photography', 'Mixed Media'],
  //   // 'Resources': ['Art Tutorials', 'Inspiration', 'Artist Profiles', 'Creative Challenges', 'Art News'],
  //   // 'Company': [
  //   //   {name: 'About Us', link: '/about'}, 
  //   //   {name: 'Contact', link: '/contact'}
  //   // ]
    
  //   // 'Company': ['About Us', 'Contact', 'Careers', 'Privacy Policy', 'Terms of Service']
  // };

  const footerLinks = {
    [t('footer.company')]: [
      {
        name: t('footer.aboutUs'),
        link: '/about'
      }, 
      // {
      //   name: t('footer.contact'),
      //   link: '/contact'
      // }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-32 h-32 bg-emerald-500/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center lg:justify-center space-x-3 mb-6">
              <img 
                src="/src/assets/logo.png"
                alt="Moment Art Logo" 
                className="w-8 h-8" 
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Moment Art
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            {/* <div className="flex lg:justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-3 bg-gray-800 rounded-full transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div> */}
          </div>

          <div className='lg:col-span-1'></div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={() => navigate(link.link)}
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">momentart.help@yandex.ru</p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div> */}
            <div className="flex items-center justify-center space-x-3">
              <div className="p-2 bg-teal-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('footer.location')}</p>
                <p className="text-white">{t('footer.Russia')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          {/* <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              {t('footer.termsOfService')}
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
              {t('footer.cookiePolicy')}
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;