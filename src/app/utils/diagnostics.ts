/**
 * Outils de diagnostic pour identifier les problèmes de chargement
 */

let fetchCallCount = 0;
const fetchCalls: Array<{ url: string; timestamp: number; stack?: string }> = [];

/**
 * Active le mode diagnostic pour tracer tous les appels fetch
 */
export function enableFetchDiagnostics() {
  const originalFetch = window.fetch;
  
  (window as any).__originalFetch = originalFetch;
  
  window.fetch = async function (...args: Parameters<typeof fetch>): Promise<Response> {
    const url = typeof args[0] === 'string' ? args[0] : args[0].toString();
    const callInfo = {
      url,
      timestamp: Date.now(),
      stack: new Error().stack,
    };
    
    fetchCalls.push(callInfo);
    fetchCallCount++;
    
    console.log(`📡 Fetch #${fetchCallCount}:`, url);
    
    try {
      const response = await originalFetch(...args);
      console.log(`✅ Fetch #${fetchCallCount} succeeded:`, url, response.status);
      return response;
    } catch (error) {
      console.error(`❌ Fetch #${fetchCallCount} failed:`, url, error);
      throw error;
    }
  };
  
  console.log('🔍 Diagnostics activés - Tous les appels fetch seront tracés');
}

/**
 * Retourne le rapport de tous les appels fetch
 */
export function getFetchReport() {
  return {
    totalCalls: fetchCallCount,
    calls: fetchCalls,
  };
}

/**
 * Affiche le rapport dans la console
 */
export function printFetchReport() {
  console.group('📊 Rapport des appels fetch');
  console.log(`Total d'appels: ${fetchCallCount}`);
  console.table(fetchCalls.map(({ url, timestamp }) => ({
    URL: url,
    Time: new Date(timestamp).toISOString(),
  })));
  console.groupEnd();
}

/**
 * Active le mode diagnostic si en développement
 */
if (import.meta.env.DEV) {
  // Activer automatiquement en mode développement
  // Commenter cette ligne si vous ne voulez pas de logs
  // enableFetchDiagnostics();
}

// Exposer les fonctions dans la console pour debugging manuel
(window as any).__fetchDiagnostics = {
  enable: enableFetchDiagnostics,
  report: getFetchReport,
  print: printFetchReport,
};

console.log('💡 Diagnostics disponibles via window.__fetchDiagnostics');
