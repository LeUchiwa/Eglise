import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';

export function RecentVideos() {
  const [recentVideos, setRecentVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    loadRecentVideos();
  }, []);

  const loadRecentVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'videos')
        .order('created_at', { ascending: false })
        .limit(3); // Seulement les 3 plus récentes

      if (error) throw error;

      // Transformer les données
      const formattedVideos = data.map(item => ({
        id: item.id,
        videoId: extractYoutubeId(item.url) || 'dQw4w9WgXcQ',
        title: item.title || 'Sans titre',
        category: item.category || 'Sermon',
        pastor: item.author || 'Pasteur',
        platform: 'youtube'
      }));

      setRecentVideos(formattedVideos);
    } catch (error) {
      console.error("Erreur chargement vidéos récentes:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url: string) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^#&?]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handlePlayVideo = (videoId: string) => {
    setPlayingVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setPlayingVideoId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (recentVideos.length === 0) {
    return null; // Ne rien afficher s'il n'y a pas de vidéos
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête de la section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vidéos récentes</h2>
          <p className="text-lg text-gray-600">
            Les derniers sermons et enseignements ajoutés
          </p>
        </div>

        {/* Grille des vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentVideos.map((video) => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <VideoPlayer
                videoId={video.videoId}
                title={video.title}
                platform={video.platform}
                isPlaying={playingVideoId === video.id}
                onPlay={() => handlePlayVideo(video.id)}
                onClose={handleCloseVideo}
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600">{video.pastor}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton voir toutes les vidéos */}
        <div className="text-center mt-12">
          <Link
            to="/videos"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Voir toutes les vidéos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}