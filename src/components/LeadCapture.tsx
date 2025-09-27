import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building, User } from "lucide-react";

const LeadCapture = () => {
  const [activeTab, setActiveTab] = useState<"empresa" | "talento">("empresa");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cargo: "",
    area: "",
    experiencia: "",
    necessidade: "",
    aceita_termos: false,
    aceita_contato: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceita_termos) {
      toast({
        title: "Erro",
        description: "É necessário aceitar os termos de uso e política de privacidade.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulated form submission
    setTimeout(() => {
      toast({
        title: "Cadastro realizado!",
        description: "Entraremos em contato em breve. Bem-vindo(a) à Trampô!",
      });
      setIsLoading(false);
      
      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        cargo: "",
        area: "",
        experiencia: "",
        necessidade: "",
        aceita_termos: false,
        aceita_contato: false
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/20 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Junte-se à Trampô</h2>
          <p className="section-subtitle">
            Cadastre-se e seja um dos primeiros a descobrir uma nova forma de trabalhar
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tab Selector */}
          <div className="flex flex-col sm:flex-row justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab("empresa")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                  activeTab === "empresa"
                    ? "bg-background shadow-md text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building className="w-5 h-5" />
                <span className="font-medium">Sou empresa</span>
              </button>
              <button
                onClick={() => setActiveTab("talento")}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all ${
                  activeTab === "talento"
                    ? "bg-background shadow-md text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Sou talento</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-background rounded-2xl shadow-lg border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo *</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone *</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    required
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Campo específico por tipo */}
                {activeTab === "empresa" ? (
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Empresa *</Label>
                    <Input
                      id="empresa"
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => handleInputChange("empresa", e.target.value)}
                      required
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="experiencia">Nível de experiência *</Label>
                    <Select onValueChange={(value) => handleInputChange("experiencia", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Júnior (1-3 anos)</SelectItem>
                        <SelectItem value="pleno">Pleno (3-6 anos)</SelectItem>
                        <SelectItem value="senior">Sênior (6+ anos)</SelectItem>
                        <SelectItem value="especialista">Especialista (10+ anos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Cargo/Área */}
                <div className="space-y-2">
                  <Label htmlFor="cargo">
                    {activeTab === "empresa" ? "Seu cargo" : "Área de atuação"} *
                  </Label>
                  <Input
                    id="cargo"
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => handleInputChange("cargo", e.target.value)}
                    required
                    placeholder={activeTab === "empresa" ? "Diretor, Gerente, etc." : "Desenvolvimento, Design, Marketing, etc."}
                  />
                </div>

                {/* Área de interesse */}
                <div className="space-y-2">
                  <Label htmlFor="area">Área de interesse *</Label>
                  <Select onValueChange={(value) => handleInputChange("area", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Necessidade/Objetivo */}
              <div className="space-y-2">
                <Label htmlFor="necessidade">
                  {activeTab === "empresa" 
                    ? "Descreva sua necessidade de contratação" 
                    : "Conte-nos sobre seus objetivos profissionais"
                  }
                </Label>
                <Textarea
                  id="necessidade"
                  value={formData.necessidade}
                  onChange={(e) => handleInputChange("necessidade", e.target.value)}
                  placeholder={activeTab === "empresa" 
                    ? "Exemplo: Precisamos de um desenvolvedor React para um projeto de 3 meses..."
                    : "Exemplo: Busco projetos de design que me permitam trabalhar remotamente..."
                  }
                  rows={4}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termos"
                    checked={formData.aceita_termos}
                    onCheckedChange={(checked) => handleInputChange("aceita_termos", checked as boolean)}
                  />
                  <Label htmlFor="termos" className="text-sm leading-relaxed">
                    Aceito os{" "}
                    <a href="#" className="text-primary hover:underline">
                      termos de uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-primary hover:underline">
                      política de privacidade
                    </a>{" "}
                    da Trampô *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="contato"
                    checked={formData.aceita_contato}
                    onCheckedChange={(checked) => handleInputChange("aceita_contato", checked as boolean)}
                  />
                  <Label htmlFor="contato" className="text-sm leading-relaxed">
                    Aceito receber contato da Trampô com novidades e oportunidades relevantes
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  className="btn-hero min-w-[200px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Enviando..."
                  ) : (
                    <>
                      Cadastrar agora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Ao se cadastrar, você será um dos primeiros a ter acesso quando a plataforma estiver disponível.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;