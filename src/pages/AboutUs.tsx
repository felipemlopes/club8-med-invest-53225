
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Target, Heart, Users, TrendingUp, HeartPulse, Building, FileCheck, Lock } from 'lucide-react';

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
              Uma plataforma exclusiva de investimentos em crédito privado criada especialmente para médicos,
              oferecendo estruturas de remuneração alvo com o rigor de garantias reais.
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
                de investimento verdadeiramente exclusiva em crédito privado. Fundado por profissionais
                que compreendem as particularidades da carreira médica, desenvolvemos uma plataforma
                que combina remuneração alvo diferenciada com uma sólida estrutura de mitigação de risco.
              </p>
              <p className="text-lg text-gray-600">
                Com mais de R$ 1 bilhão em patrimônio de lastro do grupo, estabelecemos um novo padrão
                no mercado de investimentos para profissionais da saúde, oferecendo estruturas com lastro
                imobiliário e garantias reais.
              </p>
            </div>
            <div className="bg-gradient-to-br from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-white">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">+ R$ 1 Bi</div>
                  <div className="text-lg">Patrimônio de Lastro do Grupo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">21,6% a 24%*</div>
                  <div className="text-lg">Remuneração Alvo Anual</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-lg">Exclusivo para Médicos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">2</div>
                  <div className="text-lg">Mecanismos de Garantia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que investir com o Club8 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-club8-dark mb-6">
              Por que investir com o <span className="club8-text-gradient">Club8</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma plataforma exclusiva para médicos que buscam performance em crédito privado
              com o lastro de garantias reais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-club8-turquoise">
              <div className="text-club8-turquoise-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-club8-dark mb-3">Performance em Crédito Privado</h3>
              <p className="text-lg font-semibold text-club8-turquoise-secondary mb-2">
                Remuneração alvo de 21,6% a 24% ao ano.
              </p>
              <p className="text-gray-600">
                Estratégia de rendimento superior aos índices de referência tradicionais.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-club8-turquoise">
              <div className="text-club8-turquoise-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-club8-dark mb-3">Rigor em Garantias Reais</h3>
              <p className="text-lg font-semibold text-club8-turquoise-secondary mb-2">
                Operações com lastro imobiliário e garantias tangíveis.
              </p>
              <p className="text-gray-600">
                Transparência total através de relatórios e escrituras registradas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-club8-turquoise">
              <div className="text-club8-turquoise-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-club8-dark mb-3">Ecossistema Exclusivo</h3>
              <p className="text-lg font-semibold text-club8-turquoise-secondary mb-2">
                Para médicos que cuidam da saúde de todos.
              </p>
              <p className="text-gray-600">
                Um clube exclusivo para transformar dedicação em crescimento patrimonial contínuo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Estrutura de Mitigação de Risco e Garantias Reais */}
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
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
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

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
              <div className="text-center mb-6">
                <FileCheck className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Alienação Fiduciária</h3>
                <p className="text-gray-300">
                  Mecanismo jurídico de transferência da propriedade resolúvel de ativos
                  como garantia direta do cumprimento das obrigações da emissora.
                </p>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-club8-turquoise border-opacity-30">
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 text-club8-turquoise mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Solidez Patrimonial</h3>
                <p className="text-gray-300">
                  Lastro patrimonial superior a R$ 1 bilhão, reforçando a capacidade de
                  pagamento e a robustez financeira do Club8.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-club8-dark">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-6">
                  Investimento Estruturado com Lastro Real
                </h3>
                <p className="text-xl mb-8 opacity-90">
                  O Club8 combina remuneração estratégica com uma robusta estrutura de mitigação de risco. Através de garantias reais e lastro imobiliário, oferecemos a solidez necessária para médicos que buscam diversificação inteligente em crédito privado com remuneração alvo diferenciada.
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
                  Democratizar o acesso a investimentos de alta performance em crédito privado para médicos,
                  oferecendo oportunidades exclusivas com segurança, lastro real e transparência total.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser a principal plataforma de investimentos em crédito privado para profissionais da saúde no Brasil,
                  reconhecida pela excelência, rigor em garantias e remuneração alvo diferenciada.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <Heart className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Valores</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Transparência total</li>
                  <li>• Rigor em garantias reais</li>
                  <li>• Exclusividade médica</li>
                  <li>• Remuneração alvo alinhada</li>
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
                  <h3 className="text-xl font-bold mb-2">Estrutura de Mitigação de Risco</h3>
                  <p className="text-gray-300">
                    Garantia hipotecária, alienação fiduciária e patrimônio de lastro superior a R$ 1 bilhão
                    compõem a base de solidez de cada emissão.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-club8-turquoise mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Exclusivo para Médicos</h3>
                  <p className="text-gray-300">
                    Plataforma desenvolvida especificamente para profissionais da saúde,
                    com produtos adequados ao perfil e objetivos do investidor médico.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <TrendingUp className="w-8 h-8 text-club8-turquoise mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Remuneração Alvo Diferenciada</h3>
                  <p className="text-gray-300">
                    Remuneração alvo de 21,6% a 24% ao ano, estruturada em debêntures com lastro
                    real para investidores em busca de performance consistente.
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
                <li>✓ Títulos estruturados em crédito privado</li>
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
