
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface Program {
  id: string;
  name: string;
  language: string;
  level: string;
  description: string;
  duration: string;
  price: number;
  status: 'active' | 'inactive';
  createdAt: string;
  enrolledStudents: number;
}

interface ProgramManagementProps {
  language: string;
}

const programSchema = z.object({
  name: z.string().min(2, 'Program name must be at least 2 characters'),
  language: z.string().min(1, 'Language is required'),
  level: z.string().min(1, 'Level is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0, 'Price must be positive'),
  status: z.enum(['active', 'inactive']),
});

const ProgramManagement = ({ language }: ProgramManagementProps) => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'English for Beginners',
      language: 'English',
      level: 'A1',
      description: 'Complete beginner course for English language learners',
      duration: '3 months',
      price: 299,
      status: 'active',
      createdAt: '2024-01-15',
      enrolledStudents: 45
    },
    {
      id: '2',
      name: 'Arabic Intermediate',
      language: 'Arabic',
      level: 'B1',
      description: 'Intermediate Arabic course focusing on conversation and grammar',
      duration: '4 months',
      price: 399,
      status: 'active',
      createdAt: '2024-01-10',
      enrolledStudents: 23
    },
    {
      id: '3',
      name: 'Spanish Advanced',
      language: 'Spanish',
      level: 'C1',
      description: 'Advanced Spanish course for fluent speakers',
      duration: '6 months',
      price: 599,
      status: 'inactive',
      createdAt: '2024-01-05',
      enrolledStudents: 12
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const translations = {
    en: {
      title: 'Language Programs',
      description: 'Create and manage language learning programs',
      addProgram: 'Add Program',
      search: 'Search programs...',
      filterLanguage: 'Filter by language',
      filterLevel: 'Filter by level',
      name: 'Program Name',
      language: 'Language',
      level: 'Level',
      description: 'Description',
      duration: 'Duration',
      price: 'Price',
      status: 'Status',
      enrolled: 'Enrolled',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      active: 'Active',
      inactive: 'Inactive',
      all: 'All',
      createProgram: 'Create Program',
      editProgram: 'Edit Program',
      deleteProgram: 'Delete Program',
      deleteConfirmation: 'Are you sure you want to delete this program?',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      programCreated: 'Program created successfully',
      programUpdated: 'Program updated successfully',
      programDeleted: 'Program deleted successfully',
      currency: '$'
    },
    ar: {
      title: 'برامج اللغات',
      description: 'إنشاء وإدارة برامج تعلم اللغات',
      addProgram: 'إضافة برنامج',
      search: 'البحث عن البرامج...',
      filterLanguage: 'تصفية حسب اللغة',
      filterLevel: 'تصفية حسب المستوى',
      name: 'اسم البرنامج',
      language: 'اللغة',
      level: 'المستوى',
      description: 'الوصف',
      duration: 'المدة',
      price: 'السعر',
      status: 'الحالة',
      enrolled: 'المسجلين',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      active: 'نشط',
      inactive: 'غير نشط',
      all: 'الكل',
      createProgram: 'إنشاء برنامج',
      editProgram: 'تعديل برنامج',
      deleteProgram: 'حذف برنامج',
      deleteConfirmation: 'هل أنت متأكد من حذف هذا البرنامج؟',
      cancel: 'إلغاء',
      save: 'حفظ',
      create: 'إنشاء',
      programCreated: 'تم إنشاء البرنامج بنجاح',
      programUpdated: 'تم تحديث البرنامج بنجاح',
      programDeleted: 'تم حذف البرنامج بنجاح',
      currency: 'درهم'
    },
    es: {
      title: 'Programas de Idiomas',
      description: 'Crear y gestionar programas de aprendizaje de idiomas',
      addProgram: 'Agregar Programa',
      search: 'Buscar programas...',
      filterLanguage: 'Filtrar por idioma',
      filterLevel: 'Filtrar por nivel',
      name: 'Nombre del Programa',
      language: 'Idioma',
      level: 'Nivel',
      description: 'Descripción',
      duration: 'Duración',
      price: 'Precio',
      status: 'Estado',
      enrolled: 'Inscritos',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      active: 'Activo',
      inactive: 'Inactivo',
      all: 'Todos',
      createProgram: 'Crear Programa',
      editProgram: 'Editar Programa',
      deleteProgram: 'Eliminar Programa',
      deleteConfirmation: '¿Estás seguro de que quieres eliminar este programa?',
      cancel: 'Cancelar',
      save: 'Guardar',
      create: 'Crear',
      programCreated: 'Programa creado exitosamente',
      programUpdated: 'Programa actualizado exitosamente',
      programDeleted: 'Programa eliminado exitosamente',
      currency: '€'
    }
  };

  const t = translations[language as keyof typeof translations];

  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: '',
      language: '',
      level: '',
      description: '',
      duration: '',
      price: 0,
      status: 'active',
    },
  });

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || program.language === languageFilter;
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  const handleCreateProgram = (data: z.infer<typeof programSchema>) => {
    const newProgram: Program = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
      enrolledStudents: 0,
    };
    
    setPrograms([...programs, newProgram]);
    setIsCreateDialogOpen(false);
    form.reset();
    toast({
      title: t.programCreated,
      variant: "default",
    });
  };

  const handleEditProgram = (data: z.infer<typeof programSchema>) => {
    if (!editingProgram) return;
    
    setPrograms(programs.map(program => 
      program.id === editingProgram.id 
        ? { ...program, ...data }
        : program
    ));
    setEditingProgram(null);
    form.reset();
    toast({
      title: t.programUpdated,
      variant: "default",
    });
  };

  const handleDeleteProgram = (programId: string) => {
    setPrograms(programs.filter(program => program.id !== programId));
    toast({
      title: t.programDeleted,
      variant: "default",
    });
  };

  const openEditDialog = (program: Program) => {
    setEditingProgram(program);
    form.reset({
      name: program.name,
      language: program.language,
      level: program.level,
      description: program.description,
      duration: program.duration,
      price: program.price,
      status: program.status,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'A1':
      case 'A2': return 'bg-green-100 text-green-800';
      case 'B1':
      case 'B2': return 'bg-blue-100 text-blue-800';
      case 'C1':
      case 'C2': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Arabic">العربية</SelectItem>
                <SelectItem value="Spanish">Español</SelectItem>
                <SelectItem value="French">Français</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterLevel} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="B1">B1</SelectItem>
                <SelectItem value="B2">B2</SelectItem>
                <SelectItem value="C1">C1</SelectItem>
                <SelectItem value="C2">C2</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addProgram}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.createProgram}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateProgram)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.name}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.language}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Arabic">العربية</SelectItem>
                                <SelectItem value="Spanish">Español</SelectItem>
                                <SelectItem value="French">Français</SelectItem>
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
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.level}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="A1">A1</SelectItem>
                                <SelectItem value="A2">A2</SelectItem>
                                <SelectItem value="B1">B1</SelectItem>
                                <SelectItem value="B2">B2</SelectItem>
                                <SelectItem value="C1">C1</SelectItem>
                                <SelectItem value="C2">C2</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.duration}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 3 months" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.price}</FormLabel>
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.description}</FormLabel>
                          <FormControl>
                            <Textarea {...field} rows={4} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.status}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">{t.active}</SelectItem>
                              <SelectItem value="inactive">{t.inactive}</SelectItem>
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
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.language}</TableHead>
                <TableHead>{t.level}</TableHead>
                <TableHead>{t.duration}</TableHead>
                <TableHead>{t.price}</TableHead>
                <TableHead>{t.enrolled}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.language}</TableCell>
                  <TableCell>
                    <Badge className={getLevelBadgeColor(program.level)}>
                      {program.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>{t.currency}{program.price}</TableCell>
                  <TableCell>{program.enrolledStudents}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(program.status)}>
                      {t[program.status as keyof typeof t]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(program)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{t.editProgram}</DialogTitle>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleEditProgram)} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.name}</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="language"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.language}</FormLabel>
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="English">English</SelectItem>
                                          <SelectItem value="Arabic">العربية</SelectItem>
                                          <SelectItem value="Spanish">Español</SelectItem>
                                          <SelectItem value="French">Français</SelectItem>
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
                                  name="level"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.level}</FormLabel>
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="A1">A1</SelectItem>
                                          <SelectItem value="A2">A2</SelectItem>
                                          <SelectItem value="B1">B1</SelectItem>
                                          <SelectItem value="B2">B2</SelectItem>
                                          <SelectItem value="C1">C1</SelectItem>
                                          <SelectItem value="C2">C2</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="duration"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.duration}</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="price"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.price}</FormLabel>
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
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t.description}</FormLabel>
                                    <FormControl>
                                      <Textarea {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t.status}</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="active">{t.active}</SelectItem>
                                        <SelectItem value="inactive">{t.inactive}</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditingProgram(null)}>
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
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t.deleteProgram}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.deleteConfirmation}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteProgram(program.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {t.delete}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default ProgramManagement;
