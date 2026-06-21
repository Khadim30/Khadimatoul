import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "https://khadimatoul.vercel.app/reset-password",
        }
      );

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "✅ Un lien de réinitialisation a été envoyé à votre adresse email."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form
        onSubmit={handleReset}
        className="bg-white shadow rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          Mot de passe oublié
        </h1>

        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg"
        >
          Envoyer le lien
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