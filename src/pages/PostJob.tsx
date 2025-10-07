import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const jobSchema = z.object({
  companyName: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  contactEmail: z.string().email("E-mail inválido"),
  contactPhone: z.string().optional(),
  title: z.string().min(5, "Título da vaga deve ter pelo menos 5 caracteres"),
  jobType: z.enum(["estagio", "efetivo", "freela"], {
    required_error: "Selecione o tipo de vaga",
  }),
  area: z.string().min(2, "Área deve ter pelo menos 2 caracteres"),
  description: z.string().min(20, "Descrição deve ter pelo menos 20 caracteres"),
  modality: z.enum(["presencial", "remoto", "hibrido"], {
    required_error: "Selecione a modalidade",
  }),
  applicationLink: z.string().url("Link inválido").optional().or(z.literal("")),
  applicationEmail: z.string().email("E-mail inválido").optional().or(z.literal("")),
}).refine(
  (data) => data.applicationLink || data.applicationEmail,
  {
    message: "Forneça um link de candidatura ou e-mail",
    path: ["applicationLink"],
  }
);

type JobFormData = z.infer<typeof jobSchema>;

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const jobType = watch("jobType");
  const modality = watch("modality");

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    
    try {
      // First, insert or get the company
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: data.companyName,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone || null,
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // Then, insert the job
      const { error: jobError } = await supabase
        .from("jobs")
        .insert({
          company_id: companyData.id,
          title: data.title,
          job_type: data.jobType,
          area: data.area,
          description: data.description,
          modality: data.modality,
          application_link: data.applicationLink || null,
          application_email: data.applicationEmail || null,
          status: "pendente",
        });

      if (jobError) throw jobError;

      toast({
        title: "Vaga enviada com sucesso!",
        description: "Sua vaga está em análise e será publicada em breve.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error posting job:", error);
      toast({
        title: "Erro ao enviar vaga",
        description: error.message || "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="bg-card rounded-2xl shadow-elegant p-8 border border-border/50">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Divulgar Vaga
          </h1>
          <p className="text-muted-foreground mb-8">
            Preencha os dados abaixo para divulgar sua vaga na Trampô
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Info */}
            <div className="space-y-4 p-6 bg-background/50 rounded-lg">
              <h2 className="text-lg font-semibold">Dados da Empresa</h2>
              
              <div>
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  {...register("companyName")}
                  placeholder="Ex: Tech Solutions"
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactEmail">E-mail de Contato *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail")}
                  placeholder="contato@empresa.com"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive mt-1">{errors.contactEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPhone">Telefone (opcional)</Label>
                <Input
                  id="contactPhone"
                  {...register("contactPhone")}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            {/* Job Info */}
            <div className="space-y-4 p-6 bg-background/50 rounded-lg">
              <h2 className="text-lg font-semibold">Dados da Vaga</h2>
              
              <div>
                <Label htmlFor="title">Título da Vaga *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Ex: Desenvolvedor Frontend Pleno"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="jobType">Tipo de Vaga *</Label>
                <Select onValueChange={(value) => setValue("jobType", value as any)} value={jobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estagio">Estágio</SelectItem>
                    <SelectItem value="efetivo">Efetivo</SelectItem>
                    <SelectItem value="freela">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-sm text-destructive mt-1">{errors.jobType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="area">Área *</Label>
                <Input
                  id="area"
                  {...register("area")}
                  placeholder="Ex: Tecnologia, Design, Marketing"
                />
                {errors.area && (
                  <p className="text-sm text-destructive mt-1">{errors.area.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="modality">Modalidade *</Label>
                <Select onValueChange={(value) => setValue("modality", value as any)} value={modality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="remoto">Remoto</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
                {errors.modality && (
                  <p className="text-sm text-destructive mt-1">{errors.modality.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição da Vaga *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Descreva as responsabilidades, requisitos e benefícios..."
                  rows={6}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="applicationLink">Link de Candidatura</Label>
                <Input
                  id="applicationLink"
                  type="url"
                  {...register("applicationLink")}
                  placeholder="https://empresa.com/vaga"
                />
                {errors.applicationLink && (
                  <p className="text-sm text-destructive mt-1">{errors.applicationLink.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="applicationEmail">ou E-mail de Candidatura</Label>
                <Input
                  id="applicationEmail"
                  type="email"
                  {...register("applicationEmail")}
                  placeholder="vagas@empresa.com"
                />
                {errors.applicationEmail && (
                  <p className="text-sm text-destructive mt-1">{errors.applicationEmail.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-hero"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Vaga"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
