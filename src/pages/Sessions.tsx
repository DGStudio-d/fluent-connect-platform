import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, Video } from 'lucide-react';

const Sessions = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [sessions, setSessions] = useState([
    {
      id: '1',
      title: 'Spanish for Beginners',
      description: 'Learn basic Spanish phrases and grammar.',
      date: '2024-08-15',
      time: '10:00 AM',
      language: 'Spanish',
      level: 'Beginner',
      instructor: 'Maria Rodriguez',
      participants: 5,
      maxParticipants: 10,
      status: 'upcoming',
      topics: ['Greetings', 'Basic Verbs', 'Common Phrases']
    },
    {
      id: '2',
      title: 'Advanced English Conversation',
      description: 'Improve your English speaking skills with native speakers.',
      date: '2024-08-16',
      time: '02:00 PM',
      language: 'English',
      level: 'Advanced',
      instructor: 'John Smith',
      participants: 8,
      maxParticipants: 10,
      status: 'live',
      topics: ['Current Events', 'Cultural Discussions', 'Idioms']
    },
    {
      id: '3',
      title: 'French Pronunciation Workshop',
      description: 'Master the sounds of French and improve your accent.',
      date: '2024-08-17',
      time: '04:00 PM',
      language: 'French',
      level: 'Intermediate',
      instructor: 'Sophie Dubois',
      participants: 10,
      maxParticipants: 10,
      status: 'completed',
      topics: ['Vowels', 'Consonants', 'Intonation']
    },
    {
      id: '4',
      title: 'Arabic Calligraphy Basics',
      description: 'Introduction to Arabic calligraphy styles and techniques.',
      date: '2024-08-18',
      time: '11:00 AM',
      language: 'Arabic',
      level: 'Beginner',
      instructor: 'Ahmed Al-Mansoori',
      participants: 7,
      maxParticipants: 10,
      status: 'upcoming',
      topics: ['Letters', 'Ink', 'Tools']
    },
    {
      id: '5',
      title: 'German Grammar Essentials',
      description: 'Essential grammar rules for German language learners.',
      date: '2024-08-19',
      time: '03:00 PM',
      language: 'German',
      level: 'Intermediate',
      instructor: 'Hans Schmidt',
      participants: 6,
      maxParticipants: 10,
      status: 'upcoming',
      topics: ['Cases', 'Verbs', 'Sentence Structure']
    }
  ]);

  const translations = {
    en: {
      title: 'Live Sessions',
      subtitle: 'Join our live language sessions and learn with expert instructors.',
      upcoming: 'Upcoming',
      live: 'Live',
      completed: 'Completed',
      instructor: 'Instructor',
      topics: 'Topics',
      joinNow: 'Join Now',
      reserve: 'Reserve',
    },
    ar: {
      title: 'جلسات مباشرة',
      subtitle: 'انضم إلى جلساتنا اللغوية المباشرة وتعلم مع مدربين خبراء.',
      upcoming: 'قريبًا',
      live: 'مباشر',
      completed: 'مكتمل',
      instructor: 'المدرب',
      topics: 'المواضيع',
      joinNow: 'انضم الآن',
      reserve: 'احجز',
    },
    es: {
      title: 'Sesiones en Vivo',
      subtitle: 'Únete a nuestras sesiones de idiomas en vivo y aprende con instructores expertos.',
      upcoming: 'Próximamente',
      live: 'En Vivo',
      completed: 'Completado',
      instructor: 'Instructor',
      topics: 'Temas',
      joinNow: 'Unirse Ahora',
      reserve: 'Reservar',
    }
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
                      <CardDescription className="mb-4">{session.description}</CardDescription>
                    </div>
                    <Badge variant={session.status === 'upcoming' ? 'default' : session.status === 'live' ? 'destructive' : 'secondary'}>
                      {session.status === 'upcoming' ? t.upcoming : session.status === 'live' ? t.live : t.completed}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-emerald-600" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{session.participants}/{session.maxParticipants}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{session.language}</span>
                        <span>{session.level}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>{t.instructor}:</strong> {session.instructor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>{t.topics}:</strong> {session.topics.join(', ')}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        disabled={session.status === 'completed' || session.participants >= session.maxParticipants}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {session.status === 'live' ? t.joinNow : 
                         session.status === 'upcoming' ? t.reserve : 
                         t.completed}
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

export default Sessions;
