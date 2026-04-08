import { useState, useEffect } from 'react';
import { Menu, X, Phone, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Layanan', href: '/#layanan' },
    { name: 'Harga', href: '/harga' },
    { name: 'Tracker', href: '/layanan/tracker' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md md:bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <span className={`text-2xl font-bold text-primary`}>
              LEGAL<span className="text-secondary">YU</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${scrolled ? 'text-slate-700 hover:text-primary' : 'text-slate-700 md:text-slate-900 hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center text-sm font-bold text-slate-700 hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-bold text-primary hover:text-blue-900 transition-colors"
                >
                  Masuk
                </Link>
              )}
              <a
                href="https://wa.me/62895406181407"
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-primary hover:bg-blue-900 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 mr-2" />
                Konsultasi
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 px-3 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="w-full flex justify-center items-center px-4 py-3 border-2 border-primary text-base font-bold rounded-full text-primary hover:bg-primary/5 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex justify-center items-center px-4 py-3 border-2 border-red-100 text-base font-bold rounded-full text-red-600 hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Keluar
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="w-full flex justify-center items-center px-4 py-3 border-2 border-primary text-base font-bold rounded-full text-primary hover:bg-primary/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Masuk ke Akun
                  </Link>
                )}
                <a
                  href="https://wa.me/62895406181407"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-bold rounded-full shadow-lg text-white bg-primary"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Konsultasi Gratis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
