import { Heart, Gift, Users, Sparkles, HandHeart, Calendar, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";  // ← CORRECTION
import { DonationProgressBar } from "../components/DonationProgressBar";

export function Support() {
  const navigate = useNavigate();

  // Support ways with donation goals and current amounts
  const supportWays = [
    {
      icon: Heart,
      title: "Dîmes et Offrandes",
      description: "Participez au soutien de notre mission spirituelle",
      color: "from-pink-500 to-rose-600",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      link: "/dimes-offrandes", // Lien vers la page de statistiques
      showProgress: false, // Pas de barre de progression pour les dîmes
    },
    {
      icon: Gift,
      title: "Dons Spéciaux",
      description: "Contributions pour les projets spécifiques de l'église",
      color: "from-purple-500 to-indigo-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      currentAmount: 1800000,
      goalAmount: 3000000,
      showProgress: true,
    },
    {
      icon: Users,
      title: "Bénévolat",
      description: "Offrez votre temps et vos talents à la communauté",
      color: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      currentAmount: 850000,
      goalAmount: 1500000,
      showProgress: true,
    },
    {
      icon: HandHeart,
      title: "Actions Humanitaires",
      description: "Aidez-nous à servir les plus démunis",
      color: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      currentAmount: 1200000,
      goalAmount: 2000000,
      showProgress: true,
    },
    {
      icon: Calendar,
      title: "Programmes Jeunesse",
      description: "Soutenez l'éducation spirituelle des jeunes",
      color: "from-orange-500 to-amber-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      currentAmount: 950000,
      goalAmount: 1800000,
      showProgress: true,
    },
    {
      icon: Building2,
      title: "Projets de Construction",
      description: "Participez à l'expansion de nos infrastructures",
      color: "from-teal-500 to-cyan-600",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      link: "/projets-construction", // Lien vers la page dédiée
      showProgress: false, // Pas de barre ici, tout sera sur la page dédiée
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 rounded-2xl p-12 text-white animate-gradientShift">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-floatDelay"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6 animate-slideDown">
            <Heart className="w-5 h-5 text-pink-200 animate-heartbeat" />
            <span className="text-sm font-medium">Ensemble, bâtissons le Royaume</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp">
            Soutenir Notre Église
          </h1>
          <p className="text-xl text-purple-100 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Votre générosité permet de maintenir nos programmes spirituels, 
            d'entretenir nos bâtiments et de servir notre communauté avec amour.
          </p>
        </div>
      </div>

      {/* Support Ways Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slideUp">
          Comment Soutenir
        </h2>
        <p className="text-gray-600 mb-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
          Découvrez les différentes façons de contribuer à notre mission
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportWays.map((way, index) => {
            const Icon = way.icon;
            return (
              <div
                key={way.title}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scaleIn cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => way.link && navigate(way.link)}
              >
                <div className={`w-16 h-16 ${way.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <Icon className={`w-8 h-8 ${way.iconColor}`} />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:${way.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                  {way.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{way.description}</p>
                
                {/* Barre de progression des dons */}
                {way.showProgress && way.currentAmount && way.goalAmount && (
                  <DonationProgressBar
                    current={way.currentAmount}
                    goal={way.goalAmount}
                    className="mt-4"
                  />
                )}
              </div>
            );
          })}</div>
      </div>

      {/* Bank Information */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 animate-slideUp">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Informations Bancaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Nom du compte</p>
                <p className="font-semibold text-gray-900">ÉGLISE Adventiste DU 7 EME JOUR COMMUNAUTE DE NDOGBONG</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Banque</p>
                <p className="font-semibold text-gray-900">SCB CAMEROUN DOUALA</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">IBAN</p>
                <p className="font-semibold text-gray-900 font-mono text-sm">CM21 1000 2000 8390 0012 2737 440</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">BIC/SWIFT</p>
                <p className="font-semibold text-gray-900">BCMACMCX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 animate-slideUp">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          L'Impact de Votre Générosité
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 animate-float">
              <span className="text-3xl font-bold text-white">250+</span>
            </div>
            <p className="text-gray-700 font-medium">Familles Aidées</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 animate-floatDelay">
              <span className="text-3xl font-bold text-white">50+</span>
            </div>
            <p className="text-gray-700 font-medium">Programmes Actifs</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 animate-float">
              <span className="text-3xl font-bold text-white">100+</span>
            </div>
            <p className="text-gray-700 font-medium">Enfants Éduqués</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-transform duration-500 animate-floatDelay">
              <span className="text-3xl font-bold text-white">15+</span>
            </div>
            <p className="text-gray-700 font-medium">Projets Réalisés</p>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-8 text-white text-center animate-slideUp">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 mx-auto mb-4 animate-spin-slow" />
          <blockquote className="text-xl md:text-2xl font-medium mb-4">
            "Apportez à la maison du trésor toutes les dîmes, 
            afin qu'il y ait de la nourriture dans ma maison"
          </blockquote>
          <p className="text-teal-200">Malachie 3:10</p>
        </div>
      </div>
    </div>
  );
}