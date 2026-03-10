import { useState } from "react";
import { Download, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

interface DownloadButtonProps {
  bookId: string;
  type: "book" | "magazine";
  title: string;
  className?: string;
}

export function DownloadButton({ bookId, type, title, className = "" }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    setSuccess(false);

    try {
      // Obtenir l'URL de téléchargement signée
      const response = await fetch(`${API_BASE}/books/download/${type}/${bookId}`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        if (data.notFound) {
          setError("Ce fichier n'est pas encore disponible");
        } else {
          setError(data.error || "Erreur lors du téléchargement");
        }
        return;
      }

      // Ouvrir l'URL dans un nouvel onglet pour téléchargement
      window.open(data.url, "_blank");
      setSuccess(true);

      // Réinitialiser le succès après 3 secondes
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Download error:", err);
      setError("Erreur de connexion");
    } finally {
      setIsDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-2 text-red-600 text-sm mb-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
        <button
          onClick={handleDownload}
          className={`flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Réessayer</span>
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className={`flex items-center space-x-2 text-green-600 font-medium text-sm ${className}`}>
        <CheckCircle className="w-4 h-4" />
        <span>Téléchargement démarré!</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex items-center space-x-2 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Chargement...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Télécharger</span>
        </>
      )}
    </button>
  );
}