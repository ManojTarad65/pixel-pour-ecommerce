
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { useUser } from './UserContext';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: any) => boolean;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { isAuthenticated, user } = useUser();

  useEffect(() => {
    // Load favorites from localStorage only if authenticated
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error("Error parsing saved favorites:", e);
        }
      }
    } else {
      // Clear favorites if not authenticated
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Save favorites to localStorage only if authenticated
    if (isAuthenticated && user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  const addToFavorites = (product: any): boolean => {
    if (!isAuthenticated) {
      toast.error("Please login to add favorites", {
        description: "You need to be logged in to save favorite items."
      });
      return false;
    }

    const isAlreadyFavorite = favorites.some(item => item.id === product.id);
    
    if (isAlreadyFavorite) {
      toast.info(`"${product.name}" is already in your favorites`);
      return false;
    }

    const favoriteItem: FavoriteItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    };

    setFavorites(prev => [...prev, favoriteItem]);
    toast.success(`Added "${product.name}" to favorites`);
    return true;
  };

  const removeFromFavorites = (productId: number) => {
    const product = favorites.find(item => item.id === productId);
    setFavorites(prev => prev.filter(item => item.id !== productId));
    
    if (product) {
      toast.info(`Removed "${product.name}" from favorites`);
    }
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info("Favorites cleared");
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
