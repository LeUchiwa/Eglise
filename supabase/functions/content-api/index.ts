import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  return new Response(JSON.stringify({ 
    success: true, 
    data: [],
    message: "API Content OK"
  }), { headers });
});