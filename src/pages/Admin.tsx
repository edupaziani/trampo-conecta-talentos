import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";
import { Check, X, LogOut, Briefcase, Mail, ExternalLink, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Job {
  id: string;
  title: string;
  job_type: "estagio" | "efetivo" | "freela";
  area: string;
  description: string;
  modality: "presencial" | "remoto" | "hibrido";
  application_link: string | null;
  application_email: string | null;
  status: "pendente" | "aprovada" | "reprovada";
  created_at: string;
  companies: {
    name: string;
    contact_email: string;
    contact_phone: string | null;
  };
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/auth");
      return;
    }

    setSession(session);

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError) {
      console.error("Error checking admin role:", roleError);
    }

    if (!roleData) {
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta área.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchJobs();
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (
            name,
            contact_email,
            contact_phone
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Erro ao carregar vagas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (jobId: string, status: "aprovada" | "reprovada") => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status })
        .eq("id", jobId);

      if (error) throw error;

      toast({
        title: status === "aprovada" ? "Vaga aprovada!" : "Vaga reprovada",
        description: status === "aprovada" 
          ? "A vaga agora está visível na página de vagas."
          : "A vaga foi rejeitada.",
      });

      fetchJobs();
    } catch (error: any) {
      console.error("Error updating job status:", error);
      toast({
        title: "Erro ao atualizar vaga",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getJobTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      estagio: "Estágio",
      efetivo: "Efetivo",
      freela: "Freelancer",
    };
    return labels[type] || type;
  };

  const getModalityLabel = (modality: string) => {
    const labels: Record<string, string> = {
      presencial: "Presencial",
      remoto: "Remoto",
      hibrido: "Híbrido",
    };
    return labels[modality] || modality;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pendente: "secondary",
      aprovada: "default",
      reprovada: "destructive",
    };
    const labels: Record<string, string> = {
      pendente: "Pendente",
      aprovada: "Aprovada",
      reprovada: "Reprovada",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  const renderJobCard = (job: Job) => (
    <Card key={job.id}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">{getJobTypeLabel(job.job_type)}</Badge>
            <Badge variant="outline">{getModalityLabel(job.modality)}</Badge>
            {getStatusBadge(job.status)}
          </div>
        </div>
        <CardTitle className="line-clamp-2">{job.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          {job.companies.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm">
            <strong>Área:</strong> {job.area}
          </div>
          <div className="text-sm">
            <strong>Descrição:</strong>
            <p className="text-muted-foreground line-clamp-3 mt-1">{job.description}</p>
          </div>
          <div className="text-sm">
            <strong>Contato da empresa:</strong>
            <p className="text-muted-foreground">{job.companies.contact_email}</p>
            {job.companies.contact_phone && (
              <p className="text-muted-foreground">{job.companies.contact_phone}</p>
            )}
          </div>
          {job.application_link && (
            <div className="text-sm">
              <strong>Link:</strong>{" "}
              <a
                href={job.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {job.application_link}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          {job.application_email && (
            <div className="text-sm">
              <strong>E-mail:</strong>{" "}
              <a
                href={`mailto:${job.application_email}`}
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                {job.application_email}
                <Mail className="h-3 w-3" />
              </a>
            </div>
          )}
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(job.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </CardContent>
      {job.status === "pendente" && (
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => handleUpdateStatus(job.id, "aprovada")}
          >
            <Check className="mr-2 h-4 w-4" />
            Aprovar
          </Button>
          <Button
            className="flex-1"
            variant="destructive"
            onClick={() => handleUpdateStatus(job.id, "reprovada")}
          >
            <X className="mr-2 h-4 w-4" />
            Reprovar
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  if (!session || !isAdmin) {
    return null;
  }

  const pendingJobs = jobs.filter((job) => job.status === "pendente");
  const approvedJobs = jobs.filter((job) => job.status === "aprovada");
  const rejectedJobs = jobs.filter((job) => job.status === "reprovada");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">Gerenciar vagas da Trampô</p>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando vagas...</p>
          </div>
        ) : (
          <Tabs defaultValue="pendente" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pendente">
                Pendentes ({pendingJobs.length})
              </TabsTrigger>
              <TabsTrigger value="aprovada">
                Aprovadas ({approvedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="reprovada">
                Reprovadas ({rejectedJobs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pendente" className="mt-6">
              {pendingJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma vaga pendente.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pendingJobs.map(renderJobCard)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="aprovada" className="mt-6">
              {approvedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma vaga aprovada.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {approvedJobs.map(renderJobCard)}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reprovada" className="mt-6">
              {rejectedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma vaga reprovada.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rejectedJobs.map(renderJobCard)}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Admin;
