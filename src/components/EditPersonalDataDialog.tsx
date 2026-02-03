
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {Edit, Eye, EyeOff, Lock, Mail, MapPin, Phone, Stethoscope, UserPlus} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import investmentApi from "@/lib/investmentApi.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

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

const EditPersonalDataDialog = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    crm: user?.crm || '',
    uf: user?.uf || '',
    specialty: user?.specialty || '',
    phone: user?.phone || '',
    password: '',
    password_confirmation: '',
  });

  const fieldError = (field: string) => {
    if (!errors[field]) return null;
    return (
        <p className="text-sm text-red-500 mt-1">
          {errors[field][0]}
        </p>
    );
  };

  const handleSave = async () => {
    // Simular atualização dos dados
    if (updateUser) {

      try {
        const response = await investmentApi.updateProfile(formData);
        // atualiza o user global (context)
        updateUser(formData);

        toast({
          title: "Dados atualizados",
          description: "Suas informações foram atualizadas com sucesso.",
        });

        setIsOpen(false);
      } catch (error) {
        if (error.status === 422) {
          setErrors(error.errors || {});
        } else {
          toast({
            title: 'Erro ao atualizar',
            description: 'Verifique os campos destacados.',
            variant: 'destructive',
          });
        }
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Editar Dados
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Dados Pessoais</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-club8-dark mb-2">
              <UserPlus className="inline-block w-4 h-4 mr-2" />
              Nome Completo *
            </label>
            <Input
              id="nome"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {fieldError('name')}
          </div>
          <div>
            <label className="block text-sm font-semibold text-club8-dark mb-2">
              <Mail className="inline-block w-4 h-4 mr-2" />
              E-mail *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {fieldError('email')}
          </div>
          <div>
            <Label htmlFor="crm">CRM</Label>
            <Input
                id="crm"
                value={formData.crm}
                onChange={(e) => setFormData({...formData, crm: e.target.value})}
            />
            {fieldError('crm')}
          </div>
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
            {fieldError('uf')}
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
            {fieldError('specialty')}
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
            {fieldError('phone')}
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
            {fieldError('password')}
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
            {fieldError('password_confirmation')}
          </div>


          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonalDataDialog;
