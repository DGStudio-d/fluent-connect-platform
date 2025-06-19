
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Calendar, FileQuestion, Settings } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import ProgramManagement from '@/components/admin/ProgramManagement';
import SessionManagement from '@/components/admin/SessionManagement';
import QuizManagement from '@/components/admin/QuizManagement';

interface AdminDashboardProps {
  language?: string;
}

const AdminDashboard = ({ language = 'en' }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('users');

  const translations = {
    en: {
      title: 'Admin Dashboard',
      users: 'User Management',
      programs: 'Language Programs',
      sessions: 'Live Sessions',
      quizzes: 'Quiz Management',
      settings: 'Settings',
      usersDesc: 'Manage students, teachers, and administrators',
      programsDesc: 'Create and manage language learning programs',
      sessionsDesc: 'Schedule and manage live learning sessions',
      quizzesDesc: 'Create and manage quizzes and assessments'
    },
    ar: {
      title: 'لوحة تحكم المدير',
      users: 'إدارة المستخدمين',
      programs: 'برامج اللغات',
      sessions: 'الجلسات المباشرة',
      quizzes: 'إدارة الاختبارات',
      settings: 'الإعدادات',
      usersDesc: 'إدارة الطلاب والمعلمين والمديرين',
      programsDesc: 'إنشاء وإدارة برامج تعلم اللغات',
      sessionsDesc: 'جدولة وإدارة جلسات التعلم المباشرة',
      quizzesDesc: 'إنشاء وإدارة الاختبارات والتقييمات'
    },
    es: {
      title: 'Panel de Administración',
      users: 'Gestión de Usuarios',
      programs: 'Programas de Idiomas',
      sessions: 'Sesiones en Vivo',
      quizzes: 'Gestión de Cuestionarios',
      settings: 'Configuraciones',
      usersDesc: 'Gestionar estudiantes, profesores y administradores',
      programsDesc: 'Crear y gestionar programas de aprendizaje de idiomas',
      sessionsDesc: 'Programar y gestionar sesiones de aprendizaje en vivo',
      quizzesDesc: 'Crear y gestionar cuestionarios y evaluaciones'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('users')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.users}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t.usersDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('programs')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.programs}</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t.programsDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('sessions')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.sessions}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t.sessionsDesc}</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveTab('quizzes')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.quizzes}</CardTitle>
                <FileQuestion className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{t.quizzesDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">{t.users}</TabsTrigger>
            <TabsTrigger value="programs">{t.programs}</TabsTrigger>
            <TabsTrigger value="sessions">{t.sessions}</TabsTrigger>
            <TabsTrigger value="quizzes">{t.quizzes}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="mt-6">
            <UserManagement language={language} />
          </TabsContent>
          
          <TabsContent value="programs" className="mt-6">
            <ProgramManagement language={language} />
          </TabsContent>
          
          <TabsContent value="sessions" className="mt-6">
            <SessionManagement language={language} />
          </TabsContent>
          
          <TabsContent value="quizzes" className="mt-6">
            <QuizManagement language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
