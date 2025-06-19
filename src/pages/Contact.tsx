import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'We would love to hear from you! Get in touch with us today.',
      email: 'Email Us',
      phone: 'Call Us',
      address: 'Our Location',
      formTitle: 'Send us a Message',
      formDescription: 'Fill out the form below to send us a message and we will get back to you as soon as possible.',
      name: 'Your Name',
      namePlaceholder: 'Enter your name',
      emailLabel: 'Your Email',
      emailPlaceholder: 'Enter your email',
      subject: 'Subject',
      subjectPlaceholder: 'Enter the subject',
      message: 'Message',
      messagePlaceholder: 'Enter your message',
      send: 'Send Message',
      success: 'Success!',
      successMessage: 'Your message has been sent successfully!',
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'يسعدنا أن نسمع منك! تواصل معنا اليوم.',
      email: 'راسلنا عبر البريد الإلكتروني',
      phone: 'اتصل بنا',
      address: 'موقعنا',
      formTitle: 'أرسل لنا رسالة',
      formDescription: 'املأ النموذج أدناه لإرسال رسالة إلينا وسنعاود الاتصال بك في أقرب وقت ممكن.',
      name: 'اسمك',
      namePlaceholder: 'أدخل اسمك',
      emailLabel: 'بريدك الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني',
      subject: 'الموضوع',
      subjectPlaceholder: 'أدخل الموضوع',
      message: 'الرسالة',
      messagePlaceholder: 'أدخل رسالتك',
      send: 'أرسل الرسالة',
      success: 'نجاح!',
      successMessage: 'تم إرسال رسالتك بنجاح!',
    },
    es: {
      title: 'Contáctanos',
      subtitle: '¡Nos encantaría saber de ti! Ponte en contacto con nosotros hoy mismo.',
      email: 'Envíanos un correo electrónico',
      phone: 'Llámanos',
      address: 'Nuestra ubicación',
      formTitle: 'Envíanos un mensaje',
      formDescription: 'Complete el formulario a continuación para enviarnos un mensaje y nos pondremos en contacto con usted lo antes posible.',
      name: 'Su nombre',
      namePlaceholder: 'Ingrese su nombre',
      emailLabel: 'Su correo electrónico',
      emailPlaceholder: 'Ingrese su correo electrónico',
      subject: 'Asunto',
      subjectPlaceholder: 'Ingrese el asunto',
      message: 'Mensaje',
      messagePlaceholder: 'Ingrese su mensaje',
      send: 'Enviar mensaje',
      success: '¡Éxito!',
      successMessage: '¡Su mensaje ha sido enviado con éxito!',
    }
  };

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.success,
      description: t.successMessage,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>{t.email}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">info@learnlive.com</p>
                  <p className="text-muted-foreground">support@learnlive.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>{t.phone}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground">+1 (555) 987-6543</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>{t.address}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Learning Street<br />
                    Education City, EC 12345<br />
                    United States
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
                  <CardDescription>{t.formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t.name} *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder={t.namePlaceholder}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.emailLabel} *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={t.emailPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">{t.subject} *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder={t.subjectPlaceholder}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">{t.message} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder={t.messagePlaceholder}
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Send className="h-4 w-4 mr-2" />
                      {t.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
