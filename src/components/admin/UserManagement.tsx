
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
import { Switch } from '@/components/ui/switch';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Plus, Search, Edit, Trash2, UserPlus, Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

interface UserManagementProps {
  language: string;
}

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['student', 'teacher', 'admin']),
  status: z.enum(['active', 'inactive']),
});

const UserManagement = ({ language }: UserManagementProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      role: 'student',
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'teacher',
      status: 'active',
      createdAt: '2024-01-10',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      name: 'Carlos Rodriguez',
      email: 'carlos@example.com',
      role: 'student',
      status: 'inactive',
      createdAt: '2024-01-05',
      lastLogin: '2024-01-18'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const itemsPerPage = 10;

  const translations = {
    en: {
      title: 'User Management',
      description: 'Manage students, teachers, and administrators',
      addUser: 'Add User',
      search: 'Search users...',
      filterRole: 'Filter by role',
      filterStatus: 'Filter by status',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      lastLogin: 'Last Login',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      active: 'Active',
      inactive: 'Inactive',
      student: 'Student',
      teacher: 'Teacher',
      admin: 'Admin',
      all: 'All',
      createUser: 'Create User',
      editUser: 'Edit User',
      deleteUser: 'Delete User',
      deleteConfirmation: 'Are you sure you want to delete this user?',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      userCreated: 'User created successfully',
      userUpdated: 'User updated successfully',
      userDeleted: 'User deleted successfully'
    },
    ar: {
      title: 'إدارة المستخدمين',
      description: 'إدارة الطلاب والمعلمين والمديرين',
      addUser: 'إضافة مستخدم',
      search: 'البحث عن المستخدمين...',
      filterRole: 'تصفية حسب الدور',
      filterStatus: 'تصفية حسب الحالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      status: 'الحالة',
      lastLogin: 'آخر دخول',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      active: 'نشط',
      inactive: 'غير نشط',
      student: 'طالب',
      teacher: 'معلم',
      admin: 'مدير',
      all: 'الكل',
      createUser: 'إنشاء مستخدم',
      editUser: 'تعديل مستخدم',
      deleteUser: 'حذف مستخدم',
      deleteConfirmation: 'هل أنت متأكد من حذف هذا المستخدم؟',
      cancel: 'إلغاء',
      save: 'حفظ',
      create: 'إنشاء',
      userCreated: 'تم إنشاء المستخدم بنجاح',
      userUpdated: 'تم تحديث المستخدم بنجاح',
      userDeleted: 'تم حذف المستخدم بنجاح'
    },
    es: {
      title: 'Gestión de Usuarios',
      description: 'Gestionar estudiantes, profesores y administradores',
      addUser: 'Agregar Usuario',
      search: 'Buscar usuarios...',
      filterRole: 'Filtrar por rol',
      filterStatus: 'Filtrar por estado',
      name: 'Nombre',
      email: 'Correo Electrónico',
      role: 'Rol',
      status: 'Estado',
      lastLogin: 'Último Acceso',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      active: 'Activo',
      inactive: 'Inactivo',
      student: 'Estudiante',
      teacher: 'Profesor',
      admin: 'Administrador',
      all: 'Todos',
      createUser: 'Crear Usuario',
      editUser: 'Editar Usuario',
      deleteUser: 'Eliminar Usuario',
      deleteConfirmation: '¿Estás seguro de que quieres eliminar este usuario?',
      cancel: 'Cancelar',
      save: 'Guardar',
      create: 'Crear',
      userCreated: 'Usuario creado exitosamente',
      userUpdated: 'Usuario actualizado exitosamente',
      userDeleted: 'Usuario eliminado exitosamente'
    }
  };

  const t = translations[language as keyof typeof translations];

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'student',
      status: 'active',
    },
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateUser = (data: z.infer<typeof userSchema>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setUsers([...users, newUser]);
    setIsCreateDialogOpen(false);
    form.reset();
    toast({
      title: t.userCreated,
      variant: "default",
    });
  };

  const handleEditUser = (data: z.infer<typeof userSchema>) => {
    if (!editingUser) return;
    
    setUsers(users.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...data }
        : user
    ));
    setEditingUser(null);
    form.reset();
    toast({
      title: t.userUpdated,
      variant: "default",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: t.userDeleted,
      variant: "default",
    });
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
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
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterRole} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="student">{t.student}</SelectItem>
                <SelectItem value="teacher">{t.teacher}</SelectItem>
                <SelectItem value="admin">{t.admin}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t.filterStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="active">{t.active}</SelectItem>
                <SelectItem value="inactive">{t.inactive}</SelectItem>
              </SelectContent>
            </Select>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addUser}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.createUser}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-4">
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.email}</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.role}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">{t.student}</SelectItem>
                              <SelectItem value="teacher">{t.teacher}</SelectItem>
                              <SelectItem value="admin">{t.admin}</SelectItem>
                            </SelectContent>
                          </Select>
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
                <TableHead>{t.email}</TableHead>
                <TableHead>{t.role}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.lastLogin}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {t[user.role as keyof typeof t]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(user.status)}>
                      {t[user.status as keyof typeof t]}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.editUser}</DialogTitle>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
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
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t.email}</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t.role}</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="student">{t.student}</SelectItem>
                                        <SelectItem value="teacher">{t.teacher}</SelectItem>
                                        <SelectItem value="admin">{t.admin}</SelectItem>
                                      </SelectContent>
                                    </Select>
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
                                <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>
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
                            <AlertDialogTitle>{t.deleteUser}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t.deleteConfirmation}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteUser(user.id)}
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

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;
