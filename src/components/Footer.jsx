import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* COLONNE 1 */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/logo.jpeg"
              alt="Logo DKKG"
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />

            <div>
              <h2 className="text-xl font-bold">
                D.K.K.G
              </h2>

              <p className="text-sm text-green-100">
                Dara Khidmatoul Khadim Gossas
              </p>
            </div>
          </div>

          <p className="text-sm text-green-100">
            Plateforme de gestion des membres et des cotisations du Dahira.
            Une solution moderne, simple et accessible sur mobile.
          </p>
        </div>

        {/* COLONNE 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Liens rapides
          </h3>

          <div className="flex flex-col gap-2 text-green-100">

            <Link
              to="/"
              className="hover:text-white transition"
            >
              Accueil
            </Link>

            <Link
              to="/about"
              className="hover:text-white transition"
            >
              À propos
            </Link>

            <Link
              to="/contact"
              className="hover:text-white transition"
            >
              Contact
            </Link>

            <Link
              to="/login"
              className="hover:text-white transition"
            >
              Connexion
            </Link>

            <Link
              to="/register"
              className="hover:text-white transition"
            >
              Adhérer
            </Link>

          </div>
        </div>

        {/* COLONNE 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Contact
          </h3>

          <p className="text-green-100 text-sm leading-7">
            📍 Gossas, Sénégal <br />
            📞 +221 77 778 97 81 <br />
            ✉️ ibra1852@gmail.com
          </p>

          <a
            href="#"
            className="inline-block mt-4 bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-green-100 transition"
          >
            Rejoindre WhatsApp
          </a>
        </div>

      </div>

      {/* BAS DE PAGE */}
      <div className="border-t border-green-700 text-center py-4 text-sm text-green-100">
        © {new Date().getFullYear()} D.K.K.G - Dara Khidmatoul Khadim Gossas.
        Tous droits réservés.
      </div>

    </footer>
  );
}

