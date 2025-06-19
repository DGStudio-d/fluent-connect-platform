
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  language: string;
}

const Testimonials = ({ language }: TestimonialsProps) => {
  const translations = {
    en: {
      title: 'What Our Students Say',
      subtitle: 'Real feedback from real students'
    },
    ar: {
      title: 'ماذا يقول طلابنا',
      subtitle: 'تعليقات حقيقية من طلاب حقيقيين'
    },
    es: {
      title: 'Lo Que Dicen Nuestros Estudiantes',
      subtitle: 'Comentarios reales de estudiantes reales'
    }
  };

  const t = translations[language as keyof typeof translations];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Professional',
      rating: 5,
      text: {
        en: 'The live sessions are incredible! I improved my Arabic speaking skills dramatically in just 3 months.',
        ar: 'الجلسات المباشرة رائعة! تحسنت مهاراتي في التحدث بالعربية بشكل كبير في 3 أشهر فقط.',
        es: '¡Las sesiones en vivo son increíbles! Mejoré mis habilidades de habla en árabe dramáticamente en solo 3 meses.'
      },
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'University Student',
      rating: 5,
      text: {
        en: 'Perfect platform for learning Spanish. The teachers are native speakers and very patient.',
        ar: 'منصة مثالية لتعلم الإسبانية. المعلمون متحدثون أصليون وصبورون جداً.',
        es: 'Plataforma perfecta para aprender español. Los profesores son hablantes nativos y muy pacientes.'
      },
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Language Enthusiast',
      rating: 5,
      text: {
        en: 'Interactive sessions on Google Meet made learning English so much fun and effective!',
        ar: 'الجلسات التفاعلية على Google Meet جعلت تعلم الإنجليزية ممتعاً وفعالاً جداً!',
        es: '¡Las sesiones interactivas en Google Meet hicieron que aprender inglés fuera muy divertido y efectivo!'
      },
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const getText = (testimonial: any) => {
    return testimonial.text[language as keyof typeof testimonial.text] || testimonial.text.en;
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-emerald-600 mb-4" />
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{getText(testimonial)}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
