import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Search, Edit, Trash2, Calendar as CalendarIcon, Video, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  title: string;
  program: string;
  teacher: string;
  date: string;
  time: string;
  platform: 'meet' | 'teams';
  participants: number;
  maxParticipants: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  meetingLink?: string;
}

interface SessionManagementProps {
  language: string;
}

const sessionSchema = z.object({
  title: z.string().min(2, 'Session title must be at least 2 characters'),
  program: z.string().min(1, 'Program is required'),
  teacher: z.string().min(1, 'Teacher is required'),
  date: z.date({
    required_error: 'Date is required',
  }),
  time: z.string().min(1, 'Time is required'),
  platform: z.enum(['meet', 'teams']),
  maxParticipants: z.number().min(1, 'Max participants must be at least 1'),
});

const SessionManagement = ({ language }: SessionManagementProps) => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'English Conversation Practice',
      program: 'English for Beginners',
      teacher: 'Sarah Johnson',
      date: '2024-01-25',
      time: '14:00',
      platform: 'meet',
      participants: 8,
      maxParticipants: 15,
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: '2',
      title: 'Arabic Grammar Workshop',
      program: 'Arabic Intermediate',
      teacher: 'Ahmed Hassan',
      date: '2024-01-26',
      time: '16:00',
      platform: 'teams',
      participants: 12,
      maxParticipants: 20,
      status: 'scheduled',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...'
    },
    {
      id: '3',
      title: 'Spanish Literature Discussion',
      program: 'Spanish Advanced',
      teacher: 'Carlos Rodriguez',
      date: '2024-01-20',
      time: '10:00',
      platform: 'meet',
      participants: 6,
      maxParticipants: 10,
      status: 'completed',
      meetingLink: 'https://meet.google.com/xyz-abc-def'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const translations = {
    en: {
      title: 'Live Sessions',
      description: 'Schedule and manage live learning sessions',
      addSession: 'Schedule Session',
      search: 'Search sessions...',
      filterStatus: 'Filter by status',
      filterPlatform: 'Filter by platform',
      sessionTitle: 'Session Title',
      program: 'Program',
      teacher: 'Teacher',
      date: 'Date',
      time: 'Time',
      platform: 'Platform',
      participants: 'Participants',
      status: 'Status',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      join: 'Join',
      scheduled: 'Scheduled',
      live: 'Live',
      completed: 'Completed',
      cancelled: 'Cancelled',
      meet: 'Google Meet',
      teams: 'Microsoft Teams',
      all: 'All',
      createSession: 'Schedule Session',
      editSession: 'Edit Session',
      deleteSession: 'Cancel Session',
      deleteConfirmation: 'Are you sure you want to cancel this session?',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Schedule',
      sessionCreated: 'Session scheduled successfully',
      sessionUpdated: 'Session updated successfully',
      sessionDeleted: 'Session cancelled successfully',
      maxParticipants: 'Max Participants',
      pickDate: 'Pick a date',
      selectTime: 'Select time'
    },
    ar: {
      title: 'الجلسات المباشرة',
      description: 'جدولة وإدارة جلسات التعلم المباشرة',
      addSession: 'جدولة جلسة',
      search: 'البحث عن الجلسات...',
      filterStatus: 'تصفية حسب الحالة',
      filterPlatform: 'تصفية حسب المنصة',
      sessionTitle: 'عنوان الجلسة',
      program: 'البرنامج',
      teacher: 'المعلم',
      date: 'التاريخ',
      time: 'الوقت',
      platform: 'المنصة',
      participants: 'المشاركين',
      status: 'الحالة',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      join: 'انضمام',
      scheduled: 'مجدولة',
      live: 'مباشرة',
      completed: 'مكتملة',
      cancelled: 'ملغية',
      meet: 'جوجل ميت',
      teams: 'مايكروسوفت تيمز',
      all: 'الكل',
      createSession: 'جدولة جلسة',
      editSession: 'تعديل جلسة',
      deleteSession: 'إلغاء جلسة',
      deleteConfirmation: 'هل أنت متأكد من إلغاء هذه الجلسة؟',
      cancel: 'إلغاء',
      save: 'حفظ',
      create: 'جدولة',
      sessionCreated: 'تم جدولة الجلسة بنجاح',
      sessionUpdated: 'تم تحديث الجلسة بنجاح',
      sessionDeleted: 'تم إلغاء الجلسة بنجاح',
      maxParticipants: 'الحد الأقصى للمشاركين',
      pickDate: 'اختر تاريخ',
      selectTime: 'اختر الوقت'
    },
    es: {
      title: 'Sesiones en Vivo',
      description: 'Programar y gestionar sesiones de aprendizaje en vivo',
      addSession: 'Programar Sesión',
      search: 'Buscar sesiones...',
      filterStatus: 'Filtrar por estado',
      filterPlatform: 'Filtrar por plataforma',
      sessionTitle: 'Título de la Sesión',
      program: 'Programa',
      teacher: 'Profesor',
      date: 'Fecha',
      time: 'Hora',
      platform: 'Plataforma',
      participants: 'Participantes',
      status: 'Estado',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      join: 'Unirse',
      scheduled: 'Programada',
      live: 'En Vivo',
      completed: 'Completada',
      cancelled: 'Cancelada',
      meet: 'Google Meet',
      teams: 'Microsoft Teams',
      all: 'Todos',
      createSession: 'Programar Sesión',
      editSession: 'Editar Sesión',
      deleteSession: 'Cancelar Sesión',
      deleteConfirmation: '¿Estás seguro de que quieres cancelar esta sesión?',
      cancel: 'Cancelar',
      save: 'Guardar',
      create: 'Programar',
      sessionCreated: 'Sesión programada exitosamente',
      sessionUpdated: 'Sesión actualizada exitosamente',
      sessionDeleted: 'Sesión cancelada exitosamente',
      maxParticipants: 'Máximo de Participantes',
      pickDate: 'Seleccionar fecha',
      selectTime: 'Seleccionar hora'
    }
  };

  const t = translations[language as keyof typeof translations];

  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      program: '',
      teacher: '',
      time: '',
      platform: 'meet',
      maxParticipants: 15,
    },
  });

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || session.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleCreateSession = (data: z.infer<typeof sessionSchema>) => {
    const newSession: Session = {
      id: Date.now().toString(),
      ...data,
      date: format(data.date, 'yyyy-MM-dd'),
      participants: 0,
      status: 'scheduled',
      meetingLink: data.platform === 'meet' 
        ? `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`
        : `https://teams.microsoft.com/l/meetup-join/${Math.random().toString(36).substr(2, 15)}`
    };
    
    setSessions([...sessions, newSession]);
    setIsCreateDialogOpen(false);
    form.reset();
    toast({
      title: t.sessionCreated,
      variant: "default",
    });
  };

  const handleEditSession = (data: z.infer<typeof sessionSchema>) => {
    if (!editingSession) return;
    
    setSessions(sessions.map(session => 
      session.id === editingSession.id 
        ? { ...session, ...data, date: format(data.date, 'yyyy-MM-dd') }
        : session
    ));
    setEditingSession(null);
    form.reset();
    toast({
      title: t.sessionUpdated,
      variant: "default",
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const }
        : session
    ));
    toast({
      title: t.sessionDeleted,
      variant: "default",
    });
  };

  const openEditDialog = (session: Session) => {
    setEditingSession(session);
    form.reset({
      title: session.title,
      program: session.program,
      teacher: session.teacher,
      date: new Date(session.date),
      time: session.time,
      platform: session.platform,
      maxParticipants: session.maxParticipants,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'live': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return platform === 'meet' ? '📹' : '🎥';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="scheduled">{t.scheduled}</SelectItem>
                <SelectItem value="live">{t.live}</SelectItem>
                <SelectItem value="completed">{t.completed}</SelectItem>
                <SelectItem value="cancelled">{t.cancelled}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterPlatform} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="meet">{t.meet}</SelectItem>
                <SelectItem value="teams">{t.teams}</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addSession}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.createSession}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateSession)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.sessionTitle}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.program}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="English for Beginners">English for Beginners</SelectItem>
                                <SelectItem value="Arabic Intermediate">Arabic Intermediate</SelectItem>
                                <SelectItem value="Spanish Advanced">Spanish Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="teacher"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.teacher}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                                <SelectItem value="Ahmed Hassan">Ahmed Hassan</SelectItem>
                                <SelectItem value="Carlos Rodriguez">Carlos Rodriguez</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{t.date}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>{t.pickDate}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.time}</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.maxParticipants}</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="platform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.platform}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="meet">{t.meet}</SelectItem>
                              <SelectItem value="teams">{t.teams}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        {t.cancel}
                      </Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        {t.create}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.sessionTitle}</TableHead>
                <TableHead>{t.program}</TableHead>
                <TableHead>{t.teacher}</TableHead>
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
                  <TableCell>{session.program}</TableCell>
                  <TableCell>{session.teacher}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{getPlatformIcon(session.platform)}</span>
                      <span>{t[session.platform as keyof typeof t]}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{session.participants}/{session.maxParticipants}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(session.status)}>
                      {t[session.status as keyof typeof t]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {(session.status === 'scheduled' || session.status === 'live') && session.meetingLink && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(session.meetingLink, '_blank')}
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {session.status === 'scheduled' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(session)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{t.editSession}</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(handleEditSession)} className="space-y-4">
                                
                                <FormField
                                  control={form.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.sessionTitle}</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="program"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.program}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="English for Beginners">English for Beginners</SelectItem>
                                            <SelectItem value="Arabic Intermediate">Arabic Intermediate</SelectItem>
                                            <SelectItem value="Spanish Advanced">Spanish Advanced</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="teacher"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.teacher}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                                            <SelectItem value="Ahmed Hassan">Ahmed Hassan</SelectItem>
                                            <SelectItem value="Carlos Rodriguez">Carlos Rodriguez</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-col">
                                        <FormLabel>{t.date}</FormLabel>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "w-full pl-3 text-left font-normal",
                                                  !field.value && "text-muted-foreground"
                                                )}
                                              >
                                                {field.value ? (
                                                  format(field.value, "PPP")
                                                ) : (
                                                  <span>{t.pickDate}</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                              }
                                              initialFocus
                                              className={cn("p-3 pointer-events-auto")}
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.time}</FormLabel>
                                        <FormControl>
                                          <Input type="time" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="maxParticipants"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.maxParticipants}</FormLabel>
                                        <FormControl>
                                          <Input 
                                            type="number" 
                                            {...field} 
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <FormField
                                  control={form.control}
                                  name="platform"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.platform}</FormLabel>
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="meet">{t.meet}</SelectItem>
                                          <SelectItem value="teams">{t.teams}</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <DialogFooter>
                                  <Button type="button" variant="outline" onClick={() => setEditingSession(null)}>
                                    {t.cancel}
                                  </Button>
                                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                                    {t.save}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {session.status === 'scheduled' && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t.deleteSession}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t.deleteConfirmation}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteSession(session.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {t.delete}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionManagement;
