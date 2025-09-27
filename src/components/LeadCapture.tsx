import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Building, User, AlertCircle } from "lucide-react";
import { leadCaptureSchema, empresaSchema, talentoSchema, sanitizeInput, type LeadCaptureFormData } from "@/lib/validation";
import { z } from "zod";

const LeadCapture = () => {
  const [activeTab, setActiveTab] = useState<"empresa" | "talento">("empresa");
  const [formData, setFormData] = useState<LeadCaptureFormData>({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (submitAttempts >= 5) {
      toast({
        title: "Muitas tentativas",
        description: "Aguarde alguns minutos antes de tentar novamente.",
        variant: "destructive",
      });
      return;
    }

    // Clear previous errors
    setErrors({});
    setIsLoading(true);

    try {
      // Sanitize inputs before validation
      const sanitizedData = {
        ...formData,
        nome: sanitizeInput.name(formData.nome),
        email: sanitizeInput.email(formData.email),
        telefone: sanitizeInput.phone(formData.telefone),
        empresa: sanitizeInput.name(formData.empresa),
        cargo: sanitizeInput.text(formData.cargo),
        necessidade: sanitizeInput.text(formData.necessidade),
      };

      // Choose appropriate schema based on active tab
      const schema = activeTab === "empresa" ? empresaSchema : talentoSchema;
      
      // Validate form data
      const validatedData = schema.parse(sanitizedData);

      // Increment submit attempts for rate limiting
      setSubmitAttempts(prev => prev + 1);

      // Simulated form submission with security logging
      console.log("Form submitted successfully for:", activeTab, {
        hasEmail: !!validatedData.email,
        hasPhone: !!validatedData.telefone,
        timestamp: new Date().toISOString(),
      });

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
        setSubmitAttempts(0);
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formErrors);
        
        toast({
          title: "Erro de validação",
          description: "Por favor, corrija os campos destacados em vermelho.",
          variant: "destructive",
        });
      } else {
        // Handle unexpected errors
        toast({
          title: "Erro inesperado",
          description: "Ocorreu um erro. Tente novamente em alguns minutos.",
          variant: "destructive",
        });
        console.error("Form submission error:", error);
      }
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // Apply real-time sanitization for text inputs
    let sanitizedValue = value;
    if (typeof value === "string") {
      switch (field) {
        case "nome":
        case "empresa":
          sanitizedValue = sanitizeInput.name(value);
          break;
        case "email":
          sanitizedValue = sanitizeInput.email(value);
          break;
        case "telefone":
          sanitizedValue = sanitizeInput.phone(value);
          break;
        case "cargo":
        case "necessidade":
          sanitizedValue = sanitizeInput.text(value);
          break;
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
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
                    maxLength={100}
                    className={errors.nome ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.nome && (
                    <div className="flex items-center space-x-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.nome}</span>
                    </div>
                  )}
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
                    maxLength={255}
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.email && (
                    <div className="flex items-center space-x-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </div>
                  )}
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
                    maxLength={15}
                    className={errors.telefone ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.telefone && (
                    <div className="flex items-center space-x-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.telefone}</span>
                    </div>
                  )}
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
                      maxLength={100}
                      className={errors.empresa ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.empresa && (
                      <div className="flex items-center space-x-1 text-sm text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.empresa}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="experiencia">Nível de experiência *</Label>
                    <Select 
                      onValueChange={(value) => handleInputChange("experiencia", value)}
                      value={formData.experiencia}
                    >
                      <SelectTrigger className={errors.experiencia ? "border-destructive focus-visible:ring-destructive" : ""}>
                        <SelectValue placeholder="Selecione seu nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Júnior (1-3 anos)</SelectItem>
                        <SelectItem value="pleno">Pleno (3-6 anos)</SelectItem>
                        <SelectItem value="senior">Sênior (6+ anos)</SelectItem>
                        <SelectItem value="especialista">Especialista (10+ anos)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experiencia && (
                      <div className="flex items-center space-x-1 text-sm text-destructive">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.experiencia}</span>
                      </div>
                    )}
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
                    maxLength={100}
                    className={errors.cargo ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.cargo && (
                    <div className="flex items-center space-x-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.cargo}</span>
                    </div>
                  )}
                </div>

                {/* Área de interesse */}
                <div className="space-y-2">
                  <Label htmlFor="area">Área de interesse *</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange("area", value)}
                    value={formData.area}
                  >
                    <SelectTrigger className={errors.area ? "border-destructive focus-visible:ring-destructive" : ""}>
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
                  {errors.area && (
                    <div className="flex items-center space-x-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.area}</span>
                    </div>
                  )}
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
                  maxLength={1000}
                  className={errors.necessidade ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.necessidade && (
                  <div className="flex items-center space-x-1 text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.necessidade}</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground text-right">
                  {formData.necessidade.length}/1000 caracteres
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="space-y-2">
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
                  {errors.aceita_termos && (
                    <div className="flex items-center space-x-1 text-sm text-destructive ml-6">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.aceita_termos}</span>
                    </div>
                  )}
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