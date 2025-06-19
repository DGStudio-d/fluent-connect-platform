
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppFloatProps {
  language: string;
}

const WhatsAppFloat = ({ language }: WhatsAppFloatProps) => {
  const translations = {
    en: {
      support: 'WhatsApp Support'
    },
    ar: {
      support: 'دعم واتساب'
    },
    es: {
      support: 'Soporte WhatsApp'
    }
  };

  const t = translations[language as keyof typeof translations];

  const whatsappMessage = encodeURIComponent("Hello! I need help with the language learning platform.");

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/212600000000?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">{t.support}</span>
      </Button>
    </div>
  );
};

export default WhatsAppFloat;
