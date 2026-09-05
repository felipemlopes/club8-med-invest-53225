
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, Lock } from 'lucide-react';

const BonusSection = () => {
  return (
      <section id="bonificacoes" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center gap-2 bg-club8-turquoise/10 text-club8-dark px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4 text-club8-turquoise-secondary" />
                Exclusivo para membros
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-club8-dark mb-4 md:mb-6">
                <Gift className="inline-block w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4 text-club8-turquoise-secondary" />
                Programa de <span className="club8-text-gradient">Bonificações</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Como membro do Club8, você acessa um programa exclusivo de bonificações
                que pode aumentar ainda mais o retorno sobre o seu investimento.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-club8-turquoise/10 rounded-2xl p-5 text-center">
                  <Sparkles className="w-10 h-10 text-club8-turquoise-secondary mx-auto mb-3" />
                  <h3 className="font-bold text-club8-dark mb-1">Mais retorno</h3>
                  <p className="text-sm text-gray-600">
                    Benefícios extras que se somam à rentabilidade do seu plano.
                  </p>
                </div>
                <div className="bg-club8-turquoise/10 rounded-2xl p-5 text-center">
                  <Lock className="w-10 h-10 text-club8-turquoise-secondary mx-auto mb-3" />
                  <h3 className="font-bold text-club8-dark mb-1">Acesso exclusivo</h3>
                  <p className="text-sm text-gray-600">
                    As regras do programa são reveladas após você ingressar e realizar seu aporte.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-5">
                  Faça parte do Club8 e descubra como potencializar ainda mais seus ganhos.
                </p>
                <Button onClick={() => {
                  document
                      .getElementById('investir')
                      ?.scrollIntoView({ behavior: 'smooth' })
                }} size="lg" className="bg-club8-dark hover:bg-club8-white hover:text-black text-white px-8 py-4 text-lg">
                  Quero fazer parte do Club8
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default BonusSection;
