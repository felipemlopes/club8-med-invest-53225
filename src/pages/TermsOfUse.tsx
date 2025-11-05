
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <FileText className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Termos de <span className="club8-text-gradient">Uso</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Conheça os termos e condições para utilização da plataforma Club8.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-club8-turquoise bg-opacity-10 border border-club8-turquoise border-opacity-30 rounded-xl p-6 mb-8">
              <p className="text-club8-dark mb-0">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
            </div>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-club8-turquoise" />
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-600 mb-8">
              Ao acessar e utilizar a plataforma Club8, você concorda com estes Termos de Uso. 
              Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-club8-turquoise" />
              2. Elegibilidade
            </h2>
            <p className="text-gray-600 mb-4">
              Para utilizar nossa plataforma, você deve:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Ser médico registrado no CRM (Conselho Regional de Medicina)</li>
              <li>• Ter maioridade civil (18 anos ou mais)</li>
              <li>• Possuir capacidade legal para contratar</li>
              <li>• Fornecer informações verdadeiras e atualizadas</li>
              <li>• Cumprir todas as leis aplicáveis</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">3. Serviços Oferecidos</h2>
            <p className="text-gray-600 mb-4">
              O Club8 oferece:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Plataforma de investimentos exclusiva para médicos</li>
              <li>• Oportunidades de investimento com garantias reais</li>
              <li>• Suporte especializado e personalizado</li>
              <li>• Relatórios e acompanhamento de performance</li>
              <li>• Conteúdo educacional sobre investimentos</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">4. Cadastro e Conta</h2>
            <p className="text-gray-600 mb-4">
              Ao criar uma conta, você se compromete a:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Fornecer informações precisas e completas</li>
              <li>• Manter suas informações atualizadas</li>
              <li>• Proteger suas credenciais de acesso</li>
              <li>• Notificar imediatamente sobre uso não autorizado</li>
              <li>• Ser responsável por todas as atividades em sua conta</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              5. Riscos dos Investimentos
            </h2>
            <p className="text-gray-600 mb-4">
              É importante entender que:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Todo investimento envolve riscos</li>
              <li>• Rentabilidades passadas não garantem resultados futuros</li>
              <li>• Você pode perder parte ou todo o capital investido</li>
              <li>• As garantias oferecidas não eliminam completamente os riscos</li>
              <li>• É essencial diversificar seus investimentos</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">6. Responsabilidades do Usuário</h2>
            <p className="text-gray-600 mb-4">
              Você se compromete a:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Usar a plataforma apenas para fins legais</li>
              <li>• Não violar direitos de propriedade intelectual</li>
              <li>• Não tentar acessar sistemas não autorizados</li>
              <li>• Não divulgar informações confidenciais</li>
              <li>• Cumprir todas as leis e regulamentações aplicáveis</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 mb-8">
              O Club8 não se responsabiliza por perdas decorrentes de: flutuações de mercado, 
              decisões de investimento do usuário, falhas de terceiros, caso fortuito ou força maior. 
              Nossa responsabilidade está limitada ao valor investido através da plataforma.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">8. Propriedade Intelectual</h2>
            <p className="text-gray-600 mb-8">
              Todo o conteúdo da plataforma, incluindo textos, imagens, logos, software e design, 
              é propriedade do Club8 ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">9. Suspensão e Encerramento</h2>
            <p className="text-gray-600 mb-4">
              Podemos suspender ou encerrar sua conta se:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Violar estes Termos de Uso</li>
              <li>• Fornecer informações falsas</li>
              <li>• Usar a plataforma de forma inadequada</li>
              <li>• Por determinação legal ou regulatória</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">10. Alterações nos Termos</h2>
            <p className="text-gray-600 mb-8">
              Podemos modificar estes termos a qualquer momento. Alterações significativas serão 
              comunicadas com antecedência. O uso continuado da plataforma após as mudanças 
              constitui aceitação dos novos termos.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">11. Lei Aplicável</h2>
            <p className="text-gray-600 mb-8">
              Estes termos são regidos pelas leis brasileiras. Eventuais disputas serão resolvidas 
              no foro da comarca de São Paulo, SP.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">12. Contato</h2>
            <p className="text-gray-600 mb-4">
              Para questões sobre estes termos:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• E-mail: juridico@club8.com.br</li>
              <li>• Telefone: (11) 99999-9999</li>
              <li>• Endereço: São Paulo, SP</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-12">
              <p className="text-yellow-800 mb-0">
                <strong>Importante:</strong> Leia atentamente todos os termos antes de utilizar nossa plataforma. 
                Em caso de dúvidas, consulte nossa equipe jurídica.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
