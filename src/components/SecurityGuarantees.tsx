
import { Button } from '@/components/ui/button';
import { Shield, Building, FileCheck, Lock } from 'lucide-react';

const SecurityGuarantees = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-club8-dark to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <Shield className="inline-block w-12 h-12 mr-4 text-club8-turquoise" />
            Garantias <span className="club8-text-gradient">Reais</span> do Investimento
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seu investimento é protegido por três tipos de garantias sólidas e tangíveis, 
            oferecendo a segurança que você merece
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
            <div className="text-center mb-6">
              <Building className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Hipotecárias</h3>
              <p className="text-gray-300">
                Garantias lastreadas em imóveis e propriedades, 
                oferecendo segurança real e tangível para seu investimento 
                através de ativos imobiliários sólidos
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
            <div className="text-center mb-6">
              <FileCheck className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Alienação Fiduciária</h3>
              <p className="text-gray-300">
                Garantias com transferência de propriedade de bens móveis e imóveis, 
                assegurando o cumprimento das obrigações e proteção total 
                do capital investido
              </p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Patrimônio Sólido</h3>
              <p className="text-gray-300">
                Mais de R$ 1 bilhão em patrimônio como garantia adicional, 
                assegurando a solidez e confiabilidade dos investimentos 
                com lastro patrimonial robusto
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-club8-dark">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6">
                Investimento com Segurança Máxima
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Diferente de outros investimentos do mercado, o Club8 oferece três tipos de garantias reais, 
                proporcionando tranquilidade total para médicos que buscam rentabilidade superior com segurança
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">R$ 1+ Bi</div>
                  <div className="text-lg font-semibold">Patrimônio em Garantia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">3 Tipos</div>
                  <div className="text-lg font-semibold">Garantias Reais</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24%</div>
                  <div className="text-lg font-semibold">Rentabilidade Anual</div>
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
