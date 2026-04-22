import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Bible } from "./pages/Bible";
import { EducationalBooks } from "./pages/EducationalBooks";
import { ChildrenBooks } from "./pages/ChildrenBooks";
import { Videos } from "./pages/Videos";
import { Magazines } from "./pages/Magazines";
import { Announcements } from "./pages/Announcements";
import { Support } from "./pages/Support";
import { ConstructionProjects } from "./pages/ConstructionProjects";
import { AdminPrivate } from "./pages/AdminPrivate";
import { Login } from "./pages/Login";
import { DebugAdmin } from "./pages/DebugAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminConstruction } from "./pages/AdminConstruction";
import { SuperAdmin } from "./pages/SuperAdmin";
import { Contact } from "./pages/Contact";
import { BackendDashboard } from "./pages/BackendDashboard";
import { QuickAddAdmin } from "./pages/QuickAddAdmin";
import { TithesStats } from "./pages/TithesStats";
import { ContentDashboard } from './pages/ContentDashboard';
import { Events } from './pages/Events'; // ✅ CHEMIN CORRECT : pages/Events
import { EventManager } from './components/admin/EventManager'; // ✅ Chemin vers le composant admin

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/debug-admin",
    element: <DebugAdmin />,
  },
  {
    path: "/quick-add-admin",
    element: <QuickAddAdmin />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "bible", element: <Bible /> },
      { path: "livres-educatifs", element: <EducationalBooks /> },
      { path: "livres-enfants", element: <ChildrenBooks /> },
      { path: "videos", element: <Videos /> },
      { path: "magazines", element: <Magazines /> },
      { path: "annonces", element: <Announcements /> },
      { path: "soutien", element: <Support /> },
      { path: "projets-construction", element: <ConstructionProjects /> },
      { path: "contact", element: <Contact /> },
      { path: "events", element: <Events /> }, // Route publique pour les événements
    ],
  },
  // Routes protégées (en dehors de Layout)
  {
    path: "dimes-offrandes",
    element: (
      <ProtectedRoute>
        <TithesStats />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminPrivate />
      </ProtectedRoute>
    ),
  },
  {
    path: "admin-construction",
    element: (
      <ProtectedRoute>
        <AdminConstruction />
      </ProtectedRoute>
    ),
  },
  {
    path: "super-admin",
    element: (
      <ProtectedRoute>
        <SuperAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "backend-dashboard",
    element: (
      <ProtectedRoute>
        <BackendDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "content-dashboard",
    element: (
      <ProtectedRoute>
        <ContentDashboard />
      </ProtectedRoute>
    ),
  },
  // Route admin pour la gestion des événements
  {
    path: "admin/events",
    element: (
      <ProtectedRoute>
        <EventManager />
      </ProtectedRoute>
    ),
  },
]);