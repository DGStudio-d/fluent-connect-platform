
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Search, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Session {
  id: string;
  title: string;
  teacher: string;
  program: string;
  date: string;
  time: string;
  platform: 'meet' | 'teams';
  meetingLink: string;
  maxParticipants: number;
  participants: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface SessionManagementProps {
  language?: string;
}

const SessionManagement = ({ language = 'en' }: SessionManagementProps) => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'English Grammar Fundamentals',
      teacher: 'Sarah Johnson',
      program: 'English for Beginners',
      date: '2024-03-15',
      time: '10:00',
      platform: 'meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      maxParticipants: 20,
      participants: 15,
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Business Arabic Conversation',
      teacher: 'Ahmed Hassan',
      program: 'Business Arabic',
      date: '2024-03-16',
      time: '14:00',
      platform: 'teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      maxParticipants: 15,
      participants: 12,
      status: 'scheduled'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Session Management',
      addSession: 'Schedule Session',
      editSession: 'Edit Session',
      sessionTitle: 'Session Title',
      teacher: 'Teacher',
      program: 'Program',
      date: 'Date',
      time: 'Time',
      platform: 'Platform',
      meetingLink: 'Meeting Link',
      maxParticipants: 'Max Participants',
      participants: 'Participants',
      status: 'Status',
      actions: 'Actions',
      search: 'Search sessions...',
      filterByTeacher: 'Filter by Teacher',
      filterByStatus: 'Filter by Status',
      all: 'All',
      scheduled: 'Scheduled',
      completed: 'Completed',
      cancelled: 'Cancelled',
      meet: 'Google Meet',
      teams: 'Microsoft Teams',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit'
    },
    ar: {
      title: 'إدارة الجلسات',
      addSession: 'جدولة جلسة',
      editSession: 'تعديل الجلسة',
      sessionTitle: 'عنوان الجلسة',
      teacher: 'المعلم',
      program: 'البرنامج',
      date: 'التاريخ',
      time: 'الوقت',
      platform: 'المنصة',
      meetingLink: 'رابط الاجتماع',
      maxParticipants: 'الحد الأقصى للمشاركين',
      participants: 'المشاركون',
      status: 'الحالة',
      actions: 'الإجراءات',
      search: 'البحث في الجلسات...',
      filterByTeacher: 'تصفية حسب المعلم',
      filterByStatus: 'تصفية حسب الحالة',
      all: 'الكل',
      scheduled: 'مجدولة',
      completed: 'مكتملة',
      cancelled: 'ملغية',
      meet: 'جوجل ميت',
      teams: 'مايكروسوفت تيمز',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل'
    },
    es: {
      title: 'Gestión de Sesiones',
      addSession: 'Programar Sesión',
      editSession: 'Editar Sesión',
      sessionTitle: 'Título de la Sesión',
      teacher: 'Profesor',
      program: 'Programa',
      date: 'Fecha',
      time: 'Hora',
      platform: 'Plataforma',
      meetingLink: 'Enlace de Reunión',
      maxParticipants: 'Máximo de Participantes',
      participants: 'Participantes',
      status: 'Estado',
      actions: 'Acciones',
      search: 'Buscar sesiones...',
      filterByTeacher: 'Filtrar por Profesor',
      filterByStatus: 'Filtrar por Estado',
      all: 'Todos',
      scheduled: 'Programado',
      completed: 'Completado',
      cancelled: 'Cancelado',
      meet: 'Google Meet',
      teams: 'Microsoft Teams',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar'
    }
  };

  const t = translations[language as keyof typeof translations];

  const [formData, setFormData] = useState({
    title: '',
    teacher: '',
    program: '',
    date: '',
    time: '',
    platform: 'meet' as 'meet' | 'teams',
    meetingLink: '',
    maxParticipants: 20
  });

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeacher = filterTeacher === 'all' || session.teacher === filterTeacher;
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesTeacher && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSession) {
      setSessions(prev => prev.map(session => 
        session.id === editingSession.id 
          ? { ...session, ...formData }
          : session
      ));
      toast({
        title: "Session updated successfully",
        description: "The session has been updated."
      });
    } else {
      const newSession: Session = {
        id: Date.now().toString(),
        ...formData,
        participants: 0,
        status: 'scheduled'
      };
      setSessions(prev => [...prev, newSession]);
      toast({
        title: "Session scheduled successfully",
        description: "The new session has been added."
      });
    }
    
    setIsDialogOpen(false);
    setEditingSession(null);
    setFormData({
      title: '',
      teacher: '',
      program: '',
      date: '',
      time: '',
      platform: 'meet',
      meetingLink: '',
      maxParticipants: 20
    });
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      teacher: session.teacher,
      program: session.program,
      date: session.date,
      time: session.time,
      platform: session.platform,
      meetingLink: session.meetingLink,
      maxParticipants: session.maxParticipants
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    toast({
      title: "Session cancelled",
      description: "The session has been cancelled."
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              {t.addSession}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingSession ? t.editSession : t.addSession}</DialogTitle>
              <DialogDescription>
                Fill in the session details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">{t.sessionTitle}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="teacher">{t.teacher}</Label>
                <Input
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="program">{t.program}</Label>
                <Input
                  id="program"
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">{t.date}</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">{t.time}</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="platform">{t.platform}</Label>
                <Select value={formData.platform} onValueChange={(value: 'meet' | 'teams') => setFormData({...formData, platform: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meet">{t.meet}</SelectItem>
                    <SelectItem value="teams">{t.teams}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="meetingLink">{t.meetingLink}</Label>
                <Input
                  id="meetingLink"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({...formData, meetingLink: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxParticipants">{t.maxParticipants}</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({...formData, maxParticipants: Number(e.target.value)})}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  {t.cancel}
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  {t.save}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterTeacher} onValueChange={setFilterTeacher}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByTeacher} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
            <SelectItem value="Ahmed Hassan">Ahmed Hassan</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="scheduled">{t.scheduled}</SelectItem>
            <SelectItem value="completed">{t.completed}</SelectItem>
            <SelectItem value="cancelled">{t.cancelled}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            Schedule and manage live learning sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.sessionTitle}</TableHead>
                <TableHead>{t.teacher}</TableHead>
                <TableHead>{t.program}</TableHead>
                <TableHead>{t.date}</TableHead>
                <TableHead>{t.time}</TableHead>
                <TableHead>{t.platform}</TableHead>
                <TableHead>{t.participants}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.title}</TableCell>
                  <TableCell>{session.teacher}</TableCell>
                  <TableCell>{session.program}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {session.platform === 'meet' ? t.meet : t.teams}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.participants}/{session.maxParticipants}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(session.status)}>
                      {session.status === 'scheduled' ? t.scheduled : 
                       session.status === 'completed' ? t.completed : t.cancelled}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(session)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(session.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManagement;
