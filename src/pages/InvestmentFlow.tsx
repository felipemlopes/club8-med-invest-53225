import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Smartphone, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const InvestmentFlow = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const plans = [
    {
      id: 'gold',
      name: 'Club8 Gold',
      rate: '1,8% a.m.',
      minAmount: 50000,
      description: 'Plano com rentabilidade de 1,8% ao mês',
      features: ['Garantias reais', 'Liquidez em 30 dias', 'Suporte especializado']
    },
    {
      id: 'platinum',
      name: 'Club8 Platinum',
      rate: '2,0% a.m.',
      minAmount: 100000,
      description: 'Plano premium com rentabilidade de 2,0% ao mês',
      features: ['Garantias reais', 'Liquidez em 30 dias', 'Suporte VIP', 'Bonificações extras']
    }
  ];

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00020126360014BR.GOV.BCB.PIX0114+5511999999999');
    toast({
      title: "Chave PIX copiada!",
      description: "A chave PIX foi copiada para a área de transferência.",
    });
  };

  const handleConfirmPayment = () => {
    toast({
      title: "Pagamento confirmado!",
      description: "Seu aporte foi registrado e será processado em até 24 horas.",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-club8-dark mb-4">
              Realizar Aporte
            </h1>
            <p className="text-lg text-gray-600">
              Bem-vindo(a), {user?.nome || 'Doutor(a)'}! Agora você pode realizar seu primeiro aporte.
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-club8-turquoise text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-club8-turquoise' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-club8-turquoise text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <CheckCircle className="w-6 h-6" /> : '2'}
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-club8-turquoise' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-club8-turquoise text-white' : 'bg-gray-200'}`}>
                {step > 3 ? <CheckCircle className="w-6 h-6" /> : '3'}
              </div>
            </div>
          </div>

          {/* Step 1: Escolha do Plano */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-club8-dark mb-6">1. Escolha seu Plano de Investimento</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`cursor-pointer transition-all ${selectedPlan === plan.id ? 'ring-2 ring-club8-turquoise' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <Badge className="bg-club8-turquoise text-white">{plan.rate}</Badge>
                      </div>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                          Investimento mínimo: R$ {plan.minAmount.toLocaleString('pt-BR')}
                        </p>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Label htmlFor="amount">Valor do Investimento (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Ex: 50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Valor mínimo: R$ {selectedPlan ? plans.find(p => p.id === selectedPlan)?.minAmount.toLocaleString('pt-BR') : '50.000'}
                </p>
              </div>

              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedPlan || !investmentAmount}
                className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary"
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2: Método de Pagamento */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-club8-dark mb-6">2. Escolha o Método de Pagamento</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Smartphone className="w-6 h-6 text-club8-turquoise" />
                      <div>
                        <div className="font-semibold">PIX</div>
                        <div className="text-sm text-gray-600">Transferência instantânea e gratuita</div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                    <RadioGroupItem value="ted" id="ted" disabled />
                    <Label htmlFor="ted" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="w-6 h-6 text-gray-400" />
                      <div>
                        <div className="font-semibold">TED</div>
                        <div className="text-sm text-gray-600">Em breve</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!paymentMethod}
                  className="flex-1 bg-club8-turquoise hover:bg-club8-turquoise-secondary"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Dados para Pagamento */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-club8-dark mb-6">3. Dados para Pagamento</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Investimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Plano:</span>
                      <span className="font-semibold">
                        {plans.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rentabilidade:</span>
                      <span className="font-semibold text-club8-turquoise">
                        {plans.find(p => p.id === selectedPlan)?.rate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valor do Aporte:</span>
                      <span className="font-semibold text-2xl">
                        R$ {Number(investmentAmount).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {paymentMethod === 'pix' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-6 h-6 text-club8-turquoise" />
                      Pagamento via PIX
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Use os dados abaixo para realizar a transferência PIX:
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div>
                            <span className="font-semibold">Favorecido:</span> Club8 Investimentos
                          </div>
                          <div>
                            <span className="font-semibold">CNPJ:</span> 12.345.678/0001-90
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold">Chave PIX:</span> 
                              <span className="font-mono ml-2">+5511999999999</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleCopyPix}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copiar
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Importante:</strong> Após realizar a transferência, clique em "Confirmar Pagamento" 
                          para registrarmos seu aporte. O valor será creditado em sua conta em até 24 horas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleConfirmPayment}
                  className="flex-1 bg-club8-turquoise hover:bg-club8-turquoise-secondary"
                >
                  Confirmar Pagamento
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestmentFlow;
