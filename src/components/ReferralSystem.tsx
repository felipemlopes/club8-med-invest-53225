import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Users, Loader2, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import investmentApi, { ReferralData } from '@/lib/investmentApi';

const ReferralSystem = () => {
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
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center gap-2 flex-wrap">
        <Users className="w-5 h-5 text-club8-turquoise" />
        Sistema de Indicações
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-club8-dark" data-testid="text-total-referred">{totalReferred}</p>
            <p className="text-xs text-gray-600">Indicados</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600" data-testid="text-total-bonus">
              R$ {totalBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-600">Total em Bônus</p>
          </div>
        </div>

        {referralCode && (
          <>
            <div>
              <p className="text-sm text-gray-600 mb-2">Seu Código de Indicação</p>
              <div className="flex items-center space-x-2">
                <Input 
                  value={referralCode} 
                  readOnly 
                  className="bg-gray-50 font-mono"
                  data-testid="input-referral-code"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(referralCode)}
                  data-testid="button-copy-code"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Link de Indicação</p>
              <div className="flex items-center space-x-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  className="bg-gray-50 text-xs"
                  data-testid="input-referral-link"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(referralLink)}
                  data-testid="button-copy-link"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={shareReferralLink}
              className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
              data-testid="button-share-link"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar Link
            </Button>
          </>
        )}

        {referredUsers.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Suas Indicações</p>
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
  );
};

export default ReferralSystem;
