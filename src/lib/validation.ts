import { z } from "zod";

// Brazilian phone number regex (with and without formatting)
const brazilianPhoneRegex = /^(?:\+55\s?)?(?:\(?0?[1-9]{2}\)?\s?)?9?\d{4}-?\d{4}$/;

// Safe text regex (alphanumeric + spaces + common punctuation, no script tags)
const safeTextRegex = /^[a-zA-ZÀ-ÿ0-9\s\.,\-_()!?@#&]*$/;

// Company/Professional name regex (more restrictive)
const nameRegex = /^[a-zA-ZÀ-ÿ\s\.,\-&()]*$/;

// Lead capture form validation schema
export const leadCaptureSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" })
    .regex(nameRegex, { message: "Nome contém caracteres inválidos" })
    .refine((value) => value.split(" ").length >= 2, {
      message: "Por favor, insira nome e sobrenome",
    }),
  
  email: z
    .string()
    .trim()
    .min(1, { message: "E-mail é obrigatório" })
    .max(255, { message: "E-mail deve ter no máximo 255 caracteres" })
    .email({ message: "E-mail inválido" })
    .toLowerCase(),
  
  telefone: z
    .string()
    .trim()
    .min(1, { message: "Telefone é obrigatório" })
    .regex(brazilianPhoneRegex, { 
      message: "Formato de telefone inválido. Use: (11) 99999-9999" 
    }),
  
  empresa: z
    .string()
    .trim()
    .max(100, { message: "Nome da empresa deve ter no máximo 100 caracteres" })
    .regex(nameRegex, { message: "Nome da empresa contém caracteres inválidos" })
    .optional()
    .or(z.literal("")),
  
  cargo: z
    .string()
    .trim()
    .min(2, { message: "Cargo/área deve ter pelo menos 2 caracteres" })
    .max(100, { message: "Cargo/área deve ter no máximo 100 caracteres" })
    .regex(safeTextRegex, { message: "Cargo/área contém caracteres inválidos" }),
  
  area: z
    .string()
    .trim()
    .min(1, { message: "Área de interesse é obrigatória" })
    .max(50, { message: "Área deve ter no máximo 50 caracteres" }),
  
  experiencia: z
    .string()
    .trim()
    .max(50, { message: "Experiência deve ter no máximo 50 caracteres" })
    .optional()
    .or(z.literal("")),
  
  necessidade: z
    .string()
    .trim()
    .max(1000, { message: "Descrição deve ter no máximo 1000 caracteres" })
    .regex(safeTextRegex, { message: "Descrição contém caracteres inválidos" })
    .optional()
    .or(z.literal("")),
  
  aceita_termos: z
    .boolean()
    .refine((value) => value === true, {
      message: "É necessário aceitar os termos de uso e política de privacidade",
    }),
  
  aceita_contato: z.boolean(),
});

// Type for the form data
export type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;

// Validation for empresa tab (requires empresa field)
export const empresaSchema = leadCaptureSchema.extend({
  empresa: z
    .string()
    .trim()
    .min(2, { message: "Nome da empresa é obrigatório" })
    .max(100, { message: "Nome da empresa deve ter no máximo 100 caracteres" })
    .regex(nameRegex, { message: "Nome da empresa contém caracteres inválidos" }),
});

// Validation for talento tab (requires experiencia field)
export const talentoSchema = leadCaptureSchema.extend({
  experiencia: z
    .string()
    .trim()
    .min(1, { message: "Nível de experiência é obrigatório" })
    .max(50, { message: "Experiência deve ter no máximo 50 caracteres" }),
});

// Utility functions for input sanitization
export const sanitizeInput = {
  // Remove potential XSS characters but keep accented characters
  text: (input: string): string => {
    return input
      .trim()
      .replace(/[<>\\"'&]/g, "") // Remove basic XSS chars
      .substring(0, 1000); // Enforce max length
  },
  
  // Format Brazilian phone number
  phone: (input: string): string => {
    const digitsOnly = input.replace(/\D/g, "");
    
    if (digitsOnly.length <= 11) {
      return digitsOnly.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
    }
    
    return input.substring(0, 15); // Limit length
  },
  
  // Normalize email
  email: (input: string): string => {
    return input.trim().toLowerCase().substring(0, 255);
  },
  
  // Clean name (preserve accents but remove potentially dangerous chars)
  name: (input: string): string => {
    return input
      .trim()
      .replace(/[<>\\"'&]/g, "")
      .substring(0, 100);
  },
};

// Rate limiting helpers (for future use)
export const rateLimitConfig = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: "Muitas tentativas. Tente novamente em alguns minutos.",
};
