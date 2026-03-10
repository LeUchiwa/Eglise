import { useState, useEffect, useMemo, useCallback } from 'react';
import { Video, Search } from 'lucide-react';
import { VideoPlayer } from '../components/VideoPlayer';
import { supabase } from '../../lib/supabaseClient';

export function Videos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'videos')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transformer les données Supabase au format attendu par le composant
      const formattedVideos = data.map(item => {
        const videoId = extractYoutubeId(item.url);
        
        // Log pour déboguer
        console.log('Vidéo chargée:', { 
          title: item.title, 
          url: item.url, 
          videoId,
          author: item.author 
        });

        return {
          id: item.id,
          videoId: videoId || 'dQw4w9WgXcQ',
          title: item.title || 'Sans titre',
          category: item.category || 'Sermon',
          duration: item.duration || '45:30',
          views: item.views || Math.floor(Math.random() * 1000) + 500,
          date: item.date || new Date().toISOString().split('T')[0],
          pastor: item.author || 'Pasteur',
          platform: 'youtube',
          originalUrl: item.url
        };
      });

      setVideos(formattedVideos);
    } catch (error) {
      console.error("Erreur chargement vidéos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour extraire l'ID YouTube - maintenant memoïsée avec useCallback
  const extractYoutubeId = useCallback((url: string) => {
    if (!url) return null;
    
    console.log('Extraction ID de:', url);
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^#&?]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        console.log('ID extrait:', match[1]);
        return match[1];
      }
    }
    
    console.warn('Aucun ID trouvé dans:', url);
    return null;
  }, []);

  // Fonction pour valider l'ID YouTube
  const isValidYoutubeId = useCallback((id: string) => {
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id);
  }, []);

  // Données par défaut avec des IDs valides
  const defaultVideos = useMemo(() => [
    {
      id: '1',
      videoId: 'jNQXAC9IVRw',
      title: 'Série Prophétique - Les Signes des Temps',
      category: 'Prophétie',
      duration: '58:40',
      views: 1450,
      date: '2026-02-01',
      pastor: 'Pasteur Jean Moreau',
      platform: 'youtube'
    },
    {
      id: '2',
      videoId: 'dQw4w9WgXcQ',
      title: 'Sermon du Sabbat - La Foi qui Transforme',
      category: 'Sermon',
      duration: '45:30',
      views: 1250,
      date: '2026-02-15',
      pastor: 'Pasteur Martin Dubois',
      platform: 'youtube'
    },
    {
      id: '3',
      videoId: '3JZ_D3ELwOQ',
      title: 'Étude Biblique - Le Livre de Daniel',
      category: 'Étude Biblique',
      duration: '1:15:20',
      views: 890,
      date: '2026-02-12',
      pastor: 'Pasteur Sophie Laurent',
      platform: 'youtube'
    }
  ], []);

  // Videos à afficher - memoïsé
  const videosToShow = useMemo(() => 
    videos.length > 0 
      ? videos.filter(v => isValidYoutubeId(v.videoId))
      : defaultVideos,
    [videos, isValidYoutubeId, defaultVideos]
  );

  // Log du nombre de vidéos valides
  useEffect(() => {
    console.log(`${videosToShow.length} vidéos valides à afficher`);
    if (videos.length > 0) {
      const invalidCount = videos.filter(v => !isValidYoutubeId(v.videoId)).length;
      if (invalidCount > 0) {
        console.warn(`${invalidCount} vidéos ignorées (ID invalide)`);
      }
    }
  }, [videos, videosToShow, isValidYoutubeId]);

  // Catégories dynamiques - memoïsées
  const categories = useMemo(() => 
    ['Tous', ...new Set(videosToShow.map(v => v.category))],
    [videosToShow]
  );

  // Vidéos filtrées - memoïsées
  const filteredVideos = useMemo(() => 
    videosToShow.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           video.pastor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Tous' || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
    [videosToShow, searchQuery, selectedCategory]
  );

  // Handlers pour la lecture vidéo
  const handlePlayVideo = useCallback((videoId: string) => {
    setPlayingVideoId(videoId);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setPlayingVideoId(null);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Vidéos</h1>
        <p className="text-xl text-gray-600">Sermons, études et louanges pour nourrir votre foi</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher une vidéo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="space-y-3">
              <VideoPlayer
                videoId={video.videoId}
                title={video.title}
                platform={video.platform as 'youtube' | 'vimeo'}
                isPlaying={playingVideoId === video.id}
                onPlay={() => handlePlayVideo(video.id)}
                onClose={handleCloseVideo}
              />
              <div className="px-2">
                <h3 className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{video.pastor}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>{video.views} vues</span>
                  <span>{video.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucune vidéo trouvée</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-red-600 hover:text-red-700"
            >
              Effacer la recherche
            </button>
          )}
        </div>
      )}
    </div>
  );
}