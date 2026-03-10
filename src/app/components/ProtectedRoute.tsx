import { Navigate } from "react-router-dom";

// Version temporaire sans authentification
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Pour tester, on considère que l'utilisateur est connecté
  // DÉCOMMENTE LA LIGNE CI-DESSOUS POUR TESTER SANS AUTH
  return <>{children}</>;
  
  /* COMMENTE CES LIGNES POUR LE MOMENT
  try {
    const auth = useAuth();
    const { user, loading } = auth;

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    return <>{children}</>;
  }
  */
}