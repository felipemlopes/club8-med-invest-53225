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

  const referralCode = referralData?.referral_code || '';
  const referralLink = referralCode ? `${window.location.origin}/cadastro?ref=${referralCode}` : '';
  const totalBonus = referralData?.total_bonus || 0;
  const totalReferred = referralData?.total_referred || 0;
  const referredUsers = referralData?.referred_users || [];

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

          <div className="space-y-4">
            {referredUsers.length > 0 && (
                <div className="mt-4">
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {referredUsers.map((referred) => (
                        <div
                            key={referred.id}
                            className="flex items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg text-sm"
                            data-testid={`row-referred-${referred.id}`}
                        >
                          <span className="font-medium truncate">{referred.name}</span>
                          <div className="flex items-center text-green-600">
                            <DollarSign className="w-3 h-3" />
                            <span>{referred.bonus_earned.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
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
