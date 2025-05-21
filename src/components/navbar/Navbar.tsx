
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { products } from '@/data/products';
import SearchDialog from '../search/SearchDialog';
import CartDrawer from '../cart/CartDrawer';
import AuthModal from '../auth/AuthModal';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import NavigationIcons from './NavigationIcons';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const { login } = useUser();

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleAuthUser = (user) => {
    login(user);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
              <NavLinks links={navLinks} />
            </div>
          )}

          {/* Navigation Icons */}
          <NavigationIcons 
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            isMobile={isMobile}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {isMobile && (
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          navLinks={navLinks}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
      )}
      
      {/* Search Dialog */}
      <SearchDialog 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        products={products}
      />
      
      {/* Cart Drawer */}
      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthUser}
      />
    </>
  );
};

export default Navbar;
