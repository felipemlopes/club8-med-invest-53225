import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import api from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  crm?: string | null;
  uf?: string | null;
  city?: string | null;
  specialty?: string | null;
  plan_id?: number | null;
  status?: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  crm?: string;
  uf?: string;
  city?: string;
  specialty?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async (): Promise<User | null> => {
    const response = await api.get<User>('/me');
    if (response.data) {
      return response.data;
    }
    if (response.status === 401) {
      api.removeToken();
      localStorage.removeItem('club8_user');
    }
    return null;
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('club8_token');
        const savedUser = localStorage.getItem('club8_user');
        
        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          
          const currentUser = await fetchCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            localStorage.setItem('club8_user', JSON.stringify(currentUser));
          } else {
            setUser(null);
            localStorage.removeItem('club8_user');
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        api.removeToken();
        localStorage.removeItem('club8_user');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.post<LoginResponse>('/register', userData);
      
      if (response.data) {
        api.setToken(response.data.access_token);
        setUser(response.data.user);
        localStorage.setItem('club8_user', JSON.stringify(response.data.user));
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Erro ao registrar' };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await api.post<LoginResponse>('/login', { email, password });
      
      if (response.data) {
        api.setToken(response.data.access_token);
        setUser(response.data.user);
        localStorage.setItem('club8_user', JSON.stringify(response.data.user));
        console.log('Login realizado com sucesso para:', email);
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Credenciais inválidas' };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexão' };
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('club8_user', JSON.stringify(updatedUser));
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erro ao fazer logout na API:', error);
    } finally {
      api.removeToken();
      setUser(null);
      localStorage.removeItem('club8_user');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
