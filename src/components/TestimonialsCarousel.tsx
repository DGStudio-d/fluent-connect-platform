
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialsCarouselProps {
  language: string;
}

const TestimonialsCarousel = ({ language }: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    },
    {
      name: 'David Kim',
      role: 'Software Engineer',
      rating: 5,
      text: {
        en: 'The flexibility of scheduling sessions around my work is amazing. Highly recommend!',
        ar: 'مرونة جدولة الجلسات حول عملي مذهلة. أنصح بشدة!',
        es: 'La flexibilidad de programar sesiones en torno a mi trabajo es increíble. ¡Muy recomendable!'
      },
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const getText = (testimonial: any) => {
    return testimonial.text[language as keyof typeof testimonial.text] || testimonial.text.en;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <Quote className="h-12 w-12 text-emerald-600" />
                      </div>
                      
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                        "{getText(testimonial)}"
                      </p>

                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <img 
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 shadow-lg hover-scale"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 shadow-lg hover-scale"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
