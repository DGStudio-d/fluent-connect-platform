
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Users, BookOpen, Calendar, FileQuestion } from 'lucide-react';

interface AdminSidebarProps {
  language?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ language = 'en', activeTab, onTabChange }: AdminSidebarProps) => {
  const translations = {
    en: {
      title: 'Admin Panel',
      users: 'User Management',
      programs: 'Language Programs',
      sessions: 'Live Sessions',
      quizzes: 'Quiz Management',
    },
    ar: {
      title: 'لوحة المدير',
      users: 'إدارة المستخدمين',
      programs: 'برامج اللغات',
      sessions: 'الجلسات المباشرة',
      quizzes: 'إدارة الاختبارات',
    },
    es: {
      title: 'Panel de Admin',
      users: 'Gestión de Usuarios',
      programs: 'Programas de Idiomas',
      sessions: 'Sesiones en Vivo',
      quizzes: 'Gestión de Cuestionarios',
    }
  };

  const t = translations[language as keyof typeof translations];

  const menuItems = [
    {
      id: 'users',
      title: t.users,
      icon: Users,
    },
    {
      id: 'programs',
      title: t.programs,
      icon: BookOpen,
    },
    {
      id: 'sessions',
      title: t.sessions,
      icon: Calendar,
    },
    {
      id: 'quizzes',
      title: t.quizzes,
      icon: FileQuestion,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-lg font-bold text-emerald-600">{t.title}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                  >
                    <button className="w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
