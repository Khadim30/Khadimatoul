import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const { error } = await login(email, password);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setErrorMessage("Utilisateur introuvable.");
      return;
    }

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profileError) {
      setErrorMessage(
        "Impossible de récupérer le profil."
      );
      return;
    }

    if (profile.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/member/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-100"
      >

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/logo.jpeg"
            alt="Logo DKKG"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-600"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Connexion
        </h1>

        <input
          type="email"
          placeholder="Adresse email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        {/* <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        /> */}

        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* Mot de passe oublié */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-green-700 hover:text-green-800 hover:underline text-sm font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold p-3 rounded-lg transition"
        >
          Se connecter
        </button>

        <div className="text-center mt-5">
          <p className="text-gray-600">
            Vous n'avez pas encore de compte ?
          </p>

          <Link
            to="/register"
            className="text-green-700 font-semibold hover:underline"
          >
            Créer un compte
          </Link>
        </div>

      </form>

    </div>
  );
}