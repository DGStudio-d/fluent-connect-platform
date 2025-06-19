import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Languages = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const translations = {
    en: {
      title: 'Languages',
      subtitle: 'Explore the languages we offer and start learning today!',
      levels: 'Levels',
      features: 'Features',
      startLearning: 'Start Learning',
    },
    ar: {
      title: 'اللغات',
      subtitle: 'اكتشف اللغات التي نقدمها وابدأ التعلم اليوم!',
      levels: 'المستويات',
      features: 'الميزات',
      startLearning: 'ابدأ التعلم',
    },
    es: {
      title: 'Idiomas',
      subtitle: '¡Explora los idiomas que ofrecemos y comienza a aprender hoy mismo!',
      levels: 'Niveles',
      features: 'Características',
      startLearning: 'Comenzar a aprender',
    }
  };

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      popularity: 'Most Popular',
      description: 'The world\'s most widely spoken language, essential for global communication.',
      levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
      features: ['Interactive lessons', 'Real-time feedback', 'Cultural insights']
    },
    {
      code: 'es',
      name: 'Spanish',
      flag: '🇪🇸',
      popularity: 'Trending',
      description: 'A vibrant language spoken across Latin America and Spain.',
      levels: ['A1', 'A2', 'B1', 'B2'],
      features: ['Engaging exercises', 'Native speakers', 'Grammar focus']
    },
    {
      code: 'ar',
      name: 'Arabic',
      flag: '🇸🇦',
      popularity: 'New',
      description: 'Explore the rich culture and history through the Arabic language.',
      levels: ['A1', 'A2', 'B1'],
      features: ['Classical texts', 'Modern dialects', 'Cultural immersion']
    },
  ];

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-background text-foreground transition-colors duration-300">
        <Header 
          language={language} 
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-6">{t.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languages.map((lang) => (
              <Card key={lang.code} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{lang.flag}</span>
                    <Badge variant="secondary">{lang.popularity}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{lang.name}</CardTitle>
                  <CardDescription>{lang.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{t.levels}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lang.levels.map((level) => (
                          <Badge key={level} variant="outline">{level}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">{t.features}:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {lang.features.map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {t.startLearning}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
