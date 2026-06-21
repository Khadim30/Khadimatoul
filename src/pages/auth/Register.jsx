import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const result = await register(
        email,
        password
      );

      if (result.error) {
        setErrorMessage(
          result.error.message
        );
        return;
      }

      alert(
        "Compte créé avec succès !"
      );

      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 px-4">

      <form
        onSubmit={handleRegister}
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
          Inscription
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

        <div className="relative mb-4">
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold p-3 rounded-lg transition disabled:opacity-50"
        >
          {loading
            ? "Inscription..."
            : "S'inscrire"}
        </button>

      </form>

    </div>
  );
}

