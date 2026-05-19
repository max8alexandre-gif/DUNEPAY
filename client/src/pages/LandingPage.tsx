import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Zap,
  Shield,
  Users,
  TrendingUp,
  Smartphone,
  ShoppingCart,
  Headphones,
} from "lucide-react";
import { getLoginUrl } from "@/const";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center font-bold text-xl">
              D
            </div>
            <span className="font-bold text-xl">DUNE PAY</span>
          </motion.div>

          <div className="hidden md:flex gap-8 items-center">
            {["Inicio", "Recursos", "Precos", "Documentacao", "Status"].map(
              (item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ color: "#a78bfa" }}
                  className="text-sm text-gray-300 hover:text-purple-400 transition"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Entrar
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.p
              variants={itemVariants}
              className="text-purple-400 text-sm font-semibold mb-4 uppercase tracking-wider"
            >
              Automacao | Pagamentos | Bots
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Automacao que
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                gera lucro.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Gateway de pagamento, bots inteligentes e automacao completa para
              escalar seu negocio no Discord, Telegram e Web.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                Comeccar agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8"
              >
                Ver demonstracao
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-slate-950"
                  />
                ))}
              </div>
              <p className="text-gray-400">
                <span className="text-white font-semibold">Mais de 1.000 empresas</span>{" "}
                confiam na Dune Pay
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Image/3D Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative h-96 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-3xl"></div>
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-9xl font-bold text-purple-500/20"
            >
              D
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-4">Dashboard Poderoso</h2>
            <p className="text-gray-400 mb-8">
              Visao geral completa da sua plataforma com graficos em tempo real,
              controle de bots e gerenciamento de transacoes.
            </p>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Saldo disponivel", value: "R$ 14.392,50" },
                { label: "Vendas", value: "R$ 28.754,90" },
                { label: "Transacoes", value: "1.482" },
                { label: "Clientes", value: "932" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900/50 border border-purple-500/10 rounded-lg p-4"
                >
                  <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-purple-400">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Recursos Poderosos</h2>
            <p className="text-gray-400 text-lg">
              Tudo que voce precisa para gerenciar seu negocio em um unico lugar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Gateway PIX Completo",
                desc: "Cobracas instantaneas com QR Code dinamico",
              },
              {
                icon: Smartphone,
                title: "Bots Inteligentes",
                desc: "Bots automaticos para Discord, Telegram e WhatsApp",
              },
              {
                icon: ShoppingCart,
                title: "Loja Online Automatica",
                desc: "Conecte seu bot e venda automaticamente",
              },
              {
                icon: Shield,
                title: "Seguro e Confiavel",
                desc: "Protecao avancada contra fraudes e 99.9% uptime",
              },
              {
                icon: TrendingUp,
                title: "Analises em Tempo Real",
                desc: "Graficos e relatorios de vendas detalhados",
              },
              {
                icon: Users,
                title: "Suporte 24/7",
                desc: "Atendimento rapido e especializado sempre",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 p-6 hover:border-purple-500/50 transition h-full">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { title: "Seguro e Confiavel", desc: "Protecao avancada contra fraudes e monitoramento 24/7" },
              { title: "99.9% Uptime", desc: "Infraestrutura robusta com alta disponibilidade" },
              { title: "Suporte 24/7", desc: "Atendimento rapido e especializado sempre" },
              { title: "Mais de 1.000 Clientes", desc: "Mais de mil comunidades crescendo com Dune Pay" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para comeccar?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se a mais de 1.000 empresas que ja estao crescendo com Dune Pay
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-12 text-lg"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Criar Conta Gratis
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-12 px-4 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Dune Pay</h3>
              <p className="text-gray-400 text-sm">
                Muito mais que um gateway. Um ecossistema.
              </p>
            </div>
            {["Produto", "Empresa", "Recursos", "Legal"].map((col) => (
              <div key={col}>
                <h4 className="font-semibold mb-4">{col}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {["Link 1", "Link 2", "Link 3"].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-purple-400 transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-purple-500/20 pt-8 flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              2026 Dune Pay. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition">
                Privacidade
              </a>
              <a href="#" className="hover:text-purple-400 transition">
                Termos
              </a>
              <a href="#" className="hover:text-purple-400 transition">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
