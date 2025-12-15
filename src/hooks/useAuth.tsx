
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  nome: string;
  email: string;
  crm?: string;
  especialidade?: string;
  plano?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('club8_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao recuperar usuário do localStorage:', error);
      localStorage.removeItem('club8_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Emails com acesso liberado (sem necessidade de senha)
  const allowedEmails = [
    'guilherme@sociedadecoletiva.com.br',
    'drfabioaragao@gmail.com',
    'admin@club8.com.br'
  ];

  // Usuários pré-cadastrados com credenciais funcionais
  const predefinedUsers = [
    {
      id: '1',
      nome: 'Guilherme',
      email: 'guilherme@sociedadecoletiva.com.br',
      password: 'GuiClub8@2025',
      plano: 'platinum'
    },
    {
      id: '2',
      nome: 'Dr. Fabio Aragão',
      email: 'drfabioaragao@gmail.com',
      password: 'AragaoClub82025',
      plano: 'gold'
    },
    {
      id: '3',
      nome: 'Administrador',
      email: 'admin@club8.com.br',
      password: 'admin123',
      plano: 'platinum'
    },
    {
      id: '4',
      nome: 'Teste Usuário',
      email: 'teste@club8.com.br',
      password: 'teste123',
      plano: 'gold'
    }
  ];

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simular registro
      const newUser: User = {
        id: Date.now().toString(),
        nome: userData.nome,
        email: userData.email,
        crm: userData.crm,
        especialidade: userData.especialidade,
        plano: userData.plano,
      };

      // Salvar usuários registrados no localStorage
      const existingUsers = JSON.parse(localStorage.getItem('club8_users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('club8_users', JSON.stringify(existingUsers));

      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Tentativa de login:', { email, password });
      
      // Verificar primeiro nos usuários pré-definidos com senha
      const predefinedUser = predefinedUsers.find(u => u.email === email);
      
      if (predefinedUser) {
        // Se é um email liberado OU a senha está correta
        if (allowedEmails.includes(email) || predefinedUser.password === password) {
          const userToLogin: User = {
            id: predefinedUser.id,
            nome: predefinedUser.nome,
            email: predefinedUser.email,
            plano: predefinedUser.plano
          };
          
          setUser(userToLogin);
          localStorage.setItem('club8_user', JSON.stringify(userToLogin));
          console.log('Login realizado com sucesso para:', email);
          return true;
        }
      }

      // Verificar se usuário existe nos registrados
      const existingUsers = JSON.parse(localStorage.getItem('club8_users') || '[]');
      const foundUser = existingUsers.find((u: User) => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('club8_user', JSON.stringify(foundUser));
        return true;
      }
      
      console.log('Login falhou para:', email);
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('club8_user', JSON.stringify(updatedUser));
      
      // Atualizar também na lista de usuários
      const existingUsers = JSON.parse(localStorage.getItem('club8_users') || '[]');
      const userIndex = existingUsers.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = updatedUser;
        localStorage.setItem('club8_users', JSON.stringify(existingUsers));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('club8_user');
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
