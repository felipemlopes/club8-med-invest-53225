import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import investmentApi, { Plan } from '@/lib/investmentApi';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  Smartphone,
  Copy,
  FileSignature,
  Clock,
  ShieldCheck,
  FileCheck,
  Minus,
  Plus,
  AlertTriangle,
  Sparkles,
  Gavel,
  FileText,
  Download,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VALOR_COTA = 50000;

const InvestmentFlow = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Acesso restrito",
        description: "Você precisa fazer login para acessar a área de aportes.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate, toast]);

  // 0=Bem-vindo, 1=Cotas, 2=Pré-reserva, 3=Pagamento, 4=Certificado, 5=Dashboard
  const [step, setStep] = useState(0);
  const [quotas, setQuotas] = useState(1);
  const [acceptedReserve, setAcceptedReserve] = useState(false);
  const [contractSigned, setContractSigned] = useState(false);
  const [investmentId, setInvestmentId] = useState<number | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [isDownloadingTerm, setIsDownloadingTerm] = useState(false);

  const [pixData, setPixData] = useState<{ txid: string; qr_code: string; copia_e_cola: string; expires_at: string } | null>(null);
  const [isLoadingPix, setIsLoadingPix] = useState(false);
  const [pixError, setPixError] = useState<string | null>(null);
  
  const [totalQuotas, setTotalQuotas] = useState(200);
  const [soldQuotas, setSoldQuotas] = useState(0);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [confirmedPlan, setConfirmedPlan] = useState<{ name: string; percent: number } | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await investmentApi.getAvailability();
        if (data?.success) {
          setTotalQuotas(data.total_quotas);
          setSoldQuotas(data.sold_quotas);
        }
      } catch (error) {
        console.error("Erro ao buscar disponibilidade", error);
      } finally {
        setIsLoadingAvailability(false);
      }
    };
    
    fetchAvailability();
  }, []);

  useEffect(() => {
    investmentApi.getPlans().then(setPlans).catch((error) => {
      console.error("Erro ao buscar planos", error);
    });
  }, []);

  function resolvePlan(quotas: number, plans: Plan[]): Plan | undefined {
    return plans
      .filter(p => p.min_quotas <= quotas)
      .sort((a, b) => b.min_quotas - a.min_quotas)[0];
  }

  const resolvedPlan = useMemo(() => resolvePlan(quotas, plans), [quotas, plans]);

  const quotasDisponiveis = totalQuotas - soldQuotas;
  const soldOut = !isLoadingAvailability && quotasDisponiveis <= 0;
  const investmentAmount = quotas * VALOR_COTA;
  const monthlyRate = resolvedPlan?.percent ?? 0;
  const planName = resolvedPlan?.name ?? '';

  const [reserveDeadline, setReserveDeadline] = useState<Date | null>(null);

  useEffect(() => {
    if (location.state?.pendingInvestment) {
      const pending = location.state.pendingInvestment;
      setInvestmentId(pending.id);
      setQuotas(pending.quotas);
      setReserveDeadline(new Date(pending.expires_at));
      setStep(3);
      // Clean up state so we don't trigger this again on reload
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleReserve = async () => {
    setIsReserving(true);
    try {
      const response = await investmentApi.reserveInvestment(quotas);
      if (response.data?.success) {
        setInvestmentId(response.data.investment_id);
        setReserveDeadline(new Date(response.data.expires_at));
        setConfirmedPlan({
          name: response.data.plan_name,
          percent: response.data.plan_percent,
        });
        setStep(3);
        toast({ title: 'Reserva efetuada!', description: 'Suas cotas foram reservadas com sucesso.' });
      } else {
        toast({ title: 'Erro', description: 'Não foi possível reservar as cotas.', variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Erro', description: 'Ocorreu um erro ao reservar.', variant: 'destructive' });
    } finally {
      setIsReserving(false);
    }
  };

  const handleDownloadTerm = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDownloadingTerm(true);
    try {
      const blob = await investmentApi.downloadTermo(quotas);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Termo_de_Pre_Reserva_Club8.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({ title: 'Erro', description: 'Não foi possível baixar o termo.', variant: 'destructive' });
    } finally {
      setIsDownloadingTerm(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (step === 3 && investmentId) {
      intervalId = setInterval(async () => {
        try {
          const response = await investmentApi.checkInvestmentStatus(investmentId);
          if (response.data?.success && response.data.status === 'active') {
            clearInterval(intervalId);
            setStep(4);
            toast({ title: 'Pagamento confirmado!', description: 'Seu aporte foi registrado com sucesso.' });
          }
        } catch (error) {
          console.error("Erro ao verificar status do investimento", error);
        }
      }, 5000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [step, investmentId, toast]);

  // Generate PIX charge when entering step 3
  useEffect(() => {
    if (step === 3 && investmentId && !pixData && !isLoadingPix && !pixError) {
      const generatePix = async () => {
        setIsLoadingPix(true);
        setPixError(null);
        try {
          const response = await investmentApi.generatePix(investmentId);
          if (response.data?.success) {
            setPixData({
              txid: response.data.txid,
              qr_code: response.data.qr_code,
              copia_e_cola: response.data.copia_e_cola,
              expires_at: response.data.expires_at,
            });
          }
        } catch (error: any) {
          const msg = error?.message || 'Erro ao gerar cobrança PIX. Tente novamente.';
          setPixError(msg);
          toast({ title: 'Erro', description: msg, variant: 'destructive' });
        } finally {
          setIsLoadingPix(false);
        }
      };
      generatePix();
    }
  }, [step, investmentId, pixData, isLoadingPix, pixError, toast]);

  const deadlineFormatted = useMemo(() => {
    if (!reserveDeadline) return '';
    return reserveDeadline.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [reserveDeadline]);

  const handleCopyPix = () => {
    const code = pixData?.copia_e_cola || '';
    navigator.clipboard.writeText(code);
    toast({ title: 'Código PIX copiado!', description: 'Cole no seu app do banco para finalizar.' });
  };

  const handleSimulateSignature = () => {
    setContractSigned(true);
    toast({ title: 'Contrato assinado!', description: 'Seu Certificado da Debênture foi assinado digitalmente.' });
  };

  const StepBubble = ({ n, label }: { n: number; label: string }) => (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
          step >= n ? 'bg-club8-turquoise text-club8-dark shadow-lg shadow-club8-turquoise/30' : 'bg-gray-200 text-gray-500'
        }`}
      >
        {step > n ? <CheckCircle className="w-6 h-6" /> : n}
      </div>
      <span className="text-xs text-gray-600 hidden md:block text-center max-w-[90px]">{label}</span>
    </div>
  );

  const Connector = ({ active }: { active: boolean }) => (
    <div className={`w-8 md:w-16 h-1 rounded ${active ? 'bg-club8-turquoise' : 'bg-gray-200'}`} />
  );

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-club8-turquoise" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          {step > 0 && (
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center gap-2 md:gap-3">
                <StepBubble n={1} label="Cotas" />
                <Connector active={step >= 2} />
                <StepBubble n={2} label="Pré-reserva" />
                <Connector active={step >= 3} />
                <StepBubble n={3} label="Pagamento" />
                <Connector active={step >= 4} />
                <StepBubble n={4} label="Certificado" />
                <Connector active={step >= 5} />
                <StepBubble n={5} label="Dashboard" />
              </div>
            </div>
          )}

          {/* PASSO 0: Bem-vindo */}
          {step === 0 && (
            <div className="space-y-8 animate-fade-in-up text-center max-w-2xl mx-auto py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-club8-turquoise to-club8-turquoise-secondary shadow-xl shadow-club8-turquoise/30">
                <Sparkles className="w-10 h-10 text-club8-dark" />
              </div>
              <div className="space-y-4">
                <p className="text-club8-turquoise font-semibold tracking-wide uppercase text-sm">
                  Seja bem-vindo(a) ao Club8
                </p>
                <h1 className="text-3xl md:text-5xl font-bold text-club8-dark leading-tight">
                  {user?.nome ? `Olá, ${user.nome.split(' ')[0]}.` : 'Olá.'}{' '}
                  <span className="club8-text-gradient">O primeiro passo já foi dado.</span>
                </h1>
              </div>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Seu cadastro foi concluído e isso já te coloca em um grupo restrito de investidores
                  com acesso a uma oportunidade verdadeiramente diferenciada — pensada para quem busca
                  retorno consistente, segurança real e exclusividade.
                </p>
                <p>
                  Agora é hora de garantir a sua participação. Caso ainda existam cotas disponíveis nesta
                  rodada, você poderá adquirir as suas em poucos minutos. Se a rodada já estiver encerrada,
                  você terá prioridade para entrar na <strong>lista de espera</strong> da próxima abertura.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                {soldOut ? (
                  <Button
                    onClick={() => navigate('/fila-de-espera')}
                    size="lg"
                    className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold px-8"
                  >
                    Entrar na lista de espera
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep(1)}
                    size="lg"
                    className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold px-8"
                  >
                    Adquirir minhas cotas
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* PASSO 1: Cotas */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center space-y-3">
                <Sparkles className="w-10 h-10 text-club8-turquoise mx-auto" />
                <h1 className="text-3xl md:text-4xl font-bold text-club8-dark">
                  Quantas cotas você deseja <span className="club8-text-gradient">adquirir</span>?
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Cada cota Club8 tem o valor de <strong>R$ 50.000,00</strong>. As cotas são limitadas por rodada
                  para preservar a exclusividade e a qualidade do retorno aos investidores.
                </p>
              </div>

              {/* Disponibilidade */}
              <Card className="bg-gradient-to-br from-club8-dark to-gray-900 text-white border-0 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  {isLoadingAvailability ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                      <Loader2 className="w-8 h-8 animate-spin text-club8-turquoise" />
                      <p className="text-gray-400">Verificando disponibilidade atual da rodada...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <div>
                          <p className="text-gray-300 text-sm">Disponibilidade desta rodada</p>
                          <p className="text-3xl font-bold club8-text-gradient">
                            {quotasDisponiveis} de {totalQuotas} cotas
                          </p>
                        </div>
                        <Badge className="bg-club8-turquoise text-club8-dark border-0">
                          {((soldQuotas / totalQuotas) * 100).toFixed(0)}% reservadas
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-full transition-all"
                          style={{ width: `${(soldQuotas / totalQuotas) * 100}%` }}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {soldOut ? (
                <Card className="border-2 border-red-200 bg-red-50">
                  <CardContent className="p-6 text-center space-y-4">
                    <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
                    <h3 className="text-xl font-bold text-club8-dark">Cotas esgotadas nesta rodada</h3>
                    <p className="text-gray-700">
                      Entre na lista de espera e seja avisado em primeira mão na próxima abertura.
                    </p>
                    <Button
                      onClick={() => navigate('/fila-de-espera')}
                      className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
                    >
                      Entrar na lista de espera
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card className="border-club8-turquoise/30">
                    <CardContent className="p-6 md:p-8">
                      <p className="text-center text-gray-600 mb-6">Selecione a quantidade de cotas</p>
                      <div className="flex items-center justify-center gap-6 mb-8">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full"
                          onClick={() => setQuotas(Math.max(1, quotas - 1))}
                          disabled={quotas <= 1}
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <div className="text-center min-w-[100px]">
                          <div className="text-6xl font-bold text-club8-dark">{quotas}</div>
                          <div className="text-xs text-gray-500 mt-1">{quotas === 1 ? 'cota' : 'cotas'}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 rounded-full"
                          onClick={() => setQuotas(Math.min(quotasDisponiveis, quotas + 1))}
                          disabled={quotas >= quotasDisponiveis}
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Plano</p>
                          <p className="font-bold text-club8-dark">{planName}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Rentabilidade</p>
                          <p className="font-bold club8-text-gradient">
                            {monthlyRate.toString().replace('.', ',')}% a.m.
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Valor total</p>
                          <p className="font-bold text-club8-dark">
                            R$ {investmentAmount.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <p className="text-xs text-center text-gray-500">
                    As cotas são <strong>limitadas</strong>. Caso a rodada se esgote antes da sua reserva,
                    você poderá entrar na <Link to="/fila-de-espera" className="text-club8-turquoise underline">lista de espera</Link>.
                  </p>

                  <Button
                    onClick={() => setStep(2)}
                    size="lg"
                    className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
                  >
                    Avançar para Pré-reserva
                  </Button>
                </>
              )}
            </div>
          )}

          {/* PASSO 2: Pré-reserva */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-club8-dark">
                  Termo de <span className="club8-text-gradient">Pré-reserva</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  A pré-reserva é o passo que <strong>garante a sua cota</strong> dentro de uma rodada com vagas
                  estritamente limitadas. Ao realizá-la, suas cotas ficam bloqueadas e indisponíveis para outros
                  investidores por <strong>24 horas</strong> — tempo suficiente para você efetivar o pagamento e
                  formalizar sua entrada no Club8. Não havendo pagamento neste prazo, as cotas retornam ao mercado
                  imediatamente para os próximos interessados.
                </p>
              </div>

              {/* Resumo da pré-reserva */}
              <Card className="border-club8-turquoise/40 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-club8-dark">Sua pré-reserva de investimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Quantidade de cotas:</span>
                      <span className="font-semibold text-club8-dark">{quotas}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Valor total:</span>
                      <span className="font-semibold text-club8-dark">
                        R$ {investmentAmount.toLocaleString('pt-BR')},00
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Rentabilidade mensal:</span>
                      <span className="font-semibold club8-text-gradient">
                        {monthlyRate.toString().replace('.', ',')}%
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Prazo:</span>
                      <span className="font-semibold text-club8-dark">12 meses</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Retiradas:</span>
                      <span className="font-semibold text-club8-dark">Trimestrais</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Reserva válida por:</span>
                      <span className="font-semibold text-club8-dark">24 horas</span>
                    </div>
                  </div>

                  <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-club8-turquoise/10 to-club8-turquoise-secondary/10 border border-club8-turquoise/30 text-center">
                    <p className="text-sm text-gray-700 mb-1">Após confirmar a reserva, o pagamento deverá ser feito em até 24h.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-club8-turquoise" />
                    Segurança da operação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-club8-turquoise flex-shrink-0 mt-0.5" />
                      Estrutura com <strong>garantias fiduciárias</strong>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <Gavel className="w-5 h-5 text-club8-turquoise flex-shrink-0 mt-0.5" />
                      Operação validada conforme diretrizes da <strong>Comissão de Valores Mobiliários</strong>
                    </li>
                    <li className="flex gap-3 text-gray-700">
                      <FileCheck className="w-5 h-5 text-club8-turquoise flex-shrink-0 mt-0.5" />
                      Processo com <strong>auditoria independente</strong> (em estruturação)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Mini dashboard urgência */}
              <Card className="bg-gradient-to-br from-club8-dark to-gray-900 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h3 className="font-semibold text-lg">Disponibilidade atual</h3>
                    <Badge className="bg-club8-turquoise text-club8-dark border-0">
                      Rodada em andamento
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase">Disponíveis no lote</p>
                      <p className="text-2xl font-bold club8-text-gradient">{totalQuotas}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase">Já reservadas</p>
                      <p className="text-2xl font-bold text-white">{soldQuotas}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 uppercase">Restantes</p>
                      <p className="text-2xl font-bold text-club8-turquoise">{quotasDisponiveis}</p>
                    </div>
                  </div>
                  <Progress
                    value={(soldQuotas / totalQuotas) * 100}
                    className="h-2 bg-gray-700"
                  />
                </CardContent>
              </Card>

              {/* Confirmações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Antes de prosseguir, confirme:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Estou ciente de que esta é uma reserva temporária de cotas',
                    'Tenho até 24 horas para realizar o pagamento',
                    'Após o pagamento, receberei o contrato definitivo para assinatura',
                    'Caso não realize o pagamento no prazo, a reserva será automaticamente cancelada',
                  ].map((txt, i) => (
                    <div key={i} className="flex gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{txt}</span>
                    </div>
                  ))}

                  <div className="pt-4 mt-2 border-t">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="reserve-accept"
                        checked={acceptedReserve}
                        onCheckedChange={(c) => setAcceptedReserve(!!c)}
                        className="mt-1"
                      />
                      <Label htmlFor="reserve-accept" className="cursor-pointer text-sm text-gray-700 leading-relaxed">
                        Li, estou ciente e aceito todos os pontos abordados no Termo de Pré-Reserva.
                        <a
                          href="#"
                          onClick={handleDownloadTerm}
                          className="ml-1 text-club8-turquoise font-medium inline-flex items-center gap-1 hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {isDownloadingTerm ? "Gerando arquivo..." : "Acessar Termo de Pré-reserva"}
                          {!isDownloadingTerm && <Download className="w-3 h-3" />}
                        </a>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1" disabled={isReserving}>
                  Voltar
                </Button>
                <Button
                  onClick={handleReserve}
                  disabled={!acceptedReserve || isReserving}
                  size="lg"
                  className="flex-1 bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
                >
                  {isReserving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Reservando...
                    </>
                  ) : (
                    "Reservar minhas cotas"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 3: Pagamento PIX */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-club8-dark">
                  Pagamento via <span className="club8-text-gradient">PIX</span>
                </h2>
                <p className="text-gray-600">
                  Reserva confirmada! Efetive o pagamento em até 24 horas para garantir suas cotas.
                </p>
              </div>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4 flex gap-3 items-start">
                  <Clock className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">
                    Sua reserva expira em <strong>{deadlineFormatted}</strong>. Após esse horário, as cotas voltam
                    a ficar disponíveis para outros investidores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between"><span>Plano:</span><strong>{confirmedPlan?.name ?? planName}</strong></div>
                  <div className="flex justify-between"><span>Cotas:</span><strong>{quotas}</strong></div>
                  <div className="flex justify-between"><span>Rentabilidade:</span><strong className="club8-text-gradient">{(confirmedPlan?.percent ?? monthlyRate).toString().replace('.', ',')}% a.m.</strong></div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span>Valor total:</span>
                    <strong className="text-2xl text-club8-dark">R$ {investmentAmount.toLocaleString('pt-BR')},00</strong>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-club8-turquoise" />
                    QR Code PIX
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingPix && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <Loader2 className="w-10 h-10 animate-spin text-club8-turquoise" />
                      <p className="text-gray-600">Gerando cobrança PIX...</p>
                    </div>
                  )}

                  {pixError && !isLoadingPix && (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <AlertTriangle className="w-10 h-10 text-red-500" />
                      <p className="text-red-700 text-center">{pixError}</p>
                      <Button
                        variant="outline"
                        onClick={() => { setPixData(null); setPixError(null); }}
                      >
                        Tentar novamente
                      </Button>
                    </div>
                  )}

                  {pixData && !isLoadingPix && (
                    <>
                      <div className="flex justify-center">
                        <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
                          {pixData.qr_code ? (
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(pixData.copia_e_cola)}`}
                              alt="QR Code PIX"
                              className="w-60 h-60"
                            />
                          ) : (
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(pixData.copia_e_cola)}`}
                              alt="QR Code PIX"
                              className="w-60 h-60"
                            />
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <p className="text-sm font-semibold text-gray-700">Código Copia e Cola:</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-xs bg-white p-3 rounded border border-gray-200 break-all font-mono text-gray-800">
                            {pixData.copia_e_cola}
                          </code>
                          <Button variant="outline" size="sm" onClick={handleCopyPix} className="flex-shrink-0">
                            <Copy className="w-4 h-4 mr-2" />Copiar
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  disabled
                  className="w-full h-14 bg-gray-200 text-gray-600 font-semibold cursor-not-allowed border border-gray-300"
                >
                  <Loader2 className="w-5 h-5 mr-3 animate-spin text-gray-500" />
                  Aguardando confirmação do banco...
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 4: Certificado */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center space-y-2">
                <FileSignature className="w-12 h-12 text-club8-turquoise mx-auto" />
                <h2 className="text-3xl font-bold text-club8-dark">
                  Assinatura do <span className="club8-text-gradient">Certificado</span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Pagamento confirmado! Enviamos o contrato definitivo para o seu e-mail
                  {user?.email && <> <strong>{user.email}</strong></>}. Assine digitalmente para liberar
                  o acesso ao Dashboard do Investidor.
                </p>
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between"><span>Documento:</span><strong>Certificado da Debênture Club8</strong></div>
                    <div className="flex justify-between"><span>Investimento:</span><strong>R$ {investmentAmount.toLocaleString('pt-BR')},00</strong></div>
                    <div className="flex justify-between"><span>Cotas:</span><strong>{quotas} ({planName})</strong></div>
                  </div>

                  {!contractSigned ? (
                    <Button
                      onClick={handleSimulateSignature}
                      className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
                    >
                      <FileSignature className="w-4 h-4 mr-2" />
                      Simular assinatura digital
                    </Button>
                  ) : (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex gap-3 items-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">Certificado assinado!</p>
                        <p className="text-sm text-green-700">Acesso ao Dashboard liberado.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(5)}
                  disabled={!contractSigned}
                  size="lg"
                  className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* PASSO 5: Dashboard */}
          {step === 5 && (
            <div className="space-y-6 text-center animate-fade-in-up">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-14 h-14 text-green-600" />
                </div>
              </div>

              <h2 className="text-4xl font-bold text-club8-dark">
                Bem-vindo(a) ao <span className="club8-text-gradient">Club8</span>!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Seu aporte de <strong>R$ {investmentAmount.toLocaleString('pt-BR')},00</strong> está ativo.
                Acompanhe seus rendimentos pelo Dashboard do Investidor durante todo o período mínimo de
                <strong> 12 meses</strong>.
              </p>

              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Acessar Dashboard do Investidor
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestmentFlow;
