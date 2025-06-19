
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock } from 'lucide-react';

interface LanguageGridProps {
  language: string;
}

const LanguageGrid = ({ language }: LanguageGridProps) => {
  const translations = {
    en: {
      title: 'Available Languages',
      subtitle: 'Choose from our wide range of language courses',
      learnMore: 'Learn More',
      students: 'students',
      hours: 'hours of content'
    },
    ar: {
      title: 'اللغات المتاحة',
      subtitle: 'اختر من مجموعة واسعة من دورات اللغات',
      learnMore: 'اعرف المزيد',
      students: 'طالب',
      hours: 'ساعة من المحتوى'
    },
    es: {
      title: 'Idiomas Disponibles',
      subtitle: 'Elige de nuestra amplia gama de cursos de idiomas',
      learnMore: 'Saber Más',
      students: 'estudiantes',
      hours: 'horas de contenido'
    }
  };

  const t = translations[language as keyof typeof translations];

  const languages = [
    {
      name: 'English',
      nameAr: 'الإنجليزية',
      nameEs: 'Inglés',
      flag: '🇬🇧',
      students: 5420,
      hours: 120,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop',
      popular: true
    },
    {
      name: 'Arabic',
      nameAr: 'العربية',
      nameEs: 'Árabe',
      flag: '🇸🇦',
      students: 3200,
      hours: 100,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      name: 'Spanish',
      nameAr: 'الإسبانية',
      nameEs: 'Español',
      flag: '🇪🇸',
      students: 4100,
      hours: 110,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    },
    {
      name: 'French',
      nameAr: 'الفرنسية',
      nameEs: 'Francés',
      flag: '🇫🇷',
      students: 2800,
      hours: 95,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    },
    {
      name: 'German',
      nameAr: 'الألمانية',
      nameEs: 'Alemán',
      flag: '🇩🇪',
      students: 2100,
      hours: 85,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
    },
    {
      name: 'Chinese',
      nameAr: 'الصينية',
      nameEs: 'Chino',
      flag: '🇨🇳',
      students: 1900,
      hours: 90,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
    }
  ];

  const getLanguageName = (lang: any) => {
    switch (language) {
      case 'ar': return lang.nameAr;
      case 'es': return lang.nameEs;
      default: return lang.name;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={lang.image}
                    alt={getLanguageName(lang)}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {lang.popular && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl">{lang.flag}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {getLanguageName(lang)}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{lang.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{lang.students.toLocaleString()} {t.students}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-6">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{lang.hours} {t.hours}</span>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group-hover:bg-emerald-700 transition-colors">
                    {t.learnMore}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageGrid;
