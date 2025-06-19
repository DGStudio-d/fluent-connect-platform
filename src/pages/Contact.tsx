
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  language?: string;
}

const Contact = ({ language = 'en' }: ContactProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team for any questions or support',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Subject',
        category: 'Category',
        message: 'Message',
        categories: {
          general: 'General Inquiry',
          technical: 'Technical Support',
          billing: 'Billing & Payments',
          courses: 'Course Information',
          sessions: 'Live Sessions',
          other: 'Other'
        },
        send: 'Send Message',
        required: 'This field is required'
      },
      contact: {
        address: 'Our Address',
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours',
        whatsapp: 'WhatsApp Support'
      },
      info: {
        address: 'Casablanca, Morocco',
        phone: '+212 6XX XXX XXX',
        email: 'support@learnlive.com',
        hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
        whatsappText: 'Chat with us on WhatsApp for instant support'
      },
      success: 'Message sent successfully!',
      successDesc: 'We will get back to you within 24 hours.'
    },
    ar: {
      title: 'اتصل بنا',
      subtitle: 'تواصل مع فريقنا لأي أسئلة أو دعم',
      form: {
        name: 'الاسم الكامل',
        email: 'عنوان البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        category: 'الفئة',
        message: 'الرسالة',
        categories: {
          general: 'استفسار عام',
          technical: 'الدعم التقني',
          billing: 'الفواتير والمدفوعات',
          courses: 'معلومات الدورة',
          sessions: 'الجلسات المباشرة',
          other: 'أخرى'
        },
        send: 'إرسال الرسالة',
        required: 'هذا الحقل مطلوب'
      },
      contact: {
        address: 'عنواننا',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        hours: 'ساعات العمل',
        whatsapp: 'دعم واتساب'
      },
      info: {
        address: 'الدار البيضاء، المغرب',
        phone: '+212 6XX XXX XXX',
        email: 'support@learnlive.com',
        hours: 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً',
        whatsappText: 'تحدث معنا على واتساب للدعم الفوري'
      },
      success: 'تم إرسال الرسالة بنجاح!',
      successDesc: 'سنعود إليك خلال 24 ساعة.'
    },
    es: {
      title: 'Contáctanos',
      subtitle: 'Ponte en contacto con nuestro equipo para cualquier pregunta o soporte',
      form: {
        name: 'Nombre Completo',
        email: 'Dirección de Email',
        phone: 'Número de Teléfono',
        subject: 'Asunto',
        category: 'Categoría',
        message: 'Mensaje',
        categories: {
          general: 'Consulta General',
          technical: 'Soporte Técnico',
          billing: 'Facturación y Pagos',
          courses: 'Información de Cursos',
          sessions: 'Sesiones en Vivo',
          other: 'Otro'
        },
        send: 'Enviar Mensaje',
        required: 'Este campo es requerido'
      },
      contact: {
        address: 'Nuestra Dirección',
        phone: 'Teléfono',
        email: 'Email',
        hours: 'Horario de Atención',
        whatsapp: 'Soporte WhatsApp'
      },
      info: {
        address: 'Casablanca, Marruecos',
        phone: '+212 6XX XXX XXX',
        email: 'support@learnlive.com',
        hours: 'Lunes - Viernes: 9:00 AM - 6:00 PM',
        whatsappText: 'Chatea con nosotros en WhatsApp para soporte instantáneo'
      },
      success: '¡Mensaje enviado exitosamente!',
      successDesc: 'Te responderemos dentro de 24 horas.'
    }
  };

  const t = translations[language as keyof typeof translations];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t.success,
        description: t.successDesc,
      });
      setIsLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-600">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.form.name} *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.form.email} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.form.category} *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t.form.categories.general}</SelectItem>
                          <SelectItem value="technical">{t.form.categories.technical}</SelectItem>
                          <SelectItem value="billing">{t.form.categories.billing}</SelectItem>
                          <SelectItem value="courses">{t.form.categories.courses}</SelectItem>
                          <SelectItem value="sessions">{t.form.categories.sessions}</SelectItem>
                          <SelectItem value="other">{t.form.categories.other}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t.form.subject} *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.form.message} *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : t.form.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <span>{t.contact.address}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{t.info.address}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-emerald-600" />
                    <span>{t.contact.phone}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{t.info.phone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <span>{t.contact.email}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{t.info.email}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>{t.contact.hours}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{t.info.hours}</p>
                </CardContent>
              </Card>

              <Card className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-emerald-600">
                    <MessageCircle className="h-5 w-5" />
                    <span>{t.contact.whatsapp}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-4">{t.info.whatsappText}</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
