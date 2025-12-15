
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginSection = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Emails com acesso liberado
  const allowedEmails = [
    'guilherme@sociedadecoletiva.com.br',
    'drfabioaragao@gmail.com',
    'admin@club8.com.br'
  ];

  const isAllowedEmail = allowedEmails.includes(formData.email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu email.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.password) {
      toast({
        title: "Erro",
        description: "Por favor, informe sua senha.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro no login",
        description: result.error || "Email não encontrado ou senha incorreta. Verifique seus dados.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // Função para usar credenciais de teste
  const useTestCredentials = () => {
    setFormData({
      email: 'admin@club8.com.br',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen bg-club8-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/lovable-uploads/ce9a3483-706c-4620-a853-024a9c09c5b8.png" alt="Club8 Logo" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-3xl font-bold text-white">
            <LogIn className="inline-block w-8 h-8 mr-3 text-club8-turquoise" />
            Acesse sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Entre na sua área de investidor
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Credenciais de teste */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Credenciais de Teste:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> admin@club8.com.br</p>
              <p><strong>Senha:</strong> admin123</p>
              <p><strong>Ou:</strong> teste@club8.com.br / teste123</p>
            </div>
            <Button 
              type="button"
              onClick={useTestCredentials}
              className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              Usar Credenciais de Teste
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Mail className="inline-block w-4 h-4 mr-2" />
                E-mail
              </label>
              <Input 
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-12"
                required
              />
              {isAllowedEmail && (
                <p className="text-xs text-green-600 mt-1 font-medium">
                  ✓ Email autorizado - acesso liberado automaticamente
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Senha
              </label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder={isAllowedEmail ? "Não é necessário inserir senha" : "Sua senha"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="h-12 pr-10"
                  disabled={isAllowedEmail}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {isAllowedEmail ? (
                <p className="text-xs text-green-600 mt-1">
                  Senha não necessária para este email
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Insira sua senha de acesso
                </p>
              )}
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-12 text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
            >
              {loading ? 'Entrando...' : 'Entrar na Plataforma'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Ainda não tem conta?{' '}
              <a href="/#seja-socio" className="font-semibold text-club8-turquoise hover:underline">
                Cadastre-se aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
