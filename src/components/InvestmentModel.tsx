import { FileText, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';

const InvestmentModel = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-club8-turquoise/10 text-club8-dark font-semibold text-sm mb-5">
            <FileText className="w-4 h-4" />
            Modelo de Investimento
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-club8-dark mb-4 md:mb-6">
            Você investe através de uma{' '}
            <span className="club8-text-gradient">Debênture</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Ao investir no Club8, você não está apenas aplicando dinheiro: você está adquirindo um
            título oficial do mercado de capitais, com regras claras, prazos definidos e remuneração
            previsível.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10 md:mb-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-club8-turquoise/10 flex items-center justify-center mb-5">
              <FileText className="w-7 h-7 text-club8-turquoise" />
            </div>
            <h3 className="text-xl font-bold text-club8-dark mb-3">O que é uma Debênture?</h3>
            <p className="text-gray-600 leading-relaxed">
              É um título de crédito emitido por uma empresa para captar recursos. Na prática, você
              empresta capital para o Club8 e, em troca, recebe um contrato formal garantindo a
              devolução do valor investido acrescido da remuneração combinada.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-club8-turquoise/10 flex items-center justify-center mb-5">
              <TrendingUp className="w-7 h-7 text-club8-turquoise" />
            </div>
            <h3 className="text-xl font-bold text-club8-dark mb-3">Como funciona na prática?</h3>
            <p className="text-gray-600 leading-relaxed">
              Você escolhe seu plano, realiza o aporte e recebe sua debênture registrada. A partir
              daí, sua rentabilidade é contratual — ou seja, está prevista em documento, não depende
              de oscilação de mercado e oferece total previsibilidade.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-club8-turquoise/10 flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-club8-turquoise" />
            </div>
            <h3 className="text-xl font-bold text-club8-dark mb-3">Por que é seguro?</h3>
            <p className="text-gray-600 leading-relaxed">
              Debêntures são instrumentos consagrados do mercado financeiro, utilizados por grandes
              empresas e respaldados por garantias reais. Você sabe exatamente quanto vai receber,
              em qual prazo e sob quais condições.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-club8-dark to-gray-900 rounded-3xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-club8-turquoise/20 flex items-center justify-center">
                <Landmark className="w-10 h-10 text-club8-turquoise" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Club8 é <span className="club8-text-gradient">homologado pela CVM</span>
                </h3>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Nossa operação segue todas as exigências da Comissão de Valores Mobiliários, o
                  órgão oficial que regula e fiscaliza o mercado de capitais no Brasil. Isso
                  significa transparência, conformidade legal e a tranquilidade de investir em uma
                  estrutura reconhecida e auditada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentModel;
