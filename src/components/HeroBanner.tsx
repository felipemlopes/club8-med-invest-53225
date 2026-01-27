import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, Shield, Gift } from 'lucide-react';
const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [{
    title: "Club8 - Exclusivo para Médicos",
    subtitle: "Investimentos de alta performance para profissionais da saúde",
    description: "Uma plataforma premium com rentabilidade superior ao mercado",
    icon: <TrendingUp className="w-12 h-12 text-club8-turquoise" />
  }, {
    title: "Rentabilidade Acima do Mercado",
    subtitle: "De 21,6% a 24% ao ano ou mais",
    description: "Supere os investimentos tradicionais com nossos planos exclusivos",
    icon: <TrendingUp className="w-12 h-12 text-club8-turquoise" />
  }, {
    title: "Segurança e Transparência",
    subtitle: "Investimentos seguros com total transparência",
    description: "Seu dinheiro protegido com a segurança que você merece",
    icon: <Shield className="w-12 h-12 text-club8-turquoise" />
  }, {
    title: "Benefícios Exclusivos",
    subtitle: "Bonificações por renovação e indicações",
    description: "Ganhe ainda mais com nosso programa de recompensas",
    icon: <Gift className="w-12 h-12 text-club8-turquoise" />
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };
  return <section className="relative bg-gradient-to-br from-club8-dark via-gray-900 to-club8-dark min-h-[600px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white animate-fade-in-up">
            <div className="mb-6">{slides[currentSlide].icon}</div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-2xl lg:text-3xl mb-6 text-club8-turquoise font-semibold">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => {
                document
                    .getElementById('seja-socio')
                    ?.scrollIntoView({ behavior: 'smooth' })
              }} size="lg" className="bg-club8-turquoise hover:bg-club8-white text-club8-dark font-bold px-8 py-4 text-lg">
                Quero Investir Agora
              </Button>
              <Button onClick={() => {
                document
                    .getElementById('simulador')
                    ?.scrollIntoView({ behavior: 'smooth' })
              }} size="lg" variant="outline" className="border-club8-turquoise text-club8-dark  hover:bg-club8-turquoise hover:text-club8-dark px-8 py-4 text-lg">
                Fazer Simulação
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-scale-in">
            <div className="w-96 h-96 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-8 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary rounded-full opacity-40"></div>
              <div className="absolute inset-16 bg-club8-turquoise rounded-full flex items-center justify-center">
                <div className="text-center text-club8-dark">
                  <div className="text-4xl font-bold mb-2">21,6% - 24%</div>
                  <div className="text-lg font-semibold">ao ano</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-12 space-x-4">
          <button onClick={prevSlide} className="p-2 rounded-full bg-club8-turquoise text-club8-dark hover:bg-club8-turquoise-secondary transition-colors">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex space-x-2 items-center">
            {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-club8-turquoise' : 'bg-gray-600'}`} />)}
          </div>

          <button onClick={nextSlide} className="p-2 rounded-full bg-club8-turquoise text-club8-dark hover:bg-club8-turquoise-secondary transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>;
};
export default HeroBanner;