import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Database,
  Users,
  Mail,
  FileText,
  BarChart3,
  Settings,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Search,
  TrendingUp,
  Activity,
  Globe,
  Book,
  Video,
  Baby,
  Heart,
  Megaphone,
  Building2,
  Shield,
  LogOut,
} from "lucide-react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import { useAuth } from "../contexts/AuthContext";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  newsletter: boolean;
  submittedAt: string;
  status: string;
}

interface Newsletter {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscribedAt: string;
  active: boolean;
}

interface AdminUser {
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

interface Stats {
  totalContacts: number;
  totalSubscribers: number;
  totalAdmins: number;
  newContactsToday: number;
  newSubscribersToday: number;
}

export function BackendDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "newsletter" | "admins" | "settings">("overview");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [subscribers, setSubscribers] = useState<Newsletter[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalSubscribers: 0,
    totalAdmins: 0,
    newContactsToday: 0,
    newSubscribersToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadContacts(),
        loadSubscribers(),
        loadAdmins(),
      ]);
    } catch (error) {
      console.error("Error loading data:", error);
      showMessage("error", "Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await fetch(`${API_BASE}/contact/submissions`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
        calculateStats(data.contacts || [], subscribers);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const loadSubscribers = async () => {
    try {
      const response = await fetch(`${API_BASE}/newsletter/subscribers`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
        calculateStats(contacts, data.subscribers || []);
      }
    } catch (error) {
      console.error("Error loading subscribers:", error);
    }
  };

  const loadAdmins = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/users`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdmins(data.admins || []);
      }
    } catch (error) {
      console.error("Error loading admins:", error);
    }
  };

  const calculateStats = (contactsList: Contact[], subscribersList: Newsletter[]) => {
    const today = new Date().toISOString().split("T")[0];

    const newContactsToday = contactsList.filter((c) =>
      c.submittedAt?.startsWith(today)
    ).length;

    const newSubscribersToday = subscribersList.filter((s) =>
      s.subscribedAt?.startsWith(today)
    ).length;

    setStats({
      totalContacts: contactsList.length,
      totalSubscribers: subscribersList.length,
      totalAdmins: admins.length,
      newContactsToday,
      newSubscribersToday,
    });
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce contact ?")) return;

    try {
      const updatedContacts = contacts.filter((c) => c.id !== id);
      const response = await fetch(`${API_BASE}/contact/submissions`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedContacts),
      });

      if (response.ok) {
        setContacts(updatedContacts);
        showMessage("success", "Contact supprimé avec succès");
      }
    } catch (error) {
      showMessage("error", "Erreur lors de la suppression");
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      showMessage("error", "Aucune donnée à exporter");
      return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    );
    const csv = [headers, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    showMessage("success", `Export réussi : ${filename}.csv`);
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quickLinks = [
    { icon: Book, label: "Bible", path: "/bible", color: "from-blue-500 to-blue-700" },
    { icon: FileText, label: "Livres Éducatifs", path: "/livres-educatifs", color: "from-green-500 to-green-700" },
    { icon: Baby, label: "Livres Enfants", path: "/livres-enfants", color: "from-purple-500 to-purple-700" },
    { icon: Video, label: "Vidéos", path: "/videos", color: "from-red-500 to-red-700" },
    { icon: FileText, label: "Magazines", path: "/magazines", color: "from-orange-500 to-orange-700" },
    { icon: Megaphone, label: "Annonces", path: "/annonces", color: "from-pink-500 to-pink-700" },
    { icon: Heart, label: "Soutien", path: "/soutien", color: "from-rose-500 to-rose-700" },
    { icon: Building2, label: "Projets", path: "/projets-construction", color: "from-indigo-500 to-indigo-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-lg">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Backend Dashboard</h1>
                <p className="text-slate-300 text-sm">SDA NDOGBONG - Gestion Complète du Site</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right mr-4">
                <p className="text-sm font-medium">{user?.name || user?.email}</p>
                <p className="text-xs text-slate-400">{user?.role === "super_admin" ? "Super Admin" : "Admin"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div
            className={`flex items-center space-x-3 p-4 rounded-lg shadow-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Vue d'ensemble</span>
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "contacts"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>Contacts ({contacts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("newsletter")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "newsletter"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Newsletter ({subscribers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("admins")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "admins"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Administrateurs ({admins.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600">Chargement des données...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <Mail className="w-10 h-10 opacity-80" />
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats.totalContacts}</h3>
                    <p className="text-blue-100 text-sm">Contacts Total</p>
                    <p className="text-xs text-blue-200 mt-2">+{stats.newContactsToday} aujourd'hui</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-10 h-10 opacity-80" />
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats.totalSubscribers}</h3>
                    <p className="text-green-100 text-sm">Abonnés Newsletter</p>
                    <p className="text-xs text-green-200 mt-2">+{stats.newSubscribersToday} aujourd'hui</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className="w-10 h-10 opacity-80" />
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{admins.length}</h3>
                    <p className="text-purple-100 text-sm">Administrateurs</p>
                    <p className="text-xs text-purple-200 mt-2">Actifs</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <Database className="w-10 h-10 opacity-80" />
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">KV Store</h3>
                    <p className="text-orange-100 text-sm">Base de données</p>
                    <p className="text-xs text-orange-200 mt-2">Supabase actif</p>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Accès Rapide aux Sections</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className="group flex flex-col items-center p-4 rounded-lg border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <link.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 text-center">{link.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => navigate("/admin")}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all text-left group"
                  >
                    <FileText className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Gérer le Contenu</h3>
                    <p className="text-sm text-slate-600">Modifiez les textes, images et médias du site</p>
                  </button>

                  <button
                    onClick={() => navigate("/super-admin")}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all text-left group"
                  >
                    <Shield className="w-10 h-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Gérer les Admins</h3>
                    <p className="text-sm text-slate-600">Ajoutez ou supprimez des administrateurs</p>
                  </button>

                  <button
                    onClick={() => navigate("/admin-construction")}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all text-left group"
                  >
                    <Building2 className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Projets de Construction</h3>
                    <p className="text-sm text-slate-600">Gérez les photos et projets de construction</p>
                  </button>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Contacts ({contacts.length})</h2>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => exportToCSV(contacts, "contacts")}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exporter CSV</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nom</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Téléphone</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Message</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Newsletter</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredContacts.map((contact) => (
                          <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{contact.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{contact.email}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{contact.phone || "-"}</td>
                            <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">
                              {contact.message || "-"}
                            </td>
                            <td className="px-4 py-3">
                              {contact.newsletter ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                  Oui
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                  Non
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(contact.submittedAt).toLocaleDateString("fr-FR")}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => deleteContact(contact.id)}
                                className="text-red-600 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredContacts.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <Mail className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <p>Aucun contact trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === "newsletter" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Abonnés Newsletter ({subscribers.length})</h2>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => exportToCSV(subscribers, "newsletter")}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exporter CSV</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nom</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Téléphone</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date d'inscription</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {filteredSubscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-slate-900">{subscriber.name}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{subscriber.email}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">{subscriber.phone || "-"}</td>
                            <td className="px-4 py-3 text-sm text-slate-600">
                              {new Date(subscriber.subscribedAt).toLocaleDateString("fr-FR")}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Actif
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredSubscribers.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <p>Aucun abonné trouvé</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Admins Tab */}
            {activeTab === "admins" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Administrateurs ({admins.length})</h2>
                    <button
                      onClick={() => navigate("/super-admin")}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Gérer les Admins</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {admins.map((admin) => (
                      <div
                        key={admin.email}
                        className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`p-2 rounded-full ${
                            admin.role === "super_admin" 
                              ? "bg-purple-100 text-purple-600" 
                              : "bg-blue-100 text-blue-600"
                          }`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{admin.name}</h3>
                            <p className="text-sm text-slate-500">{admin.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            admin.role === "super_admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                          </span>
                          {admin.createdAt && (
                            <span className="text-xs text-slate-400">
                              {new Date(admin.createdAt).toLocaleDateString("fr-FR")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Paramètres du Backend</h2>
                  
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Base de données</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-900">Supabase KV Store</span>
                          </div>
                          <p className="text-sm text-green-700">Table: kv_store_d44eb65e</p>
                          <p className="text-xs text-green-600 mt-1">Statut: Actif ✓</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Database className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-blue-900">Supabase Storage</span>
                          </div>
                          <p className="text-sm text-blue-700">Buckets: make-d44eb65e-*</p>
                          <p className="text-xs text-blue-600 mt-1">Statut: Actif ✓</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-slate-200 pb-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Informations Système</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">Project ID:</span>
                          <span className="font-mono text-slate-900">{projectId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">Backend API:</span>
                          <span className="font-mono text-slate-900 text-xs">make-server-d44eb65e</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100">
                          <span className="text-slate-600">Version:</span>
                          <span className="font-mono text-slate-900">1.0.0</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Actions Rapides</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={loadAllData}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Activity className="w-5 h-5" />
                          <span>Actualiser les Données</span>
                        </button>
                        <button
                          onClick={() => navigate("/")}
                          className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <Globe className="w-5 h-5" />
                          <span>Voir le Site Public</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
