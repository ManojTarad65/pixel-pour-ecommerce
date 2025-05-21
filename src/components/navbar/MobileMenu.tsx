
import React from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLinks from './NavLinks';
import { useUser } from '@/contexts/UserContext';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: { name: string; path: string }[];
  onClose: () => void;
  onOpenAuth: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navLinks, onClose, onOpenAuth }) => {
  const { isAuthenticated } = useUser();

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="fixed top-16 left-0 w-full h-screen bg-white z-40 md:hidden"
    >
      <div className="flex flex-col p-8 space-y-6">
        <NavLinks links={navLinks} mobile={true} onClick={onClose} />
        
        {!isAuthenticated && (
          <Button 
            className="w-full"
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
          >
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
