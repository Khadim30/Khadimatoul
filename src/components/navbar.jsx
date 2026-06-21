import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    user,
    role,
    fullName,
    photoUrl,
    initials,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h1 className="font-bold text-green-700 text-lg">
              D.K.K.G
            </h1>

            <p className="text-xs text-gray-500">
              Dara Khidmatoul Khadim Gossas
            </p>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex gap-6 items-center text-gray-700 font-medium">

          <Link
            to="/"
            className="hover:text-green-700 transition"
          >
            Accueil
          </Link>

          <Link
            to="/about"
            className="hover:text-green-700 transition"
          >
            À propos
          </Link>

          <Link
            to="/contact"
            className="hover:text-green-700 transition"
          >
            Contact
          </Link>

          {user && (
            <Link
              to={
                role === "admin"
                  ? "/admin/dashboard"
                  : "/member/dashboard"
              }
              className="hover:text-green-700 transition"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-700 hover:text-white transition"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
              >
                Adhérer
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">

              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={fullName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-700"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                  {initials}
                </div>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Déconnexion
              </button>

            </div>
          )}

        </nav>

        {/* BOUTON MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-green-700"
        >
          ☰
        </button>
      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">

          <Link
            onClick={() => setOpen(false)}
            to="/"
            className="hover:text-green-700"
          >
            Accueil
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/about"
            className="hover:text-green-700"
          >
            À propos
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/contact"
            className="hover:text-green-700"
          >
            Contact
          </Link>

          {user && (
            <Link
              onClick={() => setOpen(false)}
              to={
                role === "admin"
                  ? "/admin/dashboard"
                  : "/member/dashboard"
              }
              className="hover:text-green-700"
            >
              Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/login"
                className="px-4 py-2 border border-green-700 text-green-700 rounded-lg text-center"
              >
                Connexion
              </Link>

              <Link
                onClick={() => setOpen(false)}
                to="/register"
                className="px-4 py-2 bg-green-700 text-white rounded-lg text-center"
              >
                Adhérer
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 border rounded-lg p-3">

                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                    {initials}
                  </div>
                )}

                <div>
                  <p className="font-semibold">
                    {fullName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {role === "admin"
                      ? "Administrateur"
                      : "Membre"}
                  </p>
                </div>

              </div>

              <button
                onClick={async () => {
                  await handleLogout();
                  setOpen(false);
                }}
                className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700"
              >
                Déconnexion
              </button>
            </>
          )}

        </div>
      )}
    </header>
  );
}

