
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Video, MessageSquare } from 'lucide-react';

interface FeaturedSessionsProps {
  language: string;
}

const FeaturedSessions = ({ language }: FeaturedSessionsProps) => {
  const translations = {
    en: {
      title: 'Featured Live Sessions',
      subtitle: 'Join our upcoming live language sessions',
      joinMeet: 'Join Google Meet',
      joinTeams: 'Join Teams',
      spots: 'spots left',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    ar: {
      title: 'الجلسات المباشرة المميزة',
      subtitle: 'انضم إلى جلسات اللغة المباشرة القادمة',
      joinMeet: 'انضم عبر Google Meet',
      joinTeams: 'انضم عبر Teams',
      spots: 'مقعد متبقي',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم'
    },
    es: {
      title: 'Sesiones en Vivo Destacadas',
      subtitle: 'Únete a nuestras próximas sesiones de idiomas en vivo',
      joinMeet: 'Unirse a Google Meet',
      joinTeams: 'Unirse a Teams',
      spots: 'lugares disponibles',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado'
    }
  };

  const t = translations[language as keyof typeof translations];

  const sessions = [
    {
      title: {
        en: 'English Conversation Practice',
        ar: 'ممارسة المحادثة الإنجليزية',
        es: 'Práctica de Conversación en Inglés'
      },
      teacher: 'Sarah Johnson',
      time: '2:00 PM - 3:00 PM',
      date: 'Today',
      level: t.intermediate,
      spots: 5,
      platform: 'meet',
      participants: 12,
      flag: '🇬🇧'
    },
    {
      title: {
        en: 'Arabic Grammar Basics',
        ar: 'أساسيات قواعد اللغة العربية',
        es: 'Fundamentos de Gramática Árabe'
      },
      teacher: 'Ahmed Al-Rashid',
      time: '4:00 PM - 5:00 PM',
      date: 'Tomorrow',
      level: t.beginner,
      spots: 8,
      platform: 'teams',
      participants: 15,
      flag: '🇸🇦'
    },
    {
      title: {
        en: 'Spanish Business Communication',
        ar: 'التواصل التجاري الإسباني',
        es: 'Comunicación Empresarial en Español'
      },
      teacher: 'Maria Rodriguez',
      time: '6:00 PM - 7:00 PM',
      date: 'Friday',
      level: t.advanced,
      spots: 3,
      platform: 'meet',
      participants: 10,
      flag: '🇪🇸'
    }
  ];

  const getTitle = (session: any) => {
    return session.title[language as keyof typeof session.title] || session.title.en;
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{session.flag}</span>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                      {session.level}
                    </Badge>
                  </div>
                  <Badge variant={session.spots <= 5 ? "destructive" : "secondary"}>
                    {session.spots} {t.spots}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {getTitle(session)}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">with {session.teacher}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{session.participants} participants</span>
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  {session.platform === 'meet' ? (
                    <>
                      <Video className="mr-2 h-4 w-4" />
                      {t.joinMeet}
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {t.joinTeams}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSessions;
