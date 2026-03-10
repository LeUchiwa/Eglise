import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  // Gérer les requêtes OPTIONS (preflight CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      }
    })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname.replace("/functions/v1/make-server-d44eb65e", "")

    console.log("📥 Requête reçue:", {
      method: req.method,
      path: path,
      headers: Object.fromEntries(req.headers)
    })

    // Route racine - pour tester (sans auth)
    if (path === "" || path === "/") {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Fonction Edge déployée",
        version: "v2",
        endpoints: ["/content", "/content/:id"]
      }), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
    }

    // Route /content - pour gérer les contenus (sans auth)
    if (path === "/content") {
      if (req.method === "POST") {
        const data = await req.json().catch(() => ({}))
        return new Response(JSON.stringify({ 
          success: true, 
          message: "Contenu créé avec succès",
          data: data,
          id: crypto.randomUUID()
        }), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
      }
      
      if (req.method === "GET") {
        return new Response(JSON.stringify({ 
          success: true, 
          items: [],
          message: "Liste des contenus"
        }), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        })
      }
    }

    // Route non trouvée
    return new Response(JSON.stringify({ error: "Not found" }), { 
      status: 404,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
  } catch (error) {
    console.error("❌ Erreur:", error)
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
})