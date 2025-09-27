import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "CTO, TechStart",
      company: "Empresa",
      image: testimonial1,
      content: "Conseguimos encontrar desenvolvedores seniores em menos de 48h. A curadoria da Trampô é excepcional - todos os profissionais são realmente qualificados.",
      rating: 5,
      project: "Desenvolvimento de aplicativo mobile"
    },
    {
      name: "Ana Silva",
      role: "Designer UX/UI",
      company: "Freelancer",
      image: testimonial2,
      content: "Minha renda aumentou 65% desde que comecei a usar a Trampô. Trabalho com empresas incríveis e tenho total flexibilidade nos meus horários.",
      rating: 5,
      project: "Design de interfaces digitais"
    }
  ];

  const stats = [
    { value: "4.9", label: "Avaliação média", suffix: "★" },
    { value: "87%", label: "Renovação de contratos", suffix: "" },
    { value: "24h", label: "Tempo médio de match", suffix: "" },
    { value: "95%", label: "Satisfação geral", suffix: "" }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Depoimentos</h2>
          <p className="section-subtitle">
            Veja como a Trampô está transformando carreiras e negócios
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="feature-card group">
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary/30" />
              </div>

              {/* Content */}
              <p className="text-lg text-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  <p className="text-primary text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>

              {/* Project Tag */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
                  Projeto: {testimonial.project}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-muted via-accent/30 to-muted rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Resultados que comprovam</h3>
            <p className="text-muted-foreground">Números reais da nossa comunidade ativa</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilot Program Notice */}
        <div className="text-center mt-12">
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-secondary mb-2">
              Programa Piloto Ativo
            </h4>
            <p className="text-muted-foreground">
              Estamos em fase piloto com empresas e talentos selecionados. 
              Cadastre-se para ser um dos primeiros a ter acesso completo à plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;