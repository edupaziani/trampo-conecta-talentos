import { Users, Lightbulb, FileText } from "lucide-react";

const ValueProposition = () => {
  const differentials = [
    {
      icon: Users,
      title: "IA responsável + curadoria humana",
      description: "Combinamos inteligência artificial ética com análise humana para promover inclusão e diversidade nos matches.",
      stats: "IA ética e transparente"
    },
    {
      icon: Lightbulb,
      title: "Transparência ética",
      description: "Algoritmos auditáveis, processos claros e critérios justos. Você sabe exatamente como funcionamos.",
      stats: "100% transparência"
    },
    {
      icon: FileText,
      title: "Bem-estar e flexibilidade",
      description: "Priorizamos o equilíbrio vida-trabalho e oferecemos flexibilidade real sem comprometer direitos.",
      stats: "Flexibilidade justa"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary-light to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Liderando as tendências do futuro do trabalho
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Respondemos às principais transformações do mercado: IA responsável, inclusão real, 
            flexibilidade justa, bem-estar no trabalho e transparência ética.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                <differential.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {differential.title}
              </h3>
              
              <p className="text-white/80 mb-4 leading-relaxed">
                {differential.description}
              </p>
              
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-medium text-sm">
                  {differential.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para experimentar a diferença?
            </h3>
            <p className="text-white/80 mb-6">
              Junte-se a centenas de empresas e talentos que já descobriram uma forma melhor de trabalhar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Começar agora
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Saber mais
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;