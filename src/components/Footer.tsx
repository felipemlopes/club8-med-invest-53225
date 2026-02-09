
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-club8-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img src="/lovable-uploads/661a12e3-d985-45cc-a92c-11b07f29d866.png" alt="Club8 Logo" className="h-40 w-auto object-scale-down" />
            </div>
            <p className="text-gray-300 mb-6">
              Plataforma de investimentos exclusiva para médicos, oferecendo rentabilidade superior
              e benefícios únicos para profissionais da saúde.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/club8_oficial/" target="_blank" className="text-club8-turquoise hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              {/*
              <a href="#" className="text-club8-turquoise hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              */}
              <a href="https://www.facebook.com/profile.php?id=61570123167016" target="_blank" className="text-club8-turquoise hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-xl font-bold text-club8-turquoise mb-6">Navegação</h3>
            <ul className="space-y-4">
              <li><a href="/quem-somos" className="text-gray-300 hover:text-club8-turquoise transition-colors">Quem Somos</a></li>
              <li><a href="/#seja-socio" className="text-gray-300 hover:text-club8-turquoise transition-colors">Seja Sócio</a></li>
              <li><a href="/#planos" className="text-gray-300 hover:text-club8-turquoise transition-colors">Planos</a></li>
              <li><a href="/#simulador" className="text-gray-300 hover:text-club8-turquoise transition-colors">Simulador</a></li>
              <li><a href="/#cotas" className="text-gray-300 hover:text-club8-turquoise transition-colors">Cotas</a></li>
              <li><a href="/garantias" className="text-gray-300 hover:text-club8-turquoise transition-colors">Garantias</a></li>
            </ul>
          </div>

          {/* Investimentos */}
          <div>
            <h3 className="text-xl font-bold text-club8-turquoise mb-6">Investimentos</h3>
            <ul className="space-y-4">
              <li className="text-gray-300">
                <a href="/#planos" className="text-gray-300 hover:text-club8-turquoise transition-colors">Club8 Gold - 1,8% a.m.</a>
              </li>
              <li className="text-gray-300">
                <a href="/#planos" className="text-gray-300 hover:text-club8-turquoise transition-colors">Club8 Platinum - 2,0% a.m.</a>
              </li>
              <li className="text-gray-300">
                <a href="/#bonificacoes" className="text-gray-300 hover:text-club8-turquoise transition-colors">Programa de Indicações</a>
              </li>
              <li className="text-gray-300">
                <a href="/#bonificacoes" className="text-gray-300 hover:text-club8-turquoise transition-colors">Bonificação por Renovação</a>
              </li>
            </ul>
            <div className="mt-6 space-y-3">
              <Button
                  asChild
                  className="bg-club8-turquoise hover:bg-club8-white text-club8-dark font-semibold w-full"
              >
                <a href="/#seja-socio" className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Investir Agora
                </a>
              </Button>
              <Button 
                asChild
                className="bg-club8-turquoise hover:bg-club8-white text-club8-dark font-semibold w-full"
              >
                <a href="/fila-de-espera">Lista de Espera</a>
              </Button>
            </div>
          </div>

          {/* Contato */}
          <div id={"contato"}>
            <h3 className="text-xl font-bold text-club8-turquoise mb-6">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-club8-turquoise" />
                <span className="text-gray-300">contato@club8.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-club8-turquoise" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-club8-turquoise" />
                <span className="text-gray-300">São Paulo, SP</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-club8-turquoise bg-opacity-10 rounded-xl">
              <h4 className="font-bold text-club8-turquoise mb-2">Horário de Atendimento</h4>
              <p className="text-sm text-gray-300">
                Segunda a Sexta: 9h às 18h<br />
                Sábado: 9h às 12h
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2026 Club8. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/politica-privacidade" className="text-gray-300 hover:text-club8-turquoise text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos-de-uso" className="text-gray-300 hover:text-club8-turquoise text-sm transition-colors">
                Termos de Uso
              </a>
              <a href="/lgpd" className="text-gray-300 hover:text-club8-turquoise text-sm transition-colors">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
