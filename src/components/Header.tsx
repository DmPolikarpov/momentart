import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Settings, Shield } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';
// import type { User as SupabaseUser } from '@supabase/supabase-js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [user, setUser] = useState<SupabaseUser | null>(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
//   const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

//   useEffect(() => {
//     // Get initial session
//     const getSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setUser(session?.user ?? null);
//       if (session?.user) {
//         checkAdminRole(session.user.id);
//       }
//       setLoading(false);
//     };

//     getSession();

//     // Listen for auth changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         setUser(session?.user ?? null);
//         if (session?.user) {
//           checkAdminRole(session.user.id);
//         } else {
//           setIsAdmin(false);
//         }
//         setLoading(false);
//       }
//     );

//     return () => subscription.unsubscribe();
//   }, []);

//   const checkAdminRole = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('user_roles')
//         .select('role')
//         .eq('user_id', userId)
//         .eq('role', 'admin');

//       if (error) throw error;
//       setIsAdmin(data && data.length > 0);
//     } catch (error) {
//       console.error('Error checking admin role:', error);
//       setIsAdmin(false);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
      
//       toast({
//         title: "Signed out",
//         description: "You have been successfully signed out.",
//       });
//       navigate('/');
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     }
//   };

  const categories = [
    { name: 'Manicure & Nail Art', path: '/manicure' },
    { name: 'Eyelash Extensions', path: '/eyelashes' },
    { name: 'Cosmetology Trends', path: '/cosmetology' },
    { name: 'Skincare & Wellness', path: '/skincare-wellness' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/src/assets/logo.png" 
              alt="Moment Art Logo" 
              className="w-10 h-10 transition-transform group-hover:scale-110" 
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Moment Art
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-green-500 transition-all duration-300 relative group font-medium"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </a>

            {/* Categories Dropdown */}
            {/* <div className="relative">
              <button
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-green-500 transition-all duration-300 relative group font-medium"
              >
                <span>Categories</span>
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
                      onClick={() => navigate(category.path)}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            {categories.map((item) => (
              <div
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-green-500 transition-all duration-300 relative group font-medium cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}
            
            {/* Auth Section */}
            {/* {!loading && (
              <div className="flex items-center space-x-4 ml-4">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors"
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
                          Profile
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
                            Admin
                          </button>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            )} */}
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
              Home
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
            
            {/* {['Tutorials', 'Artists', 'Collections', 'Inspiration'].map((item) => (
              <a
                key={item}
                href="#"
                className="block text-gray-700 hover:text-green-500 transition-colors font-medium"
              >
                {item}
              </a>
            ))} */}
            
            {/* Mobile Auth Section */}
            {/* {!loading && (
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
                      Profile
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center w-full text-gray-600 hover:text-green-500"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Admin
                      </button>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start text-gray-600 hover:text-green-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-full font-medium transition-all duration-300"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            )} */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;