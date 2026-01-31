import { Card } from '@/components/ui/card';
import { Award, Users, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import investmentApi, { ReferralData } from '@/lib/investmentApi';

const BonusTracker = () => {
  const { data: referralData, isLoading, error } = useQuery<ReferralData | null>({
    queryKey: ['/api/referrals'],
    queryFn: () => investmentApi.getReferrals(),
    staleTime: 30000,
    retry: 2,
  });

  const referredUsers = referralData?.referred_users || [];
  //const activeUsers = referredUsers.filter(u => u.status === 'active');
  const activeUsers = referralData?.referred_users || [];
  //const pendingUsers = referredUsers.filter(u => u.status === 'pending');
  const pendingUsers = referredUsers.filter(u => u.status === 'pending');

  const totalBonusActive = activeUsers.reduce((total, user) => total + user.bonus_earned, 0);
  const totalInvestedByReferred = activeUsers.reduce((total, user) => total + user.invested_amount, 0);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-club8-turquoise" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-red-600 text-center py-4">Erro ao carregar bonificações.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-club8-turquoise" />
        Placar de Bonificações
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-black" />
            <div>
              <p className="font-medium text-black">Indicações Ativas</p>
              <p className="text-sm text-black">
                {activeUsers.length} pessoas investindo
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-green-700" data-testid="text-active-bonus">
              R$ {totalBonusActive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-green-700">1% do valor investido</p>
          </div>
        </div>

        {activeUsers.length > 0 && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-black mb-2">Detalhamento das Indicações:</p>
            <div className="space-y-1 text-xs text-black">
              {activeUsers.map((user, index) => (
                <div key={user.id} className="flex justify-between gap-2" data-testid={`row-bonus-detail-${user.id}`}>
                  <span className="truncate">{user.name}: R$ {user.invested_amount.toLocaleString('pt-BR')}</span>
                  <span className="font-bold whitespace-nowrap text-green-700">+ R$ {user.bonus_earned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendingUsers.length > 0 && (
          <div className="flex items-center justify-between gap-2 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Indicações Pendentes</p>
                <p className="text-sm text-green-600">
                  {pendingUsers.length} pessoas ainda não investiram
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between items-center gap-2 flex-wrap">
            <span className="font-bold text-club8-dark">Total em Bonificações:</span>
            <span className="font-bold text-xl text-green-700" data-testid="text-total-bonus-tracker">
              R$ {totalBonusActive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          {totalInvestedByReferred > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              Total investido por indicados: R$ {totalInvestedByReferred.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BonusTracker;
