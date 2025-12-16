
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

            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Senha
              </label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder={"Sua senha"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
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
              <a href="/cadastro" className="font-semibold text-club8-turquoise hover:underline">
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
