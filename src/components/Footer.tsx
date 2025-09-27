import { Mail, Phone, Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-secondary-light bg-clip-text text-transparent">
                Trampô
              </span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">
              Conectando empresas que precisam contratar rapidamente com talentos qualificados 
              que buscam flexibilidade e maior renda líquida.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-3">
              <li>
                <a href="#como-funciona" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#empresas" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Para empresas
                </a>
              </li>
              <li>
                <a href="#talentos" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Para talentos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/60" />
                <a 
                  href="mailto:contato@trampo.com" 
                  className="text-primary-foreground/80 hover:text-white transition-colors"
                >
                  contato@trampo.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/60" />
                <a 
                  href="tel:+5511999999999" 
                  className="text-primary-foreground/80 hover:text-white transition-colors"
                >
                  (11) 99999-9999
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">Futuro Blog</h5>
              <p className="text-primary-foreground/60 text-sm">
                Em breve: dicas de carreira, tendências do futuro do trabalho e insights do mercado.
              </p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-primary-light/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-primary-foreground/60 text-sm">
              © {currentYear} Trampô. Todos os direitos reservados.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                LGPD
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6 pt-6 border-t border-primary-light/10">
            <p className="text-primary-foreground/60 text-xs max-w-2xl mx-auto">
              A Trampô é uma plataforma digital em desenvolvimento que visa conectar empresas e talentos de forma transparente e eficiente. 
              Estamos em fase piloto e trabalhando para revolucionar o mercado de trabalho no Brasil.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;