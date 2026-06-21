
// import { Outlet, NavLink } from "react-router-dom";
// import { useState } from "react";

// export default function AdminLayout() {
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
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
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
//         <div className="flex justify-between items-center mb-8 border-b border-blue-500 pb-4">
//           <h2 className="text-2xl font-bold">
//             Admin
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
//             to="/admin/dashboard"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/admin/requests"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Demandes
//           </NavLink>

//           <NavLink
//             to="/admin/members"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Membres
//           </NavLink>

//           <NavLink
//             to="/admin/contributions"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Cotisations
//           </NavLink>

//           <NavLink
//             to="/admin/events"
//             className={linkClass}
//             onClick={() => setMenuOpen(false)}
//           >
//             Événements
//           </NavLink>

//         </nav>
//       </aside>

//       {/* Contenu principal */}
//       <main className="flex-1 p-4 md:p-6">
//         <Outlet />
//       </main>

//     </div>
//   );
// }




import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block p-3 rounded-lg transition duration-200 ${
      isActive
        ? "bg-green-800 text-white font-semibold shadow"
        : "text-white hover:bg-green-700"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Bouton menu mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="bg-green-700 text-white px-3 py-2 rounded-lg shadow-lg"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-green-700 text-white
          w-64 min-h-screen
          p-5 shadow-xl
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-green-600 pb-4">

          <div>
            <h2 className="text-2xl font-bold">
              Administration
            </h2>

            <p className="text-green-100 text-sm">
              D.K.K.G
            </p>
          </div>

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
            to="/admin/dashboard"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/requests"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            📩 Demandes d'adhésion
          </NavLink>

          <NavLink
            to="/admin/members"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            👥 Membres
          </NavLink>

          <NavLink
            to="/admin/contributions"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            💰 Cotisations
          </NavLink>

          <NavLink
            to="/admin/events"
            className={linkClass}
            onClick={() => setMenuOpen(false)}
          >
            📅 Événements
          </NavLink>

        </nav>

        {/* Footer Sidebar */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-green-800 rounded-lg p-3 text-center text-sm text-green-100">
            Daara Khidmatoul Khadim Gossas
          </div>
        </div>

      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>

    </div>
  );
}

