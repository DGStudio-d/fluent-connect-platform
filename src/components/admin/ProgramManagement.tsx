
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Program {
  id: string;
  name: string;
  language: string;
  level: string;
  duration: string;
  description: string;
  price: number;
  status: 'active' | 'inactive';
  enrolledStudents: number;
  createdAt: string;
}

interface ProgramManagementProps {
  language?: string;
}

const ProgramManagement = ({ language = 'en' }: ProgramManagementProps) => {
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: '1',
      name: 'English for Beginners',
      language: 'English',
      level: 'Beginner',
      duration: '3 months',
      description: 'Learn basic English conversation and grammar',
      price: 299,
      status: 'active',
      enrolledStudents: 45,
      createdAt: '2024-01-15'
    },
    {
      id: '2', 
      name: 'Business Arabic',
      language: 'Arabic',
      level: 'Intermediate',
      duration: '4 months',
      description: 'Professional Arabic for business communication',
      price: 399,
      status: 'active',
      enrolledStudents: 23,
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Spanish Conversation',
      language: 'Spanish', 
      level: 'Advanced',
      duration: '2 months',
      description: 'Advanced Spanish conversation practice',
      price: 249,
      status: 'inactive',
      enrolledStudents: 12,
      createdAt: '2024-01-30'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Language Programs',
      addProgram: 'Add Program',
      editProgram: 'Edit Program',
      programName: 'Program Name',
      language: 'Language',
      level: 'Level',
      duration: 'Duration',
      description: 'Description',
      price: 'Price',
      status: 'Status',
      enrolledStudents: 'Enrolled Students',
      createdAt: 'Created',
      actions: 'Actions',
      search: 'Search programs...',
      filterByLanguage: 'Filter by Language',
      filterByStatus: 'Filter by Status',
      all: 'All',
      active: 'Active',
      inactive: 'Inactive',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      english: 'English',
      arabic: 'Arabic',
      spanish: 'Spanish',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit'
    },
    ar: {
      title: 'برامج اللغات',
      addProgram: 'إضافة برنامج',
      editProgram: 'تعديل البرنامج',
      programName: 'اسم البرنامج',
      language: 'اللغة',
      level: 'المستوى',
      duration: 'المدة',
      description: 'الوصف',
      price: 'السعر',
      status: 'الحالة',
      enrolledStudents: 'الطلاب المسجلين',
      createdAt: 'تاريخ الإنشاء',
      actions: 'الإجراءات',
      search: 'البحث في البرامج...',
      filterByLanguage: 'تصفية حسب اللغة',
      filterByStatus: 'تصفية حسب الحالة',
      all: 'الكل',
      active: 'نشط',
      inactive: 'غير نشط',
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
      english: 'الإنجليزية',
      arabic: 'العربية',
      spanish: 'الإسبانية',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل'
    },
    es: {
      title: 'Programas de Idiomas',
      addProgram: 'Agregar Programa',
      editProgram: 'Editar Programa',
      programName: 'Nombre del Programa',
      language: 'Idioma',
      level: 'Nivel',
      duration: 'Duración',
      description: 'Descripción',
      price: 'Precio',
      status: 'Estado',
      enrolledStudents: 'Estudiantes Inscritos',
      createdAt: 'Creado',
      actions: 'Acciones',
      search: 'Buscar programas...',
      filterByLanguage: 'Filtrar por Idioma',
      filterByStatus: 'Filtrar por Estado',
      all: 'Todos',
      active: 'Activo',
      inactive: 'Inactivo',
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      english: 'Inglés',
      arabic: 'Árabe',
      spanish: 'Español',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar'
    }
  };

  const t = translations[language as keyof typeof translations];

  const [formData, setFormData] = useState({
    name: '',
    language: '',
    level: '',
    duration: '',
    description: '',
    price: 0,
    status: 'active' as 'active' | 'inactive'
  });

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.language.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = filterLanguage === 'all' || program.language.toLowerCase() === filterLanguage;
    const matchesStatus = filterStatus === 'all' || program.status === filterStatus;
    return matchesSearch && matchesLanguage && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProgram) {
      setPrograms(prev => prev.map(program => 
        program.id === editingProgram.id 
          ? { ...program, ...formData }
          : program
      ));
      toast({
        title: "Program updated successfully",
        description: "The program has been updated."
      });
    } else {
      const newProgram: Program = {
        id: Date.now().toString(),
        ...formData,
        enrolledStudents: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPrograms(prev => [...prev, newProgram]);
      toast({
        title: "Program created successfully",
        description: "The new program has been added."
      });
    }
    
    setIsDialogOpen(false);
    setEditingProgram(null);
    setFormData({
      name: '',
      language: '',
      level: '',
      duration: '',
      description: '',
      price: 0,
      status: 'active'
    });
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      language: program.language,
      level: program.level,
      duration: program.duration,
      description: program.description,
      price: program.price,
      status: program.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPrograms(prev => prev.filter(program => program.id !== id));
    toast({
      title: "Program deleted",
      description: "The program has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProgram}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingProgram ? t.editProgram : t.addProgram}</DialogTitle>
              <DialogDescription>
                Fill in the program details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{t.programName}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="language">{t.language}</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">{t.english}</SelectItem>
                    <SelectItem value="Arabic">{t.arabic}</SelectItem>
                    <SelectItem value="Spanish">{t.spanish}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">{t.level}</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">{t.beginner}</SelectItem>
                    <SelectItem value="Intermediate">{t.intermediate}</SelectItem>
                    <SelectItem value="Advanced">{t.advanced}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">{t.duration}</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="e.g., 3 months"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">{t.description}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">{t.price}</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">{t.status}</Label>
                <Select value={formData.status} onValueChange={(value: 'active' | 'inactive') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{t.active}</SelectItem>
                    <SelectItem value="inactive">{t.inactive}</SelectItem>
                  </SelectContent>
                </Select>
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
        <Select value={filterLanguage} onValueChange={setFilterLanguage}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByLanguage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="english">{t.english}</SelectItem>
            <SelectItem value="arabic">{t.arabic}</SelectItem>
            <SelectItem value="spanish">{t.spanish}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="active">{t.active}</SelectItem>
            <SelectItem value="inactive">{t.inactive}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            Manage your language learning programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.programName}</TableHead>
                <TableHead>{t.language}</TableHead>
                <TableHead>{t.level}</TableHead>
                <TableHead>{t.duration}</TableHead>
                <TableHead>{t.price}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.enrolledStudents}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.language}</TableCell>
                  <TableCell>{program.level}</TableCell>
                  <TableCell>{program.duration}</TableCell>
                  <TableCell>${program.price}</TableCell>
                  <TableCell>
                    <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                      {program.status === 'active' ? t.active : t.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.enrolledStudents}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(program)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(program.id)}
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

export default ProgramManagement;
