
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Users, Clock, Award } from 'lucide-react';

interface LanguagesProps {
  language?: string;
}

const Languages = ({ language = 'en' }: LanguagesProps) => {
  const translations = {
    en: {
      title: 'Languages Offered',
      subtitle: 'Explore our comprehensive language programs designed for every skill level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      learnMore: 'Learn More',
      enrollNow: 'Enroll Now',
      duration: 'Duration',
      students: 'Students Enrolled',
      certificate: 'Certificate Available',
      languages: [
        {
          name: 'English',
          flag: '🇬🇧',
          description: 'Master English for global communication and career advancement',
          levels: {
            beginner: 'Learn basic vocabulary, grammar, and everyday conversations',
            intermediate: 'Develop fluency in business and academic contexts',
            advanced: 'Perfect your English for professional and academic excellence'
          },
          students: '2,500+',
          duration: '3-6 months'
        },
        {
          name: 'Arabic',
          flag: '🇸🇦',
          description: 'Learn Modern Standard Arabic and regional dialects',
          levels: {
            beginner: 'Master Arabic script, basic grammar, and common phrases',
            intermediate: 'Improve reading, writing, and conversational skills',
            advanced: 'Achieve fluency in formal and colloquial Arabic'
          },
          students: '1,800+',
          duration: '4-8 months'
        },
        {
          name: 'Spanish',
          flag: '🇪🇸',
          description: 'Speak Spanish with confidence and cultural understanding',
          levels: {
            beginner: 'Learn essential vocabulary and basic grammar structures',
            intermediate: 'Develop conversational skills and cultural awareness',
            advanced: 'Master complex grammar and professional communication'
          },
          students: '2,200+',
          duration: '3-6 months'
        },
        {
          name: 'French',
          flag: '🇫🇷',
          description: 'Experience the beauty of French language and culture',
          levels: {
            beginner: 'Start with pronunciation, basic grammar, and vocabulary',
            intermediate: 'Build fluency through real-world conversations',
            advanced: 'Perfect your French for academic and professional use'
          },
          students: '1,500+',
          duration: '4-7 months'
        },
        {
          name: 'German',
          flag: '🇩🇪',
          description: 'Learn German for business, study, or personal enrichment',
          levels: {
            beginner: 'Master German basics including der, die, das system',
            intermediate: 'Develop complex sentence structures and vocabulary',
            advanced: 'Achieve C1/C2 level proficiency for professional use'
          },
          students: '1,200+',
          duration: '5-8 months'
        },
        {
          name: 'Chinese',
          flag: '🇨🇳',
          description: 'Discover Mandarin Chinese and unlock new opportunities',
          levels: {
            beginner: 'Learn pinyin, basic characters, and essential phrases',
            intermediate: 'Build vocabulary and improve character recognition',
            advanced: 'Master complex characters and business Chinese'
          },
          students: '900+',
          duration: '6-12 months'
        }
      ]
    },
    ar: {
      title: 'اللغات المتاحة',
      subtitle: 'استكشف برامجنا اللغوية الشاملة المصممة لجميع مستويات المهارة',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      learnMore: 'تعلم المزيد',
      enrollNow: 'سجل الآن',
      duration: 'المدة',
      students: 'الطلاب المسجلون',
      certificate: 'شهادة متوفرة',
      languages: [
        {
          name: 'الإنجليزية',
          flag: '🇬🇧',
          description: 'أتقن الإنجليزية للتواصل العالمي والتقدم المهني',
          levels: {
            beginner: 'تعلم المفردات الأساسية والقواعد والمحادثات اليومية',
            intermediate: 'طور الطلاقة في السياقات التجارية والأكاديمية',
            advanced: 'أتقن الإنجليزية للتميز المهني والأكاديمي'
          },
          students: '2,500+',
          duration: '3-6 أشهر'
        },
        {
          name: 'العربية',
          flag: '🇸🇦',
          description: 'تعلم العربية الفصحى واللهجات الإقليمية',
          levels: {
            beginner: 'أتقن الخط العربي والقواعد الأساسية والعبارات الشائعة',
            intermediate: 'حسن مهارات القراءة والكتابة والمحادثة',
            advanced: 'حقق الطلاقة في العربية الرسمية والعامية'
          },
          students: '1,800+',
          duration: '4-8 أشهر'
        },
        {
          name: 'الإسبانية',
          flag: '🇪🇸',
          description: 'تحدث الإسبانية بثقة وفهم ثقافي',
          levels: {
            beginner: 'تعلم المفردات الأساسية وهياكل القواعد الأساسية',
            intermediate: 'طور مهارات المحادثة والوعي الثقافي',
            advanced: 'أتقن القواعد المعقدة والتواصل المهني'
          },
          students: '2,200+',
          duration: '3-6 أشهر'
        },
        {
          name: 'الفرنسية',
          flag: '🇫🇷',
          description: 'اختبر جمال اللغة الفرنسية والثقافة',
          levels: {
            beginner: 'ابدأ بالنطق والقواعد الأساسية والمفردات',
            intermediate: 'بناء الطلاقة من خلال المحادثات الواقعية',
            advanced: 'أتقن الفرنسية للاستخدام الأكاديمي والمهني'
          },
          students: '1,500+',
          duration: '4-7 أشهر'
        },
        {
          name: 'الألمانية',
          flag: '🇩🇪',
          description: 'تعلم الألمانية للأعمال أو الدراسة أو الإثراء الشخصي',
          levels: {
            beginner: 'أتقن أساسيات الألمانية بما في ذلك نظام der, die, das',
            intermediate: 'طور هياكل الجمل المعقدة والمفردات',
            advanced: 'حقق مستوى إتقان C1/C2 للاستخدام المهني'
          },
          students: '1,200+',
          duration: '5-8 أشهر'
        },
        {
          name: 'الصينية',
          flag: '🇨🇳',
          description: 'اكتشف المندريين الصينية وافتح فرص جديدة',
          levels: {
            beginner: 'تعلم البينيين والأحرف الأساسية والعبارات الأساسية',
            intermediate: 'بناء المفردات وتحسين التعرف على الأحرف',
            advanced: 'أتقن الأحرف المعقدة والصينية التجارية'
          },
          students: '900+',
          duration: '6-12 شهر'
        }
      ]
    },
    es: {
      title: 'Idiomas Ofrecidos',
      subtitle: 'Explora nuestros programas de idiomas integrales diseñados para cada nivel de habilidad',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      learnMore: 'Aprender Más',
      enrollNow: 'Inscribirse Ahora',
      duration: 'Duración',
      students: 'Estudiantes Inscritos',
      certificate: 'Certificado Disponible',
      languages: [
        {
          name: 'Inglés',
          flag: '🇬🇧',
          description: 'Domina el inglés para la comunicación global y el avance profesional',
          levels: {
            beginner: 'Aprende vocabulario básico, gramática y conversaciones cotidianas',
            intermediate: 'Desarrolla fluidez en contextos empresariales y académicos',
            advanced: 'Perfecciona tu inglés para la excelencia profesional y académica'
          },
          students: '2,500+',
          duration: '3-6 meses'
        },
        {
          name: 'Árabe',
          flag: '🇸🇦',
          description: 'Aprende árabe estándar moderno y dialectos regionales',
          levels: {
            beginner: 'Domina la escritura árabe, gramática básica y frases comunes',
            intermediate: 'Mejora las habilidades de lectura, escritura y conversación',
            advanced: 'Logra fluidez en árabe formal y coloquial'
          },
          students: '1,800+',
          duration: '4-8 meses'
        },
        {
          name: 'Español',
          flag: '🇪🇸',
          description: 'Habla español con confianza y comprensión cultural',
          levels: {
            beginner: 'Aprende vocabulario esencial y estructuras gramaticales básicas',
            intermediate: 'Desarrolla habilidades conversacionales y conciencia cultural',
            advanced: 'Domina la gramática compleja y la comunicación profesional'
          },
          students: '2,200+',
          duration: '3-6 meses'
        },
        {
          name: 'Francés',
          flag: '🇫🇷',
          description: 'Experimenta la belleza del idioma y la cultura francesa',
          levels: {
            beginner: 'Comienza con pronunciación, gramática básica y vocabulario',
            intermediate: 'Construye fluidez a través de conversaciones del mundo real',
            advanced: 'Perfecciona tu francés para uso académico y profesional'
          },
          students: '1,500+',
          duration: '4-7 meses'
        },
        {
          name: 'Alemán',
          flag: '🇩🇪',
          description: 'Aprende alemán para negocios, estudio o enriquecimiento personal',
          levels: {
            beginner: 'Domina los conceptos básicos del alemán incluyendo el sistema der, die, das',
            intermediate: 'Desarrolla estructuras de oraciones complejas y vocabulario',
            advanced: 'Logra competencia de nivel C1/C2 para uso profesional'
          },
          students: '1,200+',
          duration: '5-8 meses'
        },
        {
          name: 'Chino',
          flag: '🇨🇳',
          description: 'Descubre el chino mandarín y desbloquea nuevas oportunidades',
          levels: {
            beginner: 'Aprende pinyin, caracteres básicos y frases esenciales',
            intermediate: 'Construye vocabulario y mejora el reconocimiento de caracteres',
            advanced: 'Domina caracteres complejos y chino de negocios'
          },
          students: '900+',
          duration: '6-12 meses'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {t.languages.map((lang, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{lang.flag}</span>
                    <div>
                      <CardTitle className="text-2xl text-emerald-600">{lang.name}</CardTitle>
                      <CardDescription className="text-lg">{lang.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Course Levels */}
                    <div className="space-y-4">
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {t.beginner}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {lang.levels.beginner}
                        </p>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            {t.intermediate}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {lang.levels.intermediate}
                        </p>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            {t.advanced}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {lang.levels.advanced}
                        </p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <Users className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                        <div className="text-sm font-semibold">{lang.students}</div>
                        <div className="text-xs text-gray-600">{t.students}</div>
                      </div>
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                        <div className="text-sm font-semibold">{lang.duration}</div>
                        <div className="text-xs text-gray-600">{t.duration}</div>
                      </div>
                      <div className="text-center">
                        <Award className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
                        <div className="text-sm font-semibold">✓</div>
                        <div className="text-xs text-gray-600">{t.certificate}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      <Button variant="outline" className="flex-1">
                        {t.learnMore}
                      </Button>
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                        {t.enrollNow}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Languages;
