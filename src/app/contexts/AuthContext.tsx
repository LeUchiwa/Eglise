import { createContext, useContext, useState, ReactNode } from "react";
import { projectId } from "../../../utils/supabase/info";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d44eb65e`;

  const login = async (email: string, password: string) => {
    console.log("🔐 Attempting login for:", email);
    console.log("📍 API endpoint:", `${API_BASE}/auth/login`);
    
    try {
      console.log("📤 Sending login request...");
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("📥 Response received");
      console.log("   Status:", response.status);
      console.log("   Status Text:", response.statusText);
      console.log("   OK:", response.ok);
      console.log("   Headers:", Object.fromEntries(response.headers.entries()));

      let data;
      let responseText;
      try {
        responseText = await response.text();
        console.log("📦 Raw response text:", responseText);
        
        if (!responseText) {
          console.error("❌ Empty response from server");
          throw new Error("Réponse vide du serveur");
        }
        
        data = JSON.parse(responseText);
        console.log("📦 Parsed response data:", JSON.stringify(data, null, 2));
      } catch (jsonError) {
        console.error("❌ Failed to parse JSON response:", jsonError);
        console.error("❌ Response text was:", responseText);
        throw new Error(`Réponse invalide du serveur: ${responseText?.substring(0, 100)}`);
      }

      if (!response.ok) {
        const errorMessage = data?.error || `Erreur HTTP ${response.status}: ${response.statusText}`;
        console.error("❌ Login failed - response not OK");
        console.error("   Status:", response.status);
        console.error("   Error from server:", errorMessage);
        console.error("   Full response:", data);
        throw new Error(errorMessage);
      }

      if (!data.success) {
        const errorMessage = data?.error || "Identifiants incorrects";
        console.error("❌ Login failed - success is false");
        console.error("   Error from server:", errorMessage);
        console.error("   Full response:", data);
        throw new Error(errorMessage);
      }

      if (!data.user || !data.session?.access_token) {
        console.error("❌ Login failed - missing user or session data");
        console.error("   User:", data.user);
        console.error("   Session:", data.session);
        throw new Error("Données de session invalides");
      }

      console.log("✅ Login successful!");
      console.log("   User:", data.user);
      console.log("   Access token:", data.session.access_token?.substring(0, 20) + "...");

      setUser(data.user);
      setAccessToken(data.session.access_token);
    } catch (error: any) {
      console.error("❌ Login error:", error);
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}