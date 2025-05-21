
import React from 'react';
import { ShoppingCart, Search, User, LogIn, MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useCart } from '@/contexts/CartContext';
import UserMenu from './UserMenu';

interface NavigationIconsProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  isMobile: boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const NavigationIcons: React.FC<NavigationIconsProps> = ({
  onOpenSearch,
  onOpenCart,
  onOpenAuth,
  isMobile,
  isMobileMenuOpen,
  toggleMobileMenu
}) => {
  const { isAuthenticated } = useUser();
  const { totalItems } = useCart();

  return (
    <div className="flex items-center space-x-4">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-navy-800 hover:text-bottle-500"
        onClick={onOpenSearch}
      >
        <Search size={20} />
      </Button>
      
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-navy-800 hover:text-bottle-500"
          onClick={onOpenAuth}
        >
          <LogIn size={20} />
        </Button>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-navy-800 hover:text-bottle-500 relative"
        onClick={onOpenCart}
      >
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-bottle-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Button>
      
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileMenu}
          className="md:hidden text-navy-800"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </Button>
      )}
    </div>
  );
};

export default NavigationIcons;
