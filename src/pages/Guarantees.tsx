
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Building, FileCheck, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Guarantees = () => {
  // @ts-ignore
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Shield className="w-20 h-20 text-club8-turquoise mx-auto mb-6" />
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Estrutura de Mitigação de Risco e{' '}
              <span className="club8-text-gradient">Garantias Reais</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sua alocação em crédito privado é lastreada por mecanismos jurídicos de garantia real,
              oferecendo solidez patrimonial à emissão e a segurança que sua profissão exige.
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de Garantias */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-club8-dark mb-6">Mecanismos que Protegem sua Alocação</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diferente de outras alternativas de renda fixa, o Club8 aplica múltiplas camadas de proteção
              ao capital, reforçando a robustez da estrutura empreendida.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-blue-200">
              <div className="text-center">
                <Building className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Garantia Hipotecária</h3>
                <p className="text-gray-700">
                  Títulos com garantia real sobre ativos imobiliários selecionados, devidamente averbados
                  em cartório para assegurar a prioridade de recebimento dos debenturistas.
                </p>
              </div>
            </div>

            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-green-200">
              <div className="text-center">
                <FileCheck className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Alienação Fiduciária</h3>
                <p className="text-gray-700">
                  Mecanismo jurídico de transferência da propriedade resolúvel de ativos como garantia
                  direta do cumprimento das obrigações da emissora.
                </p>
              </div>
            </div>

            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-purple-200">
              <div className="text-center">
                <Lock className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Solidez Patrimonial</h3>
                <p className="text-gray-700">
                  Lastro patrimonial superior a R$ 1 bilhão, reforçando a capacidade de pagamento e a
                  robustez financeira do Club8.
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
                  O Club8 combina rentabilidade estratégica com uma robusta estrutura de mitigação de risco.
                  Através de garantias reais e lastro imobiliário, oferecemos a solidez necessária para
                  médicos que buscam diversificação inteligente em crédito privado com remuneração alvo
                  diferenciada.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">+ R$ 1 Bi</div>
                    <div className="text-base font-semibold">Patrimônio de Lastro do Grupo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">2 Mecanismos</div>
                    <div className="text-base font-semibold">Garantia Real e Fiduciária</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">24%*</div>
                    <div className="text-base font-semibold">Remuneração Alvo Anual</div>
                  </div>
                </div>

                <p className="text-sm opacity-80">
                  * Remuneração alvo para quem adquirir 2 ou mais títulos. Consulte a nota explicativa no rodapé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que isso é importante */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-club8-dark mb-6">
                Por que isso é importante para você?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-club8-dark mb-2">Solidez Patrimonial</h3>
                    <p className="text-gray-600">
                      Mecanismos de garantia real sobre ativos selecionados, oferecendo respaldo jurídico
                      à emissão.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-club8-dark mb-2">Tranquilidade</h3>
                    <p className="text-gray-600">
                      Você pode focar em sua carreira médica sabendo que seu patrimônio está alocado em
                      uma estrutura com múltiplas camadas de proteção.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-club8-dark mb-2">Transparência</h3>
                    <p className="text-gray-600">
                      Todas as garantias são documentadas e você tem acesso a relatórios e informações
                      sobre a estrutura de proteção da sua alocação.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-club8-dark to-gray-900 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-6">Diferencial para Médicos Investidores</h3>
              <p className="text-xl mb-8 opacity-90">
                Uma plataforma exclusiva para médicos que une performance em crédito privado com a
                solidez de garantias reais, lastro imobiliário e acompanhamento transparente.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-2xl font-bold">+ R$ 1 Bi</div>
                  <div className="text-sm opacity-90">em Lastro Patrimonial</div>
                </div>
                <div className="text-center">
                  <Lock className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm opacity-90">Mecanismos de Garantia</div>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-club8-turquoise text-club8-dark hover:bg-club8-turquoise-secondary font-semibold"
              >
                <a href="/login">Quero Investir com Segurança</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guarantees;
