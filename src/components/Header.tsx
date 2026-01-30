
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  
  const menuItems = [{
    label: 'Quem Somos',
    href: '/quem-somos'
  }, {
    label: 'Seja Sócio',
    href: '/#seja-socio'
  }, {
    label: 'Planos',
    href: '/#planos'
  }, {
    label: 'Simulador',
    href: '/#simulador'
  }, {
    label: 'Cotas',
    href: '/#cotas'
  }, {
    label: 'Garantias',
    href: '/garantias'
  }, {
    label: 'Contato',
    href: '/contato'
  }];

  const handleAuthAction = () => {
    if (isAuthenticated) {
      if (window.location.pathname === '/dashboard') {
        logout();
        window.location.href = '/';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <header className="bg-club8-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <img src="/lovable-uploads/ce9a3483-706c-4620-a853-024a9c09c5b8.png" alt="Club8 Logo" className="h-28 w-auto" />
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-club8-turquoise hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
            <Button 
              onClick={handleAuthAction}
              variant="outline" 
              className="border-club8-turquoise text-club8-turquoise hover:bg-club8-turquoise hover:text-club8-dark"
              style={{color:'#000'}}
            >
              {isAuthenticated ? (
                window.location.pathname === '/dashboard' ? 'Sair' : 'Dashboard'
              ) : 'Login'}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-club8-turquoise"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map(item => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-club8-turquoise hover:text-white transition-colors duration-200 font-medium" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={handleAuthAction}
                variant="outline" 
                className="border-club8-turquoise hover:bg-club8-turquoise text-club8-dark w-fit"
              >
                {isAuthenticated ? (
                  window.location.pathname === '/dashboard' ? 'Sair' : 'Dashboard'
                ) : 'Login'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
