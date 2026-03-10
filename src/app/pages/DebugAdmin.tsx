import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, UserPlus, Key, Trash2, RefreshCw, Eye } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export function DebugAdmin() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [adminStatus, setAdminStatus] = useState<any>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    setCheckingStatus(true);
    try {
      const response = await fetch(`${API_BASE}/auth/check-admin`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });
      const data = await response.json();
      console.log("📊 Admin status:", data);
      setAdminStatus(data);
    } catch (error: any) {
      console.error("❌ Error checking status:", error);
      setAdminStatus({ success: false, error: error.message });
    } finally {
      setCheckingStatus(false);
    }
  };

  const createAdmin = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log("🔧 Creating admin account...");
      const response = await fetch(`${API_BASE}/auth/create-admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      console.log("📦 Response:", data);
      setResult(data);
      await checkAdminStatus();
    } catch (error: any) {
      console.error("❌ Error:", error);
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log("🔑 Resetting admin password...");
      const response = await fetch(`${API_BASE}/auth/reset-admin-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      console.log("📦 Response:", data);
      setResult(data);
      await checkAdminStatus();
    } catch (error: any) {
      console.error("❌ Error:", error);
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async () => {
    if (!confirm("⚠️ Êtes-vous sûr de vouloir supprimer le compte admin ?")) {
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    try {
      console.log("🗑️ Deleting admin account...");
      const response = await fetch(`${API_BASE}/auth/delete-admin`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      console.log("📦 Response:", data);
      setResult(data);
      await checkAdminStatus();
    } catch (error: any) {
      console.error("❌ Error:", error);
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🔧 Debug Admin
              </h1>
              <p className="text-gray-600">
                Outil de diagnostic pour gérer le compte administrateur
              </p>
            </div>
            <button
              onClick={checkAdminStatus}
              disabled={checkingStatus}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${checkingStatus ? 'animate-spin' : ''}`} />
              <span>Actualiser</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <div className={`border-2 rounded-lg p-6 ${
              adminStatus?.exists 
                ? "border-green-200 bg-green-50" 
                : "border-orange-200 bg-orange-50"
            }`}>
              <div className="flex items-start space-x-3">
                {adminStatus?.exists ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {adminStatus?.exists ? "✅ Compte Admin Existant" : "⚠️ Compte Admin Non Trouvé"}
                  </h3>
                  {adminStatus?.adminDetails && (
                    <div className="space-y-2 text-sm">
                      <p className="font-mono bg-white p-2 rounded border">
                        <strong>Email:</strong> {adminStatus.adminDetails.email}
                      </p>
                      <p className="font-mono bg-white p-2 rounded border">
                        <strong>ID:</strong> {adminStatus.adminDetails.id}
                      </p>
                      <p className="font-mono bg-white p-2 rounded border">
                        <strong>Email Confirmé:</strong> {adminStatus.adminDetails.emailConfirmed ? "Oui ✅" : "Non ❌"}
                      </p>
                      <p className="font-mono bg-white p-2 rounded border">
                        <strong>Créé le:</strong> {new Date(adminStatus.adminDetails.createdAt).toLocaleString('fr-FR')}
                      </p>
                    </div>
                  )}
                  {adminStatus && (
                    <p className="text-sm mt-3">
                      <strong>Utilisateurs totaux dans la base:</strong> {adminStatus.userCount}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Create Admin */}
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Créer</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Créer le compte administrateur
                </p>
                <button
                  onClick={createAdmin}
                  disabled={loading || adminStatus?.exists}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {loading ? "..." : "Créer"}
                </button>
              </div>

              {/* Reset Password */}
              <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Réinitialiser</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Réinitialiser le mot de passe
                </p>
                <button
                  onClick={resetPassword}
                  disabled={loading || !adminStatus?.exists}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {loading ? "..." : "Réinitialiser"}
                </button>
              </div>

              {/* Delete Admin */}
              <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Trash2 className="w-5 h-5" />
                  <span>Supprimer</span>
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Supprimer le compte admin
                </p>
                <button
                  onClick={deleteAdmin}
                  disabled={loading || !adminStatus?.exists}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {loading ? "..." : "Supprimer"}
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div
                className={`border-2 rounded-lg p-6 ${
                  result.success
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {result.success ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {result.success ? "✅ Succès" : "❌ Erreur"}
                    </h3>
                    <p className="text-sm mb-3">{result.message || result.error}</p>
                    {result.email && (
                      <p className="text-sm font-mono bg-white p-2 rounded border">
                        Email: {result.email}
                      </p>
                    )}
                    {result.userId && (
                      <p className="text-sm font-mono bg-white p-2 rounded border mt-2">
                        User ID: {result.userId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h2 className="font-semibold text-lg mb-3">📖 Instructions</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>1.</strong> Vérifiez le statut du compte admin (affichage automatique)</p>
                <p><strong>2.</strong> Si le compte n'existe pas, cliquez sur "Créer"</p>
                <p><strong>3.</strong> Si vous avez des problèmes de connexion, cliquez sur "Réinitialiser"</p>
                <p><strong>4.</strong> Une fois le compte créé/réinitialisé, allez sur la page de connexion</p>
              </div>
              <a
                href="/login"
                className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Aller à la page de connexion →</span>
              </a>
            </div>

            {/* Credentials Info */}
            <div className="border-2 border-amber-200 rounded-lg p-6 bg-amber-50">
              <h2 className="font-semibold text-lg mb-3">📋 Identifiants Configurés</h2>
              <div className="space-y-2 text-sm">
                <p className="font-mono bg-white p-3 rounded border">
                  <strong>Email:</strong> monsofrederic@gmail.com
                </p>
                <p className="font-mono bg-white p-3 rounded border">
                  <strong>Mot de passe:</strong> 19@Godfroid...
                </p>
              </div>
              <p className="text-xs text-amber-800 mt-3">
                ⚠️ Ces identifiants sont configurés dans le serveur backend
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}