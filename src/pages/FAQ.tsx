import React, { useState } from 'react';
import Header from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const translations = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our platform and services.',
    },
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'اعثر على إجابات للأسئلة الشائعة حول منصتنا وخدماتنا.',
    },
    es: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Encuentra respuestas a preguntas comunes sobre nuestra plataforma y servicios.',
    }
  };

  const faqs = [
    {
      question: 'What is LearnLive?',
      answer: 'LearnLive is an online platform that offers live language learning sessions with certified instructors.'
    },
    {
      question: 'How do I join a session?',
      answer: 'You can join a session by browsing our sessions page and registering for an upcoming session.'
    },
    {
      question: 'Are the instructors certified?',
      answer: 'Yes, all of our instructors are certified and experienced in teaching languages online.'
    },
    {
      question: 'What languages do you offer?',
      answer: 'We offer a variety of languages including English, Spanish, Arabic, French, and more. Check our languages page for a full list.'
    },
    {
      question: 'How does the payment work?',
      answer: 'We offer a subscription-based payment model. You can choose a plan that fits your needs and budget.'
    }
  ];

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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 mb-6">{t.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
