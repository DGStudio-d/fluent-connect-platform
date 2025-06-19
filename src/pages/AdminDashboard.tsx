
import React, { useState } from 'react';
import Header from '@/components/Header';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UserManagement from '@/components/admin/UserManagement';
import ProgramManagement from '@/components/admin/ProgramManagement';
import SessionManagement from '@/components/admin/SessionManagement';
import QuizManagement from '@/components/admin/QuizManagement';

interface AdminDashboardProps {
  language?: string;
}

const AdminDashboard = ({ language = 'en' }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('users');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const translations = {
    en: {
      title: 'Admin Dashboard',
    },
    ar: {
      title: 'لوحة تحكم المدير',
    },
    es: {
      title: 'Panel de Administración',
    }
  };

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'ar';

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement language={language} />;
      case 'programs':
        return <ProgramManagement language={language} />;
      case 'sessions':
        return <SessionManagement language={language} />;
      case 'quizzes':
        return <QuizManagement language={language} />;
      default:
        return <UserManagement language={language} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-background text-foreground transition-colors duration-300">
        <Header 
          language={language} 
          setLanguage={(lang) => {}}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full">
            <AdminSidebar 
              language={language} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold">{t.title}</h1>
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                {renderContent()}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default AdminDashboard;
