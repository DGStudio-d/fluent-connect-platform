
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Upload, MessageCircle, CreditCard, Building } from 'lucide-react';

interface PaymentSectionProps {
  language: string;
}

const PaymentSection = ({ language }: PaymentSectionProps) => {
  const translations = {
    en: {
      title: 'Easy Payment Process',
      subtitle: 'Simple and secure payment methods',
      step1: 'Choose Your Course',
      step2: 'Transfer Payment',
      step3: 'Upload Proof',
      step4: 'Start Learning',
      cihBank: 'CIH Bank',
      baridBank: 'Barid Bank',
      accountNumber: 'Account Number',
      rib: 'RIB',
      uploadProof: 'Upload Payment Proof',
      whatsappConfirm: 'Confirm via WhatsApp',
      manualProcessing: 'Payments are processed manually. Please confirm your transfer via WhatsApp.',
      contactSupport: 'Contact Support'
    },
    ar: {
      title: 'عملية دفع سهلة',
      subtitle: 'طرق دفع بسيطة وآمنة',
      step1: 'اختر دورتك',
      step2: 'حول الدفعة',
      step3: 'ارفع الإثبات',
      step4: 'ابدأ التعلم',
      cihBank: 'بنك CIH',
      baridBank: 'بنك البريد',
      accountNumber: 'رقم الحساب',
      rib: 'الـ RIB',
      uploadProof: 'ارفع إثبات الدفع',
      whatsappConfirm: 'أكد عبر واتساب',
      manualProcessing: 'يتم معالجة المدفوعات يدوياً. يرجى تأكيد التحويل عبر واتساب.',
      contactSupport: 'اتصل بالدعم'
    },
    es: {
      title: 'Proceso de Pago Fácil',
      subtitle: 'Métodos de pago simples y seguros',
      step1: 'Elige tu Curso',
      step2: 'Transfiere el Pago',
      step3: 'Sube la Prueba',
      step4: 'Comienza a Aprender',
      cihBank: 'Banco CIH',
      baridBank: 'Banco Barid',
      accountNumber: 'Número de Cuenta',
      rib: 'RIB',
      uploadProof: 'Subir Prueba de Pago',
      whatsappConfirm: 'Confirmar por WhatsApp',
      manualProcessing: 'Los pagos se procesan manualmente. Por favor confirma tu transferencia por WhatsApp.',
      contactSupport: 'Contactar Soporte'
    }
  };

  const t = translations[language as keyof typeof translations];

  const whatsappMessage = encodeURIComponent("Hello, I have transferred the payment for the course");

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Payment Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{step}</h3>
            </div>
          ))}
        </div>

        {/* Bank Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="bg-emerald-50 dark:bg-emerald-950">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
                <Building className="h-6 w-6 text-emerald-600" />
                <span>{t.cihBank}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.accountNumber}</p>
                  <p className="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">230 788 213 45678901</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.rib}</p>
                  <p className="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">230 788 213 45678901 23</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="bg-emerald-50 dark:bg-emerald-950">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
                <CreditCard className="h-6 w-6 text-emerald-600" />
                <span>{t.baridBank}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.accountNumber}</p>
                  <p className="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">014 550 089 12345678</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.rib}</p>
                  <p className="text-lg font-mono font-semibold text-gray-800 dark:text-gray-200">014 550 089 12345678 90</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Actions */}
        <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                {t.manualProcessing}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                <Upload className="mr-2 h-4 w-4" />
                {t.uploadProof}
              </Button>
              
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open(`https://wa.me/212600000000?text=${whatsappMessage}`, '_blank')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {t.whatsappConfirm}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PaymentSection;
