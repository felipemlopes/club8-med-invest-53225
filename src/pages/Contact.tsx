import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useState} from "react";
import investmentApi from "@/lib/investmentApi.ts";
import {useToast} from "@/hooks/use-toast.ts";

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const fieldError = (field: string) => {
        if (!errors[field]) return null;
        return (
            <p className="text-sm text-red-500 mt-1">
                {errors[field][0]}
            </p>
        );
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await investmentApi.sendContact(form);

            setForm({
                name: '',
                email: '',
                phone: '',
                message: '',
            });
            setSuccess(true);
            setLoading(false);
            toast({
                title: "Mensagem Recebida",
                description: "A sua mensagem foi recebida!",
            });
        } catch (error) {
            setLoading(false);
            if (error.status === 422) {
                setErrors(error.errors || {});
            } else {
                toast({
                    title: 'Erro',
                    description: 'Verifique os campos destacados.',
                    variant: 'destructive',
                });
            }
        }
    };

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

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nome completo"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />
                            {fieldError('name')}

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />
                            {fieldError('email')}

                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Telefone / WhatsApp"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />
                            {fieldError('phone')}

                            <textarea
                                placeholder="Escreva sua mensagem"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-club8-turquoise"
                            />
                            {fieldError('message')}

                            {success && (
                                <p className="text-green-600 text-sm">
                                    Mensagem enviada com sucesso!
                                </p>
                            )}

                            {error && (
                                <p className="text-red-600 text-sm">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-club8-turquoise text-club8-dark hover:bg-club8-white hover:border-club8-turquoise font-semibold flex items-center gap-2 justify-center"
                            >
                                <Send className="w-4 h-4" />
                                {loading ? 'Enviando...' : 'Enviar mensagem'}
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
