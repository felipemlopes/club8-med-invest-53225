import { BadgeCheck } from 'lucide-react';

const AuditBanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-club8-turquoise to-club8-turquoise-secondary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
          <BadgeCheck className="w-12 h-12 text-club8-dark flex-shrink-0" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-club8-dark">
              Empresa auditada pela <span className="underline">Deloitte</span>
            </h3>
            <p className="text-club8-dark/80 text-sm md:text-base">
              Uma das maiores auditorias do mundo garantindo total transparência, segurança e credibilidade ao seu investimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditBanner;
