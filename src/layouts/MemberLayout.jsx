
// import { Outlet, NavLink } from "react-router-dom";
// import { useState } from "react";

// export default function MemberLayout() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const linkClass = ({ isActive }) =>
//     `block p-3 rounded-lg transition duration-200 ${
//       isActive
//         ? "bg-blue-800 text-white font-semibold"
//         : "text-white hover:bg-blue-700"
//     }`;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Overlay mobile */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Bouton menu mobile */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setMenuOpen(true)}
//           className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`
//           bg-blue-600 text-white
//           w-64 min-h-screen
//           p-5 shadow-lg
//           fixed md:relative
//           z-50
//           transition-transform duration-300
//           ${
//             menuOpen
//               ? "translate-x-0"
//               : "-translate-x-full md:translate-x-0"
//           }
//         `}
//       >
//         {/* Titre */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">
//             Espace Membre
//           </h2>

//           <button
//             className="md:hidden text-2xl"
//             onClick={() => setMenuOpen(false)}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-3">
//           <NavLink
//             to="/member/dashboard"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/member/profile"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Profil
//           </NavLink>

//           <NavLink
//             to="/member/contributions"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Cotisations
//           </NavLink>

//           <NavLink
//             to="/member/membership"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Adhésion
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Contenu principal */}
//       <main className="flex-1 p-4 md:p-6 md:ml-0">
//         <Outlet />
//       </main>
//     </div>
//   );
// }




import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

export default function MemberLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block p-3 rounded-lg transition duration-200 ${
      isActive
        ? "bg-green-800 text-white font-semibold"
        : "text-white hover:bg-green-700"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Bouton menu mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-green-700 text-white px-3 py-2 rounded-lg shadow"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-green-700 text-white
          w-64 min-h-screen
          p-5 shadow-lg
          fixed md:relative
          z-50
          transition-transform duration-300
          ${
            menuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Titre */}
        <div className="flex justify-between items-center mb-8 border-b border-green-600 pb-4">
          <h2 className="text-2xl font-bold">
            Espace Membre
          </h2>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">

          <NavLink
            to="/member/dashboard"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/member/profile"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Profil
          </NavLink>

          <NavLink
            to="/member/contributions"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Cotisations
          </NavLink>

          <NavLink
            to="/member/membership"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            Adhésion
          </NavLink>

        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-6 md:ml-0">
        <Outlet />
      </main>

    </div>
  );
}

