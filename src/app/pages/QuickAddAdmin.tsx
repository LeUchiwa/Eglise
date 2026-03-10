import { useState, useEffect } from "react";
import { CheckCircle, Loader2, UserPlus, AlertCircle } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export function QuickAddAdmin() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [adminDetails, setAdminDetails] = useState<any>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  // Admin GregGweth credentials
  const GREG_ADMIN = {
    email: "greggweth@gmail.com",
    password: "GregGweth2026!",
    name: "Greg Gweth",
    role: "admin"
  };

  const addGregAdmin = async () => {
    setStatus("loading");
    setMessage("Création de l'administrateur GregGweth en cours...");

    try {
      console.log("🔧 Creating admin:", GREG_ADMIN.email);
      
      const response = await fetch(`${API_BASE}/admin/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(GREG_ADMIN),
      });

      const data = await response.json();
      console.log("📦 Response:", data);

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("✅ Administrateur GregGweth créé avec succès !");
        setAdminDetails(data.admin);
      } else {
        if (data.error && data.error.includes("déjà utilisé")) {
          setStatus("success");
          setMessage("✅ L'administrateur GregGweth existe déjà dans le système");
          setAdminDetails(GREG_ADMIN);
        } else {
          setStatus("error");
          setMessage(`❌ Erreur: ${data.error || "Impossible de créer l'administrateur"}`);
        }
      }
    } catch (error: any) {
      console.error("❌ Error:", error);
      setStatus("error");
      setMessage(`❌ Erreur de connexion: ${error.message}`);
    }
  };

  // Auto-add on component mount
  useEffect(() => {
    addGregAdmin();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <Card className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-6">
              <UserPlus className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Ajout Rapide d'Administrateur</h1>
          <p className="text-gray-600 mt-2">Configuration de l'accès pour GregGweth</p>
        </div>

        {/* Status */}
        <div className="mb-6">
          {status === "loading" && (
            <div className="flex items-center justify-center space-x-3 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-blue-800 font-medium">{message}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-green-800 font-semibold">{message}</span>
              </div>
              
              {adminDetails && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Identifiants de connexion :</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Nom :</span>
                      <span className="font-mono font-semibold text-gray-900">{GREG_ADMIN.name}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Email :</span>
                      <span className="font-mono font-semibold text-gray-900">{GREG_ADMIN.email}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Mot de passe :</span>
                      <span className="font-mono font-semibold text-gray-900">{GREG_ADMIN.password}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Rôle :</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Administrateur
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center space-x-3 p-6 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <span className="text-red-800 font-medium">{message}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          {status !== "loading" && (
            <Button
              onClick={addGregAdmin}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Réessayer la création
            </Button>
          )}

          <a
            href="/login"
            className="w-full text-center bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
          >
            Aller à la page de connexion
          </a>

          <a
            href="/super-admin"
            className="w-full text-center bg-white border-2 border-purple-300 text-purple-700 py-3 px-6 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
          >
            Gérer les administrateurs
          </a>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• L'administrateur GregGweth a été créé automatiquement</li>
            <li>• Il peut se connecter avec les identifiants affichés ci-dessus</li>
            <li>• Il aura accès au Backend Dashboard pour gérer le contenu du site</li>
            <li>• Vous pouvez modifier ses accès depuis la page Super Admin</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
