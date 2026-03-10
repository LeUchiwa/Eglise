import { useState, useEffect } from "react";
import { Upload, X, Loader2, Building2, ImageIcon, Trash2, CheckCircle, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { useAuth } from "../contexts/AuthContext";

export function AdminConstruction() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  // États pour les données du projet
  const [projectData, setProjectData] = useState<any>({
    title: "",
    subtitle: "",
    currentAmount: 0,
    goalAmount: 0,
    description: "",
    features: [],
    payment_bank_account: "",
    payment_bank_iban: "",
    payment_bank_bic: "",
    payment_om_number: "",
    payment_om_account: "",
    payment_momo_number: "",
    payment_momo_account: "",
    payment_paypal_email: ""
  });

  const [featuresText, setFeaturesText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // États pour les images
  const [constructionImages, setConstructionImages] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectData();
    fetchConstructionImages();
  }, []);

  const fetchProjectData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/content?section=construction_project`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      if (data.success && data.content) {
        setProjectData(data.content);
        if (data.content.features && Array.isArray(data.content.features)) {
          setFeaturesText(data.content.features.join("\n"));
        }
      } else {
        // Données par défaut
        const defaultData = {
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
          payment_bank_account: "Église Adventiste SDA NDOGBONG",
          payment_bank_iban: "FR76 XXXX XXXX XXXX XXXX XXXX XXX",
          payment_bank_bic: "XXXXFRPPXXX",
          payment_om_number: "+237 6XX XX XX XX",
          payment_om_account: "SDA NDOGBONG",
          payment_momo_number: "+237 6XX XX XX XX",
          payment_momo_account: "SDA NDOGBONG",
          payment_paypal_email: "contact@sdandogbong.org"
        };
        setProjectData(defaultData);
        setFeaturesText(defaultData.features.join("\n"));
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
      const response = await fetch(`${API_BASE}/construction/images`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setConstructionImages(data.images || []);
      }
    } catch (error) {
      console.error("Error fetching construction images:", error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleSaveProject = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      // Convertir les features en tableau
      const featuresArray = featuresText
        .split("\n")
        .map(f => f.trim())
        .filter(f => f !== "");

      const dataToSave = {
        ...projectData,
        features: featuresArray
      };

      const response = await fetch(`${API_BASE}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          section: "construction_project",
          content: dataToSave,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Erreur lors de l'enregistrement");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setError("Erreur de connexion");
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Veuillez sélectionner une image");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      setError("Veuillez sélectionner une image");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("caption", caption);

      const response = await fetch(`${API_BASE}/construction/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSelectedFile(null);
        setCaption("");
        setPreviewUrl(null);
        fetchConstructionImages();
      } else {
        setError(data.error || "Erreur lors de l'upload");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError("Erreur de connexion");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/construction/delete-image/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        fetchConstructionImages();
      } else {
        alert(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour Admin</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Building2 className="w-6 h-6 text-teal-600" />
                  <span>Gestion Projet de Construction</span>
                </h1>
              </div>
            </div>
            <button
              onClick={handleSaveProject}
              disabled={saving}
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            <span>Modifications enregistrées avec succès !</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
          </div>
        ) : (
          <>
            {/* Informations Générales */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informations Générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du Projet
                  </label>
                  <input
                    type="text"
                    value={projectData.title}
                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre
                  </label>
                  <textarea
                    value={projectData.subtitle}
                    onChange={(e) => setProjectData({ ...projectData, subtitle: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant Collecté (FCFA)
                  </label>
                  <input
                    type="number"
                    value={projectData.currentAmount}
                    onChange={(e) => setProjectData({ ...projectData, currentAmount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objectif Total (FCFA)
                  </label>
                  <input
                    type="number"
                    value={projectData.goalAmount}
                    onChange={(e) => setProjectData({ ...projectData, goalAmount: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du Projet
                  </label>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caractéristiques du Projet (une par ligne)
                  </label>
                  <textarea
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    rows={6}
                    placeholder="Une salle de culte principale pouvant accueillir 500 fidèles&#10;Des salles de classe pour l'école du sabbat&#10;..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Entrez une caractéristique par ligne
                  </p>
                </div>
              </div>
            </div>

            {/* Informations de Paiement */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de Paiement</h2>
              <div className="space-y-6">
                {/* Virement Bancaire */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">Virement Bancaire</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du Compte
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_bank_account}
                        onChange={(e) => setProjectData({ ...projectData, payment_bank_account: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IBAN
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_bank_iban}
                        onChange={(e) => setProjectData({ ...projectData, payment_bank_iban: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        BIC/SWIFT
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_bank_bic}
                        onChange={(e) => setProjectData({ ...projectData, payment_bank_bic: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Orange Money */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">Orange Money</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du Compte
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_om_account}
                        onChange={(e) => setProjectData({ ...projectData, payment_om_account: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro Orange Money
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_om_number}
                        onChange={(e) => setProjectData({ ...projectData, payment_om_number: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Money */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">Mobile Money (MTN)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du Compte
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_momo_account}
                        onChange={(e) => setProjectData({ ...projectData, payment_momo_account: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro Mobile Money
                      </label>
                      <input
                        type="text"
                        value={projectData.payment_momo_number}
                        onChange={(e) => setProjectData({ ...projectData, payment_momo_number: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* PayPal */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-4">PayPal</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email PayPal
                    </label>
                    <input
                      type="email"
                      value={projectData.payment_paypal_email}
                      onChange={(e) => setProjectData({ ...projectData, payment_paypal_email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gestion des Images */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <ImageIcon className="w-6 h-6 text-teal-600" />
                <span>Photos de l'Évolution des Travaux</span>
              </h2>

              {/* Upload Section */}
              <div className="mb-8 bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Ajouter une Nouvelle Photo</h3>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {previewUrl ? (
                        <div className="space-y-4">
                          <img
                            src={previewUrl}
                            alt="Prévisualisation"
                            className="max-h-64 mx-auto rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Changer d'image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">
                            Cliquez pour sélectionner une image
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            PNG, JPG ou JPEG
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Légende
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Description de la photo (optionnel)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handleUploadImage}
                    disabled={!selectedFile || uploading}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Upload en cours...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        <span>Ajouter la Photo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Images Gallery */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  Photos Existantes ({constructionImages.length})
                </h3>
                {loadingImages ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                  </div>
                ) : constructionImages.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucune photo ajoutée pour le moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {constructionImages.map((image) => (
                      <div
                        key={image.id}
                        className="group relative bg-gray-50 rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.url}
                          alt={image.caption || "Photo de construction"}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                            {image.caption || "Sans légende"}
                          </p>
                          <p className="text-white/70 text-xs mb-3">
                            {new Date(image.uploadedAt).toLocaleDateString('fr-FR')}
                          </p>
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}