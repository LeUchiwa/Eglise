import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  PieChart as PieChartIcon,
  BarChart3,
  Download,
  ArrowUp,
  ArrowDown,
  Heart,
  Gift,
  Loader2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { supabase } from "../../lib/supabaseClient"; // ← IMPORTANT

export function TithesStats() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "quarter" | "year">("month");
  const [loading, setLoading] = useState(true);
  const [tithesData, setTithesData] = useState<any[]>([]);

  useEffect(() => {
    fetchTithesData();
  }, []);

  const fetchTithesData = async () => {
    setLoading(true);
    try {
      // ✅ Récupérer les données de dîmes depuis Supabase
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'tithes')
        .order('date', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Transformer les données
        const formattedData = data.map(item => ({
          month: item.month || getMonthFromDate(item.date),
          dimes: item.dimes || 0,
          offrandes: item.offrandes || 0,
          total: (item.dimes || 0) + (item.offrandes || 0),
          membres: item.membres || 0,
          quarter: item.quarter || getQuarterFromMonth(item.month),
          year: item.year || selectedYear,
        }));
        setTithesData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching tithes data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonctions utilitaires
  const getMonthFromDate = (dateStr?: string) => {
    if (!dateStr) return "Jan";
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', { month: 'short' }).replace('.', '');
  };

  const getQuarterFromMonth = (month?: string) => {
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const index = months.findIndex(m => m === month);
    if (index < 0) return "T1";
    return `T${Math.floor(index / 3) + 1}`;
  };

  // Données par défaut si rien dans la base
  const defaultMonthlyData = [
    { month: "Jan", dimes: 850000, offrandes: 420000, total: 1270000, membres: 145 },
    { month: "Fév", dimes: 920000, offrandes: 480000, total: 1400000, membres: 148 },
    { month: "Mar", dimes: 780000, offrandes: 350000, total: 1130000, membres: 147 },
    { month: "Avr", dimes: 1050000, offrandes: 520000, total: 1570000, membres: 152 },
    { month: "Mai", dimes: 980000, offrandes: 490000, total: 1470000, membres: 155 },
    { month: "Juin", dimes: 1100000, offrandes: 580000, total: 1680000, membres: 158 },
    { month: "Juil", dimes: 950000, offrandes: 450000, total: 1400000, membres: 160 },
    { month: "Août", dimes: 880000, offrandes: 430000, total: 1310000, membres: 157 },
    { month: "Sep", dimes: 1020000, offrandes: 510000, total: 1530000, membres: 162 },
    { month: "Oct", dimes: 1150000, offrandes: 600000, total: 1750000, membres: 165 },
    { month: "Nov", dimes: 1080000, offrandes: 540000, total: 1620000, membres: 168 },
    { month: "Déc", dimes: 1250000, offrandes: 750000, total: 2000000, membres: 170 },
  ];

  // Données à utiliser (BDD ou par défaut)
  const monthlyData = tithesData.length > 0 ? tithesData : defaultMonthlyData;

  // Données trimestrielles calculées
  const quarterlyData = [
    { quarter: "T1 2026", dimes: 2550000, offrandes: 1250000, total: 3800000 },
    { quarter: "T2 2026", dimes: 3130000, offrandes: 1590000, total: 4720000 },
    { quarter: "T3 2026", dimes: 2850000, offrandes: 1390000, total: 4240000 },
    { quarter: "T4 2026", dimes: 3480000, offrandes: 1890000, total: 5370000 },
  ];

  // Répartition par catégorie d'offrandes
  const offeringCategories = [
    { name: "Missions", value: 2500000, color: "#8b5cf6" },
    { name: "Construction", value: 1800000, color: "#3b82f6" },
    { name: "Action Sociale", value: 1200000, color: "#10b981" },
    { name: "Éducation", value: 950000, color: "#f59e0b" },
    { name: "Jeunesse", value: 780000, color: "#ef4444" },
    { name: "Autres", value: 450000, color: "#6366f1" },
  ];

  // Comparaison annuelle
  const yearlyComparison = [
    { year: "2023", total: 15200000 },
    { year: "2024", total: 16800000 },
    { year: "2025", total: 17500000 },
    { year: "2026", total: 18130000 },
  ];

  // Calculs statistiques
  const totalDimes2026 = monthlyData.reduce((sum, m) => sum + m.dimes, 0);
  const totalOffrandes2026 = monthlyData.reduce((sum, m) => sum + m.offrandes, 0);
  const totalGeneral2026 = totalDimes2026 + totalOffrandes2026;
  const avgMonthly = totalGeneral2026 / 12;
  const avgPerMember = totalGeneral2026 / 170;

  // Croissance vs année précédente
  const growth = ((18130000 - 17500000) / 17500000) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl p-8 md:p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-floatDelay"></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <PieChartIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Rapport Financier {selectedYear}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Statistiques Dîmes & Offrandes
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl">
            Aperçu complet des contributions financières et de leur impact sur la mission de l'église
          </p>
        </div>
      </div>

      {/* Cartes Statistiques Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div className="flex items-center space-x-1 text-sm bg-white/20 px-2 py-1 rounded-full">
              <ArrowUp className="w-4 h-4" />
              <span>{growth.toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-purple-200 text-sm mb-1">Total Dîmes {selectedYear}</p>
          <p className="text-3xl font-bold">{formatCurrency(totalDimes2026)}</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
          </div>
          <p className="text-pink-200 text-sm mb-1">Total Offrandes {selectedYear}</p>
          <p className="text-3xl font-bold">{formatCurrency(totalOffrandes2026)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-blue-200 text-sm mb-1">Total Général {selectedYear}</p>
          <p className="text-3xl font-bold">{formatCurrency(totalGeneral2026)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-green-200 text-sm mb-1">Moyenne Mensuelle</p>
          <p className="text-3xl font-bold">{formatCurrency(avgMonthly)}</p>
        </div>
      </div>

      {/* Cartes secondaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-gray-600 text-sm">Membres Contributeurs</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">170</p>
          <p className="text-xs text-gray-500 mt-1">+15 depuis janvier</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-gray-600 text-sm">Contribution Moyenne/Membre</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgPerMember)}</p>
          <p className="text-xs text-gray-500 mt-1">Par an</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-gray-600 text-sm">Meilleur Mois</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">Décembre</p>
          <p className="text-xs text-gray-500 mt-1">{formatCurrency(2000000)}</p>
        </div>
      </div>

      {/* Graphique Évolution Mensuelle */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Évolution Mensuelle</h2>
            <p className="text-gray-600 text-sm">Dîmes et offrandes par mois en {selectedYear}</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorDimes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorOffrandes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis 
              stroke="#9ca3af"
              tickFormatter={(value) => `${(value / 1000)}k`}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="dimes" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#colorDimes)" 
              name="Dîmes"
            />
            <Area 
              type="monotone" 
              dataKey="offrandes" 
              stroke="#ec4899" 
              fillOpacity={1} 
              fill="url(#colorOffrandes)" 
              name="Offrandes"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Graphiques Côte à Côte */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par Trimestre */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition par Trimestre</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="quarter" stroke="#9ca3af" />
              <YAxis 
                stroke="#9ca3af"
                tickFormatter={(value) => `${(value / 1000000)}M`}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="dimes" fill="#8b5cf6" name="Dîmes" radius={[8, 8, 0, 0]} />
              <Bar dataKey="offrandes" fill="#ec4899" name="Offrandes" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Catégories d'Offrandes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition des Offrandes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={offeringCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {offeringCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {offeringCategories.map((cat, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-xs text-gray-600">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison Annuelle */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Évolution Annuelle</h2>
        <p className="text-gray-600 text-sm mb-6">Comparaison des 4 dernières années</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#9ca3af" />
            <YAxis 
              stroke="#9ca3af"
              tickFormatter={(value) => `${(value / 1000000)}M`}
            />
            <Tooltip 
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 6 }}
              name="Total Annuel"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Détails par Catégorie */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Détails par Catégorie</h2>
        <div className="space-y-4">
          {offeringCategories.map((category, index) => {
            const total = offeringCategories.reduce((sum, c) => sum + c.value, 0);
            const percentage = (category.value / total) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(category.value)}</p>
                    <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Citation Biblique */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
          <blockquote className="text-xl md:text-2xl font-medium mb-4">
            "Apportez à la maison du trésor toutes les dîmes, afin qu'il y ait de la nourriture dans ma maison"
          </blockquote>
          <p className="text-purple-200">Malachie 3:10</p>
        </div>
      </div>
    </div>
  );
}