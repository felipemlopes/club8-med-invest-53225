
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import HighlightSection from '@/components/HighlightSection';
import SecurityGuarantees from '@/components/SecurityGuarantees';
import InvestmentPlans from '@/components/InvestmentPlans';
import InvestmentSimulator from '@/components/InvestmentSimulator';
import QuotasAvailable from '@/components/QuotasAvailable';
import BonusSection from '@/components/BonusSection';
import MembershipSection from '@/components/MembershipSection';
import Footer from '@/components/Footer';
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const Index = () => {

    const { hash } = useLocation();

    useEffect(() => {
        // Se não houver hash, vai para o topo absoluto
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        const id = hash.replace("#", "");

        // Função para executar o scroll
        const scrollToElement = () => {
            const element = document.getElementById(id);
            if (element) {
                // Pegamos a posição do elemento em relação ao topo da página
                const yOffset = -80; // AJUSTE AQUI: Altura do seu Header fixo (ex: 80px)
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
            }
        };

        // 1. Tenta scrollar imediatamente
        scrollToElement();

        // 2. Tenta novamente após um micro-delay para compensar renderização de imagens/cards
        const timer = setTimeout(scrollToElement, 300);

        return () => clearTimeout(timer);
    }, [hash, useLocation().pathname]); // Monitora hash e mudança de página


  return (
    <div className="min-h-screen">
      <Header />
      <HeroBanner />
      <HighlightSection />
      <SecurityGuarantees />
      <InvestmentPlans />
      <InvestmentSimulator />
      <QuotasAvailable />
      <BonusSection />
      <MembershipSection />
      <Footer />
    </div>
  );
};

export default Index;
