
import { Button } from '@/components/ui/button';
import { Gift, UserPlus, RefreshCw, Calculator } from 'lucide-react';

const BonusSection = () => {
  return (
    <section id="bonificacoes" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
            <Gift className="inline-block w-12 h-12 mr-4 text-club8-turquoise-secondary" />
            Programa de <span className="club8-text-gradient">Bonificações</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ganhe ainda mais com nosso programa exclusivo de recompensas para membros Club8
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bonificação por Renovação */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="text-center mb-6">
              <RefreshCw className="w-16 h-16 text-club8-turquoise-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-club8-dark mb-2">
                Bonificação por Renovação
              </h3>
              <p className="text-gray-600">
                Renove por mais 1 ano ou faça upgrade e ganhe 1 mês extra de rendimento
              </p>
            </div>

            <div className="bg-club8-turquoise bg-opacity-10 rounded-2xl p-6 mb-6">
              <h4 className="text-lg font-bold text-club8-dark mb-4">Exemplo Prático:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Investimento Inicial (Club8 Gold):</span>
                  <span className="font-bold">R$ 50.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento 1º Ano:</span>
                  <span className="font-bold">R$ 10.800</span>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento 2º Ano:</span>
                  <span className="font-bold">R$ 10.800</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-club8-turquoise-secondary font-bold">Bônus Renovação:</span>
                  <span className="font-bold text-club8-turquoise-secondary">+ R$ 900</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-lg font-bold">Total em 2 anos:</span>
                  <span className="text-lg font-bold text-club8-turquoise-secondary">R$ 72.500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Programa de Indicações */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="text-center mb-6">
              <UserPlus className="w-16 h-16 text-club8-turquoise-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-club8-dark mb-2">
                Programa de Indicações
              </h3>
              <p className="text-gray-600">
                Receba 1% do valor investido por cada indicação válida
              </p>
            </div>

            <div className="bg-club8-turquoise bg-opacity-10 rounded-2xl p-6 mb-6">
              <h4 className="text-lg font-bold text-club8-dark mb-4">Exemplos Práticos:</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Indicou investimento de R$ 50.000:</span>
                  <span className="font-bold text-club8-turquoise-secondary">+ R$ 500</span>
                </div>
                <div className="flex justify-between">
                  <span>Indicou investimento de R$ 100.000:</span>
                  <span className="font-bold text-club8-turquoise-secondary">+ R$ 1.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Indicou investimento de R$ 150.000:</span>
                  <span className="font-bold text-club8-turquoise-secondary">+ R$ 1.500</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-lg font-bold">10 Indicações (R$ 100k cada):</span>
                  <span className="text-lg font-bold club8-text-gradient">+ R$ 10.000</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-club8-turquoise-100 text-club8-dark px-4 py-2 rounded-full text-sm font-semibold">
                <span>💡</span>
                <span>Sem limite de indicações! 1% sobre cada investimento!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Combinação dos Benefícios */}
        <div className="bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-club8-dark">
          <div className="text-center mb-8">
            <Calculator className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">
              Potencial de Ganhos com Indicações
            </h3>
            <p className="text-xl opacity-90">
              Veja o poder do novo sistema: 1% sobre cada valor investido por suas indicações
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white bg-opacity-20 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Cenário Conservador</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>5 Indicações de R$ 50.000:</span>
                    <span className="font-bold">R$ 2.500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seu investimento + rendimento:</span>
                    <span className="font-bold">R$ 50.000 + R$ 10.800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bônus renovação:</span>
                    <span className="font-bold">+ R$ 900</span>
                  </div>
                  <div className="flex justify-between border-t border-opacity-30 pt-2">
                    <span className="text-lg font-bold">Total adicional:</span>
                    <span className="text-lg font-bold">+ R$ 3.400</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="font-bold text-lg">6,8% extra só com bônus!</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-bold mb-4">Cenário Otimista</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>10 Indicações de R$ 100.000:</span>
                    <span className="font-bold">R$ 10.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seu investimento + rendimento:</span>
                    <span className="font-bold">R$ 100.000 + R$ 24.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bônus renovação:</span>
                    <span className="font-bold">+ R$ 2.000</span>
                  </div>
                  <div className="flex justify-between border-t border-opacity-30 pt-2">
                    <span className="text-lg font-bold">Total adicional:</span>
                    <span className="text-lg font-bold">+ R$ 12.000</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="font-bold text-lg">12% extra só com bônus!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-4 bg-white bg-opacity-30 rounded-xl">
              <p className="text-lg font-bold">
                💰 Quanto mais você indicar, mais você ganha! 
                Cada indicação de R$ 100.000 = R$ 1.000 para você!
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-club8-dark hover:bg-gray-800 text-white px-8 py-4 text-lg">
              Quero Aproveitar os Benefícios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
