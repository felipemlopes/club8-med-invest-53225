
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, Phone, Mail, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const MembershipSection = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
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
    password_confirmation: ''
  });

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const especialidades = [
    'Cardiologia', 'Dermatologia', 'Ginecologia', 'Neurologia',
    'Ortopedia', 'Pediatria', 'Psiquiatria', 'Radiologia',
    'Anestesiologia', 'Cirurgia Geral', 'Clínica Médica', 'Outra'
  ];

  const referralCode = localStorage.getItem("referral_code");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha pelo menos nome e email.",
        variant: "destructive",
      });
      return;
    }

    //const success = await register(formData);

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
      setShowSuccess(true);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode fazer login na plataforma.",
      });
    } else {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  if (showSuccess) {
    return (
      <section id="seja-socio" className="py-20 bg-club8-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-club8-dark mb-4">
                Cadastro Realizado com Sucesso!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Bem-vindo ao Club8! Agora você pode fazer login e acessar sua área de investidor.
              </p>
              <Button 
                onClick={() => window.location.href = '/login'}
                className="w-full h-14 text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
              >
                Fazer Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="seja-socio" className="py-20 bg-club8-dark anchor-offset">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <UserCheck className="inline-block w-12 h-12 mr-4 text-club8-turquoise" />
            Seja Membro do <span className="club8-text-gradient">Club8</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Cadastre-se agora e faça parte do clube mais exclusivo de investimentos para médicos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Formulário */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-club8-dark mb-6">
                  Dados Pessoais e Profissionais
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-club8-dark mb-2">
                      Nome Completo *
                    </label>
                    <Input 
                      placeholder="Digite seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-club8-dark mb-2">
                        CRM
                      </label>
                      <Input 
                        placeholder="Número do CRM"
                        value={formData.crm}
                        onChange={(e) => setFormData({...formData, crm: e.target.value})}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-club8-dark mb-2">
                        Estado
                      </label>
                      <Select value={formData.uf} onValueChange={(value) => setFormData({...formData, uf: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-club8-dark mb-2">
                      Especialidade
                    </label>
                    <Select value={formData.specialty} onValueChange={(value) => setFormData({...formData, specialty: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {especialidades.map((esp) => (
                          <SelectItem key={esp} value={esp}>{esp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-club8-dark mb-2">
                      Cidade de Atuação
                    </label>
                    <Input 
                      placeholder="Digite sua cidade"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="h-12"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-club8-dark mb-2">
                        E-mail *
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
                        Telefone
                      </label>
                      <Input 
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-club8-dark mb-2">
                      Plano de Interesse
                    </label>
                    <Select value={formData.plan_id} onValueChange={(value) => setFormData({...formData, plan_id: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Club8 Starter - R$ 50.000 (1,8% a.m.)</SelectItem>
                        <SelectItem value="premium">Club8 Premium - R$ 100.000+ (2,0% a.m.)</SelectItem>
                        <SelectItem value="lista">Lista de Espera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit"
                    variant="outline"
                    className="w-full mt-8 h-14 text-lg font-bold border-club8-turquoise bg-club8-turquoise hover:bg-club8-white text-club8-dark"
                  >
                    Finalizar Cadastro
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  * Campos obrigatórios. Seus dados estão protegidos conforme a LGPD.
                </p>
              </div>

              {/* Informações Adicionais */}
              <div className="bg-gradient-to-br from-club8-turquoise to-club8-turquoise-secondary p-8 text-club8-dark">
                <h3 className="text-2xl font-bold mb-6">Por que escolher o Club8?</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Validação Profissional</h4>
                      <p className="text-sm opacity-90">
                        Validamos seu CRM para garantir que apenas médicos tenham acesso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Atendimento Exclusivo</h4>
                      <p className="text-sm opacity-90">
                        Suporte especializado para membros do Club8
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Presente em Todo Brasil</h4>
                      <p className="text-sm opacity-90">
                        Médicos de todos os estados podem participar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CreditCard className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Processo Seguro</h4>
                      <p className="text-sm opacity-90">
                        Documentação e transferências 100% seguras
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white bg-opacity-20 rounded-2xl">
                  <h4 className="font-bold mb-3">Próximos Passos:</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. Preencha o formulário</li>
                    <li>2. Validação do CRM (24-48h)</li>
                    <li>3. Contato da nossa equipe</li>
                    <li>4. Assinatura do contrato</li>
                    <li>5. Transferência do investimento</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
