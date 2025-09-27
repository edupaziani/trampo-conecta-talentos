import { DollarSign, Calendar, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import curationImage from "@/assets/curation-illustration.jpg";

const ForTalents = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Mais renda líquida",
      description: "Receba mais no final do mês sem descontos de CLT. Modelo transparente e justo.",
      highlight: "Até 60% mais"
    },
    {
      icon: Calendar,
      title: "Flexibilidade justa",
      description: "Equilibramos autonomia e estabilidade. Flexibilidade real sem abrir mão dos seus direitos.",
      highlight: "Flexibilidade com propósito"
    },
    {
      icon: Eye,
      title: "Inclusão e pertencimento",
      description: "Ambiente diverso e inclusivo onde todos os talentos são valorizados pelo seu potencial.",
      highlight: "Diversidade real"
    },
    {
      icon: Heart,
      title: "Bem-estar no trabalho",
      description: "Priorizamos sua saúde mental, equilíbrio vida-trabalho e desenvolvimento pessoal.",
      highlight: "Bem-estar em primeiro lugar"
    }
  ];

  return (
    <section id="talentos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Element */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <img 
                src={curationImage} 
                alt="Ilustração de curadoria de talentos" 
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
            </div>
            
            {/* Stats Cards */}
            <div className="absolute -top-6 -left-6 bg-background rounded-xl p-4 shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">R$ 8.5k</div>
                <div className="text-xs text-muted-foreground">Renda média mensal</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background rounded-xl p-4 shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-xs text-muted-foreground">Avaliação média</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="section-title text-left mb-6">
              Para <span className="text-secondary">Talentos</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Faça parte da revolução do futuro do trabalho. Conecte-se com empresas que promovem 
              inclusão, respeitam sua individualidade e valorizam seu bem-estar acima de tudo.
            </p>

            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                        {benefit.highlight}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="btn-secondary">
              Quero trabalhar com autonomia
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForTalents;