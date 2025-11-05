
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Eye, Lock, Users } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Política de <span className="club8-text-gradient">Privacidade</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Sua privacidade é fundamental para nós. Conheça como protegemos seus dados.
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
              <Eye className="w-8 h-8 text-club8-turquoise" />
              1. Informações que Coletamos
            </h2>
            <p className="text-gray-600 mb-6">
              Coletamos informações que você nos fornece diretamente, como:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Dados pessoais (nome, e-mail, telefone)</li>
              <li>• Informações profissionais (CRM, especialidade)</li>
              <li>• Dados financeiros necessários para o investimento</li>
              <li>• Informações de navegação em nosso site</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <Users className="w-8 h-8 text-club8-turquoise" />
              2. Como Usamos suas Informações
            </h2>
            <p className="text-gray-600 mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Processar e gerenciar seus investimentos</li>
              <li>• Comunicar sobre oportunidades de investimento</li>
              <li>• Cumprir obrigações legais e regulamentares</li>
              <li>• Melhorar nossos serviços e plataforma</li>
              <li>• Prevenir fraudes e garantir segurança</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <Lock className="w-8 h-8 text-club8-turquoise" />
              3. Proteção dos Dados
            </h2>
            <p className="text-gray-600 mb-4">
              Implementamos medidas robustas de segurança:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Criptografia de dados em trânsito e em repouso</li>
              <li>• Controles de acesso rigorosos</li>
              <li>• Monitoramento contínuo de segurança</li>
              <li>• Auditorias regulares de segurança</li>
              <li>• Treinamento da equipe em proteção de dados</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">4. Compartilhamento de Informações</h2>
            <p className="text-gray-600 mb-4">
              Não vendemos ou alugamos seus dados pessoais. Compartilhamos informações apenas:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Com seu consentimento explícito</li>
              <li>• Para cumprir obrigações legais</li>
              <li>• Com prestadores de serviços confiáveis (sob contrato de confidencialidade)</li>
              <li>• Para proteger direitos e segurança</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">5. Seus Direitos</h2>
            <p className="text-gray-600 mb-4">
              Você tem o direito de:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Acessar seus dados pessoais</li>
              <li>• Corrigir dados incorretos</li>
              <li>• Solicitar exclusão de dados</li>
              <li>• Portabilidade de dados</li>
              <li>• Revogar consentimentos</li>
              <li>• Receber informações sobre tratamento de dados</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">6. Cookies e Tecnologias Similares</h2>
            <p className="text-gray-600 mb-8">
              Utilizamos cookies para melhorar sua experiência, analisar o uso do site e personalizar conteúdo. 
              Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">7. Retenção de Dados</h2>
            <p className="text-gray-600 mb-8">
              Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              respeitando prazos legais mínimos de retenção para dados financeiros e fiscais.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">8. Alterações nesta Política</h2>
            <p className="text-gray-600 mb-8">
              Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas 
              por e-mail ou através de aviso em nosso site.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">9. Contato</h2>
            <p className="text-gray-600 mb-4">
              Para questões sobre privacidade, entre em contato:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• E-mail: privacidade@club8.com.br</li>
              <li>• Telefone: (11) 99999-9999</li>
              <li>• Endereço: São Paulo, SP</li>
            </ul>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-12">
              <p className="text-gray-600 mb-0">
                <strong>Dúvidas?</strong> Nossa equipe está disponível para esclarecer qualquer questão 
                sobre o tratamento de seus dados pessoais. Entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
