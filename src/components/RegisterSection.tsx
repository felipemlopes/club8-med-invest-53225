import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Mail, Phone, MapPin, Stethoscope, FileText, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';

const ESTADOS_BRASIL = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const ESPECIALIDADES = [
  'Cardiologia',
  'Dermatologia',
  'Endocrinologia',
  'Gastroenterologia',
  'Ginecologia e Obstetrícia',
  'Neurologia',
  'Oftalmologia',
  'Ortopedia e Traumatologia',
  'Otorrinolaringologia',
  'Pediatria',
  'Psiquiatria',
  'Radiologia',
  'Urologia',
  'Cirurgia Geral',
  'Clínica Médica',
  'Anestesiologia',
  'Medicina do Trabalho',
  'Medicina de Família',
  'Oncologia',
  'Outra',
];

const PLANOS = [
  { value: '1', label: 'Club8 Gold' },
  { value: '2', label: 'Club8 Platinum' },
];

const RegisterSection = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    crm: '',
    uf: '',
    specialty: '',
    city: '',
    email: '',
    phone: '',
    plan_id: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu e-mail.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.name) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu nome completo.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const referralCode = localStorage.getItem("referral_code");

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      crm: formData.crm || undefined,
      uf: formData.uf || undefined,
      city: formData.city || undefined,
      specialty: formData.specialty || undefined,
      phone: formData.phone || undefined,
      plan_id: formData.plan_id ? parseInt(formData.plan_id) : undefined,
      referral_code: referralCode,
    });

    if (result.success) {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo ao Club8! Redirecionando...",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Erro no cadastro",
        description: result.error || "Não foi possível realizar o cadastro. Tente novamente.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-club8-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <a href="/">
            <img
                src="/lovable-uploads/ce9a3483-706c-4620-a853-024a9c09c5b8.png"
                alt="Club8 Logo"
                className="mx-auto h-20 w-auto"
            />
          </a>

          <h2 className="mt-6 text-3xl font-bold text-white">
            <UserPlus className="inline-block w-8 h-8 mr-3 text-club8-turquoise" />
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Preencha seus dados para se tornar um investidor Club8
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <UserPlus className="inline-block w-4 h-4 mr-2" />
                Nome Completo *
              </label>
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12"
                required
                data-testid="input-name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <FileText className="inline-block w-4 h-4 mr-2" />
                CRM
              </label>
              <Input
                type="text"
                placeholder="Seu número do CRM"
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                className="h-12"
                data-testid="input-crm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-club8-dark mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Estado
                </label>
                <Select
                  value={formData.uf}
                  onValueChange={(value) => setFormData({ ...formData, uf: value })}
                >
                  <SelectTrigger className="h-12" data-testid="select-uf">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_BRASIL.map((estado) => (
                      <SelectItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-club8-dark mb-2">
                  <MapPin className="inline-block w-4 h-4 mr-2" />
                  Cidade de Atuação
                </label>
                <Input
                  type="text"
                  placeholder="Sua cidade"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="h-12"
                  data-testid="input-city"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Stethoscope className="inline-block w-4 h-4 mr-2" />
                Especialidade
              </label>
              <Select
                value={formData.specialty}
                onValueChange={(value) => setFormData({ ...formData, specialty: value })}
              >
                <SelectTrigger className="h-12" data-testid="select-specialty">
                  <SelectValue placeholder="Selecione sua especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {ESPECIALIDADES.map((esp) => (
                    <SelectItem key={esp} value={esp}>
                      {esp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Mail className="inline-block w-4 h-4 mr-2" />
                E-mail *
              </label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12"
                required
                data-testid="input-email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Phone className="inline-block w-4 h-4 mr-2" />
                Telefone
              </label>
              <Input
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12"
                data-testid="input-phone"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                Plano de Interesse
              </label>
              <Select
                value={formData.plan_id}
                onValueChange={(value) => setFormData({ ...formData, plan_id: value })}
              >
                <SelectTrigger className="h-12" data-testid="select-plan">
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  {PLANOS.map((plano) => (
                    <SelectItem key={plano.value} value={plano.value}>
                      {plano.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Senha *
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pr-10"
                  required
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-club8-dark mb-2">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Confirmar Senha *
              </label>
              <div className="relative">
                <Input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  className="h-12 pr-10"
                  required
                  data-testid="input-password-confirmation"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  data-testid="button-toggle-password-confirm"
                >
                  {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
              data-testid="button-submit-register"
            >
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-semibold text-club8-turquoise hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSection;
