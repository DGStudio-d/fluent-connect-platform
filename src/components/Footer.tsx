
import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  language: string;
}

const Footer = ({ language }: FooterProps) => {
  const translations = {
    en: {
      about: 'About LearnLive',
      aboutText: 'We connect language learners with expert teachers through live, interactive sessions.',
      quickLinks: 'Quick Links',
      courses: 'Courses',
      teachers: 'Teachers',
      pricing: 'Pricing',
      support: 'Support',
      contact: 'Contact Info',
      followUs: 'Follow Us',
      allRights: 'All rights reserved.',
      phone: '+212 600 000 000',
      email: 'info@learnlive.com',
      address: 'Casablanca, Morocco'
    },
    ar: {
      about: 'حول LearnLive',
      aboutText: 'نربط متعلمي اللغات بالمعلمين الخبراء من خلال جلسات مباشرة وتفاعلية.',
      quickLinks: 'روابط سريعة',
      courses: 'الدورات',
      teachers: 'المعلمون',
      pricing: 'الأسعار',
      support: 'الدعم',
      contact: 'معلومات الاتصال',
      followUs: 'تابعنا',
      allRights: 'جميع الحقوق محفوظة.',
      phone: '+212 600 000 000',
      email: 'info@learnlive.com',
      address: 'الدار البيضاء، المغرب'
    },
    es: {
      about: 'Acerca de LearnLive',
      aboutText: 'Conectamos a los estudiantes de idiomas con profesores expertos a través de sesiones en vivo e interactivas.',
      quickLinks: 'Enlaces Rápidos',
      courses: 'Cursos',
      teachers: 'Profesores',
      pricing: 'Precios',
      support: 'Soporte',
      contact: 'Información de Contacto',
      followUs: 'Síguenos',
      allRights: 'Todos los derechos reservados.',
      phone: '+212 600 000 000',
      email: 'info@learnlive.com',
      address: 'Casablanca, Marruecos'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-emerald-400">LearnLive</span>
            </div>
            <h3 className="text-lg font-semibold">{t.about}</h3>
            <p className="text-gray-400 leading-relaxed">{t.aboutText}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{t.courses}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{t.teachers}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{t.pricing}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">{t.support}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">{t.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">{t.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">{t.address}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.followUs}</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            <div className="pt-4">
              <a 
                href="https://wa.me/212600000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 LearnLive. {t.allRights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
