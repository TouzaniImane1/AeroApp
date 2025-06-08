// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  photoUrl?: string | null;
  role: 'admin' | 'user'; // Rôle ajouté
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updatePhotoUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  updatePhotoUrl: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const restoreUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    };
    restoreUser();
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('user');
  };

  const updatePhotoUrl = async (url: string) => {
    if (user) {
      const updatedUser = { ...user, photoUrl: url };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, updatePhotoUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
