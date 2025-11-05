
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Target, Heart, Users, Award, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Quem é o <span className="club8-text-gradient">Club8</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Uma plataforma exclusiva de investimentos criada especialmente para médicos, 
              oferecendo oportunidades únicas de rentabilidade com segurança máxima
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-club8-dark mb-6">Nossa História</h2>
              <p className="text-lg text-gray-600 mb-6">
                O Club8 nasceu da necessidade de oferecer aos médicos brasileiros uma alternativa 
                de investimento verdadeiramente exclusiva e rentável. Fundado por profissionais 
                que compreendem as particularidades da carreira médica, desenvolvemos uma plataforma 
                que combina alta rentabilidade com segurança institucional.
              </p>
              <p className="text-lg text-gray-600">
                Com mais de R$ 1 bilhão em patrimônio como garantia, estabelecemos um novo padrão 
                no mercado de investimentos para profissionais da saúde, oferecendo rentabilidades 
                superiores às encontradas no mercado tradicional.
              </p>
            </div>
            <div className="bg-gradient-to-br from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">R$ 1+ Bi</div>
                  <div className="text-lg">Patrimônio em Garantia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24%</div>
                  <div className="text-lg">Rentabilidade Anual</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-lg">Exclusivo para Médicos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">3 Tipos</div>
                  <div className="text-lg">Garantias Reais</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-club8-dark mb-6">Missão, Visão e Valores</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <Target className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Missão</h3>
                <p className="text-gray-600">
                  Democratizar o acesso a investimentos de alta rentabilidade para médicos, 
                  oferecendo oportunidades exclusivas com segurança e transparência total.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal plataforma de investimentos para profissionais da saúde no Brasil, 
                  reconhecida pela excelência e inovação em produtos financeiros.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <Heart className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Valores</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Transparência total</li>
                  <li>• Segurança máxima</li>
                  <li>• Exclusividade</li>
                  <li>• Rentabilidade superior</li>
                  <li>• Compromisso com médicos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que somos diferentes */}
      <section className="py-20 bg-club8-dark text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Por que somos <span className="club8-text-gradient">diferentes</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-club8-turquoise mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Garantias Reais</h3>
                  <p className="text-gray-300">
                    Três tipos de garantias sólidas: hipotecárias, alienação fiduciária e 
                    mais de R$ 1 bilhão em patrimônio como lastro.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-club8-turquoise mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Exclusivo para Médicos</h3>
                  <p className="text-gray-300">
                    Plataforma desenvolvida especificamente para profissionais da saúde, 
                    com produtos adequados ao perfil médico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-club8-turquoise mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Rentabilidade Superior</h3>
                  <p className="text-gray-300">
                    Oferecemos rentabilidades de até 24% ao ano, muito superiores aos 
                    investimentos tradicionais do mercado.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-club8-turquoise">Nosso Compromisso</h3>
              <p className="text-gray-300 mb-6">
                Entendemos que médicos dedicam suas vidas ao cuidado de outros e merecem 
                ter suas finanças cuidadas com a mesma dedicação. Por isso, desenvolvemos 
                uma plataforma que oferece:
              </p>
              <ul className="space-y-3 text-gray-300">
                <li>✓ Atendimento personalizado e especializado</li>
                <li>✓ Produtos exclusivos não disponíveis no mercado</li>
                <li>✓ Transparência total em todos os processos</li>
                <li>✓ Suporte dedicado durante todo o investimento</li>
                <li>✓ Garantias reais e tangíveis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
