import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  Video,
  X,
  Play,
  Loader2,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Youtube,
  Music2,
  Heart,
  Share2
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

interface EventMedia {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  attendance?: number;
  category: string;
  media: EventMedia[];
  createdAt: string;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<EventMedia | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/share/1ZeWnEPymW/?mibextid=wwXIfr",
      color: "bg-[#1877F2]",
      followers: "Rejoignez notre communauté Facebook"
    },
    {
      name: "TikTok",
      icon: Music2,
      url: "https://www.tiktok.com/@sda.ndogbong?_r=1&_t=ZS-94lM62BsZ1B",
      color: "bg-black",
      followers: "Suivez-nous sur TikTok"
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@sdandogbong?si=jQDZAU6PKssbwia3",
      color: "bg-[#FF0000]",
      followers: "Abonnez-vous à notre chaîne"
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'events')
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedEvents: Event[] = (data || []).map((item: any) => {
        const mediaArray: EventMedia[] = [];

        // 1. Image de couverture (colonne "imageUrl")
        if (item.imageUrl && typeof item.imageUrl === 'string' && item.imageUrl.trim() !== '') {
          mediaArray.push({
            id: `${item.id}_cover`,
            type: "image",
            url: item.imageUrl,
            caption: item.description
          });
        }

        // 2. Galerie (colonne "gallery") : peut être tableau, JSON, ou chaîne avec virgules
        const gallery = item.gallery;
        if (gallery) {
          // Cas tableau direct
          if (Array.isArray(gallery)) {
            gallery.forEach((url: string, idx: number) => {
              if (url && typeof url === 'string' && url.trim()) {
                mediaArray.push({
                  id: `${item.id}_gallery_${idx}`,
                  type: "image",
                  url: url,
                  caption: item.description
                });
              }
            });
          }
          // Cas chaîne JSON
          else if (typeof gallery === 'string') {
            try {
              const parsed = JSON.parse(gallery);
              if (Array.isArray(parsed)) {
                parsed.forEach((url: string, idx: number) => {
                  if (url && typeof url === 'string' && url.trim()) {
                    mediaArray.push({
                      id: `${item.id}_gallery_${idx}`,
                      type: "image",
                      url: url,
                      caption: item.description
                    });
                  }
                });
              }
            } catch (e) {
              // Ce n'est pas du JSON : chaîne simple ou avec virgules
              if (gallery.includes(',')) {
                gallery.split(',').forEach((url: string, idx: number) => {
                  const trimmed = url.trim();
                  if (trimmed) {
                    mediaArray.push({
                      id: `${item.id}_gallery_${idx}`,
                      type: "image",
                      url: trimmed,
                      caption: item.description
                    });
                  }
                });
              } else if (gallery.trim()) {
                mediaArray.push({
                  id: `${item.id}_gallery_0`,
                  type: "image",
                  url: gallery,
                  caption: item.description
                });
              }
            }
          }
        }

        return {
          id: item.id,
          title: item.title || "Sans titre",
          description: item.description || "",
          date: item.date || new Date().toISOString().split('T')[0],
          endDate: item.endDate || undefined,
          location: item.location || "",
          attendance: item.attendees || 0,
          category: item.category || "Général",
          media: mediaArray,
          createdAt: item.created_at || new Date().toISOString()
        };
      });

      setEvents(formattedEvents);
      console.log("Événements chargés :", formattedEvents.length);
      if (formattedEvents[0]) {
        console.log("Premier média :", formattedEvents[0].media);
      }
    } catch (error) {
      console.error("Erreur chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (!endDate) return formatDate(startDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start.toDateString() === end.toDateString()) return formatDate(startDate);
    return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} - ${formatDate(endDate)}`;
  };

  const nextMedia = () => {
    if (selectedEvent && selectedEvent.media.length > 0) {
      const newIndex = (currentMediaIndex + 1) % selectedEvent.media.length;
      setCurrentMediaIndex(newIndex);
      setSelectedMedia(selectedEvent.media[newIndex]);
    }
  };

  const prevMedia = () => {
    if (selectedEvent && selectedEvent.media.length > 0) {
      const newIndex = (currentMediaIndex - 1 + selectedEvent.media.length) % selectedEvent.media.length;
      setCurrentMediaIndex(newIndex);
      setSelectedMedia(selectedEvent.media[newIndex]);
    }
  };

  const openMediaViewer = (event: Event, mediaIndex: number) => {
    setSelectedEvent(event);
    setCurrentMediaIndex(mediaIndex);
    setSelectedMedia(event.media[mediaIndex]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-12 md:p-16 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-floatDelay"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Albums Photos & Vidéos</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Évènements de l'Église</h1>
          <p className="text-xl text-purple-100">Revivez les moments forts de notre communauté à travers nos galeries</p>
        </div>
      </div>

      {/* Albums Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Aucun album disponible pour le moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-purple-500 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                {event.media.length > 0 ? (
                  <>
                    <img
                      src={event.media[0].url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {event.media[0].type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-10 h-10 text-purple-600 ml-1" />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-20 h-20 text-purple-300" />
                  </div>
                )}
                {event.media.length > 0 && (
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                    <ImageIcon className="w-4 h-4" />
                    <Video className="w-4 h-4" />
                    <span>{event.media.length}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 text-sm text-purple-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{formatDateRange(event.date, event.endDate)}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendance && event.attendance > 0 && (
                    <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      <Users className="w-3 h-3" />
                      <span>{event.attendance} participants</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      )}

      {/* Section Réseaux Sociaux */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-12 my-16 border-2 border-purple-100">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-8 shadow-lg">
            <Heart className="w-5 h-5" />
            <span className="font-medium">Suivez notre communauté</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Restons connectés</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Rejoignez-nous sur les réseaux sociaux pour ne rien manquer de la vie de notre communauté
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-purple-200"
                >
                  <div className={`absolute -right-6 -top-6 w-24 h-24 ${social.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                  <div className={`relative w-20 h-20 mx-auto mb-6 ${social.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{social.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{social.followers}</p>
                  <div className={`inline-flex items-center space-x-2 ${social.color} text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg`}>
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Nous suivre</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
              );
            })}
          </div>
          <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-purple-100">
            <p className="text-gray-700 italic">
              "Que Dieu vous bénisse abondamment alors que vous suivez et partagez les moments de grâce de notre communauté."
            </p>
          </div>
        </div>
      </div>

      {/* Modal Album Détaillé */}
      {selectedEvent && !selectedMedia && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-8 md:p-12">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2 mb-4">
                <CalendarRange className="w-5 h-5" />
                <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {formatDateRange(selectedEvent.date, selectedEvent.endDate)}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="text-purple-100 text-lg mb-6 leading-relaxed">{selectedEvent.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </div>
                {selectedEvent.attendance && selectedEvent.attendance > 0 && (
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Users className="w-4 h-4" />
                    <span>{selectedEvent.attendance} participants</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <ImageIcon className="w-4 h-4" />
                  <Video className="w-4 h-4" />
                  <span>{selectedEvent.media.length} médias</span>
                </div>
              </div>
            </div>
            <div className="p-8">
              {selectedEvent.media.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedEvent.media.map((media, index) => (
                    <div
                      key={media.id}
                      onClick={() => openMediaViewer(selectedEvent, index)}
                      className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 border-gray-200 hover:border-purple-500 transition-all duration-300"
                    >
                      <img
                        src={media.url}
                        alt={media.caption || `Media ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {media.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-purple-600 ml-1" />
                          </div>
                        </div>
                      )}
                      {media.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-xs line-clamp-2">{media.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun média dans cet album</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Visualisation Média */}
      {selectedMedia && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => {
            setSelectedMedia(null);
            setCurrentMediaIndex(0);
          }}
        >
          <button
            onClick={() => {
              setSelectedMedia(null);
              setCurrentMediaIndex(0);
            }}
            className="absolute top-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10 shadow-xl"
          >
            <X className="w-7 h-7 text-gray-900" />
          </button>
          {selectedEvent.media.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevMedia();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all z-10 shadow-xl"
            >
              <ChevronLeft className="w-7 h-7 text-gray-900" />
            </button>
          )}
          {selectedEvent.media.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all z-10 shadow-xl"
            >
              <ChevronRight className="w-7 h-7 text-gray-900" />
            </button>
          )}
          {selectedEvent.media.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold z-10">
              {currentMediaIndex + 1} / {selectedEvent.media.length}
            </div>
          )}
          <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.caption || "Photo"}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={selectedMedia.url}
                  className="w-full h-full"
                  allowFullScreen
                  title={selectedMedia.caption || "Video"}
                />
              </div>
            )}
            {selectedMedia.caption && (
              <div className="bg-white rounded-lg p-6 mt-4 shadow-xl">
                <p className="text-gray-900 text-lg text-center">{selectedMedia.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}