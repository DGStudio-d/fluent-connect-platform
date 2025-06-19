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
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Trash2, FileQuestion, CheckCircle, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  program: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  totalQuestions: number;
  totalPoints: number;
  status: 'draft' | 'published';
  questions: QuizQuestion[];
  createdAt: string;
  attempts: number;
}

interface QuizManagementProps {
  language: string;
}

const quizSchema = z.object({
  title: z.string().min(2, 'Quiz title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  program: z.string().min(1, 'Program is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  timeLimit: z.number().min(1, 'Time limit must be at least 1 minute'),
  status: z.enum(['draft', 'published']),
});

const questionSchema = z.object({
  type: z.enum(['multiple-choice', 'true-false', 'short-answer']),
  question: z.string().min(5, 'Question must be at least 5 characters'),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  points: z.number().min(1, 'Points must be at least 1'),
});

const QuizManagement = ({ language }: QuizManagementProps) => {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'English Grammar Basics',
      description: 'Test your knowledge of English grammar fundamentals',
      program: 'English for Beginners',
      difficulty: 'easy',
      timeLimit: 30,
      totalQuestions: 10,
      totalPoints: 50,
      status: 'published',
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is the past tense of "go"?',
          options: ['went', 'goed', 'gone', 'going'],
          correctAnswer: 'went',
          points: 5
        }
      ],
      createdAt: '2024-01-15',
      attempts: 23
    },
    {
      id: '2',
      title: 'Arabic Vocabulary',
      description: 'Test your Arabic vocabulary knowledge',
      program: 'Arabic Intermediate',
      difficulty: 'medium',
      timeLimit: 45,
      totalQuestions: 15,
      totalPoints: 75,
      status: 'draft',
      questions: [],
      createdAt: '2024-01-10',
      attempts: 0
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);

  const translations = {
    en: {
      title: 'Quiz Management',
      description: 'Create and manage quizzes and assessments',
      addQuiz: 'Create Quiz',
      search: 'Search quizzes...',
      filterStatus: 'Filter by status',
      filterDifficulty: 'Filter by difficulty',
      quizTitle: 'Quiz Title',
      program: 'Program',
      difficulty: 'Difficulty',
      timeLimit: 'Time Limit',
      questions: 'Questions',
      points: 'Points',
      status: 'Status',
      attempts: 'Attempts',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      draft: 'Draft',
      published: 'Published',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      all: 'All',
      createQuiz: 'Create Quiz',
      editQuiz: 'Edit Quiz',
      deleteQuiz: 'Delete Quiz',
      deleteConfirmation: 'Are you sure you want to delete this quiz?',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      quizCreated: 'Quiz created successfully',
      quizUpdated: 'Quiz updated successfully',
      quizDeleted: 'Quiz deleted successfully',
      addQuestion: 'Add Question',
      editQuestion: 'Edit Question',
      questionType: 'Question Type',
      questionText: 'Question',
      options: 'Options',
      correctAnswer: 'Correct Answer',
      questionPoints: 'Points',
      multipleChoice: 'Multiple Choice',
      trueFalse: 'True/False',
      shortAnswer: 'Short Answer',
      option: 'Option',
      true: 'True',
      false: 'False',
      minutes: 'minutes',
      questionCreated: 'Question added successfully',
      questionUpdated: 'Question updated successfully',
      questionDeleted: 'Question deleted successfully'
    },
    ar: {
      title: 'إدارة الاختبارات',
      description: 'إنشاء وإدارة الاختبارات والتقييمات',
      addQuiz: 'إنشاء اختبار',
      search: 'البحث عن الاختبارات...',
      filterStatus: 'تصفية حسب الحالة',
      filterDifficulty: 'تصفية حسب الصعوبة',
      quizTitle: 'عنوان الاختبار',
      program: 'البرنامج',
      difficulty: 'الصعوبة',
      timeLimit: 'مدة الاختبار',
      questions: 'الأسئلة',
      points: 'النقاط',
      status: 'الحالة',
      attempts: 'المحاولات',
      actions: 'الإجراءات',
      edit: 'تعديل',
      delete: 'حذف',
      view: 'عرض',
      draft: 'مسودة',
      published: 'منشور',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      all: 'الكل',
      createQuiz: 'إنشاء اختبار',
      editQuiz: 'تعديل اختبار',
      deleteQuiz: 'حذف اختبار',
      deleteConfirmation: 'هل أنت متأكد من حذف هذا الاختبار؟',
      cancel: 'إلغاء',
      save: 'حفظ',
      create: 'إنشاء',
      quizCreated: 'تم إنشاء الاختبار بنجاح',
      quizUpdated: 'تم تحديث الاختبار بنجاح',
      quizDeleted: 'تم حذف الاختبار بنجاح',
      addQuestion: 'إضافة سؤال',
      editQuestion: 'تعديل سؤال',
      questionType: 'نوع السؤال',
      questionText: 'السؤال',
      options: 'الخيارات',
      correctAnswer: 'الإجابة الصحيحة',
      questionPoints: 'النقاط',
      multipleChoice: 'اختيار متعدد',
      trueFalse: 'صح/خطأ',
      shortAnswer: 'إجابة قصيرة',
      option: 'خيار',
      true: 'صح',
      false: 'خطأ',
      minutes: 'دقيقة',
      questionCreated: 'تم إضافة السؤال بنجاح',
      questionUpdated: 'تم تحديث السؤال بنجاح',
      questionDeleted: 'تم حذف السؤال بنجاح'
    },
    es: {
      title: 'Gestión de Cuestionarios',
      description: 'Crear y gestionar cuestionarios y evaluaciones',
      addQuiz: 'Crear Cuestionario',
      search: 'Buscar cuestionarios...',
      filterStatus: 'Filtrar por estado',
      filterDifficulty: 'Filtrar por dificultad',
      quizTitle: 'Título del Cuestionario',
      program: 'Programa',
      difficulty: 'Dificultad',
      timeLimit: 'Límite de Tiempo',
      questions: 'Preguntas',
      points: 'Puntos',
      status: 'Estado',
      attempts: 'Intentos',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      view: 'Ver',
      draft: 'Borrador',
      published: 'Publicado',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      all: 'Todos',
      createQuiz: 'Crear Cuestionario',
      editQuiz: 'Editar Cuestionario',
      deleteQuiz: 'Eliminar Cuestionario',
      deleteConfirmation: '¿Estás seguro de que quieres eliminar este cuestionario?',
      cancel: 'Cancelar',
      save: 'Guardar',
      create: 'Crear',
      quizCreated: 'Cuestionario creado exitosamente',
      quizUpdated: 'Cuestionario actualizado exitosamente',
      quizDeleted: 'Cuestionario eliminado exitosamente',
      addQuestion: 'Agregar Pregunta',
      editQuestion: 'Editar Pregunta',
      questionType: 'Tipo de Pregunta',
      questionText: 'Pregunta',
      options: 'Opciones',
      correctAnswer: 'Respuesta Correcta',
      questionPoints: 'Puntos',
      multipleChoice: 'Opción Múltiple',
      trueFalse: 'Verdadero/Falso',
      shortAnswer: 'Respuesta Corta',
      option: 'Opción',
      true: 'Verdadero',
      false: 'Falso',
      minutes: 'minutos',
      questionCreated: 'Pregunta agregada exitosamente',
      questionUpdated: 'Pregunta actualizada exitosamente',
      questionDeleted: 'Pregunta eliminada exitosamente'
    }
  };

  const t = translations[language as keyof typeof translations];

  const quizForm = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: '',
      description: '',
      program: '',
      difficulty: 'easy',
      timeLimit: 30,
      status: 'draft',
    },
  });

  const questionForm = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 5,
    },
  });

  const [questionType, setQuestionType] = useState<'multiple-choice' | 'true-false' | 'short-answer'>('multiple-choice');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty === difficultyFilter;
    
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const handleCreateQuiz = (data: z.infer<typeof quizSchema>) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      ...data,
      totalQuestions: 0,
      totalPoints: 0,
      questions: [],
      createdAt: new Date().toISOString().split('T')[0],
      attempts: 0,
    };
    
    setQuizzes([...quizzes, newQuiz]);
    setIsCreateDialogOpen(false);
    quizForm.reset();
    toast({
      title: t.quizCreated,
      variant: "default",
    });
  };

  const handleEditQuiz = (data: z.infer<typeof quizSchema>) => {
    if (!editingQuiz) return;
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === editingQuiz.id 
        ? { ...quiz, ...data }
        : quiz
    ));
    setEditingQuiz(null);
    quizForm.reset();
    toast({
      title: t.quizUpdated,
      variant: "default",
    });
  };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
    toast({
      title: t.quizDeleted,
      variant: "default",
    });
  };

  const handleCreateQuestion = (data: z.infer<typeof questionSchema>) => {
    if (!selectedQuiz) return;
    
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      ...data,
    };
    
    const updatedQuiz = {
      ...selectedQuiz,
      questions: [...selectedQuiz.questions, newQuestion],
      totalQuestions: selectedQuiz.questions.length + 1,
      totalPoints: selectedQuiz.totalPoints + data.points,
    };
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === selectedQuiz.id ? updatedQuiz : quiz
    ));
    setSelectedQuiz(updatedQuiz);
    setIsQuestionDialogOpen(false);
    questionForm.reset();
    toast({
      title: t.questionCreated,
      variant: "default",
    });
  };

  const handleEditQuestion = (data: z.infer<typeof questionSchema>) => {
    if (!selectedQuiz || !editingQuestion) return;
    
    const updatedQuestions = selectedQuiz.questions.map(q => 
      q.id === editingQuestion.id ? { ...q, ...data } : q
    );
    
    const updatedQuiz = {
      ...selectedQuiz,
      questions: updatedQuestions,
      totalPoints: updatedQuestions.reduce((sum, q) => sum + q.points, 0),
    };
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === selectedQuiz.id ? updatedQuiz : quiz
    ));
    setSelectedQuiz(updatedQuiz);
    setEditingQuestion(null);
    questionForm.reset();
    toast({
      title: t.questionUpdated,
      variant: "default",
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (!selectedQuiz) return;
    
    const updatedQuestions = selectedQuiz.questions.filter(q => q.id !== questionId);
    const updatedQuiz = {
      ...selectedQuiz,
      questions: updatedQuestions,
      totalQuestions: updatedQuestions.length,
      totalPoints: updatedQuestions.reduce((sum, q) => sum + q.points, 0),
    };
    
    setQuizzes(quizzes.map(quiz => 
      quiz.id === selectedQuiz.id ? updatedQuiz : quiz
    ));
    setSelectedQuiz(updatedQuiz);
    toast({
      title: t.questionDeleted,
      variant: "default",
    });
  };

  const openEditDialog = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    quizForm.reset({
      title: quiz.title,
      description: quiz.description,
      program: quiz.program,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      status: quiz.status,
    });
  };

  const openQuestionDialog = (question?: QuizQuestion) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionType(question.type);
      questionForm.reset({
        type: question.type,
        question: question.question,
        options: question.options || ['', '', '', ''],
        correctAnswer: question.correctAnswer,
        points: question.points,
      });
    } else {
      setEditingQuestion(null);
      setQuestionType('multiple-choice');
      questionForm.reset();
    }
    setIsQuestionDialogOpen(true);
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
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
                  <SelectItem value="draft">{t.draft}</SelectItem>
                  <SelectItem value="published">{t.published}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.filterDifficulty} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  <SelectItem value="easy">{t.easy}</SelectItem>
                  <SelectItem value="medium">{t.medium}</SelectItem>
                  <SelectItem value="hard">{t.hard}</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addQuiz}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.createQuiz}</DialogTitle>
                  </DialogHeader>
                  <Form {...quizForm}>
                    <form onSubmit={quizForm.handleSubmit(handleCreateQuiz)} className="space-y-4">
                      <FormField
                        control={quizForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.quizTitle}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={quizForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.description}</FormLabel>
                            <FormControl>
                              <Textarea {...field} rows={3} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={quizForm.control}
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
                          control={quizForm.control}
                          name="difficulty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.difficulty}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="easy">{t.easy}</SelectItem>
                                  <SelectItem value="medium">{t.medium}</SelectItem>
                                  <SelectItem value="hard">{t.hard}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={quizForm.control}
                          name="timeLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.timeLimit} ({t.minutes})</FormLabel>
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
                        <FormField
                          control={quizForm.control}
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
                                  <SelectItem value="draft">{t.draft}</SelectItem>
                                  <SelectItem value="published">{t.published}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
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
                  <TableHead>{t.quizTitle}</TableHead>
                  <TableHead>{t.program}</TableHead>
                  <TableHead>{t.difficulty}</TableHead>
                  <TableHead>{t.timeLimit}</TableHead>
                  <TableHead>{t.questions}</TableHead>
                  <TableHead>{t.points}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.attempts}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.program}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyBadgeColor(quiz.difficulty)}>
                        {t[quiz.difficulty as keyof typeof t]}
                      </Badge>
                    </TableCell>
                    <TableCell>{quiz.timeLimit} {t.minutes}</TableCell>
                    <TableCell>{quiz.totalQuestions}</TableCell>
                    <TableCell>{quiz.totalPoints}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(quiz.status)}>
                        {t[quiz.status as keyof typeof t]}
                      </Badge>
                    </TableCell>
                    <TableCell>{quiz.attempts}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedQuiz(quiz)}
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          <FileQuestion className="h-4 w-4" />
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(quiz)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{t.editQuiz}</DialogTitle>
                            </DialogHeader>
                            <Form {...quizForm}>
                              <form onSubmit={quizForm.handleSubmit(handleEditQuiz)} className="space-y-4">
                                <FormField
                                  control={quizForm.control}
                                  name="title"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.quizTitle}</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={quizForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t.description}</FormLabel>
                                      <FormControl>
                                        <Textarea {...field} rows={3} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={quizForm.control}
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
                                    control={quizForm.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.difficulty}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="easy">{t.easy}</SelectItem>
                                            <SelectItem value="medium">{t.medium}</SelectItem>
                                            <SelectItem value="hard">{t.hard}</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FormField
                                    control={quizForm.control}
                                    name="timeLimit"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>{t.timeLimit} ({t.minutes})</FormLabel>
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
                                  <FormField
                                    control={quizForm.control}
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
                                            <SelectItem value="draft">{t.draft}</SelectItem>
                                            <SelectItem value="published">{t.published}</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                
                                <DialogFooter>
                                  <Button type="button" variant="outline" onClick={() => setEditingQuiz(null)}>
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
                              <AlertDialogTitle>{t.deleteQuiz}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t.deleteConfirmation}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteQuiz(quiz.id)}
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

      {/* Quiz Questions Detail View */}
      {selectedQuiz && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedQuiz.title} - {t.questions}</CardTitle>
                <CardDescription>
                  {selectedQuiz.totalQuestions} {t.questions} • {selectedQuiz.totalPoints} {t.points}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => openQuestionDialog()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t.addQuestion}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingQuestion ? t.editQuestion : t.addQuestion}
                      </DialogTitle>
                    </DialogHeader>
                    <Form {...questionForm}>
                      <form onSubmit={questionForm.handleSubmit(editingQuestion ? handleEditQuestion : handleCreateQuestion)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={questionForm.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.questionType}</FormLabel>
                                <Select 
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setQuestionType(value as any);
                                  }} 
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="multiple-choice">{t.multipleChoice}</SelectItem>
                                    <SelectItem value="true-false">{t.trueFalse}</SelectItem>
                                    <SelectItem value="short-answer">{t.shortAnswer}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={questionForm.control}
                            name="points"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t.questionPoints}</FormLabel>
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
                          control={questionForm.control}
                          name="question"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.questionText}</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {questionType === 'multiple-choice' && (
                          <div className="space-y-4">
                            <FormField
                              control={questionForm.control}
                              name="options"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t.options}</FormLabel>
                                  <div className="space-y-2">
                                    {field.value?.map((option, index) => (
                                      <Input
                                        key={index}
                                        placeholder={`${t.option} ${index + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                          const newOptions = [...(field.value || [])];
                                          newOptions[index] = e.target.value;
                                          field.onChange(newOptions);
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                        
                        <FormField
                          control={questionForm.control}
                          name="correctAnswer"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.correctAnswer}</FormLabel>
                              <FormControl>
                                {questionType === 'true-false' ? (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="true">{t.true}</SelectItem>
                                      <SelectItem value="false">{t.false}</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input {...field} />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
                            {t.cancel}
                          </Button>
                          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                            {editingQuestion ? t.save : t.create}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
                  ←
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedQuiz.questions.map((question, index) => (
                <Card key={question.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{question.type}</Badge>
                        <Badge variant="secondary">{question.points} {t.points}</Badge>
                      </div>
                      <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-1 ml-4">
                          {question.options.map((option, optIndex) => (
                            <div key={optIndex} className="flex items-center space-x-2">
                              {option === question.correctAnswer ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-gray-400" />
                              )}
                              <span className={option === question.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                {option}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'true-false' && (
                        <p className="ml-4 text-green-600 font-medium">
                          {t.correctAnswer}: {question.correctAnswer === 'true' ? t.true : t.false}
                        </p>
                      )}
                      
                      {question.type === 'short-answer' && (
                        <p className="ml-4 text-green-600 font-medium">
                          {t.correctAnswer}: {question.correctAnswer}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openQuestionDialog(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t.delete} {t.questionText}</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this question?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {t.delete}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
              
              {selectedQuiz.questions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No questions added yet. Click "{t.addQuestion}" to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizManagement;
