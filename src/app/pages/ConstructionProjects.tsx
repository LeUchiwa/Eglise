import { useState, useEffect } from "react";
import { 
  Building2, 
  Heart, 
  ArrowRight, 
  CheckCircle2,
  ArrowLeft,
  Loader2,
  CreditCard,
  Smartphone,
  Wallet,
  DollarSign,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DonationProgressBar } from "../components/DonationProgressBar";
import { CustomCarousel } from "../components/CustomCarousel";
import { supabase } from "../../lib/supabaseClient";

export function ConstructionProjects() {
  const navigate = useNavigate();
  const [constructionImages, setConstructionImages] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Méthodes de paiement
  const paymentMethods = [
    {
      id: "bank-transfer",
      name: "Virement Bancaire",
      icon: CreditCard,
      color: "from-blue-500 to-blue-700",
      description: "Virement bancaire sécurisé",
    },
    {
      id: "orange-money",
      name: "Orange Money",
      icon: Smartphone,
      color: "from-orange-500 to-orange-700",
      description: "Paiement mobile sécurisé",
    },
    {
      id: "mobile-money",
      name: "Mobile Money (MTN)",
      icon: Smartphone,
      color: "from-yellow-500 to-yellow-700",
      description: "MTN Mobile Money",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      color: "from-indigo-500 to-indigo-700",
      description: "Paiement international",
    },
  ];

  // Charger les données du projet
  useEffect(() => {
    fetchProjectData();
    fetchConstructionImages();
  }, []);

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'construction')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProjectData({
          title: data.title || "Notre Nouveau Sanctuaire",
          subtitle: data.subtitle || "Ensemble, bâtissons un lieu de culte digne du Seigneur pour les générations futures",
          currentAmount: data.currentAmount || 15000000,
          goalAmount: data.goalAmount || 50000000,
          description: data.description || "Notre église SDA NDOGBONG entreprend la construction d'un nouveau sanctuaire moderne et spacieux qui servira de lieu de culte pour notre communauté grandissante.",
          features: data.features || [
            "Une salle de culte principale pouvant accueillir 500 fidèles",
            "Des salles de classe pour l'école du sabbat",
            "Une salle polyvalente pour les événements communautaires",
            "Des installations sanitaires modernes",
            "Un parking sécurisé",
            "Un espace vert pour les activités extérieures"
          ],
          payment_bank_account: data.payment_bank_account || "ÉGLISE ADVENTISTE DU 7 EME JOUR COMMUNAUTE DE NDOGBONG",
          payment_bank_iban: data.payment_bank_iban || "CM21 1000 2000 8390 0012 2737 440",
          payment_bank_bic: data.payment_bank_bic || "BCMACMCX",
          payment_om_number: data.payment_om_number || "+237 697 98 84 79",
          payment_om_account: data.payment_om_account || "SDA NDOGBONG",
          payment_momo_number: data.payment_momo_number || "+237 675 40 48 76",
          payment_momo_account: data.payment_momo_account || "SDA NDOGBONG",
          payment_paypal_email: data.payment_paypal_email || "contact@sdandogbong.com"
        });
      } else {
        setProjectData({
          title: "Notre Nouveau Sanctuaire",
          subtitle: "Ensemble, bâtissons un lieu de culte digne du Seigneur pour les générations futures",
          currentAmount: 15000000,
          goalAmount: 50000000,
          description: "Notre église SDA NDOGBONG entreprend la construction d'un nouveau sanctuaire moderne et spacieux qui servira de lieu de culte pour notre communauté grandissante.",
          features: [
            "Une salle de culte principale pouvant accueillir 500 fidèles",
            "Des salles de classe pour l'école du sabbat",
            "Une salle polyvalente pour les événements communautaires",
            "Des installations sanitaires modernes",
            "Un parking sécurisé",
            "Un espace vert pour les activités extérieures"
          ],
          payment_bank_account: "ÉGLISE ADVENTISTE DU 7 EME JOUR COMMUNAUTE DE NDOGBONG",
          payment_bank_iban: "CM21 1000 2000 8390 0012 2737 440",
          payment_bank_bic: "BCMACMCX",
          payment_om_number: "+237 697 98 84 79",
          payment_om_account: "SDA NDOGBONG",
          payment_momo_number: "+237 675 40 48 76",
          payment_momo_account: "SDA NDOGBONG",
          payment_paypal_email: "contact@sdandogbong.com"
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConstructionImages = async () => {
    setLoadingImages(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'construction_images');

      if (error) throw error;

      if (data && data.length > 0) {
        const images = data.map(item => ({
          id: item.id,
          url: item.url || "",
          caption: item.title || "Photo de construction",
          uploadedAt: item.created_at || new Date().toISOString(),
        }));
        setConstructionImages(images);
      } else {
        setConstructionImages([]);
      }
    } catch (error) {
      console.error("Error fetching construction images:", error);
      setConstructionImages([]);
    } finally {
      setLoadingImages(false);
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        </div>
      ) : (
        <>
          {/* Header avec bouton retour */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/soutien")}
              className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </button>
          </div>

          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 rounded-2xl p-12 text-white animate-gradientShift">
            {/* Vidéo de fond */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
            >
              <source
                src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas les vidéos HTML5.
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/85 via-cyan-900/80 to-blue-900/85" style={{ zIndex: 1 }}></div>
            
            <div className="absolute inset-0 opacity-20" style={{ zIndex: 2 }}>
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-floatDelay"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-slideDown">
                <Building2 className="w-5 h-5 text-teal-200" />
                <span className="text-sm font-medium">Projet de Construction</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp drop-shadow-2xl">
                {projectData?.title || "Notre Nouveau Sanctuaire"}
              </h1>
              <p className="text-xl text-cyan-100 animate-slideUp drop-shadow-lg" style={{ animationDelay: '0.1s' }}>
                {projectData?.subtitle || "Ensemble, bâtissons un lieu de culte digne du Seigneur pour les générations futures"}
              </p>
            </div>
          </div>

          {/* Barre de progression principale */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                Objectif de Financement
              </h2>
              <span className="text-4xl font-bold text-teal-600">
                {Math.round((projectData?.currentAmount || 0) / (projectData?.goalAmount || 1) * 100)}%
              </span>
            </div>
            <DonationProgressBar
              current={projectData?.currentAmount || 0}
              goal={projectData?.goalAmount || 1}
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Montant Collecté</p>
                <p className="text-2xl font-bold text-teal-900">
                  {new Intl.NumberFormat('fr-FR').format(projectData?.currentAmount || 0)} FCFA
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Objectif Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('fr-FR').format(projectData?.goalAmount || 0)} FCFA
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Reste à Collecter</p>
                <p className="text-2xl font-bold text-blue-900">
                  {new Intl.NumberFormat('fr-FR').format((projectData?.goalAmount || 0) - (projectData?.currentAmount || 0))} FCFA
                </p>
              </div>
            </div>

            {/* Bouton Faire un Don */}
            <button
              onClick={() => setShowDonationModal(true)}
              className="mt-8 w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-4 rounded-lg font-bold text-lg hover:from-teal-700 hover:to-cyan-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-6 h-6" />
              <span>Faire un Don Maintenant</span>
            </button>
          </div>

          {/* Description du Projet */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 animate-slideUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">À Propos du Projet</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>{projectData?.description}</p>
              {projectData?.features && projectData.features.length > 0 && (
                <>
                  <p>Ce projet ambitieux comprend :</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {projectData.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Galerie de photos de construction */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 animate-slideUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <ImageIcon className="w-8 h-8 text-teal-600" />
                <span>Évolution des Travaux</span>
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                {constructionImages.length} {constructionImages.length > 1 ? 'photos' : 'photo'}
              </span>
            </div>

            {loadingImages ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              </div>
            ) : constructionImages.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Aucune photo disponible pour le moment
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Les photos de l'évolution des travaux seront publiées régulièrement
                </p>
              </div>
            ) : (
              <>
                {/* Carrousel Automatique */}
                <div className="carousel-container mb-8">
                  <CustomCarousel images={constructionImages} onImageClick={setSelectedImage} />
                </div>

                {/* Miniatures cliquables */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Toutes les photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {constructionImages.map((image) => (
                      <div
                        key={image.id}
                        className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-gray-200 hover:border-teal-500"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image.url}
                          alt={image.caption || "Photo de construction"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                          <p className="text-white text-xs font-medium line-clamp-2">
                            {image.caption || "Photo de construction"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Modal pour afficher l'image en grand */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
              <div className="max-w-6xl w-full">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption || "Photo de construction"}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                {selectedImage.caption && (
                  <div className="bg-white rounded-lg p-6 mt-4">
                    <p className="text-gray-900 text-xl font-semibold mb-2">
                      {selectedImage.caption}
                    </p>
                    <p className="text-gray-500">
                      Ajoutée le {new Date(selectedImage.uploadedAt).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal de Don */}
          {showDonationModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Faire un Don</h2>
                    <button
                      onClick={() => setShowDonationModal(false)}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-gray-700">
                    Choisissez votre méthode de paiement préférée pour contribuer à la construction de notre sanctuaire
                  </p>

                  {/* Méthodes de paiement */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                            selectedPaymentMethod === method.id
                              ? 'border-teal-600 bg-teal-50'
                              : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Informations de paiement */}
                  {selectedPaymentMethod && projectData && (
                    <div className="bg-teal-50 rounded-xl p-6 border-2 border-teal-200 animate-slideUp">
                      <h3 className="font-bold text-teal-900 mb-4 flex items-center space-x-2">
                        <DollarSign className="w-5 h-5" />
                        <span>Informations de Paiement</span>
                      </h3>
                      
                      {selectedPaymentMethod === 'bank-transfer' && (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Nom:</strong> {projectData.payment_bank_account}</p>
                          <p><strong>IBAN:</strong> {projectData.payment_bank_iban}</p>
                          <p><strong>BIC/SWIFT:</strong> {projectData.payment_bank_bic}</p>
                        </div>
                      )}

                      {selectedPaymentMethod === 'orange-money' && (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Compte:</strong> {projectData.payment_om_account}</p>
                          <p><strong>Numéro Orange Money:</strong> {projectData.payment_om_number}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Composez #150# et suivez les instructions pour envoyer votre don
                          </p>
                        </div>
                      )}

                      {selectedPaymentMethod === 'mobile-money' && (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Compte:</strong> {projectData.payment_momo_account}</p>
                          <p><strong>Numéro MTN Mobile Money:</strong> {projectData.payment_momo_number}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Composez *126# et suivez les instructions pour envoyer votre don
                          </p>
                        </div>
                      )}

                      {selectedPaymentMethod === 'paypal' && (
                        <div className="space-y-2 text-gray-700">
                          <p><strong>Email PayPal:</strong> {projectData.payment_paypal_email}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Envoyez votre don via PayPal en mentionnant "Construction Sanctuaire"
                          </p>
                        </div>
                      )}

                      <p className="text-sm text-teal-800 mt-4 bg-white p-3 rounded-lg">
                        💝 Merci pour votre générosité ! Que Dieu vous bénisse abondamment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}