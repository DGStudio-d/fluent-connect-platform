
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

const AuthModal = ({ isOpen, onClose, language }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'teacher' | 'admin'
  });

  const translations = {
    en: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      role: 'Role',
      student: 'Student',
      teacher: 'Teacher',
      admin: 'Admin',
      loginBtn: 'Sign In',
      registerBtn: 'Sign Up',
      demoLogin: 'Demo Login',
      loginAsStudent: 'Login as Student',
      loginAsTeacher: 'Login as Teacher',
      loginAsAdmin: 'Login as Admin',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signUp: 'Sign up',
      signIn: 'Sign in',
      welcome: 'Welcome to LearnLive',
      loginSubtitle: 'Sign in to access your dashboard',
      registerSubtitle: 'Create your account to start learning'
    },
    ar: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم الكامل',
      role: 'الدور',
      student: 'طالب',
      teacher: 'معلم',
      admin: 'مدير',
      loginBtn: 'دخول',
      registerBtn: 'إنشاء حساب',
      demoLogin: 'تسجيل دخول تجريبي',
      loginAsStudent: 'دخول كطالب',
      loginAsTeacher: 'دخول كمعلم',
      loginAsAdmin: 'دخول كمدير',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      haveAccount: 'لديك حساب بالفعل؟',
      signUp: 'إنشاء حساب',
      signIn: 'تسجيل الدخول',
      welcome: 'مرحباً بك في LearnLive',
      loginSubtitle: 'سجل الدخول للوصول إلى لوحة التحكم',
      registerSubtitle: 'أنشئ حسابك لبدء التعلم'
    },
    es: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre Completo',
      role: 'Rol',
      student: 'Estudiante',
      teacher: 'Profesor',
      admin: 'Administrador',
      loginBtn: 'Iniciar Sesión',
      registerBtn: 'Registrarse',
      demoLogin: 'Login Demo',
      loginAsStudent: 'Entrar como Estudiante',
      loginAsTeacher: 'Entrar como Profesor',
      loginAsAdmin: 'Entrar como Administrador',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes cuenta?',
      haveAccount: '¿Ya tienes cuenta?',
      signUp: 'Registrarse',
      signIn: 'Iniciar sesión',
      welcome: 'Bienvenido a LearnLive',
      loginSubtitle: 'Inicia sesión para acceder a tu panel',
      registerSubtitle: 'Crea tu cuenta para comenzar a aprender'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: 'Demo User',
        email: loginData.email,
        role: 'student'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '2',
        name: registerData.name,
        email: registerData.email,
        role: registerData.role
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Registration Successful",
        description: "Welcome to LearnLive!",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleDemoLogin = (role: 'student' | 'teacher' | 'admin') => {
    const demoUsers = {
      student: {
        id: 'demo-student',
        name: 'Demo Student',
        email: 'student@demo.com',
        role: 'student' as const
      },
      teacher: {
        id: 'demo-teacher',
        name: 'Demo Teacher',
        email: 'teacher@demo.com',
        role: 'teacher' as const
      },
      admin: {
        id: 'demo-admin',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        role: 'admin' as const
      }
    };

    localStorage.setItem('user', JSON.stringify(demoUsers[role]));
    toast({
      title: "Demo Login Successful",
      description: `Logged in as ${role}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-emerald-600">
            {t.welcome}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t.login}</TabsTrigger>
            <TabsTrigger value="register">{t.register}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.login}</CardTitle>
                <CardDescription>{t.loginSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <div className="relative">
                      <Input
                        id="login-email"
                        type="email"
                        placeholder={t.email}
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.password}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                    {isLoading ? "..." : t.loginBtn}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-sm text-emerald-600">
                      {t.forgotPassword}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">{t.demoLogin}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('student')}>
                      {t.student}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('teacher')}>
                      {t.teacher}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')}>
                      {t.admin}
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    {t.noAccount}{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-emerald-600"
                      onClick={() => setActiveTab('register')}
                    >
                      {t.signUp}
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.register}</CardTitle>
                <CardDescription>{t.registerSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t.name}</Label>
                    <div className="relative">
                      <Input
                        id="register-name"
                        type="text"
                        placeholder={t.name}
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <div className="relative">
                      <Input
                        id="register-email"
                        type="email"
                        placeholder={t.email}
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-role">{t.role}</Label>
                    <Select value={registerData.role} onValueChange={(value: 'student' | 'teacher' | 'admin') => setRegisterData({ ...registerData, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">{t.student}</SelectItem>
                        <SelectItem value="teacher">{t.teacher}</SelectItem>
                        <SelectItem value="admin">{t.admin}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.password}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t.confirmPassword}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                      />
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                    {isLoading ? "..." : t.registerBtn}
                  </Button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    {t.haveAccount}{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-emerald-600"
                      onClick={() => setActiveTab('login')}
                    >
                      {t.signIn}
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
