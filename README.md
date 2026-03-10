# 🙏 SDA NDOGBONG - Site Web de l'Église

> **À l'ombre du Christ** - Site web officiel de l'Église Adventiste du Septième Jour NDOGBONG

## 🌟 Aperçu

Site web complet avec système de gestion de contenu dynamique pour l'Église Adventiste SDA NDOGBONG. Le site offre des ressources spirituelles, éducatives et permet une gestion facile du contenu sans connaissances techniques.

## 🚀 Démarrage Rapide

### 👤 Vous êtes Administrateur ?
**Commencez ici** : [📖 QUICK_START.md](QUICK_START.md) - Guide de 5 minutes

**Accès rapide** :
- 🔐 [Page de connexion](/login)
- 🎛️ [Backend Dashboard](/backend-dashboard) (nécessite une connexion)
- 👥 [Gestion des admins](/super-admin) (Super Admin uniquement)
- ⚡ [Création rapide GregGweth](/quick-add-admin)

**Identifiants** : Voir [ADMIN_CREDENTIALS.md](ADMIN_CREDENTIALS.md) (fichier confidentiel)

### 👨‍💻 Vous êtes Développeur ?
**Commencez ici** : [🔧 TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)

### ❓ Vous avez une Question ?
**Consultez** : [❓ FAQ.md](FAQ.md) - Questions fréquentes

### 📚 Documentation Complète
**Naviguez** : [📚 DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Index complet

---

## ✨ Fonctionnalités Principales

### 📚 Sections du Site
- **Accueil** - Page d'accueil avec présentation de l'église
- **Bible** - Ressources bibliques et outils d'étude
- **Livres Éducatifs** - Collection de livres pour approfondir la foi
- **Livres pour Enfants** - Ressources adaptées aux jeunes
- **Vidéos** - Sermons et contenus multimédias
- **Magazines** - Publications adventistes
- **Annonces** - Actualités et événements de l'église
- **Soutien** - Page pour soutenir la mission de l'église

### ⚙️ Fonctionnalités Techniques
- ✅ **Contenu dynamique** - Tout le contenu est modifiable via interface admin
- ✅ **Base de données Supabase** - Stockage sécurisé dans le cloud
- ✅ **SEO optimisé** - Métadonnées personnalisables pour chaque page
- ✅ **Design responsive** - Adapté mobile, tablette et desktop
- ✅ **Animations fluides** - Interface moderne et engageante
- ✅ **Backend complet** - API REST pour gérer le contenu

## 📂 Structure du Projet

```
/
├── src/
│   └── app/
│       ├── components/       # Composants React réutilisables
│       │   ├── Layout.tsx    # Layout principal avec navigation
│       │   └── SEO.tsx       # Composant pour métadonnées SEO
│       ├── hooks/
│       │   └── useContent.ts # Hook pour charger le contenu dynamique
│       ├── pages/            # Pages de l'application
│       │   ├── HomeDynamic.tsx   # Page d'accueil (dynamique)
│       │   ├── Admin.tsx         # Panel d'administration
│       │   ├── Bible.tsx
│       │   ├── EducationalBooks.tsx
│       │   └── ...
│       └── routes.tsx        # Configuration React Router
│
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx     # Serveur API Hono
│           └── kv_store.tsx  # Utilitaires base de données
│
├── utils/
│   └── supabase/
│       └── info.tsx          # Identifiants Supabase
│
├── GUIDE_ADMINISTRATION.md   # 📖 Guide pour admins
├── TECHNICAL_OVERVIEW.md     # 🔧 Documentation technique
├── CONTENT_KEYS_REFERENCE.md # 📋 Référence des clés
└── README.md                 # Ce fichier
```

## 🗄️ Base de Données

### Table : `kv_store_d44eb65e`

| Colonne | Type  | Description           |
|---------|-------|-----------------------|
| key     | TEXT  | Identifiant unique    |
| value   | JSONB | Contenu (JSON)        |

**Avantages de cette structure** :
- ✅ Très flexible - Pas besoin de migrations
- ✅ Simple à gérer - Interface admin intuitive
- ✅ Performant - Index sur la clé primaire
- ✅ Évolutif - Facile d'ajouter de nouveaux contenus

## 🔑 Exemples de Clés de Contenu

### SEO
- `seo_home_title` - Titre de la page d'accueil
- `seo_home_description` - Description pour Google
- `seo_home_keywords` - Mots-clés

### Page d'Accueil
- `home_hero_title` - Titre principal
- `home_hero_subtitle` - Sous-titre
- `home_site_name` - Nom du site (SDA NDOGBONG)

### Leadership
- `leadership_1_name` - Nom du premier responsable
- `leadership_1_role` - Fonction
- `leadership_1_description` - Description
- `leadership_1_image` - URL de la photo

📋 **Liste complète** : Consultez [CONTENT_KEYS_REFERENCE.md](CONTENT_KEYS_REFERENCE.md)

## 🛠️ API Endpoints

### Backend Supabase (Hono Server)

**Base URL** : `https://{projectId}.supabase.co/functions/v1/make-server-d44eb65e`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/content` | Récupérer tout le contenu |
| GET | `/content/:section` | Récupérer contenu par section |
| POST | `/content` | Créer/modifier un élément |
| DELETE | `/content/:key` | Supprimer un élément |
| POST | `/content/initialize` | Initialiser le contenu par défaut |

**Exemple de requête** :
```javascript
fetch('https://{projectId}.supabase.co/functions/v1/make-server-d44eb65e/content', {
  headers: {
    'Authorization': 'Bearer {anonKey}'
  }
})
```

## 🎨 Technologies Utilisées

### Frontend
- **React** - Framework UI
- **React Router** - Navigation
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icônes
- **TypeScript** - Typage statique

### Backend
- **Supabase** - Backend as a Service
- **Hono** - Framework web pour Deno
- **Deno** - Runtime JavaScript/TypeScript
- **PostgreSQL** - Base de données

## 📱 Pages Disponibles

| Route | Page | État |
|-------|------|------|
| `/` | Accueil | ✅ Dynamique |
| `/bible` | Bible | ⚠️ Statique |
| `/livres-educatifs` | Livres Éducatifs | ⚠️ Statique |
| `/livres-enfants` | Livres Enfants | ⚠️ Statique |
| `/videos` | Vidéos | ⚠️ Statique |
| `/magazines` | Magazines | ⚠️ Statique |
| `/annonces` | Annonces | ⚠️ Statique |
| `/soutien` | Soutien | ⚠️ Statique |
| `/admin` | Administration | ✅ Fonctionnel |

**✅ Dynamique** : Contenu chargé depuis la base de données  
**⚠️ Statique** : Contenu codé en dur (peut être rendu dynamique)

## 🔐 Sécurité

### ⚠️ Avertissement de Sécurité

**État actuel** : L'interface d'administration est publique !

**Pour la production, vous DEVEZ** :
- [ ] Ajouter un système d'authentification
- [ ] Protéger l'accès à `/admin` par mot de passe
- [ ] Implémenter des rôles (admin, éditeur, etc.)
- [ ] Ajouter des logs d'audit
- [ ] Mettre en place un rate limiting

**Recommandation** : Utilisez Supabase Auth pour sécuriser l'accès.

## 📊 Statistiques du Projet

- **Lignes de code** : ~3,000+
- **Composants React** : 15+
- **Routes API** : 5
- **Clés de contenu** : 60+
- **Pages** : 9

## 🔄 Sauvegarde et Restauration

### Faire une Sauvegarde

1. **Via l'interface Admin** :
   - Allez sur `/admin`
   - Cliquez sur "Actualiser" pour charger tout le contenu
   - Copiez les données affichées

2. **Via script** :
   - Ouvrez `backup_content_example.html` dans un navigateur
   - Cliquez sur "Sauvegarder le Contenu"
   - Un fichier JSON sera téléchargé

### Restaurer

Pour restaurer le contenu par défaut :
1. Allez sur `/admin`
2. Cliquez sur "Initialiser Contenu"
3. Confirmez (⚠️ écrase tout le contenu existant)

## 📚 Documentation

- **[GUIDE_ADMINISTRATION.md](GUIDE_ADMINISTRATION.md)** - Guide complet pour les administrateurs
- **[TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)** - Documentation technique détaillée
- **[CONTENT_KEYS_REFERENCE.md](CONTENT_KEYS_REFERENCE.md)** - Référence de toutes les clés de contenu
- **[backup_content_example.html](backup_content_example.html)** - Outil de sauvegarde

## 🐛 Dépannage

### Le contenu ne se charge pas
1. Vérifiez votre connexion internet
2. Ouvrez la console du navigateur (F12)
3. Cherchez les erreurs dans l'onglet "Console"
4. Vérifiez que Supabase est accessible

### Les modifications ne s'affichent pas
1. Rechargez la page (Ctrl+R ou Cmd+R)
2. Videz le cache (Ctrl+Shift+R ou Cmd+Shift+R)
3. Vérifiez que la sauvegarde a réussi dans l'admin

### Erreur lors de l'initialisation
1. Vérifiez les identifiants Supabase dans `/utils/supabase/info.tsx`
2. Vérifiez que le serveur Edge Function est déployé
3. Consultez les logs Supabase

## 🤝 Contribution

Ce projet est maintenu par l'équipe technique de SDA NDOGBONG.

Pour contribuer :
1. Contactez l'administrateur du site
2. Proposez vos modifications
3. Testez localement avant de déployer

## 📞 Support

- **Email** : contact@eglise-adventiste.org
- **Téléphone** : +33 1 23 45 67 89
- **Adresse** : Église Adventiste SDA NDOGBONG

## 📄 Licence

© 2026 Église Adventiste du Septième Jour NDOGBONG. Tous droits réservés.

---

**Dernière mise à jour** : Février 2026  
**Version** : 1.0.0  
**Développé avec** : ❤️ pour la communauté SDA NDOGBONG