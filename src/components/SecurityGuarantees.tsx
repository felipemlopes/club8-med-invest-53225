
import { Button } from '@/components/ui/button';
import { Shield, Building, FileCheck, Lock } from 'lucide-react';

const SecurityGuarantees = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-club8-dark to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <Shield className="inline-block w-12 h-12 mr-4 text-club8-turquoise" />
            Estrutura de Mitigação de Risco e{' '}
            <span className="club8-text-gradient">Garantias Reais</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sua alocação é lastreada por mecanismos jurídicos de garantia real,
            oferecendo solidez patrimonial à emissão.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <a href="/garantias"
             className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-club8-turquoise border-opacity-30
             transition cursor-pointer"
          >
            <div className="rounded-2xl p-8">
              <div className="text-center mb-6">
                <Building className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Garantia Hipotecária</h3>
                <p className="text-gray-300">
                  Títulos com garantia real sobre ativos imobiliários selecionados,
                  devidamente averbados em cartório para assegurar a prioridade de
                  recebimento dos debenturistas.
                </p>
              </div>
            </div>
          </a>

          <a href="/garantias"
             className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-club8-turquoise border-opacity-30
             transition cursor-pointer"
          >
            <div className="rounded-2xl p-8">
              <div className="text-center mb-6">
                <FileCheck className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Alienação Fiduciária</h3>
                <p className="text-gray-300">
                  Mecanismo jurídico de transferência da propriedade resolúvel de ativos
                  como garantia direta do cumprimento das obrigações da emissora.
                </p>
              </div>
            </div>
          </a>

          <a href="/garantias"
             className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-club8-turquoise border-opacity-30
             transition cursor-pointer"
          >
            <div className="rounded-2xl p-8">
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Solidez Patrimonial</h3>
                <p className="text-gray-300">
                  Lastro patrimonial superior a R$ 1 bilhão, reforçando a capacidade de
                  pagamento e a robustez financeira do Club8.
                </p>
              </div>
            </div>
          </a>

        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-club8-dark">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">
                Investimento Estruturado com Lastro Real
              </h3>
              <p className="text-xl mb-8 opacity-90">
                O Club8 combina rentabilidade estratégica com uma robusta estrutura de mitigação de risco. Através de garantias reais e lastro imobiliário, oferecemos a solidez necessária para médicos que buscam diversificação inteligente em crédito privado com rentabilidade alvo diferenciada.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">+ R$ 1 Bi</div>
                  <div className="text-lg font-semibold">Patrimônio de Lastro do Grupo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2 Mecanismos</div>
                  <div className="text-lg font-semibold">Garantia Real e Fiduciária</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24%*</div>
                  <div className="text-lg font-semibold">Remuneração Alvo Anual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityGuarantees;
