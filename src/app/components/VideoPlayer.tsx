import { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  platform: 'youtube' | 'vimeo';
  thumbnail?: string;
  isPlaying: boolean;
  onPlay: () => void;
  onClose: () => void;
}

export function VideoPlayer({ 
  videoId, 
  title, 
  platform, 
  thumbnail,
  isPlaying,
  onPlay,
  onClose 
}: VideoPlayerProps) {
  const [imgError, setImgError] = useState(false);
  const [playerError, setPlayerError] = useState(false);

  useEffect(() => {
    console.log('🎯 Rendu VideoPlayer', { videoId, title, isPlaying });
  }, [videoId, title, isPlaying]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔥 BOUTON PLAY CLIQUE !', { videoId, title });
    onPlay();
  };

  const onReady = (event: any) => {
    console.log('✅ YouTube Player prêt');
  };

  const onError = (event: any) => {
    console.error('❌ Erreur YouTube:', event.data);
    setPlayerError(true);
  };

  const onPlayerPlay = () => {
    console.log('▶️ Lecture démarrée');
  };

  const onPlayerPause = () => {
    console.log('⏸️ Lecture en pause');
  };

  const onPlayerEnd = () => {
    console.log('⏹️ Vidéo terminée');
    onClose();
  };

  if (platform === 'vimeo') {
    return (
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
        <p className="text-white">Lecteur Vimeo à implémenter</p>
      </div>
    );
  }

  if (playerError) {
    return (
      <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-white p-4">
          <p className="mb-4">Erreur de chargement de la vidéo</p>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors inline-block"
          >
            Voir sur YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
      {!isPlaying ? (
        <div className="relative w-full h-full">
          <img 
            src={thumbnail && !imgError ? thumbnail : `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          
          <div className="absolute inset-0 bg-black/30"></div>
          
          <button
            onClick={handlePlayClick}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors z-10"
          >
            <Play className="w-10 h-10 text-white ml-2" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-semibold text-lg">{title}</h3>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <YouTube
            videoId={videoId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
              },
            }}
            className="absolute inset-0"
            iframeClassName="w-full h-full"
            onReady={onReady}
            onError={onError}
            onPlay={onPlayerPlay}
            onPause={onPlayerPause}
            onEnd={onPlayerEnd}
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black transition-colors z-20"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}