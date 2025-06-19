
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Globe, BookOpen, Video, Award, Heart } from 'lucide-react';

interface AboutProps {
  language?: string;
}

const About = ({ language = 'en' }: AboutProps) => {
  const translations = {
    en: {
      title: 'About LearnLive',
      subtitle: 'Revolutionizing Language Learning Through Live Interactive Sessions',
      mission: 'Our Mission',
      missionText: 'To make quality language education accessible to everyone through innovative live teaching methods and expert instructors.',
      vision: 'Our Vision',
      visionText: 'Creating a global community where language barriers dissolve through personalized, interactive learning experiences.',
      values: 'Our Values',
      valuesText: 'Excellence, Innovation, Accessibility, Community, and Cultural Understanding drive everything we do.',
      features: {
        live: {
          title: 'Live Interactive Sessions',
          description: 'Real-time learning with expert teachers via Google Meet and Microsoft Teams'
        },
        expert: {
          title: 'Expert Instructors',
          description: 'Certified language teachers with years of experience and proven teaching methods'
        },
        flexible: {
          title: 'Flexible Scheduling',
          description: 'Learn at your own pace with sessions that fit your busy lifestyle'
        },
        community: {
          title: 'Global Community',
          description: 'Connect with learners worldwide and practice with native speakers'
        },
        progress: {
          title: 'Progress Tracking',
          description: 'Monitor your improvement with detailed analytics and personalized feedback'
        },
        support: {
          title: '24/7 Support',
          description: 'Get help whenever you need it with our dedicated support team'
        }
      }
    },
    ar: {
      title: 'حول LearnLive',
      subtitle: 'ثورة في تعلم اللغات من خلال الجلسات التفاعلية المباشرة',
      mission: 'مهمتنا',
      missionText: 'جعل التعليم اللغوي عالي الجودة متاحاً للجميع من خلال طرق التدريس المباشرة المبتكرة والمدربين الخبراء.',
      vision: 'رؤيتنا',
      visionText: 'إنشاء مجتمع عالمي حيث تذوب الحواجز اللغوية من خلال تجارب التعلم التفاعلية المخصصة.',
      values: 'قيمنا',
      valuesText: 'التميز والابتكار وإمكانية الوصول والمجتمع والفهم الثقافي يقودون كل ما نقوم به.',
      features: {
        live: {
          title: 'جلسات تفاعلية مباشرة',
          description: 'التعلم في الوقت الفعلي مع المعلمين الخبراء عبر Google Meet و Microsoft Teams'
        },
        expert: {
          title: 'مدربون خبراء',
          description: 'معلمو لغات معتمدون مع سنوات من الخبرة وطرق التدريس المثبتة'
        },
        flexible: {
          title: 'جدولة مرنة',
          description: 'تعلم بوتيرتك الخاصة مع جلسات تناسب أسلوب حياتك المزدحم'
        },
        community: {
          title: 'مجتمع عالمي',
          description: 'تواصل مع المتعلمين في جميع أنحاء العالم ومارس مع المتحدثين الأصليين'
        },
        progress: {
          title: 'تتبع التقدم',
          description: 'راقب تحسنك مع التحليلات التفصيلية والتعليقات المخصصة'
        },
        support: {
          title: 'دعم 24/7',
          description: 'احصل على المساعدة كلما احتجتها مع فريق الدعم المخصص لدينا'
        }
      }
    },
    es: {
      title: 'Acerca de LearnLive',
      subtitle: 'Revolucionando el Aprendizaje de Idiomas a través de Sesiones Interactivas en Vivo',
      mission: 'Nuestra Misión',
      missionText: 'Hacer que la educación de idiomas de calidad sea accesible para todos a través de métodos de enseñanza en vivo innovadores e instructores expertos.',
      vision: 'Nuestra Visión',
      visionText: 'Crear una comunidad global donde las barreras del idioma se disuelvan a través de experiencias de aprendizaje personalizadas e interactivas.',
      values: 'Nuestros Valores',
      valuesText: 'La Excelencia, Innovación, Accesibilidad, Comunidad y Comprensión Cultural impulsan todo lo que hacemos.',
      features: {
        live: {
          title: 'Sesiones Interactivas en Vivo',
          description: 'Aprendizaje en tiempo real con profesores expertos a través de Google Meet y Microsoft Teams'
        },
        expert: {
          title: 'Instructores Expertos',
          description: 'Profesores de idiomas certificados con años de experiencia y métodos de enseñanza probados'
        },
        flexible: {
          title: 'Horarios Flexibles',
          description: 'Aprende a tu propio ritmo con sesiones que se adaptan a tu estilo de vida ocupado'
        },
        community: {
          title: 'Comunidad Global',
          description: 'Conéctate con estudiantes de todo el mundo y practica con hablantes nativos'
        },
        progress: {
          title: 'Seguimiento de Progreso',
          description: 'Monitorea tu mejora con análisis detallados y retroalimentación personalizada'
        },
        support: {
          title: 'Soporte 24/7',
          description: 'Obtén ayuda cuando la necesites con nuestro equipo de soporte dedicado'
        }
      }
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

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t.mission}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t.missionText}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t.vision}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t.visionText}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">{t.values}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{t.valuesText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Video className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.live.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.live.description}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.expert.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.expert.description}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.flexible.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.flexible.description}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.community.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.community.description}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.progress.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.progress.description}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 text-emerald-600 mb-2" />
                <CardTitle>{t.features.support.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.features.support.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
