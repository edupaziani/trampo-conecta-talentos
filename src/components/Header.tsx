import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Trampô
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#como-funciona" className="text-foreground hover:text-primary transition-colors">
              Como funciona
            </a>
            <a href="/#empresas" className="text-foreground hover:text-primary transition-colors">
              Para empresas
            </a>
            <a href="/#talentos" className="text-foreground hover:text-primary transition-colors">
              Para talentos
            </a>
            <a href="/vagas" className="text-foreground hover:text-primary transition-colors">
              Ver Vagas
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-primary/10"
              onClick={() => window.location.href = "/divulgar-vaga"}
            >
              Divulgar Vaga
            </Button>
            <Button 
              className="btn-hero"
              onClick={() => window.location.href = "/vagas"}
            >
              Ver Vagas
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="/#como-funciona" className="text-foreground hover:text-primary transition-colors">
                Como funciona
              </a>
              <a href="/#empresas" className="text-foreground hover:text-primary transition-colors">
                Para empresas
              </a>
              <a href="/#talentos" className="text-foreground hover:text-primary transition-colors">
                Para talentos
              </a>
              <a href="/vagas" className="text-foreground hover:text-primary transition-colors">
                Ver Vagas
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="ghost" 
                  className="text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = "/divulgar-vaga"}
                >
                  Divulgar Vaga
                </Button>
                <Button 
                  className="btn-hero"
                  onClick={() => window.location.href = "/vagas"}
                >
                  Ver Vagas
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;