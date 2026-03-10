import { useState, useEffect } from "react";
import { BookOpen, Search, Loader2, Star } from "lucide-react";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { DownloadButton } from "../components/DownloadButton";
import { supabase } from "../../lib/supabaseClient"; // ← IMPORTANT

export function EducationalBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const categories = ["Tous", "Prophétie", "Histoire Biblique", "Spiritualité", "Jeunesse", "Santé"];

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
        .eq('type', 'books');

      if (error) throw error;

      if (data && data.length > 0) {
        // Transformer les données Supabase au format attendu par le composant
        const formattedBooks = data.map(item => ({
          id: item.id,
          title: item.title,
          author: item.author || "Ellen G. White",
          category: item.category || "Spiritualité",
          description: item.description || "",
          rating: item.dimes ? 5 : 5, // par défaut
          downloads: item.offrandes || 0,
        }));
        setBooks(formattedBooks);
      } else {
        // Données par défaut si rien dans la base
        setBooks([
          {
            id: 1,
            title: "Le Grand Conflit",
            author: "Ellen G. White",
            category: "Prophétie",
            description: "L'histoire du conflit entre le bien et le mal à travers les âges",
            rating: 5,
            downloads: 1250,
          },
          {
            id: 2,
            title: "Jésus-Christ",
            author: "Ellen G. White",
            category: "Vie de Jésus",
            description: "La vie et le ministère de Jésus-Christ",
            rating: 5,
            downloads: 980,
          },
          {
            id: 3,
            title: "Vers Jésus",
            author: "Ellen G. White",
            category: "Spiritualité",
            description: "Un guide pour une vie chrétienne épanouie",
            rating: 5,
            downloads: 875,
          },
          {
            id: 4,
            title: "Patriarches et Prophètes",
            author: "Ellen G. White",
            category: "Histoire Biblique",
            description: "L'histoire de la Genèse à David et Salomon",
            rating: 5,
            downloads: 720,
          },
          {
            id: 5,
            title: "Prophètes et Rois",
            author: "Ellen G. White",
            category: "Histoire Biblique",
            description: "L'histoire des rois et prophètes d'Israël",
            rating: 5,
            downloads: 650,
          },
          {
            id: 6,
            title: "La Tragédie des Siècles",
            author: "Ellen G. White",
            category: "Prophétie",
            description: "Depuis la destruction de Jérusalem jusqu'à la fin des temps",
            rating: 5,
            downloads: 890,
          },
          {
            id: 7,
            title: "Messages à la Jeunesse",
            author: "Ellen G. White",
            category: "Jeunesse",
            description: "Conseils et encouragements pour les jeunes chrétiens",
            rating: 4,
            downloads: 540,
          },
          {
            id: 8,
            title: "Le Ministère de la Guérison",
            author: "Ellen G. White",
            category: "Santé",
            description: "Principes de santé physique et spirituelle",
            rating: 5,
            downloads: 620,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      // Données par défaut en cas d'erreur
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-green-900 to-green-700 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative px-8 py-12">
          <BookOpen className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Livres Éducatifs</h1>
          <p className="text-green-100 text-lg">Approfondissez votre foi avec notre collection de livres spirituels</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Rechercher un livre ou un auteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category}
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
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary">{book.category}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{book.rating}/5</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-3">par {book.author}</p>
              <p className="text-gray-700 text-sm mb-4">{book.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {book.downloads} téléchargements
                </span>
                <DownloadButton 
                  bookId={book.id.toString()} 
                  type="book"
                  title={book.title}
                  className="text-green-600 hover:text-green-700"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {filteredBooks.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun livre trouvé pour votre recherche</p>
        </div>
      )}
    </div>
  );
}