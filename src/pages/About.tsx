import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Globe, Award } from 'lucide-react';

const About = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const translations = {
    en: {
      title: 'About LearnLive',
      subtitle: 'Our mission is to make language learning accessible and enjoyable for everyone.',
      mission: 'Our Mission',
      missionText: 'We strive to connect learners with expert teachers and provide a platform for interactive and effective language education.',
      expertTeachers: 'Expert Teachers',
      expertTeachersDesc: 'Learn from certified and experienced language teachers.',
      multipleLanguages: 'Multiple Languages',
      multipleLanguagesDesc: 'Explore a wide variety of languages from around the world.',
      flexibleSchedule: 'Flexible Schedule',
      flexibleScheduleDesc: 'Learn at your own pace with our flexible scheduling options.',
      certification: 'Certification',
      certificationDesc: 'Receive a certificate upon completion of your language course.',
      story: 'Our Story',
      storyText: 'LearnLive was founded in 2020 with the vision of creating a global community of language learners. Starting with just a few languages, we have grown to offer courses in over 30 languages, serving thousands of students worldwide.'
    },
    ar: {
      title: 'عن LearnLive',
      subtitle: 'مهمتنا هي جعل تعلم اللغات متاحًا وممتعًا للجميع.',
      mission: 'مهمتنا',
      missionText: 'نسعى جاهدين لربط المتعلمين بمعلمين خبراء وتوفير منصة لتعليم لغوي تفاعلي وفعال.',
      expertTeachers: 'معلمون خبراء',
      expertTeachersDesc: 'تعلم من معلمي لغة معتمدين وذوي خبرة.',
      multipleLanguages: 'لغات متعددة',
      multipleLanguagesDesc: 'استكشف مجموعة واسعة من اللغات من جميع أنحاء العالم.',
      flexibleSchedule: 'جدول مرن',
      flexibleScheduleDesc: 'تعلم بالسرعة التي تناسبك مع خيارات الجدولة المرنة لدينا.',
      certification: 'شهادة',
      certificationDesc: 'احصل على شهادة عند الانتهاء من دورة اللغة الخاصة بك.',
      story: 'قصتنا',
      storyText: 'تأسست LearnLive في عام 2020 برؤية إنشاء مجتمع عالمي من متعلمي اللغات. بدءًا ببضعة لغات فقط ، تطورنا لتقديم دورات في أكثر من 30 لغة ، تخدم الآلاف من الطلاب في جميع أنحاء العالم.'
    },
    es: {
      title: 'Acerca de LearnLive',
      subtitle: 'Nuestra misión es hacer que el aprendizaje de idiomas sea accesible y agradable para todos.',
      mission: 'Nuestra Misión',
      missionText: 'Nos esforzamos por conectar a los estudiantes con profesores expertos y proporcionar una plataforma para una educación lingüística interactiva y eficaz.',
      expertTeachers: 'Profesores Expertos',
      expertTeachersDesc: 'Aprende de profesores de idiomas certificados y con experiencia.',
      multipleLanguages: 'Múltiples Idiomas',
      multipleLanguagesDesc: 'Explora una amplia variedad de idiomas de todo el mundo.',
      flexibleSchedule: 'Horario Flexible',
      flexibleScheduleDesc: 'Aprende a tu propio ritmo con nuestras opciones de programación flexibles.',
      certification: 'Certificación',
      certificationDesc: 'Recibe un certificado al completar tu curso de idiomas.',
      story: 'Nuestra Historia',
      storyText: 'LearnLive fue fundada en 2020 con la visión de crear una comunidad global de estudiantes de idiomas. Comenzando con solo unos pocos idiomas, hemos crecido para ofrecer cursos en más de 30 idiomas, sirviendo a miles de estudiantes en todo el mundo.'
    }
  };

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-background text-foreground transition-colors duration-300">
        <Header 
          language={language} 
          setLanguage={setLanguage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-6">{t.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">{t.mission}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground text-center leading-relaxed">
                  {t.missionText}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>{t.expertTeachers}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.expertTeachersDesc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>{t.multipleLanguages}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.multipleLanguagesDesc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>{t.flexibleSchedule}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.flexibleScheduleDesc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>{t.certification}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{t.certificationDesc}</CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Story Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">{t.story}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.storyText}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
