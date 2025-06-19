
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Users, Clock, Calendar, Globe } from 'lucide-react';

interface SessionsProps {
  language?: string;
}

const Sessions = ({ language = 'en' }: SessionsProps) => {
  const translations = {
    en: {
      title: 'Live Sessions Overview',
      subtitle: 'Join interactive live sessions with expert teachers and fellow learners',
      upcoming: 'Upcoming Sessions',
      joinSession: 'Join Session',
      viewDetails: 'View Details',
      platform: 'Platform',
      instructor: 'Instructor',
      participants: 'Participants',
      duration: 'Duration',
      level: 'Level',
      language: 'Language',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      available: 'Available',
      full: 'Full',
      spots: 'spots',
      sessions: [
        {
          title: 'English Conversation Practice',
          description: 'Interactive conversation session focusing on daily life topics',
          instructor: 'Sarah Johnson',
          language: 'English',
          level: 'Intermediate',
          date: '2024-01-20',
          time: '15:00',
          duration: '60 minutes',
          platform: 'Google Meet',
          participants: 12,
          maxParticipants: 15,
          price: '$25'
        },
        {
          title: 'Arabic Grammar Fundamentals',
          description: 'Master essential Arabic grammar rules and sentence structures',
          instructor: 'Ahmed Al-Rashid',
          language: 'Arabic',
          level: 'Beginner',
          date: '2024-01-20',
          time: '18:00',
          duration: '90 minutes',
          platform: 'Microsoft Teams',
          participants: 8,
          maxParticipants: 10,
          price: '$30'
        },
        {
          title: 'Spanish Business Communication',
          description: 'Professional Spanish for business meetings and presentations',
          instructor: 'Maria Rodriguez',
          language: 'Spanish',
          level: 'Advanced',
          date: '2024-01-21',
          time: '14:00',
          duration: '75 minutes',
          platform: 'Google Meet',
          participants: 15,
          maxParticipants: 15,
          price: '$35'
        },
        {
          title: 'French Pronunciation Workshop',
          description: 'Perfect your French accent and pronunciation techniques',
          instructor: 'Pierre Dubois',
          language: 'French',
          level: 'Intermediate',
          date: '2024-01-21',
          time: '16:30',
          duration: '45 minutes',
          platform: 'Microsoft Teams',
          participants: 6,
          maxParticipants: 12,
          price: '$20'
        },
        {
          title: 'German Culture & Language',
          description: 'Explore German culture while practicing language skills',
          instructor: 'Hans Mueller',
          language: 'German',
          level: 'Beginner',
          date: '2024-01-22',
          time: '19:00',
          duration: '60 minutes',
          platform: 'Google Meet',
          participants: 4,
          maxParticipants: 10,
          price: '$28'
        },
        {
          title: 'Chinese Character Writing',
          description: 'Learn proper stroke order and character formation',
          instructor: 'Li Wei',
          language: 'Chinese',
          level: 'Beginner',
          date: '2024-01-23',
          time: '17:00',
          duration: '90 minutes',
          platform: 'Microsoft Teams',
          participants: 7,
          maxParticipants: 8,
          price: '$40'
        }
      ]
    },
    ar: {
      title: 'نظرة عامة على الجلسات المباشرة',
      subtitle: 'انضم إلى جلسات تفاعلية مباشرة مع معلمين خبراء ومتعلمين آخرين',
      upcoming: 'الجلسات القادمة',
      joinSession: 'انضم للجلسة',
      viewDetails: 'عرض التفاصيل',
      platform: 'المنصة',
      instructor: 'المدرب',
      participants: 'المشاركون',
      duration: 'المدة',
      level: 'المستوى',
      language: 'اللغة',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      available: 'متاح',
      full: 'مكتمل',
      spots: 'مقاعد',
      sessions: [
        {
          title: 'ممارسة المحادثة الإنجليزية',
          description: 'جلسة محادثة تفاعلية تركز على مواضيع الحياة اليومية',
          instructor: 'سارة جونسون',
          language: 'الإنجليزية',
          level: 'متوسط',
          date: '2024-01-20',
          time: '15:00',
          duration: '60 دقيقة',
          platform: 'Google Meet',
          participants: 12,
          maxParticipants: 15,
          price: '$25'
        },
        {
          title: 'أساسيات قواعد اللغة العربية',
          description: 'إتقان قواعد اللغة العربية الأساسية وتراكيب الجمل',
          instructor: 'أحمد الراشد',
          language: 'العربية',
          level: 'مبتدئ',
          date: '2024-01-20',
          time: '18:00',
          duration: '90 دقيقة',
          platform: 'Microsoft Teams',
          participants: 8,
          maxParticipants: 10,
          price: '$30'
        },
        {
          title: 'التواصل التجاري بالإسبانية',
          description: 'الإسبانية المهنية للاجتماعات التجارية والعروض التقديمية',
          instructor: 'ماريا رودريجيز',
          language: 'الإسبانية',
          level: 'متقدم',
          date: '2024-01-21',
          time: '14:00',
          duration: '75 دقيقة',
          platform: 'Google Meet',
          participants: 15,
          maxParticipants: 15,
          price: '$35'
        },
        {
          title: 'ورشة النطق الفرنسي',
          description: 'أتقن لهجتك الفرنسية وتقنيات النطق',
          instructor: 'بيير دوبوا',
          language: 'الفرنسية',
          level: 'متوسط',
          date: '2024-01-21',
          time: '16:30',
          duration: '45 دقيقة',
          platform: 'Microsoft Teams',
          participants: 6,
          maxParticipants: 12,
          price: '$20'
        },
        {
          title: 'الثقافة واللغة الألمانية',
          description: 'استكشف الثقافة الألمانية أثناء ممارسة مهارات اللغة',
          instructor: 'هانز مولر',
          language: 'الألمانية',
          level: 'مبتدئ',
          date: '2024-01-22',
          time: '19:00',
          duration: '60 دقيقة',
          platform: 'Google Meet',
          participants: 4,
          maxParticipants: 10,
          price: '$28'
        },
        {
          title: 'كتابة الأحرف الصينية',
          description: 'تعلم ترتيب الضربات الصحيح وتكوين الأحرف',
          instructor: 'لي وي',
          language: 'الصينية',
          level: 'مبتدئ',
          date: '2024-01-23',
          time: '17:00',
          duration: '90 دقيقة',
          platform: 'Microsoft Teams',
          participants: 7,
          maxParticipants: 8,
          price: '$40'
        }
      ]
    },
    es: {
      title: 'Resumen de Sesiones en Vivo',
      subtitle: 'Únete a sesiones interactivas en vivo con profesores expertos y otros estudiantes',
      upcoming: 'Próximas Sesiones',
      joinSession: 'Unirse a la Sesión',
      viewDetails: 'Ver Detalles',
      platform: 'Plataforma',
      instructor: 'Instructor',
      participants: 'Participantes',
      duration: 'Duración',
      level: 'Nivel',
      language: 'Idioma',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      available: 'Disponible',
      full: 'Completo',
      spots: 'lugares',
      sessions: [
        {
          title: 'Práctica de Conversación en Inglés',
          description: 'Sesión de conversación interactiva centrada en temas de la vida diaria',
          instructor: 'Sarah Johnson',
          language: 'Inglés',
          level: 'Intermedio',
          date: '2024-01-20',
          time: '15:00',
          duration: '60 minutos',
          platform: 'Google Meet',
          participants: 12,
          maxParticipants: 15,
          price: '$25'
        },
        {
          title: 'Fundamentos de Gramática Árabe',
          description: 'Domina las reglas esenciales de la gramática árabe y las estructuras de oraciones',
          instructor: 'Ahmed Al-Rashid',
          language: 'Árabe',
          level: 'Principiante',
          date: '2024-01-20',
          time: '18:00',
          duration: '90 minutos',
          platform: 'Microsoft Teams',
          participants: 8,
          maxParticipants: 10,
          price: '$30'
        },
        {
          title: 'Comunicación Empresarial en Español',
          description: 'Español profesional para reuniones de negocios y presentaciones',
          instructor: 'Maria Rodriguez',
          language: 'Español',
          level: 'Avanzado',
          date: '2024-01-21',
          time: '14:00',
          duration: '75 minutos',
          platform: 'Google Meet',
          participants: 15,
          maxParticipants: 15,
          price: '$35'
        },
        {
          title: 'Taller de Pronunciación Francesa',
          description: 'Perfecciona tu acento francés y técnicas de pronunciación',
          instructor: 'Pierre Dubois',
          language: 'Francés',
          level: 'Intermedio',
          date: '2024-01-21',
          time: '16:30',
          duration: '45 minutos',
          platform: 'Microsoft Teams',
          participants: 6,
          maxParticipants: 12,
          price: '$20'
        },
        {
          title: 'Cultura e Idioma Alemán',
          description: 'Explora la cultura alemana mientras practicas habilidades lingüísticas',
          instructor: 'Hans Mueller',
          language: 'Alemán',
          level: 'Principiante',
          date: '2024-01-22',
          time: '19:00',
          duration: '60 minutos',
          platform: 'Google Meet',
          participants: 4,
          maxParticipants: 10,
          price: '$28'
        },
        {
          title: 'Escritura de Caracteres Chinos',
          description: 'Aprende el orden correcto de trazos y la formación de caracteres',
          instructor: 'Li Wei',
          language: 'Chino',
          level: 'Principiante',
          date: '2024-01-23',
          time: '17:00',
          duration: '90 minutos',
          platform: 'Microsoft Teams',
          participants: 7,
          maxParticipants: 8,
          price: '$40'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
      case 'مبتدئ':
      case 'principiante':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
      case 'متوسط':
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
      case 'متقدم':
      case 'avanzado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return platform.includes('Google') ? '📹' : '💼';
  };

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

      {/* Sessions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.upcoming}</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {t.sessions.map((session, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-emerald-600 mb-2">
                        {session.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        {session.description}
                      </CardDescription>
                    </div>
                    <span className="text-2xl ml-4">{getPlatformIcon(session.platform)}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Session Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{t.instructor}:</span>
                        <span>{session.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium">{t.language}:</span>
                        <span>{session.language}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span>{session.date} at {session.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span>{session.duration}</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getLevelColor(session.level)}>
                        {session.level}
                      </Badge>
                      <Badge variant="outline">
                        {session.platform}
                      </Badge>
                      <Badge variant="outline" className="text-emerald-600">
                        {session.price}
                      </Badge>
                    </div>

                    {/* Participants Info */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">
                            {session.participants}/{session.maxParticipants} {t.participants}
                          </span>
                        </div>
                        {session.participants < session.maxParticipants ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            {session.maxParticipants - session.participants} {t.spots} {t.available}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            {t.full}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-2">
                      <Button variant="outline" className="flex-1">
                        {t.viewDetails}
                      </Button>
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        disabled={session.participants >= session.maxParticipants}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {t.joinSession}
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

export default Sessions;
