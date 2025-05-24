
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { useUser } from './UserContext';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    // Load cart from localStorage only if authenticated
    if (isAuthenticated) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing saved cart:", e);
        }
      }
    } else {
      // Clear cart if not authenticated
      setItems([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Update totals whenever items change
    const newTotalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
    
    // Save to localStorage only if authenticated
    if (isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isAuthenticated]);

  const addToCart = (product: any, quantity = 1): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart", {
        description: "You need to be logged in to add items to your cart."
      });
      return false;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        }];
      }
    });
    
    toast.success(`Added "${product.name}" to cart`);
    return true;
  };

  const removeFromCart = (productId: number) => {
    const productName = items.find(item => item.id === productId)?.name;
    
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    if (productName) {
      toast.info(`Removed "${productName}" from cart`);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => prevItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
