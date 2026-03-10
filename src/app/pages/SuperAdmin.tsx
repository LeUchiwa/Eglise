import { useState, useEffect } from "react";
import { Users, Plus, Trash2, Save, Shield, Eye, EyeOff, Mail, Lock, UserCog } from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { useAuth } from "../contexts/AuthContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface AdminUser {
  email: string;
  password: string;
  name: string;
  role: "super_admin" | "admin";
  createdAt: string;
}

export function SuperAdmin() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // New admin form
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin" as "super_admin" | "admin"
  });

  const { accessToken } = useAuth();
  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${accessToken || publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des administrateurs");
      }

      const data = await response.json();
      setAdmins(data.admins || []);
      showMessage("success", "Administrateurs chargés avec succès");
    } catch (error: any) {
      console.error("Error loading admins:", error);
      showMessage("error", error.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const addAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password || !newAdmin.name) {
      showMessage("error", "Tous les champs sont requis");
      return;
    }

    if (newAdmin.password.length < 8) {
      showMessage("error", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken || publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      showMessage("success", "Administrateur créé avec succès");
      setNewAdmin({ email: "", password: "", name: "", role: "admin" });
      await loadAdmins();
    } catch (error: any) {
      console.error("Error adding admin:", error);
      showMessage("error", error.message || "Erreur lors de la création");
    } finally {
      setSaving(false);
    }
  };

  const deleteAdmin = async (email: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'administrateur "${email}" ?`)) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/users/${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken || publicAnonKey}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      showMessage("success", "Administrateur supprimé avec succès");
      await loadAdmins();
    } catch (error: any) {
      console.error("Error deleting admin:", error);
      showMessage("error", error.message || "Erreur lors de la suppression");
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords((prev) => ({ ...prev, [email]: !prev[email] }));
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center space-x-3 mb-3">
            <Shield className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Gestion des Administrateurs</h1>
          </div>
          <p className="text-purple-100">
            Créez et gérez les comptes administrateurs pour votre site
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg shadow-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Add New Admin */}
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Plus className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Ajouter un Administrateur</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </Label>
              <Input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="admin@example.com"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                <UserCog className="w-4 h-4 inline mr-2" />
                Nom complet
              </Label>
              <Input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                placeholder="Jean Dupont"
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Mot de passe (min. 8 caractères)
              </Label>
              <Input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                placeholder="••••••••"
                minLength={8}
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 inline mr-2" />
                Rôle
              </Label>
              <select
                value={newAdmin.role}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as "super_admin" | "admin" })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="admin">Administrateur</option>
                <option value="super_admin">Super Administrateur</option>
              </select>
            </div>
          </div>

          <Button
            onClick={addAdmin}
            disabled={saving}
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            {saving ? "Création en cours..." : "Ajouter l'administrateur"}
          </Button>
        </Card>

        {/* Admins List */}
        <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Administrateurs ({admins.length})
              </h2>
            </div>
            <Button
              onClick={loadAdmins}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Actualiser
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Chargement...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Aucun administrateur trouvé</p>
              <p className="text-sm">Ajoutez votre premier administrateur ci-dessus</p>
            </div>
          ) : (
            <div className="space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin.email}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${
                          admin.role === "super_admin" 
                            ? "bg-purple-100 text-purple-600" 
                            : "bg-blue-100 text-blue-600"
                        }`}>
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{admin.name}</h3>
                          <p className="text-sm text-gray-500">{admin.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {showPasswords[admin.email] ? admin.password : "••••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(admin.email)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            {showPasswords[admin.email] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                            admin.role === "super_admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                          </span>
                        </div>
                      </div>

                      {admin.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          Créé le {new Date(admin.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={() => deleteAdmin(admin.email)}
                        disabled={saving}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Info Box */}
        <Card className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Informations importantes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Les <strong>Super Administrateurs</strong> ont accès à cette page de gestion des utilisateurs</li>
                <li>• Les <strong>Administrateurs</strong> peuvent gérer le contenu du site mais pas les utilisateurs</li>
                <li>• Tous les mots de passe doivent contenir au moins 8 caractères</li>
                <li>• Les identifiants sont stockés de manière sécurisée dans la base de données</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
