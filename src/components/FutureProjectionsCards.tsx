
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {useQuery} from "@tanstack/react-query";
import investmentApi, {DashboardData, Future} from "@/lib/investmentApi.ts";

const FutureProjectionsCards = () => {
  const { user } = useAuth();

  const { data: future, isLoading, error, refetch } = useQuery<Future>({
    queryKey: ['/api/future'],
    queryFn: () => investmentApi.getFuture(),
    staleTime: 30000,
    retry: 2,
  });

  const {
    total_invested = 0,
    monthly_return_rate = 0,
    indications = [],
  } = future ?? {};


  //const isPremium = user?.plano === 'platinum';
  const investimentoInicial = total_invested;
  const rentabilidadeMensal = monthly_return_rate;
  //const rentabilidadeMensal = future?.monthly_return_rate || 2; // Sempre 2% para o dashboard interno
  const parcelaMensal = investimentoInicial * (rentabilidadeMensal / 100);
  
  // Bonificações - investimentos em múltiplos de R$ 50.000
  const indicacoesValores = indications; // 3 indicações
  //const bonusTotal = indicacoesValores.reduce((total, valor) => total + (valor * 0.01), 0);
  const bonusTotal = indications.reduce(
      (sum, value) => sum + value,
      0
  );
  
  // Ganhos operacionais do ano (12 meses)
  const ganhosOperacionaisAno = parcelaMensal * 12;
  
  // Total de ganhos no final do primeiro ano (operacional + bonificações)
  const ganhosFinaisAno = ganhosOperacionaisAno + bonusTotal;
  
  // Rentabilidade total do primeiro ano (incluindo bonificações)
  const rentabilidadeTotalAno = (ganhosFinaisAno / investimentoInicial) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary text-club8-dark">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-black font-medium">Total do Final do Ano</p>
            <p className="text-2xl font-bold text-black">
              R$ {ganhosFinaisAno.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-black mt-1">
              Operacional + Bonificações
            </p>
          </div>
          <Target className="w-8 h-8 opacity-80" />
        </div>
      </Card>

      <Card className="p-6 bg-white border-club8-turquoise">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Ganhos Operacionais do Ano</p>
            <p className="text-2xl font-bold text-club8-dark-green">
              R$ {ganhosOperacionaisAno.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-club8-dark mt-1">
              {rentabilidadeMensal}% × 12 meses
            </p>
          </div>
          <Calendar className="w-8 h-8 text-club8-dark-green" />
        </div>
      </Card>

      <Card className="p-6 bg-white border-club8-turquoise">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Bonificações do Ano</p>
            <p className="text-2xl font-bold text-club8-dark-green">
              R$ {bonusTotal.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-club8-dark mt-1">
              {indicacoesValores.length} indicações ativas
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-club8-dark-green" />
        </div>
      </Card>

      <Card className="p-6 bg-white border-club8-turquoise">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Rentabilidade Total Anual</p>
            <p className="text-2xl font-bold text-club8-dark-green">
              {rentabilidadeTotalAno.toFixed(1)}%
            </p>
            <p className="text-xs text-club8-dark mt-1">
              Incluindo bonificações
            </p>
          </div>
          <Zap className="w-8 h-8 text-club8-dark-green" />
        </div>
      </Card>
    </div>
  );
};

export default FutureProjectionsCards;
