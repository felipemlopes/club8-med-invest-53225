
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import {useQuery} from "@tanstack/react-query";
import investmentApi, {Document, Plan} from "@/lib/investmentApi.ts";
const InvestmentPlans = () => {
  /*const {
    data: plans = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['plans'],
    queryFn: () => investmentApi.getPlans(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });*/

  const { data: plans = [], isLoading, error, refetch } = useQuery<Plan[]>({
    queryKey: ['/api/plans'],
    queryFn: () => investmentApi.getPlans(),
    staleTime: 30000,
    retry: 2,
  });

  //const plans = response?.data || [];

  /*const plans = [{
    name: "Club8 Gold",
    cotas: "1 Cota",
    investmentValue: "R$ 50.000",
    monthlyReturn: "1,8%",
    annualReturn: "21,6%",
    carencia: "1 ano",
    liquidez: "Semestral",
    yearlyProfit: "R$ 10.800",
    features: ["Rentabilidade de 1,8% ao mês", "Carência de 1 ano", "Liquidez semestral", "Acesso ao programa de indicações", "Relatórios financeiros mensais"],
    popular: false
  }, {
    name: "Club8 Platinum",
    cotas: "2+ Cotas",
    investmentValue: "R$ 100.000+",
    monthlyReturn: "2,0%",
    annualReturn: "24%",
    carencia: "1 ano",
    liquidez: "Trimestral",
    yearlyProfit: "R$ 24.000+",
    features: ["Rentabilidade de 2,0% ao mês", "Carência de 1 ano", "Liquidez trimestral", "Programa de indicações premium", "Relatórios detalhados", "Atendimento prioritário"],
    popular: true
  }];*/
  return <section id="planos" className="py-20 bg-club8-dark anchor-offset">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Escolha seu <span className="club8-text-gradient">Plano de Investimento</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dois planos exclusivos pensados para diferentes perfis de investimento
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => <div key={index} className={`relative bg-white rounded-3xl p-8 shadow-2xl ${plan.popular ? 'ring-4 ring-club8-turquoise' : ''} hover:scale-105 transition-all duration-300`}>
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-club8-turquoise text-club8-dark px-6 py-2 rounded-full font-bold flex items-center gap-2">
                    <Star size={16} className="fill-current" />
                    Mais Popular
                  </div>
                </div>}

              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-club8-dark mb-2">
                  {plan.name}
                </h3>
                <div className="text-6xl font-bold club8-text-gradient mb-2">
                  {plan.monthly_return}
                </div>
                <div className="text-lg text-gray-600 mb-4">ao mês</div>
                <div className="text-2xl font-bold text-club8-dark">
                  {plan.annual_return} ao ano
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-club8-dark">
                      {plan.cotas}
                    </div>
                    <div className="text-sm text-gray-600">Cotas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-club8-dark">
                      {plan.min_investment}
                    </div>
                    <div className="text-sm text-gray-600">Investimento</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-club8-turquoise-secondary ">
                      {plan.carencia}
                    </div>
                    <div className="text-sm text-gray-600">Carência</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-club8-turquoise-secondary ">
                      {plan.liquidez}
                    </div>
                    <div className="text-sm text-gray-600">Liquidez</div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-center p-4 bg-club8-turquoise bg-opacity-10 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Lucro projetado em 1 ano</div>
                  <div className="text-3xl font-bold club8-text-gradient">
                    {plan.yearlyProfit}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.benefits.map((feature, featureIndex) =>
                    <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-club8-turquoise flex-shrink-0" />
                    <span className="text-gray-700">{feature.name}</span>
                  </div>
                )}
              </div>

              <Button onClick={() => {
                document
                    .getElementById('seja-socio')
                    ?.scrollIntoView({ behavior: 'smooth' })
              }} variant="outline" className={`w-full py-4 text-lg font-bold ${plan.popular ? 'bg-club8-turquoise hover:bg-club8-white hover:border-club8-turquoise text-club8-dark' : 'bg-club8-dark hover:bg-club8-white hover:text-black hover:border-black text-white'}`} size="lg">
                Quero Investir Agora
              </Button>
            </div>)}
        </div>
      </div>
    </section>;
};
export default InvestmentPlans;
