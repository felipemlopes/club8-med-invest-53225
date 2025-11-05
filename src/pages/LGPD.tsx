
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Database, UserCheck, AlertCircle } from 'lucide-react';

const LGPD = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <Database className="w-16 h-16 text-club8-turquoise mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="club8-text-gradient">LGPD</span> - Lei Geral de Proteção de Dados
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Nosso compromisso com a proteção dos seus dados pessoais conforme a legislação brasileira.
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
                <strong>Vigência:</strong> Em conformidade com a Lei nº 13.709/2018 (LGPD)
              </p>
            </div>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-club8-turquoise" />
              1. Nosso Compromisso com a LGPD
            </h2>
            <p className="text-gray-600 mb-8">
              O Club8 está totalmente comprometido com o cumprimento da Lei Geral de Proteção de Dados (LGPD). 
              Implementamos políticas, procedimentos e controles técnicos para garantir a proteção adequada 
              dos dados pessoais de nossos usuários.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <Database className="w-8 h-8 text-club8-turquoise" />
              2. Bases Legais para Tratamento de Dados
            </h2>
            <p className="text-gray-600 mb-4">
              Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• <strong>Consentimento:</strong> Para comunicações de marketing e newsletters</li>
              <li>• <strong>Execução de contrato:</strong> Para prestação dos serviços de investimento</li>
              <li>• <strong>Legítimo interesse:</strong> Para prevenção de fraudes e segurança</li>
              <li>• <strong>Cumprimento de obrigação legal:</strong> Para atender exigências regulatórias</li>
              <li>• <strong>Exercício de direitos:</strong> Para defesa em processos judiciais</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-club8-turquoise" />
              3. Seus Direitos como Titular de Dados
            </h2>
            <p className="text-gray-600 mb-4">
              Conforme a LGPD, você possui os seguintes direitos:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• <strong>Confirmação da existência:</strong> Saber se tratamos seus dados</li>
              <li>• <strong>Acesso aos dados:</strong> Obter cópia dos dados que possuímos</li>
              <li>• <strong>Correção:</strong> Solicitar correção de dados incompletos ou inexatos</li>
              <li>• <strong>Anonimização ou eliminação:</strong> Pedir exclusão de dados desnecessários</li>
              <li>• <strong>Portabilidade:</strong> Transferir dados para outro fornecedor</li>
              <li>• <strong>Informação sobre compartilhamento:</strong> Saber com quem compartilhamos</li>
              <li>• <strong>Revogação de consentimento:</strong> Retirar autorização a qualquer momento</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">4. Como Exercer seus Direitos</h2>
            <p className="text-gray-600 mb-4">
              Para exercer qualquer dos seus direitos, você pode:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Enviar e-mail para: <strong>lgpd@club8.com.br</strong></li>
              <li>• Ligar para: <strong>(11) 99999-9999</strong></li>
              <li>• Acessar sua conta na plataforma (quando disponível)</li>
              <li>• Protocolar solicitação presencial em nosso escritório</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Prazo de Resposta</h3>
              <p className="text-blue-700 mb-0">
                Todas as solicitações serão respondidas em até <strong>15 dias úteis</strong>, 
                conforme estabelecido pela LGPD.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">5. Proteção de Dados Sensíveis</h2>
            <p className="text-gray-600 mb-4">
              Dados sensíveis (como informações de saúde, quando aplicável) recebem proteção especial:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Criptografia avançada para armazenamento e transmissão</li>
              <li>• Acesso restrito apenas a pessoal autorizado</li>
              <li>• Logs de auditoria para todas as ações</li>
              <li>• Consentimento específico e destacado</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">6. Compartilhamento de Dados</h2>
            <p className="text-gray-600 mb-4">
              Compartilhamos dados pessoais apenas quando:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Necessário para execução dos serviços contratados</li>
              <li>• Exigido por lei ou ordem judicial</li>
              <li>• Com seu consentimento explícito</li>
              <li>• Com parceiros sob rigorosos contratos de confidencialidade</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">7. Medidas de Segurança</h2>
            <p className="text-gray-600 mb-4">
              Implementamos as seguintes medidas técnicas e organizacionais:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Criptografia de dados em trânsito e em repouso</li>
              <li>• Controles de acesso baseados em necessidade</li>
              <li>• Monitoramento 24/7 de segurança</li>
              <li>• Backups seguros e planos de recuperação</li>
              <li>• Treinamento regular da equipe</li>
              <li>• Auditorias periódicas de segurança</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              8. Tratamento de Incidentes
            </h2>
            <p className="text-gray-600 mb-4">
              Em caso de incidente de segurança que possa gerar risco aos titulares:
            </p>
            <ul className="text-gray-600 mb-8 space-y-2">
              <li>• Comunicaremos à ANPD em até 72 horas</li>
              <li>• Notificaremos os titulares afetados quando necessário</li>
              <li>• Implementaremos medidas corretivas imediatas</li>
              <li>• Realizaremos investigação completa do incidente</li>
            </ul>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">9. Retenção de Dados</h2>
            <p className="text-gray-600 mb-8">
              Mantemos seus dados apenas pelo tempo necessário para as finalidades estabelecidas, 
              respeitando prazos legais mínimos. Dados desnecessários são eliminados de forma segura.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">10. Encarregado de Proteção de Dados (DPO)</h2>
            <p className="text-gray-600 mb-4">
              Nosso Encarregado de Proteção de Dados é responsável por:
            </p>
            <ul className="text-gray-600 mb-4 space-y-2">
              <li>• Orientar sobre o cumprimento da LGPD</li>
              <li>• Atuar como canal de comunicação com titulares e ANPD</li>
              <li>• Realizar treinamentos e conscientização</li>
            </ul>
            <p className="text-gray-600 mb-8">
              <strong>Contato:</strong> dpo@club8.com.br
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">11. Transferência Internacional</h2>
            <p className="text-gray-600 mb-8">
              Quando necessário transferir dados para o exterior, garantimos que o país ou organização 
              internacional proporcione grau de proteção adequado, conforme determinado pela ANPD.
            </p>

            <h2 className="text-2xl font-bold text-club8-dark mb-4">12. Reclamações à ANPD</h2>
            <p className="text-gray-600 mb-8">
              Caso não fique satisfeito com nossas respostas, você pode registrar reclamação 
              diretamente à Autoridade Nacional de Proteção de Dados (ANPD) através do site 
              oficial do órgão.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mt-12">
              <h3 className="text-lg font-bold text-green-800 mb-2">Compromisso Contínuo</h3>
              <p className="text-green-700 mb-0">
                Estamos continuamente aprimorando nossos processos e controles para garantir 
                o mais alto nível de proteção aos seus dados pessoais. Sua confiança é nossa prioridade.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LGPD;
