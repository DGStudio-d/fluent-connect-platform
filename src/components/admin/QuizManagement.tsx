
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
import { Pencil, Trash2, Plus, Search, FileQuestion } from 'lucide-react';
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
  status: 'draft' | 'published';
  questions: QuizQuestion[];
  totalQuestions: number;
  totalPoints: number;
  attempts: number;
  createdAt: string;
}

interface QuizManagementProps {
  language?: string;
}

const QuizManagement = ({ language = 'en' }: QuizManagementProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'English Grammar Basics',
      description: 'Test your understanding of basic English grammar',
      program: 'English for Beginners',
      difficulty: 'easy',
      timeLimit: 30,
      status: 'published',
      questions: [],
      totalQuestions: 10,
      totalPoints: 100,
      attempts: 156,
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Arabic Vocabulary',
      description: 'Business Arabic vocabulary test',
      program: 'Business Arabic',
      difficulty: 'medium',
      timeLimit: 45,
      status: 'published',
      questions: [],
      totalQuestions: 15,
      totalPoints: 150,
      attempts: 89,
      createdAt: '2024-02-05'
    }
  ]);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Quiz Management',
      addQuiz: 'Add Quiz',
      editQuiz: 'Edit Quiz',
      addQuestion: 'Add Question',
      editQuestion: 'Edit Question',
      quizTitle: 'Quiz Title',
      description: 'Description',
      program: 'Program',
      difficulty: 'Difficulty',
      timeLimit: 'Time Limit (minutes)',
      status: 'Status',
      questions: 'Questions',
      totalPoints: 'Total Points',
      attempts: 'Attempts',
      createdAt: 'Created',
      actions: 'Actions',
      search: 'Search quizzes...',
      filterByProgram: 'Filter by Program',
      filterByStatus: 'Filter by Status',
      all: 'All',
      draft: 'Draft',
      published: 'Published',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      manageQuestions: 'Manage Questions',
      questionType: 'Question Type',
      questionText: 'Question',
      options: 'Options',
      correctAnswer: 'Correct Answer',
      points: 'Points',
      multipleChoice: 'Multiple Choice',
      trueFalse: 'True/False',
      shortAnswer: 'Short Answer',
      addOption: 'Add Option',
      removeOption: 'Remove Option'
    },
    ar: {
      title: 'إدارة الاختبارات',
      addQuiz: 'إضافة اختبار',
      editQuiz: 'تعديل الاختبار',
      addQuestion: 'إضافة سؤال',
      editQuestion: 'تعديل السؤال',
      quizTitle: 'عنوان الاختبار',
      description: 'الوصف',
      program: 'البرنامج',
      difficulty: 'الصعوبة',
      timeLimit: 'الوقت المحدد (دقائق)',
      status: 'الحالة',
      questions: 'الأسئلة',
      totalPoints: 'إجمالي النقاط',
      attempts: 'المحاولات',
      createdAt: 'تاريخ الإنشاء',
      actions: 'الإجراءات',
      search: 'البحث في الاختبارات...',
      filterByProgram: 'تصفية حسب البرنامج',
      filterByStatus: 'تصفية حسب الحالة',
      all: 'الكل',
      draft: 'مسودة',
      published: 'منشور',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      manageQuestions: 'إدارة الأسئلة',
      questionType: 'نوع السؤال',
      questionText: 'السؤال',
      options: 'الخيارات',
      correctAnswer: 'الإجابة الصحيحة',
      points: 'النقاط',
      multipleChoice: 'اختيار متعدد',
      trueFalse: 'صح أو خطأ',
      shortAnswer: 'إجابة قصيرة',
      addOption: 'إضافة خيار',
      removeOption: 'إزالة خيار'
    },
    es: {
      title: 'Gestión de Cuestionarios',
      addQuiz: 'Agregar Cuestionario',
      editQuiz: 'Editar Cuestionario',
      addQuestion: 'Agregar Pregunta',
      editQuestion: 'Editar Pregunta',
      quizTitle: 'Título del Cuestionario',
      description: 'Descripción',
      program: 'Programa',
      difficulty: 'Dificultad',
      timeLimit: 'Tiempo Límite (minutos)',
      status: 'Estado',
      questions: 'Preguntas',
      totalPoints: 'Puntos Totales',
      attempts: 'Intentos',
      createdAt: 'Creado',
      actions: 'Acciones',
      search: 'Buscar cuestionarios...',
      filterByProgram: 'Filtrar por Programa',
      filterByStatus: 'Filtrar por Estado',
      all: 'Todos',
      draft: 'Borrador',
      published: 'Publicado',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      manageQuestions: 'Gestionar Preguntas',
      questionType: 'Tipo de Pregunta',
      questionText: 'Pregunta',
      options: 'Opciones',
      correctAnswer: 'Respuesta Correcta',
      points: 'Puntos',
      multipleChoice: 'Opción Múltiple',
      trueFalse: 'Verdadero/Falso',
      shortAnswer: 'Respuesta Corta',
      addOption: 'Agregar Opción',
      removeOption: 'Eliminar Opción'
    }
  };

  const t = translations[language as keyof typeof translations];

  const [quizFormData, setQuizFormData] = useState({
    title: '',
    description: '',
    program: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    timeLimit: 30,
    status: 'draft' as 'draft' | 'published'
  });

  const [questionFormData, setQuestionFormData] = useState({
    type: 'multiple-choice' as 'multiple-choice' | 'true-false' | 'short-answer',
    question: '',
    options: ['', ''],
    correctAnswer: '',
    points: 10
  });

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram = filterProgram === 'all' || quiz.program === filterProgram;
    const matchesStatus = filterStatus === 'all' || quiz.status === filterStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuiz) {
      setQuizzes(prev => prev.map(quiz => 
        quiz.id === editingQuiz.id 
          ? { ...quiz, ...quizFormData }
          : quiz
      ));
      toast({
        title: "Quiz updated successfully",
        description: "The quiz has been updated."
      });
    } else {
      const newQuiz: Quiz = {
        id: Date.now().toString(),
        ...quizFormData,
        questions: [],
        totalQuestions: 0,
        totalPoints: 0,
        attempts: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQuizzes(prev => [...prev, newQuiz]);
      toast({
        title: "Quiz created successfully",
        description: "The new quiz has been added."
      });
    }
    
    setIsQuizDialogOpen(false);
    setEditingQuiz(null);
    setQuizFormData({
      title: '',
      description: '',
      program: '',
      difficulty: 'easy',
      timeLimit: 30,
      status: 'draft'
    });
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingQuestion) {
      setQuestions(prev => prev.map(question => 
        question.id === editingQuestion.id 
          ? { ...question, ...questionFormData }
          : question
      ));
    } else {
      const newQuestion: QuizQuestion = {
        id: Date.now().toString(),
        type: questionFormData.type,
        question: questionFormData.question,
        options: questionFormData.type === 'multiple-choice' ? questionFormData.options : undefined,
        correctAnswer: questionFormData.correctAnswer,
        points: questionFormData.points
      };
      setQuestions(prev => [...prev, newQuestion]);
    }
    
    setIsQuestionDialogOpen(false);
    setEditingQuestion(null);
    setQuestionFormData({
      type: 'multiple-choice',
      question: '',
      options: ['', ''],
      correctAnswer: '',
      points: 10
    });
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setQuizFormData({
      title: quiz.title,
      description: quiz.description,
      program: quiz.program,
      difficulty: quiz.difficulty,
      timeLimit: quiz.timeLimit,
      status: quiz.status
    });
    setIsQuizDialogOpen(true);
  };

  const handleEditQuestion = (question: QuizQuestion) => {
    setEditingQuestion(question);
    setQuestionFormData({
      type: question.type,
      question: question.question,
      options: question.options || ['', ''],
      correctAnswer: question.correctAnswer,
      points: question.points
    });
    setIsQuestionDialogOpen(true);
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    toast({
      title: "Quiz deleted",
      description: "The quiz has been removed."
    });
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(question => question.id !== id));
  };

  const addOption = () => {
    setQuestionFormData({
      ...questionFormData,
      options: [...questionFormData.options, '']
    });
  };

  const removeOption = (index: number) => {
    setQuestionFormData({
      ...questionFormData,
      options: questionFormData.options.filter((_, i) => i !== index)
    });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...questionFormData.options];
    newOptions[index] = value;
    setQuestionFormData({
      ...questionFormData,
      options: newOptions
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              {t.addQuiz}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingQuiz ? t.editQuiz : t.addQuiz}</DialogTitle>
              <DialogDescription>
                Fill in the quiz details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">{t.quizTitle}</Label>
                <Input
                  id="title"
                  value={quizFormData.title}
                  onChange={(e) => setQuizFormData({...quizFormData, title: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">{t.description}</Label>
                <Textarea
                  id="description"
                  value={quizFormData.description}
                  onChange={(e) => setQuizFormData({...quizFormData, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="program">{t.program}</Label>
                <Input
                  id="program"
                  value={quizFormData.program}
                  onChange={(e) => setQuizFormData({...quizFormData, program: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="difficulty">{t.difficulty}</Label>
                <Select value={quizFormData.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setQuizFormData({...quizFormData, difficulty: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">{t.easy}</SelectItem>
                    <SelectItem value="medium">{t.medium}</SelectItem>
                    <SelectItem value="hard">{t.hard}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeLimit">{t.timeLimit}</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={quizFormData.timeLimit}
                  onChange={(e) => setQuizFormData({...quizFormData, timeLimit: Number(e.target.value)})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">{t.status}</Label>
                <Select value={quizFormData.status} onValueChange={(value: 'draft' | 'published') => setQuizFormData({...quizFormData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{t.draft}</SelectItem>
                    <SelectItem value="published">{t.published}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsQuizDialogOpen(false)}>
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
        <Select value={filterProgram} onValueChange={setFilterProgram}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByProgram} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="English for Beginners">English for Beginners</SelectItem>
            <SelectItem value="Business Arabic">Business Arabic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="draft">{t.draft}</SelectItem>
            <SelectItem value="published">{t.published}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quizzes Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            Create and manage quizzes for your language programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.quizTitle}</TableHead>
                <TableHead>{t.program}</TableHead>
                <TableHead>{t.difficulty}</TableHead>
                <TableHead>{t.timeLimit}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.questions}</TableHead>
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
                    <Badge variant={quiz.difficulty === 'easy' ? 'default' : quiz.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                      {quiz.difficulty === 'easy' ? t.easy : quiz.difficulty === 'medium' ? t.medium : t.hard}
                    </Badge>
                  </TableCell>
                  <TableCell>{quiz.timeLimit} min</TableCell>
                  <TableCell>
                    <Badge variant={quiz.status === 'published' ? 'default' : 'secondary'}>
                      {quiz.status === 'published' ? t.published : t.draft}
                    </Badge>
                  </TableCell>
                  <TableCell>{quiz.totalQuestions}</TableCell>
                  <TableCell>{quiz.attempts}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuiz(quiz)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCurrentQuizId(quiz.id);
                          setIsQuestionDialogOpen(true);
                        }}
                      >
                        <FileQuestion className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteQuiz(quiz.id)}
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

      {/* Question Management Dialog */}
      <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingQuestion ? t.editQuestion : t.addQuestion}</DialogTitle>
            <DialogDescription>
              Create or edit quiz questions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">{t.questionType}</Label>
              <Select value={questionFormData.type} onValueChange={(value: 'multiple-choice' | 'true-false' | 'short-answer') => setQuestionFormData({...questionFormData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">{t.multipleChoice}</SelectItem>
                  <SelectItem value="true-false">{t.trueFalse}</SelectItem>
                  <SelectItem value="short-answer">{t.shortAnswer}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="question">{t.questionText}</Label>
              <Textarea
                id="question"
                value={questionFormData.question}
                onChange={(e) => setQuestionFormData({...questionFormData, question: e.target.value})}
                required
              />
            </div>
            {questionFormData.type === 'multiple-choice' && (
              <div>
                <Label>{t.options}</Label>
                {questionFormData.options.map((option, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    {questionFormData.options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                      >
                        {t.removeOption}
                      </Button>
                    )}
                  </div>
                ))}
                {questionFormData.options.length < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    className="mt-2"
                  >
                    {t.addOption}
                  </Button>
                )}
              </div>
            )}
            <div>
              <Label htmlFor="correctAnswer">{t.correctAnswer}</Label>
              {questionFormData.type === 'true-false' ? (
                <Select value={questionFormData.correctAnswer} onValueChange={(value) => setQuestionFormData({...questionFormData, correctAnswer: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="correctAnswer"
                  value={questionFormData.correctAnswer}
                  onChange={(e) => setQuestionFormData({...questionFormData, correctAnswer: e.target.value})}
                  required
                />
              )}
            </div>
            <div>
              <Label htmlFor="points">{t.points}</Label>
              <Input
                id="points"
                type="number"
                value={questionFormData.points}
                onChange={(e) => setQuestionFormData({...questionFormData, points: Number(e.target.value)})}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsQuestionDialogOpen(false)}>
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
  );
};

export default QuizManagement;
