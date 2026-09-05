import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, HeartPulse } from 'lucide-react';
const HighlightSection = () => {
  const highlights = [{
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Performance em Crédito Privado",
    description: "Remuneração alvo de 21,6% a 24% ao ano",
    detail: "Estratégia de rendimento superior aos índices de referência tradicionais"
  }, {
    icon: <Shield className="w-8 h-8" />,
    title: "Rigor em Garantias Reais",
    description: "Operações com lastro imobiliário e garantias tangíveis",
    detail: "Transparência total através de relatórios e escrituras registradas"
  }, {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Ecossistema Exclusivo",
    description: "Para médicos que cuidam da saúde de todos",
    detail: "Um clube exclusivo para transformar dedicação em crescimento patrimonial contínuo"
  }];
  return <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
            Por que investir com o <span className="club8-text-gradient">Club8</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma plataforma exclusiva para médicos que buscam performance em crédito privado
            com o lastro de garantias reais
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
            Pronto para diversificar seu patrimônio?
          </h3>
          <p className="text-xl text-club8-dark mb-8 opacity-90">
            Saiba mais sobre o Club8 e acesse os detalhes da emissão
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-club8-dark hover:bg-gray-800 text-white px-8 py-4 text-lg">
              <a href="#investir">Ver oportunidade</a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default HighlightSection;