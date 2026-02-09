import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {CheckCircle, Clock, Star, Shield, Gem} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {useQuery} from "@tanstack/react-query";
import investmentApi, {Plan} from "@/lib/investmentApi.ts";

const WaitingList = () => {
  const { data: plans = [], isLoading, error, refetch } = useQuery<Plan[]>({
    queryKey: ['/api/plans'],
    queryFn: () => investmentApi.getPlans(),
    staleTime: 30000,
    retry: 2,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crm: '',
    state: '',
    specialty: '',
    preferredPlan: '',
    indication: '',
    investmentAmount: '',
    comments: ''
  });
  const { toast } = useToast();

  const referralCode = localStorage.getItem("referral_code");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a submissão do formulário
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Você foi adicionado à nossa fila de espera. Entraremos em contato em breve.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      crm: '',
      state: '',
      specialty: '',
      indication: '',
      preferredPlan: '',
      investmentAmount: '',
      comments: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Clock className="w-20 h-20 text-club8-turquoise mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Lista de <span className="club8-text-gradient">Espera</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seja um dos primeiros a conhecer as próximas oportunidades de investimento 
              exclusivas para médicos do Club8
            </p>
          </div>
        </div>
      </section>

      {/* Informações sobre o investimento */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-club8-dark mb-6">
              Próximas Oportunidades
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quando disponibilizarmos novas vagas, você será um dos primeiros a saber
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {plans.map((plan, index) => (
                <Card
                    key={plan.id ?? index}
                    className={`border-2 ${
                        plan.popular ? 'border-club8-turquoise' : 'border-gray-200'
                    }`}
                >
                  <CardHeader className="text-center">
                    {plan.popular ? (
                        <Gem className="w-12 h-12 text-club8-turquoise mx-auto mb-4" />
                    ) : (
                        <Star className="w-12 h-12 text-club8-turquoise mx-auto mb-4" />
                    )}

                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      Plano com rentabilidade de {plan.monthly_return} ao mês
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold club8-text-gradient mb-2">
                        {plan.monthly_return} a.m.
                      </div>
                      <div className="text-lg text-gray-600">Rentabilidade</div>
                    </div>

                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Investimento mínimo: {plan.min_investment}
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Liquidez: {plan.liquidez}
                      </li>

                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Carência: {plan.carencia}
                      </li>

                      {plan.benefits?.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {benefit.name}
                          </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Formulário de cadastro */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-club8-dark mb-6">
                Cadastre-se na Fila de Espera
              </h2>
              <p className="text-lg text-gray-600">
                Preencha os dados abaixo para ser notificado sobre as próximas oportunidades
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
                <CardDescription>
                  Todas as informações são confidenciais e serão usadas apenas para contato
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crm">CRM *</Label>
                      <Input
                        id="crm"
                        type="text"
                        value={formData.crm}
                        onChange={(e) => handleInputChange('crm', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">Estado do CRM *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="DF">Distrito Federal</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                          <SelectItem value="PE">Pernambuco</SelectItem>
                          <SelectItem value="CE">Ceará</SelectItem>
                          <SelectItem value="MA">Maranhão</SelectItem>
                          <SelectItem value="PB">Paraíba</SelectItem>
                          <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                          <SelectItem value="AL">Alagoas</SelectItem>
                          <SelectItem value="SE">Sergipe</SelectItem>
                          <SelectItem value="PI">Piauí</SelectItem>
                          <SelectItem value="PA">Pará</SelectItem>
                          <SelectItem value="AM">Amazonas</SelectItem>
                          <SelectItem value="RO">Rondônia</SelectItem>
                          <SelectItem value="AC">Acre</SelectItem>
                          <SelectItem value="AP">Amapá</SelectItem>
                          <SelectItem value="RR">Roraima</SelectItem>
                          <SelectItem value="TO">Tocantins</SelectItem>
                          <SelectItem value="ES">Espírito Santo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="specialty">Especialidade</Label>
                      <Input
                        id="specialty"
                        type="text"
                        value={formData.specialty}
                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                        placeholder="Ex: Cardiologia"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredPlan">Plano de Interesse</Label>
                      <Select value={formData.preferredPlan} onValueChange={(value) => handleInputChange('preferredPlan', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione um plano" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gold">Club8 Gold (1,8% a.m.)</SelectItem>
                          <SelectItem value="platinum">Club8 Platinum (2,0% a.m.)</SelectItem>
                          <SelectItem value="any">Qualquer plano disponível</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="investmentAmount">Valor Pretendido (R$)</Label>
                      <Input
                        id="investmentAmount"
                        type="number"
                        value={formData.investmentAmount}
                        onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                        placeholder="Ex: 100000"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comments">Comentários Adicionais</Label>
                    <Textarea
                      id="comments"
                      value={formData.comments}
                      onChange={(e) => handleInputChange('comments', e.target.value)}
                      placeholder="Alguma informação adicional que gostaria de compartilhar..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Importante:</strong> Este cadastro não gera nenhum compromisso de investimento. 
                      É apenas para que possamos entrar em contato quando houver novas oportunidades disponíveis. 
                      Você terá total liberdade para decidir se deseja ou não prosseguir com o investimento.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full hover:border-club8-turquoise bg-club8-turquoise hover:bg-club8-white text-black font-semibold py-3"
                  >
                    Entrar na Lista de Espera
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WaitingList;
