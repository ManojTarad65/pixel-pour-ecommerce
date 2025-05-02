
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, X, ShoppingCart, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-navy-800">
            PixelPour
          </Link>

          {/* Desktop navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-navy-800 hover:text-bottle-500 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-navy-800 hover:text-bottle-500">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-navy-800 hover:text-bottle-500">
              <User size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-navy-800 hover:text-bottle-500">
              <ShoppingCart size={20} />
            </Button>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-navy-800"
              >
                {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </Button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          className="fixed top-16 left-0 w-full h-screen bg-white z-40 md:hidden"
        >
          <div className="flex flex-col p-8 space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-medium text-navy-800 hover:text-bottle-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
