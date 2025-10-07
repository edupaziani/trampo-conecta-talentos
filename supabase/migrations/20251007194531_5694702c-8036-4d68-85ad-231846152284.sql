-- Create enum for job types
CREATE TYPE public.job_type AS ENUM ('estagio', 'efetivo', 'freela');

-- Create enum for work modality
CREATE TYPE public.work_modality AS ENUM ('presencial', 'remoto', 'hibrido');

-- Create enum for job status
CREATE TYPE public.job_status AS ENUM ('pendente', 'aprovada', 'reprovada');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  job_type public.job_type NOT NULL,
  area TEXT NOT NULL,
  description TEXT NOT NULL,
  modality public.work_modality NOT NULL,
  application_link TEXT,
  application_email TEXT,
  status public.job_status NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT application_contact_check CHECK (
    application_link IS NOT NULL OR application_email IS NOT NULL
  )
);

-- Create talents table (for future use)
CREATE TABLE public.talents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  area_of_interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for companies
-- Anyone can view companies (needed for job listings)
CREATE POLICY "Anyone can view companies"
  ON public.companies
  FOR SELECT
  USING (true);

-- Anyone can insert companies (for job posting form)
CREATE POLICY "Anyone can insert companies"
  ON public.companies
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for jobs
-- Anyone can view approved jobs
CREATE POLICY "Anyone can view approved jobs"
  ON public.jobs
  FOR SELECT
  USING (status = 'aprovada' OR public.has_role(auth.uid(), 'admin'));

-- Anyone can insert jobs (for job posting form)
CREATE POLICY "Anyone can insert jobs"
  ON public.jobs
  FOR INSERT
  WITH CHECK (true);

-- Only admins can update jobs
CREATE POLICY "Admins can update jobs"
  ON public.jobs
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete jobs
CREATE POLICY "Admins can delete jobs"
  ON public.jobs
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for talents
-- Talents can view their own data
CREATE POLICY "Users can view own talent profile"
  ON public.talents
  FOR SELECT
  USING (auth.uid() = id);

-- Anyone can insert talent profiles
CREATE POLICY "Anyone can insert talent profiles"
  ON public.talents
  FOR INSERT
  WITH CHECK (true);

-- RLS Policies for user_roles
-- Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only admins can insert/update/delete roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_talents_updated_at
  BEFORE UPDATE ON public.talents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_area ON public.jobs(area);
CREATE INDEX idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);