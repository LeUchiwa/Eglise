module.exports = {
  // L'URL de base de votre site (remplacez par la vôtre)
  siteUrl: "https://www.sdandogbong.com", // ⚠️ À modifier

  port: 3005,               // Optionnel, pour le serveur local
  buildDir: "dist",         // Dossier de build (Vite génère "dist")

  routes: [
    {
      path: "/",
      title: "Accueil - SDA NDOGBONG",
      description:
        "Bienvenue dans notre communauté. Explorez nos ressources spirituelles et enrichissez votre foi.",
      image: "93bc27a9d5e76f70e76a70b8aad5e920e580452c.jpg",
    },
    {
      path: "/annonces",
      title: "Annonces - SDA NDOGBONG",
      description: "Campagne d'évangélisation AFRICA FOR CHRIST du 26 avril au 09 mai 2026. La Fédération des Adventistes de l’Ouest Cameroun (FAOC) informe les pasteurs et membres d’Église de la campagne « Africa For Christ », prévue du 26 avril au 9 mai 2026 depuis Lagos (Nigéria), retransmise par satellite et sur les réseaux sociaux.",
      image: "/banner_slide.jpg",
    },
    {
      path: "/Events",
      title: "Événements - SDA NDOGBONG",
      description: "Découvrez tous nos événements à venir (cultes, conférences, rencontres).",
      image: "/og-evenements.png",
    },
    {
      path: "/bible",
      title: "Bible - SDA NDOGBONG",
      description: "Lisez et étudiez la Bible avec nos ressources.",
      image: "/og-bible.png",
    },
    {
      path: "/videos",
      title: "Vidéos - SDA NDOGBONG",
      description: "Regardez nos prédications, témoignages et enseignements en vidéo.",
      image: "/og-videos.png",
    },
    {
      path: "/contact",
      title: "Contact - SDA NDOGBONG",
      description: "Contactez-nous pour toute demande ou prière.",
      image: "/og-contact.png",
    },
  ],
};