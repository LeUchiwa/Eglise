import { Link, Outlet, useLocation } from "react-router-dom";
import { Book, BookOpen, Video, FileText, Baby, Heart, Settings, LogIn, LogOut, Bell } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AdventistLogo } from "./AdventistLogo";

export function Layout() {
  const location = useLocation();
  
  // Ne pas bloquer l'affichage avec l'authentification
  // On utilise un état local pour gérer l'erreur silencieusement
  let user = null;
  let logout = () => {};
  
  try {
    const auth = useAuth();
    user = auth.user;
    logout = auth.logout;
  } catch (error) {
    // Ignorer silencieusement - le site s'affiche même sans auth
    console.log('Mode public - authentification non requise');
  }

  const navItems = [
    { path: "/", label: "Accueil", icon: Book },
    { path: "/bible", label: "Bible", icon: Book },
    { path: "/livres-educatifs", label: "Livres Éducatifs", icon: BookOpen },
    { path: "/livres-enfants", label: "Livres Enfants", icon: Baby },
    { path: "/videos", label: "Vidéos", icon: Video },
    { path: "/magazines", label: "Magazines", icon: FileText },
    { path: "/annonces", label: "Annonces", icon: Bell }, 
    { path: "/soutien", label: "Soutien", icon: Heart },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Toujours visible */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <AdventistLogo />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white group-hover:text-slate-200 transition-colors">SDA NDOGBONG</h1>
                <p className="text-sm text-slate-300">À l'ombre du Christ</p>
              </div>
            </Link>

            {/* Bouton Login/Logout - S'affiche selon l'état */}
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <span className="text-white text-sm hidden md:inline">
                    Administrateur
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
                    title="Déconnexion"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Déconnexion</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 group"
                  title="Connexion Administrateur"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm hidden sm:inline">Admin</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:scale-105"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Bouton flottant - Uniquement si connecté */}
      {user && (
        <Link
          to="/backend-dashboard"
          className="fixed bottom-8 right-8 z-50 flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group animate-bounce-slow"
          title="Accéder au Backend Dashboard"
        >
          <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-semibold text-sm hidden sm:inline">Admin Dashboard</span>
        </Link>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À Propos</h3>
              <p className="text-gray-400 text-sm">
                Votre source en ligne pour les ressources spirituelles et éducatives de l'Église Adventiste du Septième Jour Communauté de NDOGBONG.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">
                Email: contact@sdandogbong.com<br />
                Téléphone: +237 697 988 479
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horaires de Culte</h3>
              <p className="text-gray-400 text-sm">
                Samedi: 9h30 - 13h00<br />
                Soirée de prière : Mercredi 18h00
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 Église Adventiste SDA NDOGBONG. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}