import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      setUser(currentUser);

      if (!currentUser) {
        setRole(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // Récupération du rôle
      const { data: roleData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .single();

      setRole(roleData?.role || "member");

      // Récupération du profil membre
      const { data: memberData } = await supabase
        .from("members")
        .select("*")
        .eq("user_id", currentUser.id)
        .maybeSingle();

      setProfile(memberData || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const register = async (email, password) => {
    return await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setUser(null);
    setRole(null);
    setProfile(null);
  };

  // Initiales automatiques
  const initials =
    profile?.full_name
      ?.split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 3) || "";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        loading,

        fullName: profile?.full_name || "",
        photoUrl: profile?.photo_url || "",

        initials,

        login,
        register,
        logout,

        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);