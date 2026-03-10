/**
 * Polyfills et patches pour assurer la compatibilité avec l'environnement Figma Make
 */

// Sauvegarder la fonction fetch originale
const originalFetch = window.fetch;

// Wrapper autour de fetch pour éviter les blocages
window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  try {
    // Ajouter un timeout de 15 secondes pour éviter les blocages
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const modifiedInit = {
      ...init,
      signal: init?.signal || controller.signal,
    };

    const response = await originalFetch(input, modifiedInit);
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    // Si l'erreur est liée au réseau, retourner une réponse vide au lieu de throw
    if (
      error.name === 'AbortError' ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('NetworkError') ||
      error.message?.includes('Load failed')
    ) {
      console.warn(
        `⚠️ Fetch interception (non-blocking): ${typeof input === 'string' ? input : input.toString()}`,
        error.message
      );
      
      // Retourner une réponse 503 mockée au lieu de throw
      return new Response(JSON.stringify({ error: 'Network unavailable', success: false }), {
        status: 503,
        statusText: 'Service Temporarily Unavailable',
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Pour les autres erreurs, les relancer
    throw error;
  }
};

// Supprimer les logs inutiles en production
if (import.meta.env.PROD) {
  const noop = () => {};
  
  // Garder console.error et console.warn mais supprimer les autres
  if (console.debug) {
    console.debug = noop;
  }
  if (console.trace) {
    console.trace = noop;
  }
}

console.log('✅ Polyfills chargés - Environnement sécurisé');
