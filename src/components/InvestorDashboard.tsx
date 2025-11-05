
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  LogOut,
  Wallet,
  Target
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EditPersonalDataDialog from './EditPersonalDataDialog';
import ReferralSystem from './ReferralSystem';
import PerformanceChart from './PerformanceChart';
import BonusTracker from './BonusTracker';
import DocumentsSection from './DocumentsSection';
import FutureProjectionsCards from './FutureProjectionsCards';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Dados corrigidos baseados no plano - forçando 2% para usuários platinum
  const isPremium = user?.plano === 'platinum';
  const rentabilidadeMensal = 2.0; // Sempre 2% para dashboard interno
  const liquidezPeriodo = isPremium ? 'Trimestral' : 'Semestral';
  const proximaTransferencia = isPremium ? '15/07/2024' : '15/08/2024';

  const investmentData = {
    totalInvestido: 150000,
    saldoAtual: 186240,
    rentabilidadeMensal,
    rentabilidadeTotal: 24.16,
    dataEntrada: '15/01/2024',
    totalTransferido: 7200,
    proximaTransferencia,
    liquidezPeriodo,
    plano: isPremium ? 'Club8 Platinum' : 'Club8 Gold'
  };

  const parcelaMensal = investmentData.totalInvestido * (rentabilidadeMensal / 100);
  const monthlyReturns = [
    { mes: 'Jan/24', valor: parcelaMensal, percentual: rentabilidadeMensal },
    { mes: 'Fev/24', valor: parcelaMensal, percentual: rentabilidadeMensal },
    { mes: 'Mar/24', valor: parcelaMensal, percentual: rentabilidadeMensal },
    { mes: 'Abr/24', valor: parcelaMensal, percentual: rentabilidadeMensal },
    { mes: 'Mai/24', valor: parcelaMensal, percentual: rentabilidadeMensal },
    { mes: 'Jun/24', valor: parcelaMensal, percentual: rentabilidadeMensal }
  ];

  // Atualização do cálculo de bonificações com valores corretos (múltiplos de R$ 50.000)
  const indicacoesValores = [50000, 100000, 50000]; // Valores das indicações
  const bonusTotal = indicacoesValores.reduce((total, valor) => total + (valor * 0.01), 0); // 1% de cada
  
  const lucroOperacional = investmentData.saldoAtual - investmentData.totalInvestido;
  const lucroTotalComBonus = lucroOperacional + bonusTotal;
  
  // Cálculo da rentabilidade total incluindo bonificações
  const rentabilidadeTotalComBonus = ((lucroTotalComBonus / investmentData.totalInvestido) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-club8-dark text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/lovable-uploads/ce9a3483-706c-4620-a853-024a9c09c5b8.png" alt="Club8 Logo" className="h-16 w-auto mr-4" />
              <div>
                <h1 className="text-2xl font-bold text-club8-turquoise">Área do Investidor</h1>
                <p className="text-gray-300">Bem-vindo, {user?.nome}</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-club8-turquoise text-club8-turquoise hover:bg-club8-turquoise hover:text-club8-dark"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary text-club8-dark">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">Saldo Atual</p>
                <p className="text-2xl font-bold">
                  R$ {investmentData.saldoAtual.toLocaleString('pt-BR')}
                </p>
              </div>
              <Wallet className="w-8 h-8 opacity-80" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Investido</p>
                <p className="text-2xl font-bold text-club8-dark">
                  R$ {investmentData.totalInvestido.toLocaleString('pt-BR')}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-club8-turquoise" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rentabilidade Mensal</p>
                <p className="text-2xl font-bold text-green-600">
                  {investmentData.rentabilidadeMensal}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Rentabilidade Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {rentabilidadeTotalComBonus.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Com bonificações</p>
              </div>
              <Target className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Cards de Ganhos do Final do Ano */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-club8-dark mb-4">Ganhos Previstos para o Final do Ano</h3>
          <FutureProjectionsCards />
        </div>

        {/* Gráfico de Performance */}
        <div className="mb-8">
          <PerformanceChart />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Mensal */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-club8-dark mb-6">Performance Mensal</h3>
              <div className="space-y-4">
                {monthlyReturns.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-club8-dark">{item.mes}</span>
                    <div className="text-right">
                      <p className="font-bold text-green-600">R$ {item.valor.toLocaleString('pt-BR')}</p>
                      <p className="text-sm text-gray-600">{item.percentual}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Informações do Plano */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-club8-dark mb-4">Informações do Investimento</h3>
              <div className="space-y-3 text-sm">
                <p><strong>Plano:</strong> {investmentData.plano}</p>
                <p><strong>Data de Entrada:</strong> {investmentData.dataEntrada}</p>
                <p><strong>Liquidez:</strong> {investmentData.liquidezPeriodo}</p>
                <p><strong>Próxima Transferência:</strong> {investmentData.proximaTransferencia}</p>
                <p><strong>Total Transferido:</strong> R$ {investmentData.totalTransferido.toLocaleString('pt-BR')}</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-club8-dark">Dados Pessoais</h3>
                <EditPersonalDataDialog />
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Nome:</strong> {user?.nome}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                {user?.crm && <p><strong>CRM:</strong> {user.crm}</p>}
                {user?.especialidade && <p><strong>Especialidade:</strong> {user.especialidade}</p>}
              </div>
            </Card>
          </div>
        </div>

        {/* Sistema de Indicações e Bonificações */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ReferralSystem />
          <BonusTracker />
        </div>

        {/* Documentos e Lucro Atualizado */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentsSection />
          </div>
          
          <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-4">Lucro Acumulado</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-green-700">Lucro Operacional</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {lucroOperacional.toLocaleString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-700">Bonificações (1% por indicação)</p>
                <p className="text-lg font-bold text-green-600">
                  R$ {bonusTotal.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="border-t border-green-300 pt-3">
                <p className="text-sm text-green-700">Total Geral</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {lucroTotalComBonus.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Rentabilidade total: {rentabilidadeTotalComBonus.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
