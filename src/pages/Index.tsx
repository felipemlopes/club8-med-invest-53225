
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
        if (!hash) return;

        const id = hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash]);


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
