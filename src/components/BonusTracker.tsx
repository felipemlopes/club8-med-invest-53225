
import { Card } from '@/components/ui/card';
import { Award, Users, RefreshCw, UserX } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const BonusTracker = () => {
  const { user } = useAuth();
  
  // Simulando dados baseados no perfil do usuário
  const investimentoInicial = 150000;
  const isPremium = user?.plano === 'platinum';
  const rentabilidadeMensal = isPremium ? 2.0 : 1.8;
  const parcelaMensal = investimentoInicial * (rentabilidadeMensal / 100);
  
  // Dados de demonstração das indicações com valores em múltiplos de R$ 50.000
  const indicacoes = [
    { valor: 50000, status: 'ativo' },
    { valor: 100000, status: 'ativo' },
    { valor: 50000, status: 'ativo' }
  ];
  
  const indicacoesPendentes = [
    { valor: 50000, status: 'pendente' },
    { valor: 100000, status: 'pendente' }
  ];
  
  const renovacoes = 0; // Renovações no segundo ano
  
  // Cálculos das bonificações - novo sistema: 1% do valor investido
  const bonusIndicacoes = indicacoes.reduce((total, indicacao) => {
    return total + (indicacao.valor * 0.01); // 1% do valor investido
  }, 0);
  
  const bonusPotencialPendente = indicacoesPendentes.reduce((total, indicacao) => {
    return total + (indicacao.valor * 0.01);
  }, 0);
  
  // Renovação = uma parcela extra mensal no segundo ano
  const bonusRenovacao = renovacoes * parcelaMensal;
  
  const totalBonus = bonusIndicacoes + bonusRenovacao;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-club8-turquoise" />
        Placar de Bonificações
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Indicações Ativas</p>
              <p className="text-sm text-green-600">
                {indicacoes.length} pessoas investindo (R$ {indicacoes.reduce((total, ind) => total + ind.valor, 0).toLocaleString('pt-BR')})
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-600">R$ {bonusIndicacoes.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-green-500">1% do valor investido cada</p>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-2">Detalhamento das Indicações:</p>
          <div className="space-y-1 text-xs text-green-700">
            {indicacoes.map((indicacao, index) => (
              <div key={index} className="flex justify-between">
                <span>Indicação {index + 1}: R$ {indicacao.valor.toLocaleString('pt-BR')}</span>
                <span className="font-bold">+ R$ {(indicacao.valor * 0.01).toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center">
            <UserX className="w-5 h-5 mr-2 text-orange-600" />
            <div>
              <p className="font-medium text-orange-800">Indicações Pendentes</p>
              <p className="text-sm text-orange-600">
                {indicacoesPendentes.length} pessoas ainda não investiram
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-orange-600">R$ {bonusPotencialPendente.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-orange-500">Potencial quando investirem</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Renovações (2º ano)</p>
              <p className="text-sm text-blue-600">{renovacoes} renovação(ões)</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-blue-600">R$ {bonusRenovacao.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-blue-500">Uma parcela extra mensal</p>
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-club8-dark">Total em Bonificações:</span>
            <span className="font-bold text-xl text-club8-turquoise">
              R$ {totalBonus.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Sua parcela mensal: R$ {parcelaMensal.toLocaleString('pt-BR')}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Potencial adicional pendente: R$ {bonusPotencialPendente.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BonusTracker;
