import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Video,
  FileText,
  Baby,
  Megaphone,
  Building2,
  Edit2,
  Trash2,
  Plus,
  Save,
  X,
  Search,
  LogOut,
  Home,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Settings,
  Users,
  DollarSign,
  Calendar, // AJOUT : Import de l'icône Calendar
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../../lib/supabaseClient";

type ContentType = "books" | "kids" | "videos" | "magazines" | "announcements" | "construction" | "leadership" | "tithes" | "events";

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description?: string;
  content?: string;
  url?: string;
  imageUrl?: string;
  category?: string;
  author?: string;
  date?: string;
  name?: string;
  role?: string;
  image?: string;
  month?: string;
  year?: string;
  dimes?: number;
  offrandes?: number;
  total?: number;
  membres?: number;
  created_at: string;
  updated_at: string;
  // Champs spécifiques pour les événements
  endDate?: string;
  location?: string;
  attendance?: number;
  gallery?: string;
  videos?: string;
}

export function ContentDashboard() {
  const navigate = useNavigate();
  
  // Gestion sécurisée de l'authentification
  let user = null;
  let logout = () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    logout = auth.logout;
  } catch (error) {
    console.log("Mode dégradé - authentification non disponible");
  }
  
  const [activeSection, setActiveSection] = useState<ContentType>("books");
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const sections = [
    { id: "books" as ContentType, name: "Livres Éducatifs", icon: BookOpen, color: "from-blue-500 to-blue-700" },
    { id: "kids" as ContentType, name: "Livres Enfants", icon: Baby, color: "from-pink-500 to-pink-700" },
    { id: "videos" as ContentType, name: "Vidéos", icon: Video, color: "from-red-500 to-red-700" },
    { id: "magazines" as ContentType, name: "Magazines", icon: FileText, color: "from-green-500 to-green-700" },
    { id: "announcements" as ContentType, name: "Annonces", icon: Megaphone, color: "from-orange-500 to-orange-700" },
    { id: "construction" as ContentType, name: "Construction", icon: Building2, color: "from-teal-500 to-teal-700" },
    { id: "leadership" as ContentType, name: "Leadership", icon: Users, color: "from-indigo-500 to-indigo-700" },
    { id: "tithes" as ContentType, name: "Offrandes", icon: DollarSign, color: "from-yellow-500 to-yellow-700" },
    { id: "events" as ContentType, name: "Évènements", icon: Calendar, color: "from-purple-500 to-purple-700" }, // AJOUT
  ];

  useEffect(() => {
    loadContent();
  }, [activeSection]);

  const loadContent = async () => {
    setLoading(true);
    try {
      console.log(`🔄 Loading content for section: ${activeSection}`);
      
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', activeSection)
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log(`📦 Data received:`, data);
      setContents(data || []);
      
      if (data?.length === 0) {
        console.log("⚠️ No content found for this section");
      }
    } catch (error) {
      console.error("❌ Error loading content:", error);
      showMessage("error", "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreateNew = () => {
    setEditingItem({
      id: "",
      type: activeSection,
      title: "",
      description: "",
      content: "",
      url: "",
      imageUrl: "",
      category: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: "",
      role: "",
      image: "",
      month: "",
      year: "",
      dimes: 0,
      offrandes: 0,
      total: 0,
      membres: 0,
      // Champs spécifiques pour les événements
      endDate: "",
      location: "",
      attendance: 0,
      gallery: "",
      videos: ""
    });
    setIsEditing(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    
    if (!editingItem.title.trim()) {
      showMessage("error", "Le titre est obligatoire");
      return;
    }

    if (activeSection === "leadership" && !editingItem.role?.trim()) {
      showMessage("error", "Le rôle est obligatoire pour le Leadership");
      return;
    }

    if (activeSection === "tithes") {
      if (!editingItem.dimes || editingItem.dimes <= 0) {
        showMessage("error", "Le montant des dîmes est obligatoire et doit être supérieur à 0");
        return;
      }
      if (!editingItem.offrandes || editingItem.offrandes < 0) {
        showMessage("error", "Le montant des offrandes ne peut pas être négatif");
        return;
      }
      if (!editingItem.year?.trim()) {
        showMessage("error", "L'année est obligatoire");
        return;
      }
    }

    if (activeSection === "events") {
      if (!editingItem.date?.trim()) {
        showMessage("error", "La date de l'événement est obligatoire");
        return;
      }
      if (!editingItem.location?.trim()) {
        showMessage("error", "Le lieu est obligatoire");
        return;
      }
    }
    
    setLoading(true);
    try {
      const itemToSave = {
        ...editingItem,
        updated_at: new Date().toISOString()
      };

      // Supprimer l'id si c'est une création (pour que Supabase génère un UUID)
      if (!editingItem.id) {
        delete itemToSave.id;
      }

      console.log("💾 Saving content:", itemToSave);
      
      let result;
      if (editingItem.id) {
        // Mise à jour
        result = await supabase
          .from('content')
          .update(itemToSave)
          .eq('id', editingItem.id)
          .select();
      } else {
        // Création
        result = await supabase
          .from('content')
          .insert([itemToSave])
          .select();
      }

      const { data, error } = result;

      if (error) throw error;

      console.log("✅ Save successful:", data);
      
      setIsEditing(false);
      setEditingItem(null);
      showMessage("success", editingItem.id ? "✅ Modifié avec succès" : "✅ Créé avec succès");
      await loadContent();
    } catch (error) {
      console.error("❌ Error saving:", error);
      showMessage("error", "❌ Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showMessage("success", "Supprimé avec succès");
      await loadContent();
    } catch (error) {
      console.error("Error deleting:", error);
      showMessage("error", "Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
    navigate("/login");
  };

  const filteredContents = contents.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Accueil</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Gestion du Contenu
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/backend-dashboard")}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                title="Backend Dashboard - Contacts & Admins"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Backend</span>
              </button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
                </div>
                <span className="font-medium">{user?.name || user?.email || "Admin"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center space-x-3 animate-slideDown ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* Sections Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`relative p-6 rounded-2xl transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? "shadow-xl scale-105"
                    : "bg-white hover:shadow-lg hover:scale-102 border border-gray-200"
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-100`} />
                )}
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-sm font-semibold text-center ${
                      isActive ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {section.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Toolbar et Content List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                {currentSection && (
                  <>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentSection.color} flex items-center justify-center`}>
                      <currentSection.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{currentSection.name}</h2>
                      <p className="text-sm text-gray-500">{filteredContents.length} élément(s)</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleCreateNew}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r ${currentSection?.color} text-white hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Nouveau</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content List */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              </div>
            ) : filteredContents.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  {currentSection && <currentSection.icon className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucun contenu</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm
                    ? "Aucun résultat pour votre recherche"
                    : "Commencez par créer un nouveau contenu"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateNew}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r ${currentSection?.color} text-white hover:shadow-lg transition-all duration-300`}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Créer le premier contenu</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContents.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Preview */}
                    {item.imageUrl && (
                      <div className={
                        activeSection === "leadership" ? "aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden" : 
                        "aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
                      }>
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className={
                            activeSection === "leadership" ? "w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300" : 
                            "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          }
                        />
                      </div>
                    )}
                    
                    {/* Placeholder si pas d'image */}
                    {!item.imageUrl && (
                      <div className={
                        activeSection === "leadership" ? "aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" : 
                        "aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
                      }>
                        {currentSection && <currentSection.icon className="w-16 h-16 text-gray-400" />}
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Financial Data (Tithes only) */}
                      {activeSection === "tithes" && (
                        <div className="space-y-3 mb-4">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-purple-50 rounded-lg p-2">
                              <p className="text-xs text-purple-600 mb-1">💜 Dîmes</p>
                              <p className="text-sm font-bold text-purple-800">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(item.dimes || 0)}
                              </p>
                            </div>
                            <div className="bg-pink-50 rounded-lg p-2">
                              <p className="text-xs text-pink-600 mb-1">💝 Offrandes</p>
                              <p className="text-sm font-bold text-pink-800">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(item.offrandes || 0)}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-3 border border-yellow-200">
                            <p className="text-xs text-yellow-700 mb-1">💰 Total</p>
                            <p className="text-lg font-bold text-yellow-900">
                              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(item.total || 0)}
                            </p>
                          </div>
                          {item.membres && (
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span>👥 Membres contributeurs</span>
                              <span className="font-semibold">{item.membres}</span>
                            </div>
                          )}
                          {(item.month || item.year) && (
                            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                              {item.month && <span>📅 {item.month}</span>}
                              {item.year && <span className="font-semibold">{item.year}</span>}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Events Data */}
                      {activeSection === "events" && (
                        <div className="space-y-2 mb-4">
                          {item.date && (
                            <p className="text-xs text-purple-600 flex items-center space-x-1">
                              <span>📅</span>
                              <span>{new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                              {item.endDate && (
                                <span> - {new Date(item.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                              )}
                            </p>
                          )}
                          {item.location && (
                            <p className="text-xs text-gray-600 flex items-center space-x-1">
                              <span>📍</span>
                              <span>{item.location}</span>
                            </p>
                          )}
                          {item.attendance && (
                            <p className="text-xs text-gray-600 flex items-center space-x-1">
                              <span>👥</span>
                              <span>{item.attendance} participants</span>
                            </p>
                          )}
                        </div>
                      )}
                      
                      {activeSection === "leadership" && item.role && (
                        <p className="text-sm font-semibold text-indigo-600 mb-2 flex items-center space-x-1">
                          <span className="inline-block w-2 h-2 rounded-full bg-indigo-600"></span>
                          <span>{item.role}</span>
                        </p>
                      )}
                      
                      {(activeSection === "books" || activeSection === "kids") && item.author && (
                        <p className="text-xs text-gray-500 mb-2">📝 Par {item.author}</p>
                      )}
                      
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {item.category && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${currentSection?.color} text-white`}>
                            {item.category}
                          </span>
                        )}
                        
                        {item.date && activeSection !== "events" && (
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <span>📅</span>
                            <span>{new Date(item.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </span>
                        )}
                        
                        {item.url && (activeSection === "books" || activeSection === "kids" || activeSection === "magazines") && (
                          <span className="text-xs text-blue-600 flex items-center space-x-1">
                            <span>📄</span>
                            <span>PDF</span>
                          </span>
                        )}
                        
                        {item.url && activeSection === "videos" && (
                          <span className="text-xs text-red-600 flex items-center space-x-1">
                            <span>▶️</span>
                            <span>Vidéo</span>
                          </span>
                        )}

                        {(item.gallery || item.videos) && activeSection === "events" && (
                          <span className="text-xs text-purple-600 flex items-center space-x-1">
                            <span>📸</span>
                            <span>Médias</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'édition/création */}
      {isEditing && editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`sticky top-0 p-6 border-b border-gray-200 bg-gradient-to-r ${currentSection?.color} text-white`}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingItem.id ? "Modifier" : "Créer"} - {currentSection?.name}
                </h2>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingItem(null);
                  }}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {activeSection === "tithes" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Période (ex: Janvier 2026) *
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Janvier 2026, T1 2026, Année 2026"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mois
                      </label>
                      <select
                        value={editingItem.month || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, month: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="Jan">Janvier</option>
                        <option value="Fév">Février</option>
                        <option value="Mar">Mars</option>
                        <option value="Avr">Avril</option>
                        <option value="Mai">Mai</option>
                        <option value="Juin">Juin</option>
                        <option value="Juil">Juillet</option>
                        <option value="Août">Août</option>
                        <option value="Sep">Septembre</option>
                        <option value="Oct">Octobre</option>
                        <option value="Nov">Novembre</option>
                        <option value="Déc">Décembre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Année *
                      </label>
                      <input
                        type="text"
                        value={editingItem.year || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, year: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        💜 Dîmes (XAF) *
                      </label>
                      <input
                        type="number"
                        value={editingItem.dimes || ""}
                        onChange={(e) => {
                          const dimes = parseFloat(e.target.value) || 0;
                          const offrandes = editingItem.offrandes || 0;
                          setEditingItem({ ...editingItem, dimes, total: dimes + offrandes });
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="850000"
                        min="0"
                        step="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        💝 Offrandes (XAF) *
                      </label>
                      <input
                        type="number"
                        value={editingItem.offrandes || ""}
                        onChange={(e) => {
                          const offrandes = parseFloat(e.target.value) || 0;
                          const dimes = editingItem.dimes || 0;
                          setEditingItem({ ...editingItem, offrandes, total: dimes + offrandes });
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="420000"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💰 Total (XAF) - Calculé automatiquement
                    </label>
                    <div className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 font-bold text-lg">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(editingItem.total || 0)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      👥 Nombre de Membres Contributeurs
                    </label>
                    <input
                      type="number"
                      value={editingItem.membres || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, membres: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="145"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type de Période
                    </label>
                    <select
                      value={editingItem.category || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">-- Sélectionner --</option>
                      <option value="Mensuel">Mensuel</option>
                      <option value="Trimestriel">Trimestriel (T1, T2, T3, T4)</option>
                      <option value="Annuel">Annuel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes / Observations
                    </label>
                    <textarea
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Observations, événements spéciaux, notes importantes..."
                    />
                  </div>
                </>
              ) : activeSection === "leadership" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom Complet *
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Pasteur Emmanuel Nkolo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fonction / Rôle *
                    </label>
                    <input
                      type="text"
                      value={editingItem.role || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Pasteur Principal, Premier Ancien..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Brève description du parcours et du service..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL de la Photo *
                    </label>
                    <input
                      type="url"
                      value={editingItem.imageUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="https://...photo.jpg"
                    />
                    {editingItem.imageUrl && (
                      <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Aperçu de la photo :</p>
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <img
                            src={editingItem.imageUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : activeSection === "events" ? (
                // Formulaire pour les événements
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Titre de l'événement *
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Culte de Jeunesse, Campagne d'évangélisation..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date de début *
                      </label>
                      <input
                        type="date"
                        value={editingItem.date || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date de fin (optionnel)
                      </label>
                      <input
                        type="date"
                        value={editingItem.endDate || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lieu *
                    </label>
                    <input
                      type="text"
                      value={editingItem.location || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: Ndogbong Zachman, Salle de jeunesse..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Description détaillée de l'événement..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre de participants
                    </label>
                    <input
                      type="number"
                      value={editingItem.attendance || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, attendance: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Ex: 150"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={editingItem.category || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">-- Sélectionner une catégorie --</option>
                      <option value="Culte">Culte</option>
                      <option value="Jeunesse">Jeunesse</option>
                      <option value="Prière">Prière</option>
                      <option value="Évangélisation">Évangélisation</option>
                      <option value="Social">Social</option>
                      <option value="Formation">Formation</option>
                      <option value="Famille">Famille</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image de couverture
                    </label>
                    <input
                      type="url"
                      value={editingItem.imageUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="https://...image.jpg"
                    />
                    {editingItem.imageUrl && (
                      <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                        <img
                          src={editingItem.imageUrl}
                          alt="Preview"
                          className="w-full max-h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Galerie d'images (URLs séparées par des virgules)
                    </label>
                    <textarea
                      value={editingItem.gallery || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, gallery: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="https://...image1.jpg, https://...image2.jpg, https://...image3.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Vidéos (URLs séparées par des virgules)
                    </label>
                    <textarea
                      value={editingItem.videos || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, videos: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="https://youtube.com/..., https://youtube.com/..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Entrez le titre..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      placeholder="Brève description..."
                    />
                  </div>

                  {(activeSection === "bible" || activeSection === "announcements") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contenu
                      </label>
                      <textarea
                        value={editingItem.content || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none font-mono text-sm"
                        placeholder="Contenu complet..."
                      />
                    </div>
                  )}

                  {(activeSection === "videos" || activeSection === "books" || activeSection === "kids" || activeSection === "magazines") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {activeSection === "videos" ? "URL de la vidéo" : "URL du PDF"}
                      </label>
                      <input
                        type="url"
                        value={editingItem.url || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={activeSection === "videos" ? "https://youtube.com/..." : "https://...fichier.pdf"}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      URL de l'image (miniature)
                    </label>
                    <input
                      type="url"
                      value={editingItem.imageUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="https://...image.jpg"
                    />
                    {editingItem.imageUrl && (
                      <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                        <img
                          src={editingItem.imageUrl}
                          alt="Preview"
                          className="w-full max-h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Catégorie
                      </label>
                      <input
                        type="text"
                        value={editingItem.category || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Ex: Sermon, Étude..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Auteur
                      </label>
                      <input
                        type="text"
                        value={editingItem.author || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Nom de l'auteur"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editingItem.date || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                }}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={loading || !editingItem.title}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r ${currentSection?.color} text-white hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Enregistrer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}