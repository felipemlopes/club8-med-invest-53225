
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const ReferralSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const clientNumber = user?.id || '000000';
  const referralLink = `${window.location.origin}/login?ref=${clientNumber}`;

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

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-club8-dark mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-club8-turquoise" />
        Sistema de Indicações
      </h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Seu Número de Cliente</p>
          <div className="flex items-center space-x-2">
            <Input 
              value={clientNumber} 
              readOnly 
              className="bg-gray-50"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(clientNumber)}
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
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(referralLink)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={shareReferralLink}
          className="w-full bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar Link
        </Button>
      </div>
    </Card>
  );
};

export default ReferralSystem;
