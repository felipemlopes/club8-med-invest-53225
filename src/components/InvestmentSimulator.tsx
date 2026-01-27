import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp } from 'lucide-react';

const InvestmentSimulator = () => {
  const [cotas, setCotas] = useState('1');
  const [periodo, setPeriodo] = useState('1');
  const [showComparison, setShowComparison] = useState(false);

  const calcularRetorno = (cotas: number, anos: number) => {
    const valorInvestido = cotas * 50000;
    const taxaMensal = cotas === 1 ? 0.018 : 0.02;
    const meses = anos * 12;

    // Rentabilidade simples (não compostos)
    const retorno = valorInvestido * taxaMensal * meses;
    return {
      investido: valorInvestido,
      retorno: retorno,
      total: valorInvestido + retorno
    };
  };

  const calcularComparacao = (valor: number, anos: number) => {
    const meses = anos * 12;
    return {
      poupanca: valor * (0.005 * meses), // 0,5% ao mês
      cdb: valor * (0.012 * meses), // 1,2% ao mês
      tesouro: valor * (0.01 * meses), // 1% ao mês
      lci: valor * (0.008 * meses) // 0,8% ao mês
    };
  };

  const resultado = calcularRetorno(parseInt(cotas), parseInt(periodo));
  const comparacao = calcularComparacao(resultado.investido, parseInt(periodo));

  const cotasOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <section id="simulador" className="py-20 bg-gray-50 anchor-offset">
      <div className="container mx-auto px-6">
        <div className="text-center text-club8-turquoise-secondary ">
          <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
            <Calculator className="inline-block w-12 h-12 mr-4 text-club8-turquoise-secondary " />
            Simulador de <span className="club8-text-gradient">Investimentos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra quanto seu dinheiro pode render no Club8 e compare com outros investimentos
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-lg font-semibold text-club8-dark mb-3">
                  Quantas cotas deseja investir?
                </label>
                <Select value={cotas} onValueChange={setCotas}>
                  <SelectTrigger className="w-full h-14 text-lg border-2 border-club8-turquoise">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cotasOptions.map(num => <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'cota' : 'cotas'} - R$ {(num * 50000).toLocaleString('pt-BR')}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-lg font-semibold text-club8-dark mb-3">
                  Por quanto tempo?
                </label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger className="w-full h-14 text-lg border-2 border-club8-turquoise">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 ano</SelectItem>
                    <SelectItem value="2">2 anos</SelectItem>
                    <SelectItem value="3">3 anos</SelectItem>
                    <SelectItem value="5">5 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary p-8 rounded-2xl text-club8-dark">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm opacity-80 mb-2">Valor Investido</div>
                  <div className="text-3xl font-bold">
                    R$ {resultado.investido.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-2">Retorno</div>
                  <div className="text-3xl font-bold">
                    R$ {resultado.retorno.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div>
                  <div className="text-sm opacity-80 mb-2">Total</div>
                  <div className="text-4xl font-bold">
                    R$ {resultado.total.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <div className="text-lg font-semibold">
                  Plano: {parseInt(cotas) === 1 ? 'Club8 Gold (1,8% a.m.)' : 'Club8 Platinum (2,0% a.m.)'}
                </div>
              </div>

              <p className="mt-3 text-center italic">
                Simulações de valores sem considerar o Programa de Bonificações
              </p>

            </div>

            <div className="text-center mt-8">
              <Button onClick={() => setShowComparison(!showComparison)} variant="outline" className="border-club8-turquoise bg-club8-turquoise text-black hover:bg-club8-white hover:text-club8-dark">
                <TrendingUp className="w-5 h-5 mr-2" />
                {showComparison ? 'Ocultar' : 'Ver'} Comparativo com Mercado
              </Button>
            </div>
          </div>

          {showComparison && (
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in-up">
              <h3 className="text-2xl font-bold text-club8-dark mb-6 text-center">
                Comparativo com Outros Investimentos
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-club8-turquoise">
                  <div className="text-lg font-bold text-club8-dark mb-2">Club8</div>
                  <div className="text-3xl font-bold club8-text-gradient">
                    R$ {resultado.retorno.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {parseInt(cotas) === 1 ? '21,6% a.a.' : '24% a.a.'}
                  </div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-700 mb-2">CDB</div>
                  <div className="text-3xl font-bold text-gray-700">
                    R$ {comparacao.cdb.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">14,4% a.a.</div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-700 mb-2">Tesouro Direto</div>
                  <div className="text-3xl font-bold text-gray-700">
                    R$ {comparacao.tesouro.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">12% a.a.</div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-700 mb-2">Poupança</div>
                  <div className="text-3xl font-bold text-gray-700">
                    R$ {comparacao.poupanca.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">6% a.a.</div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-lg font-bold text-gray-700 mb-2">LCI/LCA</div>
                  <div className="text-3xl font-bold text-gray-700">
                    R$ {comparacao.lci.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">9,6% a.a.</div>
                </div>
              </div>

              <div className="text-center mt-8 p-6 bg-club8-turquoise bg-opacity-10 rounded-xl">
                <p className="text-lg text-club8-dark">
                  <strong>Vantagem do Club8:</strong> Até{' '}
                  <span className="font-bold club8-text-gradient">
                    R$ {(resultado.retorno - Math.max(comparacao.cdb, comparacao.tesouro, comparacao.poupanca, comparacao.lci)).toLocaleString('pt-BR')}
                  </span>{' '}
                  a mais que o melhor investimento tradicional!
                </p>
              </div>

              <p className="mt-3 text-center italic">
                Comparativo usando valores aproximados de apliações tradicionais do mercado
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvestmentSimulator;
