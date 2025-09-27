import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-muted overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Profissionais trabalhando" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="hero-title mb-6">
            Contrate e seja contratado de forma simples, rápida e justa
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Mais renda para profissionais, menos custo para empresas, com transparência e curadoria de qualidade
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="btn-secondary w-full sm:w-auto animate-slide-up">
              Quero contratar
            </Button>
            <Button className="btn-outline w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Quero trabalhar
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Talentos ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Empresas parceiras</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Tempo médio match</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-bounce-in" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary/10 rounded-full animate-bounce-in" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-20 w-12 h-12 bg-primary/5 rounded-full animate-bounce-in" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;