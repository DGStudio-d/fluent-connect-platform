
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, BookOpen } from 'lucide-react';
import StatsCounter from './StatsCounter';

interface HeroSectionProps {
  language: string;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const translations = {
    en: {
      title: 'Learn Languages Live',
      subtitle: 'with Expert Teachers',
      description: 'Join interactive live sessions on Google Meet or Microsoft Teams. Learn English, Arabic, Spanish and more with certified teachers.',
      cta: 'Start Learning Today',
      watchDemo: 'Watch Demo'
    },
    ar: {
      title: 'تعلم اللغات مباشرة',
      subtitle: 'مع المعلمين الخبراء',
      description: 'انضم إلى جلسات تفاعلية مباشرة على Google Meet أو Microsoft Teams. تعلم الإنجليزية والعربية والإسبانية والمزيد مع معلمين معتمدين.',
      cta: 'ابدأ التعلم اليوم',
      watchDemo: 'شاهد العرض التوضيحي'
    },
    es: {
      title: 'Aprende Idiomas en Vivo',
      subtitle: 'con Profesores Expertos',
      description: 'Únete a sesiones interactivas en vivo en Google Meet o Microsoft Teams. Aprende inglés, árabe, español y más con profesores certificados.',
      cta: 'Comienza a Aprender Hoy',
      watchDemo: 'Ver Demo'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-emerald-600 animate-pulse">{t.title}</span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">{t.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg hover-scale">
                <BookOpen className="mr-2 h-5 w-5" />
                {t.cta}
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg hover-scale">
                <Play className="mr-2 h-5 w-5" />
                {t.watchDemo}
              </Button>
            </div>

            <StatsCounter language={language} />
          </div>

          <div className="relative animate-fade-in">
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 hover-scale">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop"
                alt="Student learning online"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Live Interactive Learning</h3>
                <p className="text-gray-600 dark:text-gray-400">Join thousands of students learning languages through live video sessions with expert teachers.</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-200 dark:bg-emerald-800 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-20 h-20 bg-green-200 dark:bg-green-800 rounded-full opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
