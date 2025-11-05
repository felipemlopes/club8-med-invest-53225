
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

const Index = () => {
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
