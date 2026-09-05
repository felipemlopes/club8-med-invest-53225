import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCheck, CheckCircle, Shield, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import InputMask from 'react-input-mask';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const MembershipSection = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [validatingCrm, setValidatingCrm] = useState(false);
  const [crmError, setCrmError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    crm: '',
    estado: '',
    especialidade: '',
    cidade: '',
    email: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidadeEndereco: '',
    estadoEndereco: '',
    telefone: '',
    plano: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
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

  const fieldError = (field: string) => {
    if (!errors[field]) return null;
    return (
        <p className="text-sm text-red-500 mt-1 font-medium">
          {errors[field][0]}
        </p>
    );
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrmError(null);

    if (!formData.nome || !formData.cpf || !formData.crm || !formData.estado || !formData.especialidade || !formData.cidade || !formData.email) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Todos os campos da Etapa 1 são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setValidatingCrm(true);
    
    try {
      const response = await api.post('/crm/validar', {
        nome: formData.nome,
        crm: formData.crm.replace(/\D/g, ''),
        uf: formData.estado
      });

      if (response.data) {
        toast({
          title: 'CRM validado com sucesso',
          description: 'Seus dados profissionais foram confirmados.',
        });
        setStep(2);
      }
    } catch (error: any) {
      setCrmError('CRM inválido.');
      toast({
        title: 'CRM inválido',
        description: 'Verifique os dados informados.',
        variant: 'destructive',
      });
    } finally {
      setValidatingCrm(false);
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cepNumbers = rawValue.replace(/\D/g, '');
    setFormData({ ...formData, cep: rawValue });

    if (cepNumbers.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepNumbers}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            cep: rawValue,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidadeEndereco: data.localidade || '',
            estadoEndereco: data.uf || '',
          }));
          toast({
            title: 'Endereço encontrado',
            description: 'Os campos foram preenchidos automaticamente.',
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.cep || !formData.endereco || !formData.numero || !formData.bairro || !formData.cidadeEndereco || !formData.estadoEndereco || !formData.telefone || !formData.plano || !formData.senha || !formData.confirmarSenha) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Complete todos os dados obrigatórios, incluindo a criação de senha.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: 'Senhas não coincidem',
        description: 'As senhas digitadas não são iguais.',
        variant: 'destructive',
      });
      return;
    }

    let mappedPlanId = 1;
    if (formData.plano === 'premium') mappedPlanId = 2;
    if (formData.plano === 'lista') mappedPlanId = 3;

    const payload = {
      name: formData.nome,
      email: formData.email,
      password: formData.senha,
      password_confirmation: formData.confirmarSenha,
      crm: formData.crm.replace(/\D/g, ''),
      uf: formData.estado,
      city: formData.cidade,
      specialty: formData.especialidade,
      phone: formData.telefone,
      plan_id: mappedPlanId,
      cpf: formData.cpf.replace(/\D/g, ''),
      zip_code: formData.cep.replace(/\D/g, ''),
      address: formData.endereco,
      address_number: formData.numero,
      neighborhood: formData.bairro,
      address_city: formData.cidadeEndereco,
      address_state: formData.estadoEndereco,
      datebirth: formData.dataNascimento,
      ...(formData.complemento ? { address_complement: formData.complemento } : {}),
    };

    const result = await register(payload);

    if (result.success) {
      setShowSuccess(true);
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Agora você pode fazer login na plataforma.',
      });
    } else {
      if (result.errors) {
        setErrors(result.errors);
        if (result.errors.name || result.errors.email || result.errors.uf || result.errors.city || result.errors.specialty || result.errors.crm) {
          setStep(1); // Volta para a etapa 1 se o erro for de lá
        }
      }
      toast({
        title: 'Erro no cadastro',
        description: result.error || 'Verifique os campos em vermelho e tente novamente.',
        variant: 'destructive',
      });
    }
  };

  if (showSuccess) {
    return (
        <section id="investir" className="py-12 md:py-20 bg-club8-dark">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-12">
                <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-club8-dark mb-4">
                  Cadastro Realizado com Sucesso!
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                  Bem-vindo ao Club8! Agora você pode fazer login e acessar sua área de investidor.
                </p>
                <Button
                    onClick={() => (window.location.href = '/login')}
                    className="w-full h-14 text-base sm:text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
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
      <section id="investir" className="py-12 md:py-20 bg-club8-dark">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              <UserCheck className="inline-block w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4 text-club8-turquoise" />
              Seja Membro do <span className="club8-text-gradient">Club8</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
              Cadastre-se agora e faça parte do clube mais exclusivo de investimentos para médicos
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-5 sm:p-8">
                {/* Stepper */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`flex items-center gap-2 ${step === 1 ? 'text-club8-turquoise-secondary' : 'text-green-600'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${step === 1 ? 'bg-club8-turquoise-secondary' : 'bg-green-600'}`}>
                        {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                      </div>
                      <span className="text-sm font-semibold hidden sm:inline">Dados Profissionais</span>
                    </div>
                    <div className={`w-12 h-1 rounded ${step === 2 ? 'bg-club8-turquoise-secondary' : 'bg-gray-300'}`} />
                    <div className={`flex items-center gap-2 ${step === 2 ? 'text-club8-turquoise-secondary' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-club8-turquoise-secondary text-white' : 'bg-gray-300 text-gray-600'}`}>
                        2
                      </div>
                      <span className="text-sm font-semibold hidden sm:inline">Endereço e Plano</span>
                    </div>
                  </div>
                </div>

                {step === 1 && (
                    <form onSubmit={handleNextStep} className="space-y-5">
                      <h3 className="text-xl sm:text-2xl font-bold text-club8-dark mb-2">
                        Etapa 1 — Dados Pessoais e Profissionais
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Validaremos seu CRM antes de avançar para a próxima etapa.
                      </p>

                      <div>
                        <label className="block text-sm font-semibold text-club8-dark mb-2">Nome Completo *</label>
                        <Input
                            placeholder="Digite seu nome completo"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="h-12"
                            required
                        />
                        {fieldError('name')}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">CPF *</label>
                          <InputMask
                              mask="999.999.999-99"
                              value={formData.cpf}
                              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                          >
                            {(inputProps: any) => (
                              <Input
                                  {...inputProps}
                                  placeholder="000.000.000-00"
                                  className="h-12"
                                  required
                              />
                            )}
                          </InputMask>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">E-mail *</label>
                          <Input
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="h-12"
                              required
                          />
                          {fieldError('email')}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">CRM *</label>
                          <Input
                              placeholder="Número do CRM"
                              value={formData.crm}
                              onChange={(e) => {
                                setFormData({ ...formData, crm: e.target.value.replace(/\D/g, '') });
                                setCrmError(null);
                              }}
                              className={`h-12 ${crmError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                              required
                              maxLength={7}
                          />
                          {crmError && <p className="text-sm text-red-500 mt-1 font-medium">{crmError}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Estado do CRM *</label>
                          <Select value={formData.estado} onValueChange={(v) => setFormData({ ...formData, estado: v })}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                            <SelectContent>
                              {estados.map((estado) => (
                                  <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldError('uf')}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-club8-dark mb-2">Especialidade *</label>
                        <Select value={formData.especialidade} onValueChange={(v) => setFormData({ ...formData, especialidade: v })}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecione sua especialidade" />
                          </SelectTrigger>
                          <SelectContent>
                            {especialidades.map((esp) => (
                                <SelectItem key={esp} value={esp}>{esp}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {fieldError('specialty')}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-club8-dark mb-2">Cidade de Atuação *</label>
                        <Input
                            placeholder="Digite sua cidade"
                            value={formData.cidade}
                            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                            className="h-12"
                            required
                        />
                        {fieldError('city')}
                      </div>

                      <div className="bg-club8-turquoise/10 border border-club8-turquoise/30 rounded-xl p-4 flex gap-3">
                        <Shield className="w-5 h-5 text-club8-turquoise-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          <strong>Proteção de dados (LGPD):</strong> Seus dados são tratados com total confidencialidade,
                          conforme a Lei Geral de Proteção de Dados. Solicitamos estas informações para validação do seu
                          registro profissional e composição do contrato de investimento, que será gerado no momento da
                          compra das cotas.
                        </p>
                      </div>

                      <Button
                          type="submit"
                          disabled={validatingCrm}
                          className="w-full h-14 text-base sm:text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
                      >
                        {validatingCrm ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Validando CRM...
                            </>
                        ) : (
                            <>
                              Avançar para Etapa 2
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                        )}
                      </Button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="text-xl sm:text-2xl font-bold text-club8-dark mb-2">
                        Etapa 2 — Endereço, Contato e Plano
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Esses dados serão usados para emissão do contrato no momento da compra das cotas.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Data Nascimento *</label>
                          <InputMask
                              mask="99/99/9999"
                              value={formData.dataNascimento}
                              onChange={(e) =>
                                  setFormData({ ...formData, dataNascimento: e.target.value })
                              }
                          >
                            {(inputProps: any) => (
                                <Input
                                    {...inputProps}
                                    placeholder="00/00/0000"
                                    className="h-12"
                                    required
                                />
                            )}
                          </InputMask>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">CEP *</label>
                          <InputMask
                              mask="99999-999"
                              value={formData.cep}
                              onChange={handleCepChange}
                          >
                            {(inputProps: any) => (
                              <Input
                                  {...inputProps}
                                  placeholder="00000-000"
                                  className="h-12"
                                  required
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Endereço *</label>
                          <Input
                              placeholder="Rua / Avenida"
                              value={formData.endereco}
                              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                              className="h-12"
                              required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Número *</label>
                          <Input
                              placeholder="123"
                              value={formData.numero}
                              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                              className="h-12"
                              required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Complemento</label>
                          <Input
                              placeholder="Apto, sala..."
                              value={formData.complemento}
                              onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                              className="h-12"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Bairro *</label>
                          <Input
                              placeholder="Bairro"
                              value={formData.bairro}
                              onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                              className="h-12"
                              required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Cidade *</label>
                          <Input
                              placeholder="Cidade"
                              value={formData.cidadeEndereco}
                              onChange={(e) => setFormData({ ...formData, cidadeEndereco: e.target.value })}
                              className="h-12"
                              required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Estado *</label>
                          <Select value={formData.estadoEndereco} onValueChange={(v) => setFormData({ ...formData, estadoEndereco: v })}>
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
                        <label className="block text-sm font-semibold text-club8-dark mb-2">Telefone *</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        >
                          {(inputProps: any) => (
                            <Input
                                {...inputProps}
                                placeholder="(11) 99999-9999"
                                className={`h-12 ${errors?.telefone ? 'border-red-500' : ''}`}
                                required
                            />
                          )}
                        </InputMask>
                        {fieldError('telefone')}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-club8-dark mb-2">Plano de Interesse *</label>
                        <Select value={formData.plano} onValueChange={(v) => setFormData({ ...formData, plano: v })}>
                          <SelectTrigger className={`h-12 ${errors?.plano ? 'border-red-500' : ''}`}>
                            <SelectValue placeholder="Selecione um plano" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="starter">Club8 Starter - R$ 50.000 (1,8% a.m.)</SelectItem>
                            <SelectItem value="premium">Club8 Premium - R$ 100.000+ (2,0% a.m.)</SelectItem>
                            <SelectItem value="lista">Lista de Espera</SelectItem>
                          </SelectContent>
                        </Select>
                        {fieldError('plan_id')}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Criar Senha *</label>
                          <Input
                              type="password"
                              placeholder="Crie uma senha de acesso"
                              value={formData.senha}
                              onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                              className="h-12"
                              required
                          />
                          {fieldError('password')}
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-club8-dark mb-2">Confirmar Senha *</label>
                          <Input
                              type="password"
                              placeholder="Repita a senha"
                              value={formData.confirmarSenha}
                              onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                              className="h-12"
                              required
                          />
                        </div>
                      </div>

                      <div className="bg-club8-turquoise/10 border border-club8-turquoise/30 rounded-xl p-4 flex gap-3 mt-4">
                        <Shield className="w-5 h-5 text-club8-turquoise-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          <strong>LGPD:</strong> Endereço e telefone são necessários para a emissão do contrato de
                          investimento e comunicações oficiais. Suas informações são armazenadas com criptografia e
                          utilizadas exclusivamente para esta finalidade.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="h-14 sm:w-auto"
                        >
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          Voltar
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 h-14 text-base sm:text-lg font-bold bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
                        >
                          Finalizar Cadastro
                        </Button>
                      </div>
                    </form>
                )}

                <p className="text-xs text-gray-500 mt-6 text-center">
                  * Campos obrigatórios. Seus dados estão protegidos conforme a LGPD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default MembershipSection;
