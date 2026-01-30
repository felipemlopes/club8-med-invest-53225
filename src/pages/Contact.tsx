import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero */}
            <section className="bg-gradient-to-br from-club8-dark to-gray-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <Mail className="w-20 h-20 text-club8-turquoise mx-auto mb-6" />
                    <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                        Fale com o <span className="club8-text-gradient">Club8</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Tire suas dúvidas, fale com nossos especialistas e entenda como
                        investir com segurança e rentabilidade exclusiva para médicos.
                    </p>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">

                    {/* Informações */}
                    <div>
                        <h2 className="text-4xl font-bold text-club8-dark mb-6">
                            Estamos prontos para te atender
                        </h2>

                        <p className="text-gray-600 mb-10">
                            Nosso time está disponível para esclarecer qualquer dúvida sobre
                            garantias, rentabilidade, processos e segurança do seu investimento.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-club8-turquoise" />
                                <span className="text-gray-700 text-lg">(51) 99999-9999</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-club8-turquoise" />
                                <span className="text-gray-700 text-lg">contato@club8.com.br</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <MapPin className="w-6 h-6 text-club8-turquoise" />
                                <span className="text-gray-700 text-lg">
                  Atendimento 100% digital – Brasil
                </span>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center gap-3 text-sm text-gray-500">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            Atendimento confidencial e seguro
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-club8-dark mb-6">
                            Envie sua mensagem
                        </h3>

                        <form className="space-y-5">
                            <input
                                type="text"
                                placeholder="Nome completo"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />

                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />

                            <input
                                type="text"
                                placeholder="Telefone / WhatsApp"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />

                            <textarea
                                placeholder="Escreva sua mensagem"
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />

                            <Button variant="outline" className="w-full bg-club8-turquoise text-club8-dark hover:bg-club8-white hover:border-club8-turquoise font-semibold flex items-center gap-2 justify-center">
                                <Send className="w-4 h-4" />
                                Enviar mensagem
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
