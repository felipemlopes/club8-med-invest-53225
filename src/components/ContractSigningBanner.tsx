import { useState } from 'react';
import { FileSignature, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import investmentApi from '@/lib/investmentApi';

interface ContractSigningBannerProps {
  investmentId: number;
}

const ContractSigningBanner = ({ investmentId }: ContractSigningBannerProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSign = async () => {
    setLoading(true);
    setError(null);
    try {
      const { signing_url } = await investmentApi.initiateContractSigning(investmentId);
      window.open(signing_url, '_blank');
    } catch {
      setError('Não foi possível iniciar a assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <FileSignature className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <p className="text-amber-800 text-sm font-medium">
          Seu contrato de investimento ainda não foi assinado.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button
          onClick={handleSign}
          disabled={loading}
          size="sm"
          className="bg-amber-500 hover:bg-amber-600 text-white whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Assinar contrato
        </Button>
      </div>
    </div>
  );
};

export default ContractSigningBanner;
