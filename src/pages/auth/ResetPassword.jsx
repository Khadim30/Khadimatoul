import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage(
        "❌ Le lien de réinitialisation a expiré. Veuillez demander un nouveau lien."
      );
    }

    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(
        "❌ Impossible de modifier le mot de passe."
      );
    } else {
      setMessage(
        "✅ Mot de passe modifié avec succès."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Vérification...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          Nouveau mot de passe
        </h1>

        {/* <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        /> */}

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 pr-12 rounded-lg"
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

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Modifier
        </button>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}