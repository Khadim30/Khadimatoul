// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/public/Home";
// import About from "../pages/public/About";
// import Contact from "../pages/public/Contact";

// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";

// import DashboardMember from "../pages/member/Dashboard";
// import Profile from "../pages/member/Profile";
// import ContributionsMember from "../pages/member/Contributions";
// import Membership from "../pages/member/Membership";

// import DashboardAdmin from "../pages/admin/Dashboard";
// import MembershipRequests from "../pages/admin/MembershipRequests";
// import Members from "../pages/admin/Members";
// import ContributionsAdmin from "../pages/admin/Contributions";
// import Events from "../pages/admin/Events";

// import MemberLayout from "../layouts/MemberLayout";
// import AdminLayout from "../layouts/AdminLayout";
// import PublicLayout from "../layouts/PublicLayout";

// // 🔐 NEW ROUTES (ROLE SYSTEM)
// import MemberRoute from "../routes/MemberRoute";
// import AdminRoute from "../routes/AdminRoute";
// import MemberDetails from "../pages/admin/MemberDetails";

// export default function AppRoutes() {
//   return (
//     <Routes>

//       {/* 🌐 PUBLIC */}
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Route>

//       {/* 🔐 AUTH */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* 👤 MEMBER (ONLY MEMBER) */}
//       <Route
//         element={
//           <MemberRoute>
//             <MemberLayout />
//           </MemberRoute>
//         }
//       >
//         <Route path="/member/dashboard" element={<DashboardMember />} />
//         <Route path="/member/profile" element={<Profile />} />
//         <Route path="/member/contributions" element={<ContributionsMember />} />
//         <Route path="/member/membership" element={<Membership />} />
//       </Route>

//       {/* 🔐 ADMIN (ONLY ADMIN) */}
//       <Route
//         element={
//           <AdminRoute>
//             <AdminLayout />
//           </AdminRoute>
//         }
//       >
//         <Route path="/admin/dashboard" element={<DashboardAdmin />} />
//         <Route path="/admin/requests" element={<MembershipRequests />} />
//         <Route path="/admin/members" element={<Members />} />
//         <Route path="/admin/members/:id" element={<MemberDetails />}/>
//         <Route path="/admin/contributions" element={<ContributionsAdmin />} />
//         <Route path="/admin/events" element={<Events />} />
//       </Route>

//     </Routes>
//   );
// }






import { Routes, Route } from "react-router-dom";

// PUBLIC
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// AUTH
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// MEMBER
import DashboardMember from "../pages/member/Dashboard";
import Profile from "../pages/member/Profile";
import ContributionsMember from "../pages/member/Contributions";
import Membership from "../pages/member/Membership";

// ADMIN
import DashboardAdmin from "../pages/admin/Dashboard";
import MembershipRequests from "../pages/admin/MembershipRequests";
import Members from "../pages/admin/Members";
import MemberDetails from "../pages/admin/MemberDetails";
import ContributionsAdmin from "../pages/admin/Contributions";
import Events from "../pages/admin/Events";

// LAYOUTS
import PublicLayout from "../layouts/PublicLayout";
import MemberLayout from "../layouts/MemberLayout";
import AdminLayout from "../layouts/AdminLayout";

// ROUTE PROTECTION
import MemberRoute from "../routes/MemberRoute";
import AdminRoute from "../routes/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* 🌐 PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* 👤 ESPACE MEMBRE */}
      <Route
        element={
          <MemberRoute>
            <MemberLayout />
          </MemberRoute>
        }
      >
        <Route
          path="/member/dashboard"
          element={<DashboardMember />}
        />

        <Route
          path="/member/profile"
          element={<Profile />}
        />

        <Route
          path="/member/contributions"
          element={<ContributionsMember />}
        />

        <Route
          path="/member/membership"
          element={<Membership />}
        />
      </Route>

      {/* 🔐 ESPACE ADMIN */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          path="/admin/dashboard"
          element={<DashboardAdmin />}
        />

        <Route
          path="/admin/requests"
          element={<MembershipRequests />}
        />

        <Route
          path="/admin/members"
          element={<Members />}
        />

        <Route
          path="/admin/members/:id"
          element={<MemberDetails />}
        />

        <Route
          path="/admin/contributions"
          element={<ContributionsAdmin />}
        />

        <Route
          path="/admin/events"
          element={<Events />}
        />
      </Route>

    </Routes>
  );
}