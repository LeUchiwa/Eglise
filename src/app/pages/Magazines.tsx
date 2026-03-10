import { useState, useEffect } from "react";
import { BookMarked, Calendar, Search, Loader2, FileText } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DownloadButton } from "../components/DownloadButton";
import { supabase } from "../../lib/supabaseClient"; // ← IMPORTANT

export function Magazines() {
  const [searchQuery, setSearchQuery] = useState("");
  const [magazines, setMagazines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");

  const years = ["2026", "2025", "2024"];

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    setLoading(true);
    try {
      // ✅ Utilisation directe de Supabase
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'magazines');

      if (error) throw error;

      if (data && data.length > 0) {
        // Transformer les données Supabase au format attendu par le composant
        const formattedMagazines = data.map(item => ({
          id: item.id,
          title: item.title,
          issue: item.date || "Février 2026", // Utilise date comme numéro
          category: item.category || "Mensuel",
          description: item.description || "",
          featured: item.content || "Article vedette", // Utilise content comme vedette
          downloads: item.dimes || Math.floor(Math.random() * 1000) + 500, // Valeur par défaut
          color: getColorForCategory(item.category || ""),
        }));
        setMagazines(formattedMagazines);
      } else {
        // Données par défaut si rien dans la base
        setMagazines(defaultMagazines);
      }
    } catch (error) {
      console.error("Error fetching magazines:", error);
      setMagazines(defaultMagazines);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour assigner une couleur selon la catégorie
  const getColorForCategory = (category: string) => {
    const colors: Record<string, string> = {
      "Mensuel": "bg-blue-600",
      "Trimestriel": "bg-purple-600",
      "Hebdomadaire": "bg-orange-600",
      "Bimestriel": "bg-indigo-600",
    };
    return colors[category] || "bg-orange-600";
  };

  // Magazines par défaut
  const defaultMagazines = [
    {
      id: 1,
      title: "Signes des Temps",
      issue: "Février 2026",
      category: "Mensuel",
      description: "Magazine d'évangélisation et d'actualité prophétique",
      featured: "Les Signes de l'Espérance",
      downloads: 1450,
      color: "bg-blue-600",
    },
    {
      id: 2,
      title: "Revue Adventiste",
      issue: "Février 2026",
      category: "Mensuel",
      description: "Magazine officiel de l'Église Adventiste",
      featured: "La Famille Chrétienne Aujourd'hui",
      downloads: 1280,
      color: "bg-green-600",
    },
    {
      id: 3,
      title: "Priorités",
      issue: "1er Trimestre 2026",
      category: "Trimestriel",
      description: "Études bibliques pour adultes",
      featured: "Le Livre des Actes",
      downloads: 2100,
      color: "bg-purple-600",
    },
    {
      id: 4,
      title: "Guide (Jeunesse)",
      issue: "Semaine du 16 Février",
      category: "Hebdomadaire",
      description: "Lectures quotidiennes pour les jeunes",
      featured: "Vivre pour Christ",
      downloads: 890,
      color: "bg-orange-600",
    },
    {
      id: 5,
      title: "Moniteur du Sabbat",
      issue: "Trimestre 1/2026",
      category: "Trimestriel",
      description: "Lectures pour l'École du Sabbat",
      featured: "Les Enseignements de Jésus",
      downloads: 1650,
      color: "bg-red-600",
    },
    {
      id: 6,
      title: "Ministère",
      issue: "Janvier-Février 2026",
      category: "Bimestriel",
      description: "Magazine pour pasteurs et responsables",
      featured: "Leadership Spirituel",
      downloads: 720,
      color: "bg-indigo-600",
    },
    {
      id: 7,
      title: "Vie et Santé",
      issue: "Février 2026",
      category: "Mensuel",
      description: "Magazine de santé naturelle",
      featured: "Nutrition et Prévention",
      downloads: 980,
      color: "bg-teal-600",
    },
    {
      id: 8,
      title: "Messagère (Femmes)",
      issue: "1er Trimestre 2026",
      category: "Trimestriel",
      description: "Magazine pour les femmes adventistes",
      featured: "La Femme Vertueuse",
      downloads: 840,
      color: "bg-pink-600",
    },
  ];

  const filteredMagazines = magazines.filter((magazine) => {
    const matchesSearch = magazine.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         magazine.featured.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && magazine.issue.includes(selectedYear);
  });

  return (
    <div>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-900 to-orange-700 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative px-8 py-12">
          <FileText className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Magazines Adventistes</h1>
          <p className="text-orange-100 text-lg">Publications officielles et magazines de l'Église Adventiste</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un magazine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-gray-700 font-medium">Année :</span>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedYear === year
                  ? "bg-orange-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Magazines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <Loader2 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Chargement des magazines...</p>
          </div>
        ) : (
          filteredMagazines.map((magazine) => (
            <div
              key={magazine.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Magazine Cover */}
              <div className={`${magazine.color} p-8 text-white`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <FileText className="w-12 h-12 mb-4 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-2">{magazine.title}</h3>
                  <p className="text-center text-white/90 text-sm">{magazine.issue}</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{magazine.category}</Badge>
                  <div className="flex items-center text-sm text-gray-500 space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedYear}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{magazine.description}</p>
                <p className="text-sm font-medium text-gray-900 mb-4">
                  <span className="text-gray-500">Article vedette:</span> {magazine.featured}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {magazine.downloads} téléchargements
                  </span>
                  <DownloadButton
                    bookId={magazine.id.toString()}
                    type="magazine"
                    title={magazine.title}
                    className="text-orange-600 hover:text-orange-700"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {filteredMagazines.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun magazine trouvé pour votre recherche</p>
        </div>
      )}
    </div>
  );
}