import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, MapPin, Mail, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  job_type: "estagio" | "efetivo" | "freela";
  area: string;
  description: string;
  modality: "presencial" | "remoto" | "hibrido";
  application_link: string | null;
  application_email: string | null;
  created_at: string;
  companies: {
    name: string;
  };
}

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [areaFilter, setAreaFilter] = useState<string>("todas");
  const [typeFilter, setTypeFilter] = useState<string>("todos");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, areaFilter, typeFilter]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          *,
          companies (name)
        `)
        .eq("status", "aprovada")
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

  const filterJobs = () => {
    let filtered = jobs;

    if (areaFilter !== "todas") {
      filtered = filtered.filter((job) => job.area.toLowerCase() === areaFilter.toLowerCase());
    }

    if (typeFilter !== "todos") {
      filtered = filtered.filter((job) => job.job_type === typeFilter);
    }

    setFilteredJobs(filtered);
  };

  const getUniqueAreas = () => {
    const areas = jobs.map((job) => job.area);
    return [...new Set(areas)];
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Vagas Disponíveis
          </h1>
          <p className="text-muted-foreground text-lg">
            Encontre as melhores oportunidades selecionadas pela Trampô
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as áreas</SelectItem>
                {getUniqueAreas().map((area) => (
                  <SelectItem key={area} value={area.toLowerCase()}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="estagio">Estágio</SelectItem>
                <SelectItem value="efetivo">Efetivo</SelectItem>
                <SelectItem value="freela">Freelancer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jobs List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando vagas...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma vaga encontrada com os filtros selecionados.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{getJobTypeLabel(job.job_type)}</Badge>
                    <Badge variant="outline">{getModalityLabel(job.modality)}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {job.companies.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {job.area}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {job.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  {job.application_link ? (
                    <Button
                      className="w-full btn-hero"
                      onClick={() => window.open(job.application_link!, "_blank")}
                    >
                      Candidatar-se
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  ) : job.application_email ? (
                    <Button
                      className="w-full btn-hero"
                      onClick={() => window.location.href = `mailto:${job.application_email}`}
                    >
                      Enviar E-mail
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
