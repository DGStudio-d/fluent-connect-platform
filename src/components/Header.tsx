
import React from 'react';
import { Globe, Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (mode: boolean) => void;
}

const Header = ({ language, setLanguage, isDarkMode, setIsDarkMode }: HeaderProps) => {
  const translations = {
    en: {
      home: 'Home',
      courses: 'Courses',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up'
    },
    ar: {
      home: 'الرئيسية',
      courses: 'الدورات',
      about: 'حول',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب'
    },
    es: {
      home: 'Inicio',
      courses: 'Cursos',
      about: 'Acerca de',
      contact: 'Contacto',
      login: 'Iniciar Sesión',
      signup: 'Registrarse'
    }
  };

  const t = translations[language as keyof typeof translations];

  const languageFlags = {
    en: { flag: '🇬🇧', name: 'EN' },
    ar: { flag: '🇸🇦', name: 'AR' },
    es: { flag: '🇪🇸', name: 'ES' }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-emerald-600">LearnLive</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-emerald-600 transition-colors">{t.home}</a>
          <a href="#" className="text-foreground hover:text-emerald-600 transition-colors">{t.courses}</a>
          <a href="#" className="text-foreground hover:text-emerald-600 transition-colors">{t.about}</a>
          <a href="#" className="text-foreground hover:text-emerald-600 transition-colors">{t.contact}</a>
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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">{t.login}</Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">{t.signup}</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
