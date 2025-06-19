
import React, { useState } from 'react';
import { Globe, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
}

const Header = ({ language, setLanguage, isDarkMode, setIsDarkMode }: HeaderProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const translations = {
    en: {
      home: 'Home',
      courses: 'Courses',
      about: 'About',
      languages: 'Languages',
      sessions: 'Live Sessions',
      faq: 'FAQ',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      profile: 'Profile',
      dashboard: 'Dashboard',
      logout: 'Logout',
      admin: 'Admin Panel'
    },
    ar: {
      home: 'الرئيسية',
      courses: 'الدورات',
      about: 'حول',
      languages: 'اللغات',
      sessions: 'الجلسات المباشرة',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      profile: 'الملف الشخصي',
      dashboard: 'لوحة التحكم',
      logout: 'تسجيل الخروج',
      admin: 'لوحة المدير'
    },
    es: {
      home: 'Inicio',
      courses: 'Cursos',
      about: 'Acerca de',
      languages: 'Idiomas',
      sessions: 'Sesiones en Vivo',
      faq: 'FAQ',
      contact: 'Contacto',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      profile: 'Perfil',
      dashboard: 'Panel',
      logout: 'Cerrar Sesión',
      admin: 'Panel de Admin'
    }
  };

  const t = translations[language as keyof typeof translations];

  const languageFlags = {
    en: { flag: '🇬🇧', name: 'EN' },
    ar: { flag: '🇸🇦', name: 'AR' },
    es: { flag: '🇪🇸', name: 'ES' }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-emerald-600">LearnLive</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-emerald-600 transition-colors">{t.home}</a>
            <a href="/about" className="text-foreground hover:text-emerald-600 transition-colors">{t.about}</a>
            <a href="/languages" className="text-foreground hover:text-emerald-600 transition-colors">{t.languages}</a>
            <a href="/sessions" className="text-foreground hover:text-emerald-600 transition-colors">{t.sessions}</a>
            <a href="/faq" className="text-foreground hover:text-emerald-600 transition-colors">{t.faq}</a>
            <a href="/contact" className="text-foreground hover:text-emerald-600 transition-colors">{t.contact}</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="space-x-2">
                  <span>{languageFlags[language as keyof typeof languageFlags].flag}</span>
                  <span>{languageFlags[language as keyof typeof languageFlags].name}</span>
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                {Object.entries(languageFlags).map(([lang, data]) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="cursor-pointer space-x-2"
                  >
                    <span>{data.flag}</span>
                    <span>{data.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border border-border">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    {t.profile}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    {t.dashboard}
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/admin'}>
                      {t.admin}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                  {t.login}
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsAuthModalOpen(true)}>
                  {t.signup}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        language={language}
      />
    </>
  );
};

export default Header;
