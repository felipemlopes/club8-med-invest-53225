
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Building, FileCheck, Lock, CheckCircle, DollarSign } from 'lucide-react';
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
              Garantias <span className="club8-text-gradient">Reais</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seu investimento protegido por três tipos diferentes de garantias sólidas e tangíveis, 
              oferecendo a segurança que você merece como médico
            </p>
          </div>
        </div>
      </section>

      {/* Tipos de Garantias */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-club8-dark mb-6">Nossos Três Tipos de Garantias</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diferente de outros investimentos, o Club8 oferece múltiplas camadas de proteção 
              para seu capital, garantindo tranquilidade total
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-blue-200">
              <div className="text-center">
                <Building className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Garantias Hipotecárias</h3>
                <p className="text-gray-700 mb-6">
                  Seu investimento é protegido por imóveis reais e propriedades físicas. 
                  Isso significa que há bens concretos garantindo seu dinheiro.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-club8-dark mb-2">Como funciona:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Imóveis como garantia real</li>
                    <li>• Registro em cartório</li>
                    <li>• Avaliação profissional</li>
                    <li>• Liquidez garantida</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-green-200">
              <div className="text-center">
                <FileCheck className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Alienação Fiduciária</h3>
                <p className="text-gray-700 mb-6">
                  Garantia onde bens são transferidos temporariamente como forma de assegurar 
                  o pagamento, oferecendo proteção jurídica máxima.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-club8-dark mb-2">Como funciona:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Transferência de propriedade</li>
                    <li>• Proteção jurídica total</li>
                    <li>• Processo simplificado</li>
                    <li>• Execução rápida</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-club8-turquoise rounded-2xl p-8 border-2 border-purple-200">
              <div className="text-center">
                <Lock className="w-16 h-16 text-club8-dark mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-club8-dark mb-4">Patrimônio Sólido</h3>
                <p className="text-gray-700 mb-6">
                  Mais de R$ 1 bilhão em patrimônio da empresa como garantia adicional, 
                  demonstrando nossa solidez financeira.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-bold text-club8-dark mb-2">Como funciona:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Patrimônio corporativo</li>
                    <li>• Auditoria independente</li>
                    <li>• Transparência total</li>
                    <li>• Solidez comprovada</li>
                  </ul>
                </div>
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
                    <h3 className="font-bold text-club8-dark mb-2">Segurança Total</h3>
                    <p className="text-gray-600">
                      Com três tipos diferentes de garantias, seu investimento está protegido 
                      contra qualquer eventualidade.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-club8-dark mb-2">Tranquilidade</h3>
                    <p className="text-gray-600">
                      Você pode focar em sua carreira médica sabendo que seu dinheiro está 
                      seguro e rentabilizando.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-bold text-club8-dark mb-2">Transparência</h3>
                    <p className="text-gray-600">
                      Todas as garantias são documentadas e você tem acesso total às 
                      informações sobre a proteção do seu investimento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-club8-turquoise to-club8-turquoise-secondary rounded-3xl p-8 text-black">
              <h3 className="text-3xl font-bold mb-6">Diferencial Único no Mercado</h3>
              <p className="text-xl mb-8 opacity-90">
                Nenhuma outra plataforma oferece três tipos diferentes de garantias reais 
                para proteger seu investimento
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <DollarSign className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-2xl font-bold">R$ 1+ Bi</div>
                  <div className="text-sm opacity-90">em Garantias</div>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Protegido</div>
                </div>
              </div>
              
              <Button 
                asChild
                className="w-full bg-white text-club8-dark hover:bg-club8-turquoise font-semibold"
              >
                <a href="/login">Quero Investir com Segurança</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparação */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-club8-dark mb-6">
              Club8 vs. Outros Investimentos
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-600 mb-6">Outros Investimentos</h3>
              <ul className="space-y-3 text-gray-700">
                <li>❌ Garantias limitadas ou inexistentes</li>
                <li>❌ Rentabilidades baixas (0,5% a 1% a.m.)</li>
                <li>❌ Sem exclusividade para médicos</li>
                <li>❌ Processos burocráticos</li>
                <li>❌ Falta de transparência</li>
                <li>❌ Suporte limitado</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Club8</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ Três tipos de garantias reais</li>
                <li>✅ Alta rentabilidade (1,8% a 2% a.m.)</li>
                <li>✅ Exclusivo para médicos</li>
                <li>✅ Processo simples e ágil</li>
                <li>✅ Transparência total</li>
                <li>✅ Suporte especializado</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guarantees;
