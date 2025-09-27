import { TrendingDown, Clock, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const ForCompanies = () => {
  const benefits = [
    {
      icon: TrendingDown,
      title: "Redução de custos",
      description: "Diminua gastos com recrutamento, contratação CLT e benefícios tradicionais.",
      highlight: "Até 40% menos custos"
    },
    {
      icon: Target,
      title: "Curadoria de talentos",
      description: "Acesso a profissionais pré-selecionados e validados pela nossa equipe especializada.",
      highlight: "100% qualificados"
    },
    {
      icon: Clock,
      title: "Velocidade na contratação",
      description: "Encontre o talento ideal em questão de horas, não semanas ou meses.",
      highlight: "Match em 24h"
    },
    {
      icon: Shield,
      title: "Segurança e confiança",
      description: "Plataforma segura com contratos digitais e garantia de qualidade do trabalho.",
      highlight: "Máxima segurança"
    }
  ];

  return (
    <section id="empresas" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="section-title text-left mb-6">
              Para <span className="text-secondary">Empresas</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Transforme a forma como sua empresa contrata talentos. Acesso rápido a profissionais qualificados, 
              sem a burocracia e custos do modelo tradicional.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                      <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full font-medium">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="btn-hero">
              Quero contratar talentos
            </Button>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Empresas conectadas</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-secondary">100+</div>
                    <div className="text-sm text-muted-foreground">Empresas ativas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">2.5k+</div>
                    <div className="text-sm text-muted-foreground">Projetos realizados</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-xl flex items-center justify-center">
              <Clock className="w-8 h-8 text-secondary" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForCompanies;