import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/cart/card";
import { QrCode, Star, BarChart3, Shield, Smartphone, Clock, ChevronRight, Sparkles, Menu, X, Languages } from "lucide-react";
import React, { useEffect, useState } from "react";

// Multi-language content
const translations = {
  en: {
    tagline: "Revolutionizing restaurant feedback",
    title: "Collect Customer Reviews",
    subtitle: "with Smart QR Codes",
    description: "Simple, powerful review collection system for restaurants. Generate QR codes, collect reviews, and manage your reputation all in one place.",
    startTrial: "Start Free Trial",
    login: "Login",
    featuresTitle: "Everything You Need",
    featuresSubtitle: "Powerful features designed specifically for restaurants",
    ctaTitle: "Ready to Start Collecting Reviews?",
    ctaSubtitle: "Join hundreds of restaurants already using ReviewFlow",
    getStarted: "Get Started Today",
    feature1Title: "QR Code Generation",
    feature1Desc: "Automatic QR code generation for each restaurant. Place them on tables, receipts, or anywhere customers can scan.",
    feature2Title: "Easy Review Collection",
    feature2Desc: "Mobile-optimized review forms that customers can fill out in seconds. No app downloads required.",
    feature3Title: "Analytics Dashboard",
    feature3Desc: "View all reviews, ratings, and analytics in one beautiful dashboard. Track your reputation over time.",
    feature4Title: "Secure & Private",
    feature4Desc: "Your data is secure and private. Only you can access your restaurant's reviews and analytics.",
    feature5Title: "Mobile Optimized",
    feature5Desc: "Perfect experience on all devices. Customers can easily leave reviews from their phones.",
    feature6Title: "Real-time Updates",
    feature6Desc: "See new reviews as they come in. Get notified instantly when customers leave feedback.",
  },
  fr: {
    tagline: "Révolutionner les retours des restaurants",
    title: "Collectez les Avis Clients",
    subtitle: "avec des Codes QR Intelligents",
    description: "Système simple et puissant de collecte d'avis pour restaurants. Générez des codes QR, collectez des avis et gérez votre réputation en un seul endroit.",
    startTrial: "Commencer l'Essai Gratuit",
    login: "Connexion",
    featuresTitle: "Tout Ce Dont Vous Avez Besoin",
    featuresSubtitle: "Des fonctionnalités puissantes conçues spécialement pour les restaurants",
    ctaTitle: "Prêt à Commencer à Collecter des Avis?",
    ctaSubtitle: "Rejoignez des centaines de restaurants utilisant déjà ReviewFlow",
    getStarted: "Commencez Aujourd'hui",
    feature1Title: "Génération de Codes QR",
    feature1Desc: "Génération automatique de codes QR pour chaque restaurant. Placez-les sur les tables, les reçus ou partout où les clients peuvent scanner.",
    feature2Title: "Collecte d'Avis Simplifiée",
    feature2Desc: "Formulaires d'avis optimisés pour mobile que les clients peuvent remplir en quelques secondes. Aucun téléchargement d'application requis.",
    feature3Title: "Tableau de Bord Analytique",
    feature3Desc: "Visualisez tous les avis, notations et analyses dans un tableau de bord élégant. Suivez votre réputation dans le temps.",
    feature4Title: "Sécurisé et Privé",
    feature4Desc: "Vos données sont sécurisées et privées. Vous seul pouvez accéder aux avis et analyses de votre restaurant.",
    feature5Title: "Optimisé Mobile",
    feature5Desc: "Expérience parfaite sur tous les appareils. Les clients peuvent facilement laisser des avis depuis leur téléphone.",
    feature6Title: "Mises à Jour en Temps Réel",
    feature6Desc: "Voyez les nouveaux avis au fur et à mesure. Soyez notifié instantanément lorsque les clients laissent des commentaires.",
  },
  ar: {
    tagline: "ثورة في ملاحظات المطاعم",
    title: "جمع تقييمات العملاء",
    subtitle: "برموز QR الذكية",
    description: "نظام بسيط وقوي لجمع التقييمات للمطاعم. أنشئ رموز QR، وجمع التقييمات، وإدارة سمعتك في مكان واحد.",
    startTrial: "ابدأ التجربة المجانية",
    login: "تسجيل الدخول",
    featuresTitle: "كل ما تحتاجه",
    featuresSubtitle: "ميزات قوية مصممة خصيصًا للمطاعم",
    ctaTitle: "هل أنت مستعد لبدء جمع التقييمات؟",
    ctaSubtitle: "انضم إلى المئات من المطاعم التي تستخدم بالفعل ReviewFlow",
    getStarted: "ابدأ اليوم",
    feature1Title: "إنشاء رموز QR",
    feature1Desc: "إنشاء تلقائي لرموز QR لكل مطعم. ضعها على الطاولات أو الإيصالات أو في أي مكان يمكن للعملاء المسح الضوئي.",
    feature2Title: "جمع التقييمات بسهولة",
    feature2Desc: "نماذج التقييم المحسنة للجوال التي يمكن للعملاء ملؤها في ثوانٍ. لا يلزم تنزيل التطبيقات.",
    feature3Title: "لوحة تحليل البيانات",
    feature3Desc: "عرض جميع التقييمات والتقديرات والتحليلات في لوحة تحليل جميلة. تتبع سمعتك بمرور الوقت.",
    feature4Title: "آمن وخاص",
    feature4Desc: "بياناتك آمنة وخاصة. فقط يمكنك الوصول إلى تقييمات وتحليلات مطعمك.",
    feature5Title: "محسن للجوال",
    feature5Desc: "تجربة مثالية على جميع الأجهزة. يمكن للعملاء بسهولة ترك التقييمات من هواتفهم.",
    feature6Title: "تحديثات فورية",
    feature6Desc: "شاهد التقييمات الجديدة فور وصولها. يتم إعلامك على الفور عندما يترك العملاء ملاحظات.",
  }
};

// Language context
const LanguageContext = React.createContext();

export default function Home() {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or browser preference, default to English
    const savedLang = localStorage.getItem('language');
    if (savedLang) return savedLang;
    
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr', 'ar'].includes(browserLang) ? browserLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Header />
      <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <section className="relative pt-28 pb-20 md:py-28 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/30 overflow-hidden">
      <div className="absolute top-10 left-0 md:left-10 w-52 h-52 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-0 md:right-10 w-64 h-64 md:w-96 md:h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-primary mb-4 md:mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            {t.tagline}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent animate-slide-up">
            {t.title}
            <span className="block mt-1 md:mt-2">{t.subtitle}</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-2 sm:px-0 animate-slide-up delay-150">
            {t.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in delay-300 px-2 sm:px-0">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 group relative overflow-hidden">
                <span className="relative z-10">{t.startTrial}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover scale-110 group-hover:scale-100 transition-transform duration-500"></div>
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 group">
                <span className="group-hover:text-primary transition-colors">{t.login}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const features = [
    {
      icon: QrCode,
      title: t.feature1Title,
      description: t.feature1Desc,
      color: "primary"
    },
    {
      icon: Star,
      title: t.feature2Title,
      description: t.feature2Desc,
      color: "success"
    },
    {
      icon: BarChart3,
      title: t.feature3Title,
      description: t.feature3Desc,
      color: "warning"
    },
    {
      icon: Shield,
      title: t.feature4Title,
      description: t.feature4Desc,
      color: "destructive"
    },
    {
      icon: Smartphone,
      title: t.feature5Title,
      description: t.feature5Desc,
      color: "primary"
    },
    {
      icon: Clock,
      title: t.feature6Title,
      description: t.feature6Desc,
      color: "success"
    }
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 animate-fade-in">{t.featuresTitle}</h2>
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in delay-100 max-w-2xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, color, index }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [index]);

  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive"
  };

  return (
    <Card className={`border-0 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} hover:-translate-y-2`}>
      <CardContent className="p-5 sm:p-6 md:p-8">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colorClasses[color]} rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary-hover relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 animate-fade-in">
            {t.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-primary-foreground/90 animate-fade-in delay-100">
            {t.ctaSubtitle}
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 group animate-pulse hover:animate-none"
            >
              {t.getStarted}
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-45 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isCustomerReview = location.pathname.startsWith('/review/');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLanguageMenuOpen(false);
  };

  if (isCustomerReview) {
    return null;
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl group">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl group-hover:rotate-12 transition-transform">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">ReviewFlow</span>
        </Link>

        {!isAuthPage && (
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              >
                <Languages className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </Button>
              
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-background border rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'fr' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'ar' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="group">
                  {translations[language].login}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/register">
                <Button className="group">
                  {translations[language].startTrial}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-t md:hidden py-4 px-6 shadow-lg">
            <nav className="flex flex-col gap-4">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  {translations[language].login}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-start">
                  {translations[language].startTrial}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}