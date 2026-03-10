import { useState, useEffect } from "react";
import { Bell, Calendar, MapPin, Clock, Users, Tag, Loader2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { supabase } from "../../lib/supabaseClient"; // ← IMPORTANT

export function Announcements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", "Jeunesse", "Étude Biblique", "Service", "Prière", "Famille", "Évangélisation", "Formation", "Musique"];

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      // ✅ Utilisation directe de Supabase
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'announcements')
        .order('date', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Transformer les données Supabase au format attendu par le composant
        const formattedAnnouncements = data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date || new Date().toISOString().split('T')[0],
          time: item.time || "19:00",
          location: item.location || "Salle principale",
          category: item.category || "Jeunesse",
          priority: item.priority || "normal",
          description: item.description || "",
          organizer: item.author || "Équipe Jeunesse",
          attendees: item.attendees || Math.floor(Math.random() * 50) + 20,
        }));
        setAnnouncements(formattedAnnouncements);
      } else {
        // Données par défaut si rien dans la base
        setAnnouncements(defaultAnnouncements);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements(defaultAnnouncements);
    } finally {
      setLoading(false);
    }
  };

  // Annonces par défaut
  const defaultAnnouncements = [
    {
      id: 1,
      title: "Culte de Jeunesse - Samedi prochain",
      date: "2026-02-22",
      time: "15:00",
      location: "Salle principale",
      category: "Jeunesse",
      priority: "high",
      description: "Joignez-vous à nous pour un culte spécial dédié aux jeunes avec musique contemporaine, témoignages inspirants et un message puissant. Amenez vos amis!",
      organizer: "Équipe Jeunesse",
      attendees: 45,
    },
    {
      id: 2,
      title: "Étude Biblique - Prophétie de Daniel",
      date: "2026-02-25",
      time: "19:00",
      location: "Salle d'étude",
      category: "Étude Biblique",
      priority: "normal",
      description: "Nouvelle série d'études approfondies sur le livre de Daniel. Découvrez les prophéties fascinantes et leur accomplissement. Tous les mercredis à 19h00.",
      organizer: "Pasteur Martin Dubois",
      attendees: 32,
    },
    {
      id: 3,
      title: "Journée Communautaire - Service de Bienfaisance",
      date: "2026-02-28",
      time: "09:00",
      location: "Centre communautaire",
      category: "Service",
      priority: "high",
      description: "Venez servir la communauté avec nous. Distribution de nourriture, vêtements et aide aux personnes dans le besoin. Bénévoles recherchés!",
      organizer: "Département des Services Communautaires",
      attendees: 28,
    },
    {
      id: 4,
      title: "Soirée de Prière",
      date: "2026-03-05",
      time: "20:00",
      location: "En ligne (Zoom)",
      category: "Prière",
      priority: "normal",
      description: "Moment de prière collective pour intercéder pour l'église, nos familles et notre nation. Connexion en ligne disponible.",
      organizer: "Département de la Prière",
      attendees: 52,
    },
    {
      id: 5,
      title: "Pique-nique Familial",
      date: "2026-03-08",
      time: "12:00",
      location: "Parc Municipal",
      category: "Famille",
      priority: "normal",
      description: "Après-midi de détente et de fraternité au parc. Apportez votre repas. Activités pour enfants prévues.",
      organizer: "Ministère de la Famille",
      attendees: 67,
    },
    {
      id: 6,
      title: "Semaine de Réveil Spirituel",
      date: "2026-03-10",
      time: "19:30",
      location: "Église",
      category: "Évangélisation",
      priority: "high",
      description: "Du 10 au 15 mars - Série de réunions d'évangélisation avec le Pasteur invité Jean-Pierre Moreau. Thème: 'Retour aux Sources'",
      organizer: "Comité d'Évangélisation",
      attendees: 95,
    },
    {
      id: 7,
      title: "Formation Leadership Jeunes",
      date: "2026-03-12",
      time: "10:00",
      location: "Salle de conférence",
      category: "Formation",
      priority: "normal",
      description: "Séminaire de formation pour les jeunes leaders. Thèmes: Communication, gestion d'équipe, et spiritualité.",
      organizer: "Département Jeunesse",
      attendees: 18,
    },
    {
      id: 8,
      title: "Concert de Louange",
      date: "2026-03-15",
      time: "16:00",
      location: "Salle principale",
      category: "Musique",
      priority: "normal",
      description: "Après-midi de louange et d'adoration avec la chorale et des groupes musicaux invités.",
      organizer: "Département Musical",
      attendees: 120,
    },
    {
      id: 9,
      title: "Réunion Administrative",
      date: "2026-03-18",
      time: "18:30",
      location: "Salle de réunion",
      category: "Administration",
      priority: "normal",
      description: "Assemblée générale mensuelle pour discuter des projets et du budget de l'église.",
      organizer: "Conseil d'Église",
      attendees: 25,
    },
  ];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "normal":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "Important";
      case "normal":
        return "Normal";
      default:
        return "Info";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
        <Bell className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-2">Annonces de l'Église</h1>
        <p className="text-indigo-100 text-lg">Restez informé des événements et activités</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Loader2 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Chargement des annonces...</p>
          </div>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="bg-indigo-100 rounded-lg p-3 flex-shrink-0">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {getPriorityLabel(announcement.priority)}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(announcement.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{announcement.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{announcement.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{announcement.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge variant="secondary">
                        <Tag className="w-3 h-3 mr-1" />
                        {announcement.category}
                      </Badge>
                      <span className="text-gray-600">
                        Organisé par: <span className="font-medium">{announcement.organizer}</span>
                      </span>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{announcement.attendees} intéressés</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredAnnouncements.length === 0 && !loading && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune annonce trouvée pour votre recherche</p>
        </div>
      )}
    </div>
  );
}