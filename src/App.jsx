// import AppRoutes from "./routes/AppRoutes";

// export default function App() {
//   return <AppRoutes />;
// }

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;