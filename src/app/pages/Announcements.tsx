import { useState, useEffect } from "react";
import { Bell, Calendar, MapPin, Clock, Users, Tag, Loader2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { supabase } from "../../lib/supabaseClient";

export function Announcements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'announcements')
        .order('date', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const formatted = data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date || new Date().toISOString().split('T')[0],
          time: item.time || "19:00",
          location: item.location || "Salle principale",
          category: item.category || "Jeunesse",
          priority: item.priority || "normal",
          description: item.description || "",
          content: item.content || "",
          image_url: item.image_url || null,
          organizer: item.author || "Équipe Jeunesse",
          attendees: item.attendees || 0,
        }));
        setAnnouncements(formatted);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fonction pour incrémenter le nombre d'intéressés (dynamique)
  const handleInterested = async (id: string, currentAttendees: number) => {
    const newCount = currentAttendees + 1;
    // Mise à jour optimiste de l'UI
    setAnnouncements(prev =>
      prev.map(a => a.id === id ? { ...a, attendees: newCount } : a)
    );
    // Sauvegarde en base
    const { error } = await supabase
      .from('content')
      .update({ attendees: newCount })
      .eq('id', id);
    if (error) {
      console.error("Erreur mise à jour intéressés:", error);
      // Revenir à l'ancienne valeur en cas d'erreur
      setAnnouncements(prev =>
        prev.map(a => a.id === id ? { ...a, attendees: currentAttendees } : a)
      );
    }
  };

  // Catégories dynamiques (issues des données)
  const uniqueCategories = ["Tous", ...new Set(announcements.map(a => a.category).filter(Boolean))];

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (announcement.description && announcement.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (announcement.content && announcement.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "Tous" || announcement.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "urgent": return "bg-orange-100 text-orange-700 border-orange-200";
      case "normal": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Important";
      case "urgent": return "Urgent";
      case "normal": return "Normal";
      default: return "Info";
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
          {uniqueCategories.map((category) => (
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
            <div key={announcement.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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

                    {/* Contenu long */}
                    {announcement.content && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-800 whitespace-pre-wrap">{announcement.content}</p>
                      </div>
                    )}

                    {/* Image */}
                    {announcement.image_url && (
                      <div className="mb-4">
                        <img src={announcement.image_url} alt={announcement.title} className="rounded-lg max-w-full h-auto" />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Badge variant="secondary">
                        <Tag className="w-3 h-3 mr-1" />
                        {announcement.category}
                      </Badge>
                      <span className="text-gray-600">
                        Organisé par: <span className="font-medium">{announcement.organizer}</span>
                      </span>
                      {/* ✅ Bouton cliquable pour les intéressés */}
                      <button
                        onClick={() => handleInterested(announcement.id, announcement.attendees)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        <span>{announcement.attendees} intéressés</span>
                      </button>
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