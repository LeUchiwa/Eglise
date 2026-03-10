import { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User,
  Image as ImageIcon,
  FileText,
  Users,
  MessageSquare,
  Home,
  Search as SearchIcon,
  Megaphone,
  BookOpen,
  Baby,
  Newspaper,
  Heart,
  Trash2,
  Plus,
  Download,
  Building2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { projectId } from "../../../utils/supabase/info";
import { useNavigate } from "react-router";
import { ItemsManager } from "../components/admin/ItemsManager";

interface ContentData {
  [key: string]: string;
}

interface Section {
  id: string;
  title: string;
  icon: any;
  fields: Field[];
}

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "file" | "date";
  placeholder?: string;
  help?: string;
  required?: boolean;
  accept?: string;
}

export function AdminPrivate() {
  const { user, logout, accessToken } = useAuth();
  const navigate = useNavigate();
  
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [hasChanges, setHasChanges] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  // Define sections and their fields
  const sections: Section[] = [
    {
      id: "home",
      title: "Page d'Accueil",
      icon: Home,
      fields: [
        { key: "home_site_name", label: "Nom du Site", type: "text", placeholder: "SDA NDOGBONG" },
        { key: "home_tagline", label: "Slogan", type: "text", placeholder: "À l'ombre du Christ" },
        { key: "home_hero_title", label: "Titre Principal", type: "text" },
        { key: "home_hero_subtitle", label: "Sous-titre", type: "textarea" },
        { key: "home_hero_button", label: "Texte du Bouton", type: "text" },
        { key: "home_mission_title", label: "Titre Mission", type: "text" },
        { key: "home_mission_description", label: "Description Mission", type: "textarea" },
        { key: "home_community_title", label: "Titre Communauté", type: "text" },
        { key: "home_community_description", label: "Description Communauté", type: "textarea" },
        { key: "home_resources_title", label: "Titre Ressources", type: "text" },
        { key: "home_resources_description", label: "Description Ressources", type: "textarea" },
      ],
    },
    {
      id: "worship",
      title: "Horaires de Culte",
      icon: FileText,
      fields: [
        { key: "home_worship_title", label: "Titre Section", type: "text" },
        { key: "home_worship_sabbath_title", label: "Titre Sabbat", type: "text" },
        { key: "home_worship_sabbath_time", label: "Horaire Sabbat", type: "text", placeholder: "Samedi: 9h30 - 12h00" },
        { key: "home_worship_sabbath_location", label: "Lieu Sabbat", type: "text" },
        { key: "home_worship_prayer_title", label: "Titre Prière", type: "text" },
        { key: "home_worship_prayer_time", label: "Horaire Prière", type: "text", placeholder: "Mercredi: 19h00 - 20h30" },
        { key: "home_worship_prayer_location", label: "Lieu Prière", type: "text" },
      ],
    },
    {
      id: "leadership",
      title: "Leadership",
      icon: Users,
      fields: [
        { key: "leadership_section_badge", label: "Badge", type: "text" },
        { key: "leadership_section_title", label: "Titre", type: "text" },
        { key: "leadership_section_subtitle", label: "Sous-titre", type: "textarea" },
        // Leader 1
        { key: "leadership_1_name", label: "Responsable 1 - Nom", type: "text" },
        { key: "leadership_1_role", label: "Responsable 1 - Rôle", type: "text" },
        { key: "leadership_1_description", label: "Responsable 1 - Description", type: "text" },
        { key: "leadership_1_image", label: "Responsable 1 - Photo", type: "image", help: "URL ou uploader une image" },
        // Leader 2
        { key: "leadership_2_name", label: "Responsable 2 - Nom", type: "text" },
        { key: "leadership_2_role", label: "Responsable 2 - Rôle", type: "text" },
        { key: "leadership_2_description", label: "Responsable 2 - Description", type: "text" },
        { key: "leadership_2_image", label: "Responsable 2 - Photo", type: "image" },
        // Leader 3
        { key: "leadership_3_name", label: "Responsable 3 - Nom", type: "text" },
        { key: "leadership_3_role", label: "Responsable 3 - Rôle", type: "text" },
        { key: "leadership_3_description", label: "Responsable 3 - Description", type: "text" },
        { key: "leadership_3_image", label: "Responsable 3 - Photo", type: "image" },
        // Leader 4
        { key: "leadership_4_name", label: "Responsable 4 - Nom", type: "text" },
        { key: "leadership_4_role", label: "Responsable 4 - Rôle", type: "text" },
        { key: "leadership_4_description", label: "Responsable 4 - Description", type: "text" },
        { key: "leadership_4_image", label: "Responsable 4 - Photo", type: "image" },
        // Leader 5
        { key: "leadership_5_name", label: "Responsable 5 - Nom", type: "text" },
        { key: "leadership_5_role", label: "Responsable 5 - Rôle", type: "text" },
        { key: "leadership_5_description", label: "Responsable 5 - Description", type: "text" },
        { key: "leadership_5_image", label: "Responsable 5 - Photo", type: "image" },
        // Leader 6
        { key: "leadership_6_name", label: "Responsable 6 - Nom", type: "text" },
        { key: "leadership_6_role", label: "Responsable 6 - Rôle", type: "text" },
        { key: "leadership_6_description", label: "Responsable 6 - Description", type: "text" },
        { key: "leadership_6_image", label: "Responsable 6 - Photo", type: "image" },
      ],
    },
    {
      id: "testimonials",
      title: "Témoignages",
      icon: MessageSquare,
      fields: [
        { key: "testimonial_1_text", label: "Témoignage 1 - Texte", type: "textarea" },
        { key: "testimonial_1_author", label: "Témoignage 1 - Auteur", type: "text" },
        { key: "testimonial_1_role", label: "Témoignage 1 - Rôle", type: "text" },
        { key: "testimonial_2_text", label: "Témoignage 2 - Texte", type: "textarea" },
        { key: "testimonial_2_author", label: "Témoignage 2 - Auteur", type: "text" },
        { key: "testimonial_2_role", label: "Témoignage 2 - Rôle", type: "text" },
        { key: "testimonial_3_text", label: "Témoignage 3 - Texte", type: "textarea" },
        { key: "testimonial_3_author", label: "Témoignage 3 - Auteur", type: "text" },
        { key: "testimonial_3_role", label: "Témoignage 3 - Rôle", type: "text" },
      ],
    },
    {
      id: "announcements",
      title: "Annonces",
      icon: Megaphone,
      fields: [],
    },
    {
      id: "educational_books",
      title: "Livres Éducatifs",
      icon: BookOpen,
      fields: [],
    },
    {
      id: "children_books",
      title: "Livres Enfants",
      icon: Baby,
      fields: [],
    },
    {
      id: "magazines",
      title: "Magazines",
      icon: Newspaper,
      fields: [],
    },
    {
      id: "support",
      title: "Soutien",
      icon: Heart,
      fields: [
        { key: "support_title", label: "Titre Principal", type: "text" },
        { key: "support_subtitle", label: "Sous-titre", type: "textarea" },
        { key: "support_description", label: "Description", type: "textarea" },
        { key: "support_bank_name", label: "Nom de la Banque", type: "text" },
        { key: "support_account_name", label: "Nom du Compte", type: "text" },
        { key: "support_account_number", label: "Numéro de Compte", type: "text" },
        { key: "support_iban", label: "IBAN", type: "text" },
        { key: "support_swift", label: "Code SWIFT/BIC", type: "text" },
        { key: "support_mobile_money", label: "Mobile Money", type: "text" },
        { key: "support_paypal", label: "PayPal", type: "text" },
        { key: "support_thank_you", label: "Message de remerciement", type: "textarea" },
      ],
    },
    {
      id: "seo",
      title: "SEO & Référencement",
      icon: SearchIcon,
      fields: [
        // Home SEO
        { key: "seo_home_title", label: "Accueil - Titre (50-60 car.)", type: "text" },
        { key: "seo_home_description", label: "Accueil - Description (150-160 car.)", type: "textarea" },
        { key: "seo_home_keywords", label: "Accueil - Mots-clés", type: "text", placeholder: "mot1, mot2, mot3" },
        // Bible SEO
        { key: "seo_bible_title", label: "Bible - Titre", type: "text" },
        { key: "seo_bible_description", label: "Bible - Description", type: "textarea" },
        { key: "seo_bible_keywords", label: "Bible - Mots-clés", type: "text" },
        // Educational SEO
        { key: "seo_educational_title", label: "Livres Éducatifs - Titre", type: "text" },
        { key: "seo_educational_description", label: "Livres Éducatifs - Description", type: "textarea" },
        { key: "seo_educational_keywords", label: "Livres Éducatifs - Mots-clés", type: "text" },
        // Children SEO
        { key: "seo_children_title", label: "Livres Enfants - Titre", type: "text" },
        { key: "seo_children_description", label: "Livres Enfants - Description", type: "textarea" },
        { key: "seo_children_keywords", label: "Livres Enfants - Mots-clés", type: "text" },
        // Videos SEO
        { key: "seo_videos_title", label: "Vidéos - Titre", type: "text" },
        { key: "seo_videos_description", label: "Vidéos - Description", type: "textarea" },
        { key: "seo_videos_keywords", label: "Vidéos - Mots-clés", type: "text" },
        // Magazines SEO
        { key: "seo_magazines_title", label: "Magazines - Titre", type: "text" },
        { key: "seo_magazines_description", label: "Magazines - Description", type: "textarea" },
        { key: "seo_magazines_keywords", label: "Magazines - Mots-clés", type: "text" },
        // Announcements SEO
        { key: "seo_announcements_title", label: "Annonces - Titre", type: "text" },
        { key: "seo_announcements_description", label: "Annonces - Description", type: "textarea" },
        { key: "seo_announcements_keywords", label: "Annonces - Mots-clés", type: "text" },
        // Support SEO
        { key: "seo_support_title", label: "Soutien - Titre", type: "text" },
        { key: "seo_support_description", label: "Soutien - Description", type: "textarea" },
        { key: "seo_support_keywords", label: "Soutien - Mots-clés", type: "text" },
      ],
    },
  ];

  useEffect(() => {
    // Load content immediately without waiting for accessToken (GET is public)
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    setMessage(null);
    try {
      console.log("Loading content from API...", API_BASE);
      console.log("Access token available:", !!accessToken);
      
      // Don't send Authorization header for public GET request
      const response = await fetch(`${API_BASE}/content`);

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response not OK:", errorText);
        throw new Error(`Erreur HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log("Data received:", data);
      
      if (data.success) {
        if (data.data && data.data.length > 0) {
          const contentMap: ContentData = {};
          data.data.forEach((item: { key: string; value: string }) => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
          console.log("Content loaded successfully:", Object.keys(contentMap).length, "items");
        } else {
          // Base de données vide, initialiser le contenu par défaut
          console.log("Database is empty, initializing default content...");
          await initializeDefaultContent();
        }
      } else {
        throw new Error(data.error || "Erreur inconnue");
      }
    } catch (error: any) {
      console.error("Error loading content:", error);
      setMessage({ 
        type: "error", 
        text: `Erreur de chargement: ${error.message}. Vérifiez la console pour plus de détails.` 
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultContent = async () => {
    try {
      console.log("Initializing default content...");
      const response = await fetch(`${API_BASE}/content/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Default content initialized successfully");
        setMessage({ type: "success", text: "Contenu initialisé avec succès!" });
        
        // Recharger manuellement sans rappeler initializeDefaultContent
        // Don't send Authorization header for public GET request
        const reloadResponse = await fetch(`${API_BASE}/content`);
        
        if (reloadResponse.ok) {
          const reloadData = await reloadResponse.json();
          if (reloadData.success && reloadData.data && reloadData.data.length > 0) {
            const contentMap: ContentData = {};
            reloadData.data.forEach((item: { key: string; value: string }) => {
              contentMap[item.key] = item.value;
            });
            setContent(contentMap);
            console.log("Content reloaded successfully after initialization");
          }
        }
      } else {
        throw new Error(data.error || "Initialization failed");
      }
    } catch (error: any) {
      console.error("Error initializing content:", error);
      setMessage({ type: "error", text: `Erreur d'initialisation: ${error.message}` });
      // En cas d'erreur, mettre un contenu vide pour permettre l'utilisation
      setContent({});
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleImageUpload = async (key: string, file: File) => {
    if (!file) return;

    setUploading(key);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE}/storage/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        handleChange(key, data.url);
        showMessage("success", "Image uploadée avec succès !");
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      showMessage("error", `Erreur upload: ${error.message}`);
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get active section fields
      const activeFields = sections.find(s => s.id === activeSection)?.fields || [];
      const items = activeFields
        .map(field => ({
          key: field.key,
          value: content[field.key] || "",
        }))
        .filter(item => item.value !== undefined);

      const response = await fetch(`${API_BASE}/content/batch`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.success) {
        showMessage("success", `✅ ${data.count} éléments sauvegardés avec succès !`);
        setHasChanges(false);
      } else {
        throw new Error(data.error || "Save failed");
      }
    } catch (error: any) {
      console.error("Save error:", error);
      showMessage("error", `Erreur: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const renderField = (field: Field) => {
    const value = content[field.key] || "";

    if (field.type === "image") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.help && (
            <p className="text-xs text-gray-500">{field.help}</p>
          )}
          
          {/* Image Preview */}
          {value && (
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
              <img 
                src={value} 
                alt={field.label}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Upload Button */}
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {uploading === field.key ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Upload...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Uploader</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(field.key, file);
                }}
                disabled={uploading === field.key}
              />
            </label>
          </div>

          {/* URL Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder || "URL de l'image"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <textarea
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }

    if (field.type === "date") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="date"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      );
    }

    if (field.type === "file") {
      return (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="file"
            accept={field.accept}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(field.key, file);
            }}
            disabled={uploading === field.key}
          />
          <div className="flex space-x-2">
            <label className="cursor-pointer">
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {uploading === field.key ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Upload...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Uploader</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept={field.accept}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(field.key, file);
                }}
                disabled={uploading === field.key}
              />
            </label>
          </div>

          {/* URL Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(field.key, e.target.value)}
            placeholder={field.placeholder || "URL du fichier"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      );
    }

    return (
      <div key={field.key} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Non authentifié</h2>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Aller à la page de connexion
          </button>
        </div>
      </div>
    );
  }

  const activeSectonData = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
              <p className="text-sm text-gray-600">
                Connecté en tant que <span className="font-medium">{user?.email}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/admin-construction")}
                className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                <span className="hidden md:inline">Photos Construction</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
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
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
              <button
                onClick={() => navigate("/super-admin")}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Gestion des Admins</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div
            className={`flex items-center space-x-3 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <h3 className="font-semibold">Sections</h3>
              </div>
              <nav className="p-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeSectonData?.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Modifiez les contenus de cette section
                </p>
              </div>

              <div className="space-y-6">
                {activeSectonData?.fields.length === 0 ? (
                  // Render Items Manager for dynamic sections
                  <>
                    {activeSection === "announcements" && (
                      <ItemsManager
                        title="Gestion des Annonces"
                        storageKey="announcements_list"
                        fields={[
                          { key: "title", label: "Titre", type: "text", required: true },
                          { key: "date", label: "Date", type: "date", required: true },
                          { key: "description", label: "Description", type: "textarea", required: true },
                          { key: "image", label: "Image", type: "image" },
                        ]}
                        apiBase={API_BASE}
                        accessToken={accessToken!}
                      />
                    )}
                    {activeSection === "educational_books" && (
                      <ItemsManager
                        title="Gestion des Livres Éducatifs"
                        storageKey="educational_books_list"
                        fields={[
                          { key: "title", label: "Titre du Livre", type: "text", required: true },
                          { key: "author", label: "Auteur", type: "text", required: true },
                          { key: "description", label: "Description", type: "textarea", required: true },
                          { key: "cover", label: "Couverture", type: "image", required: true },
                          { key: "file", label: "Fichier PDF", type: "file", accept: ".pdf", required: true },
                          { key: "pages", label: "Nombre de pages", type: "text" },
                          { key: "year", label: "Année", type: "text" },
                        ]}
                        apiBase={API_BASE}
                        accessToken={accessToken!}
                      />
                    )}
                    {activeSection === "children_books" && (
                      <ItemsManager
                        title="Gestion des Livres Enfants"
                        storageKey="children_books_list"
                        fields={[
                          { key: "title", label: "Titre du Livre", type: "text", required: true },
                          { key: "author", label: "Auteur", type: "text", required: true },
                          { key: "description", label: "Description", type: "textarea", required: true },
                          { key: "cover", label: "Couverture", type: "image", required: true },
                          { key: "file", label: "Fichier PDF", type: "file", accept: ".pdf", required: true },
                          { key: "age_range", label: "Tranche d'âge", type: "text", placeholder: "3-6 ans" },
                        ]}
                        apiBase={API_BASE}
                        accessToken={accessToken!}
                      />
                    )}
                    {activeSection === "magazines" && (
                      <ItemsManager
                        title="Gestion des Magazines"
                        storageKey="magazines_list"
                        fields={[
                          { key: "title", label: "Titre du Magazine", type: "text", required: true },
                          { key: "issue", label: "Numéro", type: "text", required: true },
                          { key: "date", label: "Date de publication", type: "date", required: true },
                          { key: "description", label: "Description", type: "textarea", required: true },
                          { key: "cover", label: "Couverture", type: "image", required: true },
                          { key: "file", label: "Fichier PDF", type: "file", accept: ".pdf", required: true },
                        ]}
                        apiBase={API_BASE}
                        accessToken={accessToken!}
                      />
                    )}
                  </>
                ) : (
                  // Render form fields for static sections
                  activeSectonData?.fields.map(renderField)
                )}
              </div>

              {/* Save Button (sticky) */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Enregistrement en cours...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Enregistrer les modifications</span>
                    </>
                  )}
                </button>
                {hasChanges && (
                  <p className="text-center text-sm text-amber-600 mt-2">
                    Vous avez des modifications non sauvegardées
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}