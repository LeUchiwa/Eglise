import { useState, useEffect } from "react";
import { Users, Star, Mail, Phone, MapPin, Calendar, Loader2, Heart, Award, Sparkles, MessageCircle, Globe, Linkedin, Twitter } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export function Leadership() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'leadership');

      if (error) throw error;

      if (data && data.length > 0) {
        const formattedLeaders = data.map(item => ({
          id: item.id,
          name: item.title || item.name || "Responsable",
          role: item.role || "Membre du leadership",
          description: item.description || "",
          imageUrl: item.imageUrl || item.image || getDefaultImage(item.role),
          email: item.email || "",
          phone: item.phone || "",
          joinedDate: item.date || "2020",
          social: {
            twitter: item.twitter || "#",
            linkedin: item.linkedin || "#",
            facebook: item.facebook || "#"
          }
        }));
        setLeaders(formattedLeaders);
      } else {
        setLeaders(defaultLeaders);
      }
    } catch (error) {
      console.error("Error fetching leaders:", error);
      setLeaders(defaultLeaders);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (role: string) => {
    const images = [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    ];
    const index = (role?.length || 0) % images.length;
    return images[index];
  };

  const defaultLeaders = [
    {
      id: 1,
      name: "Pasteur Emmanuel Nkolo",
      role: "Pasteur Principal",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      description: "Serviteur de Dieu avec 15 ans d'expérience",
      email: "emmanuel.nkolo@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2010",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 2,
      name: "Ancien Pierre Essomba",
      role: "Premier Ancien",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      description: "Leader dévoué et conseiller spirituel",
      email: "pierre.essomba@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2015",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 3,
      name: "Diacre Marie Fotso",
      role: "Responsable des Diaconesses",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      description: "Au service de la communauté depuis 10 ans",
      email: "marie.fotso@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2016",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 4,
      name: "Frère David Onana",
      role: "Directeur École du Sabbat",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      description: "Passionné par l'enseignement biblique",
      email: "david.onana@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2018",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 5,
      name: "Sœur Grace Mbida",
      role: "Responsable Jeunesse",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      description: "Dynamique et inspirante pour les jeunes",
      email: "grace.mbida@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2019",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 6,
      name: "Frère Joseph Atangana",
      role: "Trésorier",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      description: "Gestionnaire rigoureux et transparent",
      email: "joseph.atangana@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2017",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 7,
      name: "Sœur Rachel Nguema",
      role: "Responsable des Ministères de la Femme",
      imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
      description: "Inspiratrice et guide pour les femmes de l'église",
      email: "rachel.nguema@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2020",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 8,
      name: "Ancien Samuel Mbele",
      role: "Secrétaire de l'Église",
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      description: "Organisateur méticuleux et dévoué",
      email: "samuel.mbele@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2014",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
    {
      id: 9,
      name: "Diacre Paul Ekani",
      role: "Responsable des Ministères Communautaires",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      description: "Serviteur au cœur de la communauté",
      email: "paul.ekani@eglise.org",
      phone: "+237 6XX XX XX XX",
      joinedDate: "2021",
      social: { twitter: "#", linkedin: "#", facebook: "#" }
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="relative">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Header avec effet de verre */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-16 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/20">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium tracking-wider">NOTRE ÉQUIPE DE DIRECTION</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Leadership Spirituel
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Des serviteurs de Dieu dévoués, guidant notre communauté avec sagesse, 
            amour et inspiration pour construire ensemble le royaume de Dieu.
          </p>
        </div>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, index) => {
          const isCentral = index === 4; // Le 5ème élément (Grace Mbida)
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={leader.id}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-700 
                ${isCentral 
                  ? 'lg:scale-110 z-20 shadow-2xl ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-50' 
                  : 'shadow-xl hover:shadow-2xl hover:-translate-y-3'
                }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Badge pour le leader central */}
              {isCentral && (
                <div className="absolute top-4 right-4 z-30">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-bounce flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                    <span>Leader du mois</span>
                    <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={leader.imageUrl}
                  alt={leader.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-1000 
                    ${isHovered || isCentral ? 'scale-110' : 'scale-100'}`}
                />
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 
                  ${isCentral 
                    ? 'from-blue-900/95 via-blue-800/70 to-transparent opacity-100' 
                    : 'from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100'
                  }`}>
                  
                  {/* Icônes sociales flottantes */}
                  <div className={`absolute bottom-6 left-0 right-0 flex justify-center space-x-4 transform transition-all duration-700 
                    ${isCentral || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {[
                      { Icon: Twitter, color: 'hover:bg-blue-400', link: leader.social?.twitter },
                      { Icon: Linkedin, color: 'hover:bg-blue-600', link: leader.social?.linkedin },
                      { Icon: MessageCircle, color: 'hover:bg-green-500', link: '#' },
                      { Icon: Mail, color: 'hover:bg-red-500', link: `mailto:${leader.email}` }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.link}
                        className={`w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center 
                          hover:scale-110 hover:rotate-12 transition-all duration-300 ${social.color}`}
                      >
                        <social.Icon className="w-5 h-5 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info Container */}
              <div className={`p-8 transition-all duration-500 ${
                isCentral 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' 
                  : 'bg-white text-gray-900'
              }`}>
                {/* Nom et rôle */}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isCentral ? 'text-white' : 'text-gray-900'
                  }`}>
                    {leader.name}
                  </h3>
                  <p className={`text-sm font-semibold inline-block px-4 py-1.5 rounded-full ${
                    isCentral 
                      ? 'bg-white/20 text-white' 
                      : 'bg-indigo-50 text-indigo-700'
                  }`}>
                    {leader.role}
                  </p>
                </div>

                {/* Description */}
                <p className={`text-sm text-center mb-6 leading-relaxed ${
                  isCentral ? 'text-blue-100' : 'text-gray-600'
                }`}>
                  {leader.description}
                </p>

                {/* Contact Info - Design moderne */}
                <div className="space-y-3">
                  {leader.email && (
                    <a 
                      href={`mailto:${leader.email}`} 
                      className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 
                        ${isCentral 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600'
                        } group`}
                    >
                      <Mail className={`w-5 h-5 ${
                        isCentral ? 'text-blue-200' : 'text-gray-400 group-hover:text-indigo-600'
                      }`} />
                      <span className="text-sm font-medium truncate">{leader.email}</span>
                    </a>
                  )}
                  
                  {leader.phone && (
                    <a 
                      href={`tel:${leader.phone}`} 
                      className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 
                        ${isCentral 
                          ? 'bg-white/10 hover:bg-white/20' 
                          : 'bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600'
                        } group`}
                    >
                      <Phone className={`w-5 h-5 ${
                        isCentral ? 'text-blue-200' : 'text-gray-400 group-hover:text-indigo-600'
                      }`} />
                      <span className="text-sm font-medium">{leader.phone}</span>
                    </a>
                  )}
                  
                  {leader.joinedDate && (
                    <div className={`flex items-center space-x-3 p-4 rounded-xl ${
                      isCentral ? 'bg-white/10' : 'bg-gray-50'
                    }`}>
                      <Calendar className={`w-5 h-5 ${
                        isCentral ? 'text-blue-200' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        isCentral ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        Membre depuis {leader.joinedDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Indicateur de position pour le leader central */}
                {isCentral && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-ping delay-300"></span>
                      <span className="w-2 h-2 bg-white/30 rounded-full animate-ping delay-700"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message d'encouragement amélioré */}
      <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-3xl p-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-8 shadow-xl">
            <Users className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Une équipe unie au service de Dieu
          </h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Notre équipe de direction est composée de serviteurs dévoués qui travaillent ensemble 
            pour guider notre communauté dans la foi et l'amour du Christ. Leur sagesse et leur 
            engagement sont des piliers essentiels pour notre croissance spirituelle.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Heart className="w-5 h-5" />
              <span>Nous contacter</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-indigo-200"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Prier avec nous</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}