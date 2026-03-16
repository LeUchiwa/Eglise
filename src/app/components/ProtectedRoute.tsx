import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Vérifier si l'utilisateur est connecté
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("❌ Utilisateur non connecté");
        setIsAuthorized(false);
        return;
      }

      console.log("✅ Utilisateur connecté:", user.email);

      // Pour l'instant, autoriser tous les utilisateurs connectés
      // À remplacer par votre logique admin quand CORS sera résolu
      setIsAuthorized(true);

    } catch (error) {
      console.error("❌ Erreur:", error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des autorisations...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}