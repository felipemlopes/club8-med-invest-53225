import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Star } from 'lucide-react';
const HighlightSection = () => {
  const highlights = [{
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Rentabilidade Superior",
    description: "De 21,6% a 24% ao ano ou mais",
    detail: "Muito acima da poupança e CDB"
  }, {
    icon: <Shield className="w-8 h-8" />,
    title: "Máxima Segurança",
    description: "Investimentos protegidos",
    detail: "Total transparência e controle"
  }, {
    icon: <Star className="w-8 h-8" />,
    title: "Benefícios Únicos",
    description: "Programa de recompensas",
    detail: "Bonificações exclusivas para membros"
  }];
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
            Por que escolher o <span className="club8-text-gradient">Club8</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma exclusiva para médicos que buscam rentabilidade superior 
            com a segurança que sua profissão merece
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, index) => <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-club8-turquoise">
              <div className="text-club8-turquoise-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-club8-dark mb-3">
                {item.title}
              </h3>
              <p className="text-lg font-semibold text-club8-turquoise-secondary mb-2">
                {item.description}
              </p>
              <p className="text-gray-600">
                {item.detail}
              </p>
            </div>)}
        </div>

        <div className="text-center bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary p-12 rounded-3xl">
          <h3 className="text-3xl font-bold text-club8-dark mb-6">
            Pronto para começar a investir?
          </h3>
          <p className="text-xl text-club8-dark mb-8 opacity-90">
            Faça uma simulação gratuita ou comece a investir agora mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => {
              document
                  .getElementById('simulador')
                  ?.scrollIntoView({ behavior: 'smooth' })
            }} size="lg" className="bg-club8-dark hover:bg-gray-800 text-white px-8 py-4 text-lg">
              Fazer Simulação
            </Button>
            <Button onClick={() => {
              document
                  .getElementById('seja-socio')
                  ?.scrollIntoView({ behavior: 'smooth' })
            }} size="lg" variant="outline" className="border-club8-dark text-club8-dark hover:bg-club8-dark hover:text-white px-8 py-4 text-lg">
              Quero Investir Agora
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HighlightSection;