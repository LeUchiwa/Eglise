import { useState, useEffect } from "react";
import { Baby, Heart, Search, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DownloadButton } from "../components/DownloadButton";
import { supabase } from "../../lib/supabaseClient"; // ← IMPORTANT

export function ChildrenBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAge, setSelectedAge] = useState("Tous");

  const ageGroups = ["Tous", "3-6 ans", "7-10 ans", "11-12 ans"];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      // ✅ Utilisation directe de Supabase
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'kids');

      if (error) throw error;

      if (data && data.length > 0) {
        // Transformer les données Supabase au format attendu par le composant
        const formattedBooks = data.map(item => ({
          id: item.id,
          title: item.title,
          ageRange: item.category || "3-7 ans", // Utilise category comme tranche d'âge
          category: item.author || "Histoires Bibliques", // Utilise author comme catégorie
          description: item.description || "",
          color: getColorForCategory(item.category || ""),
        }));
        setBooks(formattedBooks);
      } else {
        // Données par défaut si rien dans la base
        setBooks(defaultBooks);
      }
    } catch (error) {
      console.error("Error fetching children books:", error);
      setBooks(defaultBooks);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour assigner une couleur selon la catégorie
  const getColorForCategory = (category: string) => {
    const colors = [
      "bg-pink-100 text-pink-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-orange-100 text-orange-700",
      "bg-yellow-100 text-yellow-700",
      "bg-indigo-100 text-indigo-700",
      "bg-red-100 text-red-700",
      "bg-teal-100 text-teal-700",
      "bg-rose-100 text-rose-700",
      "bg-cyan-100 text-cyan-700",
      "bg-lime-100 text-lime-700",
    ];
    const index = (category.length + (category.charCodeAt(0) || 0)) % colors.length;
    return colors[index];
  };

  // Livres par défaut
  const defaultBooks = [
    {
      id: 1,
      title: "Histoires de la Bible pour Enfants",
      ageRange: "3-7 ans",
      category: "Histoires Bibliques",
      description: "Les plus belles histoires de la Bible racontées simplement pour les enfants",
      color: "bg-pink-100 text-pink-700",
    },
    {
      id: 2,
      title: "Noé et l'Arche",
      ageRange: "4-8 ans",
      category: "Ancien Testament",
      description: "L'histoire de Noé et du grand déluge avec de belles illustrations",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      title: "David et Goliath",
      ageRange: "5-10 ans",
      category: "Ancien Testament",
      description: "Le courage du jeune David face au géant Goliath",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      title: "Les Miracles de Jésus",
      ageRange: "6-12 ans",
      category: "Nouveau Testament",
      description: "Découvrez les miracles extraordinaires accomplis par Jésus",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 5,
      title: "Daniel et les Lions",
      ageRange: "5-9 ans",
      category: "Ancien Testament",
      description: "La foi de Daniel dans la fosse aux lions",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 6,
      title: "Mes Premières Prières",
      ageRange: "3-6 ans",
      category: "Prières",
      description: "Un livre de prières simples pour les tout-petits",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 7,
      title: "Histoires du Sabbat",
      ageRange: "4-10 ans",
      category: "Sabbat",
      description: "Histoires spéciales pour le jour du Sabbat",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 8,
      title: "Les Dix Commandements",
      ageRange: "7-12 ans",
      category: "Éducation",
      description: "Apprendre les commandements de Dieu de manière ludique",
      color: "bg-red-100 text-red-700",
    },
    {
      id: 9,
      title: "Joseph et ses Frères",
      ageRange: "6-11 ans",
      category: "Ancien Testament",
      description: "L'histoire de Joseph vendu par ses frères",
      color: "bg-teal-100 text-teal-700",
    },
    {
      id: 10,
      title: "La Naissance de Jésus",
      ageRange: "3-8 ans",
      category: "Nouveau Testament",
      description: "L'histoire merveilleuse de Noël pour les enfants",
      color: "bg-rose-100 text-rose-700",
    },
    {
      id: 11,
      title: "Moïse et la Mer Rouge",
      ageRange: "5-10 ans",
      category: "Ancien Testament",
      description: "Le miracle de la traversée de la Mer Rouge",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: 12,
      title: "Activités Bibliques",
      ageRange: "6-12 ans",
      category: "Activités",
      description: "Jeux, coloriages et activités sur les histoires bibliques",
      color: "bg-lime-100 text-lime-700",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (book.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = selectedAge === "Tous" || (book.ageRange || "").includes(selectedAge.split('-')[0]);
    return matchesSearch && matchesAge;
  });

  return (
    <div>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative px-8 py-12">
          <Baby className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Livres pour Enfants</h1>
          <p className="text-purple-100 text-lg">Histoires bibliques et ressources éducatives adaptées aux enfants</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un livre pour enfants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-gray-700 font-medium self-center mr-2">Âge :</span>
          {ageGroups.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAge === age
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <Loader2 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
            <p className="text-gray-500">Chargement des livres...</p>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className={`${book.color || 'bg-purple-100 text-purple-700'} px-6 py-8 text-center`}>
                <Heart className="w-12 h-12 mx-auto mb-3 opacity-80" />
                <h3 className="text-xl font-bold">{book.title}</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline">{book.ageRange}</Badge>
                  {book.category && <Badge variant="secondary">{book.category}</Badge>}
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{book.description}</p>
                
                <DownloadButton 
                  bookId={book.id.toString()}
                  type="book"
                  title={book.title}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-12">
          <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun livre trouvé pour votre recherche</p>
        </div>
      )}
    </div>
  );
}