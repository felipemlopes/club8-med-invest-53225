
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, Users } from 'lucide-react';

const QuotasAvailable = () => {
  const [totalQuotas] = useState(200); // Total de cotas disponíveis (aumentado para 10M)
  const [quotasVendidas] = useState(134); // Cotas já vendidas (proporcional)
  const quotasDisponiveis = totalQuotas - quotasVendidas;
  const percentualVendido = (quotasVendidas / totalQuotas) * 100;

  return (
    <section id="cotas" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
            Cotas <span className="club8-text-gradient">Limitadas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Club8 é um investimento exclusivo com número limitado de cotas por rodada. 
            Garante já a sua participação!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-club8-dark to-gray-900 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Rodada Atual de Captação</h3>
              <p className="text-xl text-gray-300">
                Limite de R$ 10.000.000 (200 cotas)
              </p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Progresso da Captação</span>
                <span className="text-2xl font-bold club8-text-gradient">
                  {percentualVendido.toFixed(1)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-6 mb-4">
                <div 
                  className="h-6 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${percentualVendido}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold club8-text-gradient mb-1">
                    {quotasVendidas}
                  </div>
                  <div className="text-sm text-gray-300">Cotas Vendidas</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-club8-turquoise mb-1">
                    {quotasDisponiveis}
                  </div>
                  <div className="text-sm text-gray-300">Cotas Disponíveis</div>
                </div>
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">
                    {totalQuotas}
                  </div>
                  <div className="text-sm text-gray-300">Total de Cotas</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-club8-turquoise mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Captação Limitada</h4>
                <p className="text-gray-300 text-sm">
                  Apenas 200 cotas por rodada para garantir exclusividade
                </p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-club8-turquoise mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Tempo Limitado</h4>
                <p className="text-gray-300 text-sm">
                  Quando esgotadas, próxima abertura apenas em 6 meses
                </p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-club8-turquoise mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Lista de Espera</h4>
                <p className="text-gray-300 text-sm">
                  Prioridade para quem se cadastrar na lista de espera
                </p>
              </div>
            </div>

            {quotasDisponiveis > 0 ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-lg text-gray-300 mb-2">Restam apenas</div>
                  <div className="text-4xl font-bold club8-text-gradient mb-2">
                    {quotasDisponiveis} cotas
                  </div>
                  <div className="text-lg text-gray-300">disponíveis nesta rodada</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-bold px-8 py-4 text-lg">
                    Garantir Minha Cota
                  </Button>
                  <Button size="lg" variant="outline" className="border-club8-turquoise text-club8-dark hover:bg-club8-turquoise hover:text-club8-dark px-8 py-4 text-lg">
                    Lista de Espera
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-red-400 mb-2">
                    🔴 Cotas Esgotadas
                  </div>
                  <div className="text-lg text-gray-300">
                    Próxima rodada em 6 meses
                  </div>
                </div>
                <Button size="lg" className="bg-club8-turquoise hover:bg-club8-turquoise-secondary text-club8-dark font-bold px-8 py-4 text-lg">
                  Entrar na Lista de Espera
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotasAvailable;
