// IMPORTANT : Charger les polyfills EN PREMIER pour intercepter tous les appels
import './polyfills';

// Diagnostics (pour debugging - voir console)
import './app/utils/diagnostics';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

// Gestion globale des erreurs pour éviter les blocages
window.addEventListener('error', (event) => {
  if (event.message && (
    event.message.includes('Failed to fetch') ||
    event.message.includes('NetworkError') ||
    event.message.includes('Load failed')
  )) {
    console.warn('⚠️ Resource fetch warning (non-blocking):', event.message);
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

// Gestion des promesses rejetées non gérées
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason) {
    const message = event.reason.message || String(event.reason);
    if (message.includes('Failed to fetch') || 
        message.includes('NetworkError') ||
        message.includes('Load failed')) {
      console.warn('⚠️ Promise rejection warning (non-blocking):', message);
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }
});

// Désactiver les logs de service worker s'ils existent
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  }).catch(() => {});
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Rendu avec gestion d'erreur supplémentaire
try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ Application SDA NDOGBONG initialisée avec succès');
} catch (error) {
  console.error('❌ Erreur critique lors du rendu:', error);
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; font-family: system-ui;">
      <h1 style="color: #dc2626; margin-bottom: 1rem;">Erreur de chargement</h1>
      <p style="color: #6b7280;">L'application n'a pas pu démarrer. Veuillez rafraîchir la page.</p>
      <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
        Rafraîchir
      </button>
    </div>
  `;
}