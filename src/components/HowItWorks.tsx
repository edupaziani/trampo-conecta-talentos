import { UserPlus, Search, Handshake, DollarSign } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Cadastre-se",
      description: "Crie seu perfil completo e destaque suas habilidades e experiências profissionais."
    },
    {
      icon: Search,
      title: "IA responsável + curadoria humana",
      description: "Usamos IA de forma ética para potencializar nossa curadoria humana, garantindo matches justos e inclusivos."
    },
    {
      icon: Handshake,
      title: "Receba matches",
      description: "Conectamos você com empresas ou talentos que se alinham perfeitamente ao seu perfil."
    },
    {
      icon: DollarSign,
      title: "Trabalhe e receba",
      description: "Execute projetos, entregue resultados e receba de forma justa e transparente."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Como funciona</h2>
          <p className="section-subtitle">
            Um processo simples e transparente para conectar talentos com oportunidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-card group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow Connector */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;