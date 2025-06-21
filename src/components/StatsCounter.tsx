
import React from 'react';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import { Users, BookOpen, Globe, Play } from 'lucide-react';

interface StatsCounterProps {
  language: string;
}

const StatsCounter = ({ language }: StatsCounterProps) => {
  const translations = {
    en: {
      students: 'Students',
      teachers: 'Teachers', 
      languages: 'Languages',
      sessions: 'Sessions'
    },
    ar: {
      students: 'طالب',
      teachers: 'معلم',
      languages: 'لغة', 
      sessions: 'جلسة'
    },
    es: {
      students: 'Estudiantes',
      teachers: 'Profesores',
      languages: 'Idiomas',
      sessions: 'Sesiones'
    }
  };

  const t = translations[language as keyof typeof translations];

  const studentsCount = useCounterAnimation({ end: 10000 });
  const teachersCount = useCounterAnimation({ end: 500 });
  const languagesCount = useCounterAnimation({ end: 15 });
  const sessionsCount = useCounterAnimation({ end: 50000 });

  const stats = [
    {
      icon: Users,
      count: studentsCount,
      suffix: '+',
      label: t.students,
      color: 'text-emerald-600'
    },
    {
      icon: BookOpen,
      count: teachersCount,
      suffix: '+',
      label: t.teachers,
      color: 'text-blue-600'
    },
    {
      icon: Globe,
      count: languagesCount,
      suffix: '+',
      label: t.languages,
      color: 'text-purple-600'
    },
    {
      icon: Play,
      count: sessionsCount,
      suffix: '+',
      label: t.sessions,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group">
          <div className="flex justify-center mb-2">
            <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {stat.count.toLocaleString()}{stat.suffix}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
