import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  LogOut,
  Wallet,
  Target,
  Loader2, UserPlus, Users, ArrowDownCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import EditPersonalDataDialog from './EditPersonalDataDialog';
import ReferralSystem from './ReferralSystem';
import PerformanceChart from './PerformanceChart';
import BonusTracker from './BonusTracker';
import DocumentsSection from './DocumentsSection';
import FutureProjectionsCards from './FutureProjectionsCards';
import investmentApi, {DashboardData, TimelineData, TimelineItem} from '@/lib/investmentApi';
import MyReferral from "@/components/MyReferral.tsx";
import {ReactNode} from "react";

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: dashboardData, isLoading, error, refetch } = useQuery<DashboardData | null>({
    queryKey: ['/api/dashboard'],
    queryFn: () => investmentApi.getDashboard(),
    staleTime: 30000,
    retry: 2,
  });

  const { data: timeline = [] } = useQuery<TimelineItem[]>({
    queryKey: ['/api/timeline'],
    queryFn: investmentApi.getTimeline,
  });

  /*const timeline = [
    {
      type: 'aporte',
      title: 'Aporte Inicial',
      date: '10/01/2024',
      amount: '50.000,00',
      icon: <Wallet className="w-4 h-4 text-white" />,
    },
    {
      type: 'retorno',
      title: 'Rendimento - Janeiro',
      date: '31/01/2024',
      amount: '625,00',
      extra: '1,25% no mês',
      icon: <TrendingUp className="w-4 h-4 text-white" />,
    },
    {
      type: 'retorno',
      title: 'Rendimento - Fevereiro',
      date: '29/02/2024',
      amount: '640,00',
      extra: '1,28% no mês',
      icon: <TrendingUp className="w-4 h-4 text-white" />,
    },
    {
      type: 'indicacao',
      title: 'Bônus por Indicação',
      date: '05/03/2024',
      amount: '500,00',
      extra: 'Indicação de Dr. João',
      icon: <UserPlus className="w-4 h-4 text-white" />,
    },
  ];*/


  const handleLogout = () => {
    logout();
    navigate('/');
  };


  console.log(dashboardData)
  const totalInvestido = dashboardData?.total_invested || 0;
  const saldoAtual = dashboardData?.current_balance || 0;
  const rentabilidadeMensal = dashboardData?.monthly_return_rate || 0;
  const totalTransferido = dashboardData?.total_transferred || 0;
  const dataEntrada = dashboardData?.entry_date || '-';
  const proximaTransferencia = dashboardData?.next_transfer_date || '-';
  const liquidezPeriodo = dashboardData?.plan?.liquidity || 'Semestral';
  const planoNome = dashboardData?.plan?.name || 'Club8 Gold';

  const lucroOperacional = saldoAtual - totalInvestido;
  //const rentabilidadeTotal = totalInvestido > 0 ? ((lucroOperacional / totalInvestido) * 100) : 0;
  const rentabilidadeTotal = rentabilidadeMensal * 12;

  const monthlyReturns = dashboardData?.recent_returns?.map((item) => ({
    mes: item.month,
    valor: item.amount,
    percentual: item.rate
  })) || [];

  console.log("user")
  console.log(user)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-club8-turquoise mx-auto mb-4" />
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar dados do dashboard.</p>
          <Button onClick={() => refetch()} variant="outline">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-club8-dark text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center">
              <img src="/lovable-uploads/ce9a3483-706c-4620-a853-024a9c09c5b8.png" alt="Club8 Logo" className="h-16 w-auto mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-club8-turquoise">Área do Investidor</h1>
                <p className="text-gray-300">Bem-vindo, {user?.name}</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-club8-turquoise text-club8-dark hover:bg-club8-turquoise hover:text-club8-dark"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary text-club8-dark">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium opacity-80">Saldo Atual</p>
                <p className="text-2xl font-bold" data-testid="text-current-balance">
                  R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p>
                  { new Date().toLocaleDateString('pt-BR') }
                </p>
              </div>
              <Wallet className="w-8 h-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6 border-club8-turquoise">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Investido</p>
                <p className="text-2xl font-bold text-club8-dark-green" data-testid="text-total-invested">
                  R$ {totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p>
                  {dashboardData?.entry_date ?? ''}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-club8-dark-green" />
            </div>
          </Card>

          <Card className="p-6 border-club8-turquoise">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rentabilidade Mensal</p>
                <p className="text-2xl font-bold text-club8-dark-green" data-testid="text-monthly-rate">
                  {rentabilidadeMensal}%
                </p>
                <p>
                  {user?.plan?.name ?? 'Sem plano'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-club8-dark-green" />
            </div>
          </Card>

          <Card className="p-6 border-club8-turquoise">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rentabilidade Total</p>
                <p className="text-2xl font-bold text-club8-dark-green" data-testid="text-total-return">
                  {rentabilidadeTotal.toFixed(1)}%
                </p>
                <p>
                  12 Meses (sem bonificações)
                </p>
              </div>
              <Target className="w-8 h-8 text-club8-dark-green" />
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-club8-dark mb-4">Ganhos Previstos ao Final dos 12 meses</h3>
          <FutureProjectionsCards />
        </div>

        <div className="mb-8">
          <PerformanceChart />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-club8-dark mb-6">Atualizações</h3>


              <div className="relative h-[370px] max-h-[370px] overflow-y-auto pr-2">
                {/* Linha vertical */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />

                {/* Itens */}
                {timeline.map((item, index) => (
                    <div key={item.id} className="relative flex gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getTimelineColor(item.type)}`}>
                        {getTimelineIcon(item.type)}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-semibold text-club8-dark">{item.title}</p>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>

                        <p className="text-lg font-bold text-green-700">
                          R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>

                        {item.extra && (
                            <p className="text-sm text-gray-600 mt-1">{item.extra}</p>
                        )}
                      </div>
                    </div>
                ))}



              </div>

            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-club8-dark mb-4">Informações do Investimento</h3>
              <div className="space-y-3 text-sm">
                <p><strong>Plano:</strong> {planoNome}</p>
                <p><strong>Data de Entrada:</strong> {dataEntrada}</p>
                <p><strong>Liquidez:</strong> {liquidezPeriodo}</p>
                <p><strong>Próxima Transferência:</strong> {proximaTransferencia}</p>
                <p><strong>Total Transferido:</strong> R$ {totalTransferido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <h3 className="text-lg font-bold text-club8-dark">Dados Pessoais</h3>
                <EditPersonalDataDialog />
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Nome:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                {user?.crm && <p><strong>CRM:</strong> {user.crm}</p>}
                {user?.specialty && <p><strong>Especialidade:</strong> {user.specialty}</p>}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ReferralSystem />
          <BonusTracker />
        </div>

        <div className="grid lg:grid-cols-1 gap-8 mb-8">
          <MyReferral />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <DocumentsSection />
          </div>

          {/*
          <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">Lucro Acumulado</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-green-700">Lucro Operacional</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-profit">
                  R$ {lucroOperacional.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="border-t border-green-300 pt-3">
                <p className="text-sm text-green-700">Rentabilidade total</p>
                <p className="text-xl font-bold text-green-600">
                  {rentabilidadeTotal.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
          */}

        </div>
      </div>
    </div>
  );
};

export function getTimelineIcon(type: TimelineItem['type']): ReactNode {
  switch (type) {
    case 'aporte':
      return <ArrowDownCircle className="w-4 h-4 text-white" />;

    case 'retorno':
      return <TrendingUp className="w-4 h-4 text-white" />;

    case 'indicacao':
      return <Users className="w-4 h-4 text-white" />;

    default:
      return null;
  }
}

export function getTimelineColor(type: TimelineItem['type']) {
  switch (type) {
    case 'aporte':
      return 'bg-blue-600';
    case 'retorno':
      return 'bg-green-600';
    case 'indicacao':
      return 'bg-purple-600';
    default:
      return 'bg-gray-400';
  }
}


export default InvestorDashboard;


