import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Users, Loader2, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import investmentApi, { ReferralData } from '@/lib/investmentApi';

const MyReferral = () => {
  const { toast } = useToast();

  const { data: referralData, isLoading, error } = useQuery<ReferralData | null>({
    queryKey: ['/api/referrals'],
    queryFn: () => investmentApi.getReferrals(),
    staleTime: 30000,
    retry: 2,
  });

  const { data: referralRegistredData } = useQuery<ReferralData | null>({
    queryKey: ['/api/referrals/registred'],
    queryFn: () => investmentApi.getReferralsRegistred(),
    staleTime: 30000,
    retry: 2,
  });

  const referralCode = referralData?.referral_code || '';
  const referralLink = referralCode ? `${window.location.origin}/cadastro?ref=${referralCode}` : '';
  const totalBonus = referralData?.total_bonus || 0;
  const totalReferred = referralData?.total_referred || 0;
  const referredUsers = referralData?.referred_users || [];
  const registredUsers = referralRegistredData?.referred_users || [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Link de indicação copiado para a área de transferência.",
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Club8 - Invista Conosco',
        text: 'Invista no Club8 e tenha rentabilidade garantida!',
        url: referralLink
      });
    } else {
      copyToClipboard(referralLink);
    }
  };

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
        <p className="text-red-600 text-center py-4">Erro ao carregar indicações.</p>
      </Card>
    );
  }

  return (
      <div className="">

        <Card className="p-6">
          <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center gap-2 flex-wrap">
            <Users className="w-5 h-5 text-black" />
            Suas Indicações
          </h3>

          <div className="space-y-6">
            {/* SEÇÃO: INVESTIDORES */}
            {referredUsers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-50 rounded-lg text-sm" />
                    Investindo ({referredUsers.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {referredUsers.map((referred) => (
                        <div key={referred.id} className="p-3 bg-gray-50 rounded-xl text-sm shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between gap-4">

                            {/* ESQUERDA: Nome e Cadastro */}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-800 truncate" title={referred.name}>
                                {referred.name}
                              </div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-tight">
                                <b>{referred.joined_at}</b>
                              </div>
                            </div>

                            {/* CENTRO: Investimento e Data */}
                            <div className="flex-1 text-center border-x border-gray-100 px-2">
                              {/*
                              <div className="text-[10px] text-gray-400 uppercase">Investido</div>
                              */}

                              <div className="font-bold text-gray-700 leading-tight">
                                R$ {referred.invested_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </div>
                              <div className="text-[10px] text-gray-700 font-medium">
                                {referred.invested_at}
                              </div>
                            </div>

                            {/* DIREITA: Bônus */}
                            <div className="flex-1 text-right">
                              <div className="text-[10px] text-gray-400 uppercase font-semibold">Seu Bônus</div>
                              <div className="flex items-center justify-end text-green-600 text-base">
                                <DollarSign className="w-3 h-3" />
                                <span>{referred.bonus_earned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}

            {/* SEÇÃO: APENAS CADASTROS */}
            {registredUsers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                    <div className="w-2 rounded-full" />
                    Cadastrados ({registredUsers.length})
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {registredUsers.map((referred) => (
                        <div key={referred.id} className="p-3 bg-gray-50 rounded-xl text-sm shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between gap-4">

                            {/* ESQUERDA: Nome e Cadastro */}
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-gray-800 truncate" title={referred.name}>
                                {referred.name}
                              </div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-tight">
                                <b>{referred.joined_at}</b>
                              </div>
                            </div>

                            {/* CENTRO: Investimento e Data */}
                            <div className="flex-1 text-center border-x border-gray-100 px-2">
                              {/*
                              <div className="text-[10px] text-gray-400 uppercase">Investido</div>


                              <div className="font-bold text-gray-700 leading-tight">
                                R$ {referred.invested_amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </div>
                              <div className="text-[10px] text-gray-700 font-medium">
                                {referred.joined_at}
                              </div>
                              */}
                            </div>

                            {/* DIREITA: Bônus */}
                            {/*
                            <div className="flex-1 text-right">
                              <div className="text-[10px] text-gray-400 uppercase font-semibold">Seu Bônus</div>
                              <div className="flex items-center justify-end text-green-600 text-base">
                                <DollarSign className="w-3 h-3" />
                                <span>{referred.bonus_earned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                              </div>
                            </div>
                            */}

                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </Card>

      </div>
  );
};

export default MyReferral;
