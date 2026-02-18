
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
import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const Index = () => {
    const { hash } = useLocation();
    const hasScrolledRef = useRef(false);

    useEffect(() => {
        // Resetar a flag quando o hash muda
        hasScrolledRef.current = false;
    }, [hash]);

    useEffect(() => {
        // Se não houver hash, vai para o topo absoluto
        if (!hash) {
            window.scrollTo({ top: 0, behavior: "instant" });
            return;
        }

        // Evitar múltiplos scrolls
        if (hasScrolledRef.current) {
            return;
        }

        const id = hash.replace("#", "");

        // Função para executar o scroll - versão simplificada
        const scrollToElement = () => {
            const element = document.getElementById(id);
            if (element) {
                // Usar scrollIntoView com comportamento instant para evitar conflitos
                // O CSS anchor-offset já cuida do offset do header (144px)
                element.scrollIntoView({ 
                    behavior: "instant", 
                    block: "start",
                    inline: "nearest"
                });
                hasScrolledRef.current = true;
            }
        };

        // Pequeno delay para garantir que o DOM esteja pronto
        const timer = setTimeout(scrollToElement, 50);

        return () => clearTimeout(timer);
    }, [hash]); // Monitora apenas mudanças no hash


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
