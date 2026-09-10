import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, User, LogOut, ChevronDown, Settings, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import LanguageSwitcher from './LanguageSwitcher';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminRole(session.user.id);
        } else {
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;
      setIsAdmin(data && data.length > 0);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const setTextColor = () => {
    return isScrolled ? 'text-gray-700' : 'text-gray-400'
  }

  const categories = [
    { name: t('categories.manicure.title'), path: '/manicure' },
    { name: t('categories.cosmetology.title'), path: '/cosmetology' },
    { name: t('categories.wellness.title'), path: '/wellness' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="./../../src/assets/logo.png" 
              alt="Moment Art Logo" 
              className="w-10 h-10 transition-transform group-hover:scale-110" 
            />
            <span className="text-2xl font-dancing font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Moment Art
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              onClick={() => navigate('/')}
              className={`${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium`}
            >
              {t('nav.home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                className={`flex items-center space-x-1 ${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium`}
                onClick={() => setIsCategoriesOpen(true)}
              >
                <span>{t('nav.categories')}</span>
                <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {isCategoriesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  {categories.map((category) => (
                    <button
                      key={category.path}
                      onClick={() => {
                        navigate(category.path);
                        setIsCategoriesOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-3 text-gray-700 hover:text-green-500 hover:bg-green-50 transition-all duration-200`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#"
              onClick={() => navigate('/about')}
              className={`${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium`}
            >
              {t('nav.about')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
                href="#"
                onClick={() => navigate('/videos')}
                className={`${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium`}
            >
              {t('nav.videos')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* <a
              href="#"
              onClick={() => navigate('/contact')}
              className={`${setTextColor()} hover:text-green-500 transition-all duration-300 relative group font-medium`}
            >
              {t('nav.contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a> */}

            {/* {[t('nav.tutorials'), t('nav.artists'), t('nav.collections')].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-green-500 transition-all duration-300 relative group font-medium"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))} */}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Auth Section */}
            {!loading && (
              <div className="flex items-center space-x-4 ml-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-2 ${setTextColor()} hover:text-green-500 transition-colors`}
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {user.user_metadata?.full_name || user.email}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          {t('nav.profile')}
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => {
                              navigate('/admin');
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-500 hover:bg-green-50 transition-colors"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            {t('nav.admin')}
                          </button>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          {t('nav.signOut')}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    {t('nav.signIn')}
                  </Button>
                )}
              </div>
            )}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-green-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="block w-full text-left text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              {t('nav.home')}
            </button>
            
            {categories.map((category) => (
              <button
                key={category.path}
                onClick={() => navigate(category.path)}
                className="block w-full text-left text-gray-700 hover:text-green-500 transition-colors font-medium"
              >
                {category.name}
              </button>
            ))}

            <button
              onClick={() => navigate('/about')}
              className="block w-full text-left text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              {t('nav.about')}
            </button>

            <button
              onClick={() => navigate('/videos')}
              className="block w-full text-left text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              {t('nav.videos')}
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="block w-full text-left text-gray-700 hover:text-green-500 transition-colors font-medium"
            >
              {t('nav.contact')}
            </button>
            
            {/* {[t('nav.tutorials'), t('nav.artists'), t('nav.collections')].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium"
              >
                {item}
              </a>
            ))} */}
            
            {/* Mobile Language Switcher */}
            <div className="pt-2 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Auth Section */}
            {!loading && (
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {user.user_metadata?.full_name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/profile')}
                      className="flex items-center w-full text-gray-600 hover:text-green-500"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t('nav.profile')}
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center w-full text-gray-600 hover:text-green-500"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        {t('nav.admin')}
                      </button>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-green-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('nav.signOut')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-full font-medium transition-all duration-300"
                  >
                    {t('nav.signIn')}
                  </Button>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;