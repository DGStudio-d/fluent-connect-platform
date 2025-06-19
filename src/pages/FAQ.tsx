
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';

interface FAQProps {
  language?: string;
}

const FAQ = ({ language = 'en' }: FAQProps) => {
  const translations = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our language learning platform',
      contact: 'Still have questions?',
      contactText: 'Contact our support team for personalized assistance',
      whatsapp: 'WhatsApp Support',
      email: 'Email Support',
      phone: 'Phone Support',
      faqs: [
        {
          question: 'How do live sessions work?',
          answer: 'Our live sessions are conducted via Google Meet or Microsoft Teams. You\'ll receive a meeting link before each session. Sessions are interactive, allowing you to practice speaking, ask questions, and engage with other learners in real-time.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers to CIH Bank and Barid Bank. After making your transfer, upload the payment proof through our platform and confirm via WhatsApp for manual verification.'
        },
        {
          question: 'Can I reschedule or cancel a session?',
          answer: 'Yes, you can reschedule or cancel sessions up to 24 hours before the scheduled time. Late cancellations may incur fees. Contact our support team for assistance with scheduling changes.'
        },
        {
          question: 'What happens if I miss a live session?',
          answer: 'If you miss a session, you can reschedule for the next available slot at no extra cost. Some sessions may also be recorded (with participant consent) for review purposes.'
        },
        {
          question: 'How are teachers selected?',
          answer: 'All our teachers are certified language instructors with proven experience. They undergo a rigorous selection process including background checks, teaching demonstrations, and ongoing performance evaluations.'
        },
        {
          question: 'Do you offer certificates upon completion?',
          answer: 'Yes, we provide certificates of completion for all our language programs. These certificates are recognized and can be used for academic or professional purposes.'
        },
        {
          question: 'What technical requirements do I need?',
          answer: 'You need a stable internet connection, a device with a camera and microphone (computer, tablet, or smartphone), and either Google Meet or Microsoft Teams installed.'
        },
        {
          question: 'Can I switch between different language programs?',
          answer: 'Yes, you can enroll in multiple language programs simultaneously or switch between them. Each program is designed to be flexible and accommodate your learning goals.'
        },
        {
          question: 'How do I track my progress?',
          answer: 'Your progress is tracked through regular assessments, quiz results, and teacher feedback. You can view your progress dashboard at any time to see your improvement over time.'
        },
        {
          question: 'What if I\'m not satisfied with my experience?',
          answer: 'We offer a satisfaction guarantee. If you\'re not happy with your first session, we\'ll work with you to find a solution or provide a full refund within the first week of enrollment.'
        }
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'اعثر على إجابات للأسئلة الشائعة حول منصة تعلم اللغات الخاصة بنا',
      contact: 'لا تزال لديك أسئلة؟',
      contactText: 'اتصل بفريق الدعم الخاص بنا للحصول على مساعدة شخصية',
      whatsapp: 'دعم واتساب',
      email: 'دعم البريد الإلكتروني',
      phone: 'دعم الهاتف',
      faqs: [
        {
          question: 'كيف تعمل الجلسات المباشرة؟',
          answer: 'تُجرى جلساتنا المباشرة عبر Google Meet أو Microsoft Teams. ستتلقى رابط الاجتماع قبل كل جلسة. الجلسات تفاعلية، مما يسمح لك بممارسة التحدث وطرح الأسئلة والتفاعل مع المتعلمين الآخرين في الوقت الفعلي.'
        },
        {
          question: 'ما هي طرق الدفع التي تقبلونها؟',
          answer: 'نقبل التحويلات المصرفية إلى بنك CIH وبنك بريد. بعد إجراء التحويل، قم برفع إثبات الدفع من خلال منصتنا وأكد عبر واتساب للتحقق اليدوي.'
        },
        {
          question: 'هل يمكنني إعادة جدولة أو إلغاء جلسة؟',
          answer: 'نعم، يمكنك إعادة جدولة أو إلغاء الجلسات حتى 24 ساعة قبل الوقت المحدد. قد تتكبد الإلغاءات المتأخرة رسوماً. اتصل بفريق الدعم للمساعدة في تغييرات الجدولة.'
        },
        {
          question: 'ماذا يحدث إذا فوتت جلسة مباشرة؟',
          answer: 'إذا فوتت جلسة، يمكنك إعادة الجدولة للفترة المتاحة التالية دون تكلفة إضافية. قد يتم أيضاً تسجيل بعض الجلسات (بموافقة المشاركين) لأغراض المراجعة.'
        },
        {
          question: 'كيف يتم اختيار المعلمين؟',
          answer: 'جميع معلمينا مدربون معتمدون في اللغة مع خبرة مثبتة. يخضعون لعملية اختيار صارمة تشمل فحص الخلفية وعروض التدريس وتقييمات الأداء المستمرة.'
        },
        {
          question: 'هل تقدمون شهادات عند الإنجاز؟',
          answer: 'نعم، نقدم شهادات إتمام لجميع برامج اللغة لدينا. هذه الشهادات معترف بها ويمكن استخدامها لأغراض أكاديمية أو مهنية.'
        },
        {
          question: 'ما هي المتطلبات التقنية التي أحتاجها؟',
          answer: 'تحتاج إلى اتصال إنترنت مستقر، وجهاز مع كاميرا وميكروفون (كمبيوتر، جهاز لوحي، أو هاتف ذكي)، وتطبيق Google Meet أو Microsoft Teams مثبت.'
        },
        {
          question: 'هل يمكنني التبديل بين برامج اللغة المختلفة؟',
          answer: 'نعم، يمكنك التسجيل في برامج لغة متعددة في وقت واحد أو التبديل بينها. كل برنامج مصمم ليكون مرناً ويلبي أهداف التعلم الخاصة بك.'
        },
        {
          question: 'كيف أتتبع تقدمي؟',
          answer: 'يتم تتبع تقدمك من خلال التقييمات المنتظمة ونتائج الاختبارات وتعليقات المعلم. يمكنك عرض لوحة التقدم الخاصة بك في أي وقت لرؤية تحسنك مع مرور الوقت.'
        },
        {
          question: 'ماذا لو لم أكن راضياً عن تجربتي؟',
          answer: 'نقدم ضمان الرضا. إذا لم تكن سعيداً بجلستك الأولى، سنعمل معك لإيجاد حل أو نقدم استرداداً كاملاً خلال الأسبوع الأول من التسجيل.'
        }
      ]
    },
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Encuentra respuestas a preguntas comunes sobre nuestra plataforma de aprendizaje de idiomas',
      contact: '¿Aún tienes preguntas?',
      contactText: 'Contacta a nuestro equipo de soporte para asistencia personalizada',
      whatsapp: 'Soporte WhatsApp',
      email: 'Soporte por Email',
      phone: 'Soporte Telefónico',
      faqs: [
        {
          question: '¿Cómo funcionan las sesiones en vivo?',
          answer: 'Nuestras sesiones en vivo se realizan a través de Google Meet o Microsoft Teams. Recibirás un enlace de reunión antes de cada sesión. Las sesiones son interactivas, permitiéndote practicar hablar, hacer preguntas e interactuar con otros estudiantes en tiempo real.'
        },
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Aceptamos transferencias bancarias a CIH Bank y Barid Bank. Después de realizar tu transferencia, sube el comprobante de pago a través de nuestra plataforma y confirma vía WhatsApp para verificación manual.'
        },
        {
          question: '¿Puedo reprogramar o cancelar una sesión?',
          answer: 'Sí, puedes reprogramar o cancelar sesiones hasta 24 horas antes del tiempo programado. Las cancelaciones tardías pueden incurrir en tarifas. Contacta a nuestro equipo de soporte para asistencia con cambios de horario.'
        },
        {
          question: '¿Qué pasa si me pierdo una sesión en vivo?',
          answer: 'Si te pierdes una sesión, puedes reprogramar para el próximo horario disponible sin costo extra. Algunas sesiones también pueden ser grabadas (con consentimiento de los participantes) para propósitos de revisión.'
        },
        {
          question: '¿Cómo se seleccionan los profesores?',
          answer: 'Todos nuestros profesores son instructores certificados de idiomas con experiencia comprobada. Pasan por un proceso de selección riguroso que incluye verificación de antecedentes, demostraciones de enseñanza y evaluaciones continuas de rendimiento.'
        },
        {
          question: '¿Ofrecen certificados al completar?',
          answer: 'Sí, proporcionamos certificados de finalización para todos nuestros programas de idiomas. Estos certificados son reconocidos y pueden usarse para propósitos académicos o profesionales.'
        },
        {
          question: '¿Qué requisitos técnicos necesito?',
          answer: 'Necesitas una conexión estable a internet, un dispositivo con cámara y micrófono (computadora, tablet o smartphone), y Google Meet o Microsoft Teams instalado.'
        },
        {
          question: '¿Puedo cambiar entre diferentes programas de idiomas?',
          answer: 'Sí, puedes inscribirte en múltiples programas de idiomas simultáneamente o cambiar entre ellos. Cada programa está diseñado para ser flexible y acomodar tus objetivos de aprendizaje.'
        },
        {
          question: '¿Cómo hago seguimiento de mi progreso?',
          answer: 'Tu progreso se rastrea a través de evaluaciones regulares, resultados de cuestionarios y retroalimentación del profesor. Puedes ver tu panel de progreso en cualquier momento para ver tu mejora a lo largo del tiempo.'
        },
        {
          question: '¿Qué pasa si no estoy satisfecho con mi experiencia?',
          answer: 'Ofrecemos una garantía de satisfacción. Si no estás contento con tu primera sesión, trabajaremos contigo para encontrar una solución o proporcionar un reembolso completo dentro de la primera semana de inscripción.'
        }
      ]
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-emerald-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-4 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {t.contact}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.contactText}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-600">{t.whatsapp}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant support via WhatsApp for quick questions and assistance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Mail className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-600">{t.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Send us detailed questions and receive comprehensive responses via email.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Phone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle className="text-emerald-600">{t.phone}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Speak directly with our support team for personalized assistance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
