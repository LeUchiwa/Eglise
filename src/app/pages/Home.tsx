import { Link } from "react-router-dom";
import {
  Book,
  BookOpen,
  Video,
  FileText,
  Baby,
  ArrowRight,
  Heart,
  Users,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Quote,
  Bell,
  Star,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
  Play,
  Youtube,
  Eye,
  Loader2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from '../components/VideoPlayer';
import { RecentVideos } from '../components/RecentVideos';
import { supabase } from "../../lib/supabaseClient";

const whiteFamily = "/assets/942ae9950fa2fa80e113675b36db7b2ae5d7a27f.png";

export function Home() {
  const [showHistory, setShowHistory] = useState(false);
  const [leadership, setLeadership] = useState<any[]>([]);
  const [loadingLeadership, setLoadingLeadership] = useState(true);
  
  const pioneerImage = whiteFamily;
  const chapelImage = "https://images.unsplash.com/photo-1692449748865-fb1852da0c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNodXJjaCUyMGNoYXBlbCUyMGV4dGVyaW9yfGVufDB8fHx8MTc3MjA5OTY5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Tableau des partenaires
  const partners = [
    { name: "Hope Media", logo: "/assets/hope.png", url: "https://hopechannel.fr", country: "FRANCE" },
    { name: "ADRA", logo: "/assets/adra.PNG", url: "https://adra.fr", country: "FRANCE" },
    { name: "Foyer Roi", logo: "/assets/foyeroi.PNG", url: "https://foyeroi.fr", country: "" },
    { name: "Liberté", logo: "/assets/liberte.PNG", url: "https://liberte.fr", country: "" },
    { name: "Vie & Santé", logo: "/assets/viesante.PNG", url: "https://viesante.fr", country: "" },
  ];

  const features = [
    {
      icon: Book,
      title: "Bible",
      description: "Accédez à la Bible complète avec outils de recherche et d'étude",
      path: "/bible",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      hoverColor: "group-hover:from-blue-600 group-hover:to-blue-800",
    },
    {
      icon: BookOpen,
      title: "Livres Éducatifs",
      description: "Collection de livres pour approfondir votre foi et connaissance",
      path: "/livres-educatifs",
      color: "bg-gradient-to-br from-green-500 to-green-700",
      hoverColor: "group-hover:from-green-600 group-hover:to-green-800",
    },
    {
      icon: Baby,
      title: "Livres pour Enfants",
      description: "Histoires bibliques et ressources adaptées aux jeunes",
      path: "/livres-enfants",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      hoverColor: "group-hover:from-purple-600 group-hover:to-purple-800",
    },
    {
      icon: Video,
      title: "Vidéos",
      description: "Sermons, études bibliques et contenus multimédias",
      path: "/videos",
      color: "bg-gradient-to-br from-red-500 to-red-700",
      hoverColor: "group-hover:from-red-600 group-hover:to-red-800",
    },
    {
      icon: FileText,
      title: "Magazines Adventistes",
      description: "Publications et revues de l'église",
      path: "/magazines",
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      hoverColor: "group-hover:from-orange-600 group-hover:to-orange-800",
    },
  ];

  const upcomingEvents = [
    {
      title: "Culte du Sabbat",
      date: "Samedi 28 Février",
      time: "9h30 - 12h00",
      location: "Ndogbong Zachman",
      type: "Culte",
    },
    {
      title: "École du Sabbat",
      date: "Samedi 28 Février",
      time: "9h30 - 10h30",
      location: "Salles de classe",
      type: "Étude",
    },
    {
      title: "Réunion de Prière",
      date: "Mercredi 3 Mars",
      time: "19h00 - 20h30",
      location: "Salle de prière",
      type: "Prière",
    },
  ];

  const testimonials = [
    {
      text: "Cette communauté m'a permis de grandir spirituellement et de trouver ma place dans le service de Dieu.",
      author: "Marie Dupont",
      role: "Membre depuis 2020",
    },
    {
      text: "Les ressources disponibles sur ce site sont une bénédiction pour ma famille. Merci pour votre dévouement !",
      author: "Jean-Paul Kamga",
      role: "Membre depuis 2018",
    },
    {
      text: "L'amour et le soutien que j'ai reçus ici ont transformé ma vie. Gloire à Dieu !",
      author: "Esther Mballa",
      role: "Membre depuis 2019",
    },
  ];

  // Données par défaut pour le leadership (si Supabase est vide)
  const defaultLeadership = [
    {
      name: "Pst. FOPAH Michel Williams",
      role: "Pasteur de la communauté",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      description: "Serviteur de Dieu dévoué",
    },
    {
      name: "Anc. FOKOU Patrick",
      role: "1er Ancien de la communauté",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      description: "Premier ancien, guide spirituel",
    },
    {
      name: "TCHOUMI Phalone",
      role: "Première diaconesse",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      description: "Au service des plus vulnérables",
    },
    {
      name: "Diacre Jean Essomba",
      role: "Responsable des diacres",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      description: "Serviteur dévoué au service de l'église",
    },
    {
      name: "Sœur Marie Nkoa",
      role: "Diaconesse",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      description: "Au service de la communauté",
    },
    {
      name: "Frère Pierre Mbarga",
      role: "Serviteur dévoué",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Au service de l'église",
    },
  ];

  // Charger les leaders depuis Supabase
  useEffect(() => {
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    setLoadingLeadership(true);
    try {
      console.log("🔍 Chargement des leaders...");
      
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'leadership')
        .order('created_at', { ascending: true });

      if (error) throw error;

      console.log("📦 Données reçues:", data);

      if (data && data.length > 0) {
        // Transformer les données Supabase
        const formattedLeaders = data.map(item => {
          // Vérifier tous les champs possibles pour l'image
          let imageUrl = 
            item.imageurl ||    
            item.imageUrl ||    
            item.image ||       
            item.url ||         
            item.photo ||
            item.picture ||
            item.avatar ||
            null;
          
          return {
            name: item.title || item.name || "Leader",
            role: item.category || item.role || "Membre",
            image: imageUrl || defaultLeadership[0].image,
            description: item.description || "Serviteur de Dieu dévoué",
          };
        });
        
        console.log("✅ Leaders formatés:", formattedLeaders);
        setLeadership(formattedLeaders);
      } else {
        console.log("⚠️ Aucune donnée, utilisation des données par défaut");
        setLeadership(defaultLeadership);
      }
    } catch (error) {
      console.error("❌ Erreur chargement leadership:", error);
      setLeadership(defaultLeadership);
    } finally {
      setLoadingLeadership(false);
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(leadership.length / 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (totalSlides > 0) {
      const interval = setInterval(() => setCurrentSlide((prev) => (prev + 1) % totalSlides), 5000);
      return () => clearInterval(interval);
    }
  }, [totalSlides]);

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-12 text-white animate-gradientShift">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${chapelImage})` }}></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white rounded-full animate-floatDelay"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-4 animate-slideDown">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">SDA NDOGBONG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp">Bienvenue dans notre communauté</h1>
          <p className="text-xl mb-8 text-blue-100 animate-slideUp" style={{ animationDelay: "0.1s" }}>
            Explorez nos ressources spirituelles et enrichissez votre foi.
          </p>
          <Link to="/contact" className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 hover:scale-105 transition-all duration-300 animate-bounce-in">
            <span>Nous Contacter</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Section Une communauté en mouvement */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 my-8 animate-slideUp">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
              Découvrir nos croyances
            </p>
            <p className="text-gray-600 text-lg mb-2">Unis pour avancer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une communauté en mouvement
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                L'Adventisme est un mouvement vivant et dynamique.
              </p>
              <p className="text-gray-700 mb-4">
                Nos croyances nous poussent à agir, apprendre et grandir constamment. 
                Nous sommes engagés activement dans la société pour aider, enseigner 
                et soigner à travers de nombreux projets humanitaires, écoles et hôpitaux.
              </p>
              <p className="text-gray-700 mb-6">
                Nous ne sommes que des humains avec nos défauts mais avons à cœur de 
                redistribuer l'amour que nous recevons de Christ. Notre foi est ouverte 
                sur le monde, transformant les vies et contribuant au bien-être de tous, 
                montrant que la véritable spiritualité passe par un engagement bienveillant 
                envers les autres.
              </p>
              <a
                href="https://adventist.news/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voir nos actions
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white min-h-[300px] flex items-center justify-center">
              <p className="text-center text-lg">Illustration de la communauté</p>
            </div>
          </div>

          {/* Logos partenaires avec carousel */}
          <div className="mt-16">
            <h3 className="text-center text-gray-600 text-sm uppercase tracking-wider mb-8">
              Nos partenaires
            </h3>
            
            <div className="relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-indigo-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-indigo-50 to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex space-x-12 animate-scroll">
                {[...partners, ...partners].map((partner, index) => (
                  <a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-center transition-transform hover:scale-110"
                  >
                    <div className="h-20 w-32 flex items-center justify-center bg-white rounded-lg shadow-sm p-2 hover:shadow-md transition-shadow">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const span = document.createElement('span');
                            span.className = 'font-bold text-gray-800 text-sm';
                            span.textContent = partner.name;
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>
                    {partner.country && <p className="text-xs text-gray-500 mt-2">{partner.country}</p>}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer de la section */}
          <div className="mt-12 text-center border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">
              Église adventiste du septième jour
            </p>
            <p className="text-xs text-gray-500 mt-1">
              CONFERENCE GENERALE
            </p>
          </div>
        </div>
      </div>

      {/* Section Erton Köhler */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 rounded-2xl p-8 md:p-12 my-8 text-white animate-slideUp">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src="/assets/Erton-Kohler.jpg"
                  alt="Pasteur Erton Köhler"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://www.adventist.org/wp-content/uploads/2020/04/Erton-Kohler-copy.jpg";
                  }}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute -top-4 -left-4 w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Aller Ensemble, Unis</h2>
                <blockquote className="text-lg md:text-xl text-indigo-100 italic mb-6 leading-relaxed">
                  « Nous ne pouvons pas accepter la croyance que, en période de polarisation, notre unité ne se produira qu'après un alignement politique. Nous ne pouvons pas permettre que les questions politiques soient plus fortes que le pouvoir de la Parole de Dieu. Notre défi n'est pas de choisir des camps, mais d'unir tous les camps. »
                </blockquote>
                <blockquote className="text-lg md:text-xl text-indigo-100 italic mb-6 leading-relaxed">
                  « Plus que jamais, nous devons prier pour l'unité, travailler pour l'unité et ouvrir nos cœurs pour avoir un esprit d'unité. Nous devons aller ensemble, unis. »
                </blockquote>
                <div className="mt-6">
                  <p className="text-xl font-semibold">Pasteur Erton Köhler</p>
                  <p className="text-indigo-300">Président de la Conférence Générale</p>
                  <p className="text-sm text-indigo-200 mt-2">Église Adventiste du Septième Jour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Histoire du Mouvement Adventiste */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-2xl p-8 md:p-12 shadow-xl border-2 border-amber-200 animate-slideUp">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">Notre Héritage</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Histoire du Mouvement Adventiste</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            Découvrez les racines de notre foi et l'héritage spirituel qui inspire notre communauté depuis plus de 180 ans
          </p>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span>{showHistory ? "Masquer" : "En savoir plus"}</span>
            <ChevronRight className={`w-5 h-5 transform transition-transform duration-300 ${showHistory ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* Contenu détaillé (affiché uniquement si showHistory est true) */}
        {showHistory && (
          <div className="mt-8 space-y-8 animate-slideUp">
            {/* Image des pionniers */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <img 
                src={pioneerImage} 
                alt="Pionniers Adventistes" 
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
              <p className="text-center text-sm text-gray-600 italic">
                Les pionniers du mouvement adventiste : Ellen G. White, James White, Joseph Bates et d'autres visionnaires qui ont posé les fondations de notre église
              </p>
            </div>

            {/* Grille d'histoire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Les Origines (1844)</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Le mouvement adventiste du septième jour trouve ses racines dans le grand réveil du début du 19e siècle. Après la Grande Déception de 1844, un groupe de croyants a cherché à comprendre les prophéties bibliques plus profondément, conduisant à la formation de notre église en 1863.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Les Pionniers</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ellen G. White, James White, Joseph Bates et d'autres pionniers ont consacré leur vie à l'étude biblique et au partage du message adventiste. Leur dévouement et leur vision continuent d'inspirer des millions de croyants dans le monde entier.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Expansion Mondiale</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  De ses humbles débuts en Amérique du Nord, l'Église Adventiste s'est étendue à tous les continents. Aujourd'hui, nous sommes présents dans plus de 200 pays, avec un réseau impressionnant d'écoles, d'hôpitaux et d'institutions humanitaires.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Notre Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Notre mission reste inchangée : partager l'Évangile éternel de Jésus-Christ, préparer les cœurs pour son retour imminent, et servir l'humanité avec compassion à travers l'éducation, la santé et l'action humanitaire.
                </p>
              </div>
            </div>

            {/* Statistiques mondiales */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">L'Église Adventiste Aujourd'hui</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-8 h-8 text-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-1">22M+</p>
                  <p className="text-sm text-blue-100">Membres dans le monde</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Globe className="w-8 h-8 text-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-1">200+</p>
                  <p className="text-sm text-blue-100">Pays présents</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-8 h-8 text-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-1">9000+</p>
                  <p className="text-sm text-blue-100">Écoles et universités</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-8 h-8 text-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold mb-1">800+</p>
                  <p className="text-sm text-blue-100">Hôpitaux et cliniques</p>
                </div>
              </div>
            </div>

            {/* Message inspirant */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
              <Quote className="w-10 h-10 text-blue-600 mb-3" />
              <p className="text-lg text-gray-800 italic mb-3">
                "Nous avons aussi la parole prophétique très ferme, à laquelle vous faites bien de prêter attention, comme à une lampe qui brille dans un lieu obscur, jusqu'à ce que le jour vienne à paraître et que l'étoile du matin se lève dans vos cœurs."
              </p>
              <p className="text-sm font-semibold text-blue-600">— 2 Pierre 1:19</p>
            </div>
          </div>
        )}
      </div>

      {/* Horaires de Culte */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 text-white animate-slideUp">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-8 h-8 text-green-200" />
          <h2 className="text-3xl font-bold">Horaires de Culte</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-green-200" />
              <h3 className="text-xl font-semibold">Culte du Sabbat</h3>
            </div>
            <p className="text-green-100 mb-2">Samedi: 9h30 - 13h00</p>
            <div className="flex items-center space-x-2 text-green-200 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Ndogbong Zachman</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-green-200" />
              <h3 className="text-xl font-semibold">Réunion de Prière</h3>
            </div>
            <p className="text-green-100 mb-2">Mercredi: 18h00 - 20h00</p>
            <div className="flex items-center space-x-2 text-green-200 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Ndogbong Zachman</span>
            </div>
          </div>
        </div>
      </div>

      {/* Événements à Venir */}
      <div className="animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Événements à Venir</h2>
          </div>
          <Link to="/annonces" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 hover:scale-105 transition-transform">
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center space-x-2 mb-3">
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{event.type}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slideUp">Nos Ressources</h2>
        <p className="text-gray-600 mb-8 animate-slideUp" style={{ animationDelay: "0.1s" }}>
          Découvrez toutes les ressources disponibles pour enrichir votre foi
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Explorer</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SECTION VIDÉOS RÉCENTES */}
      <RecentVideos />

{/* CARROUSEL DES SERVITEURS DÉVOUÉS (LIÉ À LA BASE DE DONNÉES) */}
<div className="animate-slideUp">
  <div className="text-center mb-10">
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full mb-4">
      <Heart className="w-5 h-5 text-blue-600" />
      <span className="text-blue-700 font-medium text-sm">Au service de l'église</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-3">Serviteurs Dévoués</h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
      Rencontrez ceux qui œuvrent quotidiennement pour le bien-être spirituel de notre communauté
    </p>
  </div>

  {loadingLeadership ? (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
    </div>
  ) : (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12">
      {/* Flèches de navigation */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
        disabled={leadership.length <= 3}
      >
        <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 group"
        disabled={leadership.length <= 3}
      >
        <ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
      </button>

      {/* Carrousel */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full flex justify-center gap-8 px-4">
              {leadership.slice(slideIndex * 3, slideIndex * 3 + 3).map((servant, idx) => {
                // Couleurs de fond alternatives pour chaque carte
                const cardColors = [
                  "bg-gradient-to-br from-white to-blue-50",
                  "bg-gradient-to-br from-white to-indigo-50",
                  "bg-gradient-to-br from-white to-purple-50"
                ];
                
                return (
                  <div 
                    key={servant.name || idx} 
                    className={`group w-72 flex-shrink-0 transform transition-all duration-500 hover:-translate-y-2 ${
                      idx === 1 ? "scale-105 z-10" : "scale-100"
                    }`}
                  >
                    {/* Carte rectangulaire colorée */}
                    <div className={`${cardColors[idx % 3]} rounded-3xl shadow-xl overflow-hidden border-2 ${
                      idx === 1 ? "border-blue-500 shadow-2xl" : "border-blue-200 hover:border-blue-400"
                    } transition-all duration-300`}>
                      
                      {/* Image dans un cercle */}
                      <div className="relative pt-8 pb-4 flex justify-center">
                        <div className="relative">
                          <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-white shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                            <img 
                              src={servant.image || servant.imageUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'} 
                              alt={servant.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop";
                              }}
                            />
                          </div>
                          {/* Badge de serviteur - MODIFIÉ ICI */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                            Communauté de Ndogbong
                          </div>
                        </div>
                      </div>

                      {/* Informations */}
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{servant.name}</h3>
                        <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-1 rounded-full mb-3">
                          <p className="text-sm font-semibold text-blue-800">{servant.role}</p>
                        </div>
                        <p className="text-gray-600 text-sm italic border-t border-blue-200 pt-3 mt-2">
                          "{servant.description}"
                        </p>
                        
                        {/* Icône de service */}
                        <div className="mt-4 flex justify-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Indicateurs de slide - affichés seulement si plus de 3 serviteurs */}
      {leadership.length > 3 && (
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? "w-12 h-3 bg-gradient-to-r from-blue-600 to-indigo-600" 
                  : "w-3 h-3 bg-blue-300 hover:bg-blue-400"
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Compteur total */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-blue-600 text-lg">{leadership.length}</span> serviteurs dévoués au service de l'église
        </p>
      </div>
    </div>
  )}
</div>

      {/* Témoignages */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 animate-slideUp">
        <div className="text-center mb-10">
          <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Témoignages</h2>
          <p className="text-gray-600">Ce que nos membres disent de leur expérience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-scaleIn" style={{ animationDelay: `${index * 0.15}s` }}>
              <Quote className="w-8 h-8 text-blue-600 mb-4" />
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-purple-100 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-purple-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Nous Contacter */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white shadow-xl animate-slideUp">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium">Restons en Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Nous Contacter</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner dans votre cheminement spirituel. N'hésitez pas à nous contacter pour toute question ou besoin de prière.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Email</h3>
            <p className="text-blue-100 text-center text-sm mb-3">Envoyez-nous un message</p>
            <a href="mailto:contact@sdandogbong.com" className="block text-center text-white font-medium hover:text-yellow-300 transition-colors">
              contact@sdandogbong.com
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Téléphone</h3>
            <p className="text-blue-100 text-center text-sm mb-3">Appelez-nous directement</p>
            <a href="tel:+237699123456" className="block text-center text-white font-medium hover:text-yellow-300 transition-colors">
              +237 697 988 479
            </a>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Adresse</h3>
            <p className="text-blue-100 text-center text-sm mb-3">Venez nous rendre visite</p>
            <p className="text-white text-center font-medium">Ndogbong, Douala<br />Cameroun</p>
          </div>
        </div>
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-center">Horaires d'Accueil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center md:text-left">
            <div>
              <p className="text-blue-100 mb-1">Mercredi - Vendredi</p>
              <p className="font-semibold">18h00 - 18h00</p>
            </div>
            <div>
              <p className="text-blue-100 mb-1">Samedi (Sabbat)</p>
              <p className="font-semibold">9h30 - 13h00</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-blue-100 italic">"Vous êtes toujours les bienvenus dans notre église. Que Dieu vous bénisse !"</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 animate-slideUp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-500 shadow-lg animate-float">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Notre Mission</h3>
            <p className="text-gray-600 text-sm">Partager l'amour du Christ et diffuser l'espérance dans notre communauté</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-500 shadow-lg animate-floatDelay">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Notre Communauté</h3>
            <p className="text-gray-600 text-sm">Une famille spirituelle unie dans la foi et le service</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-500 shadow-lg animate-float">
              <Book className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nos Ressources</h3>
            <p className="text-gray-600 text-sm">Des outils pour nourrir votre foi et approfondir votre connaissance</p>
          </div>
        </div>
      </div>
    </div>
  );
}