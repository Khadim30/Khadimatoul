// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../../services/supabase";

// export default function Home() {
//   const [membersCount, setMembersCount] = useState(0);
//   const [yearsExistence, setYearsExistence] = useState(0);

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       // Nombre de membres
//       const { count } = await supabase
//         .from("members")
//         .select("*", {
//           count: "exact",
//           head: true,
//         });

//       setMembersCount(count || 0);

//       // Date de création du Dahira
//       const { data: settings } = await supabase
//         .from("settings")
//         .select("dahira_created_at")
//         .single();

//       if (settings?.dahira_created_at) {
//         const creationDate = new Date(
//           settings.dahira_created_at
//         );

//         const today = new Date();

//         let years =
//           today.getFullYear() -
//           creationDate.getFullYear();

//         const anniversary = new Date(
//           today.getFullYear(),
//           creationDate.getMonth(),
//           creationDate.getDate()
//         );

//         if (today < anniversary) {
//           years--;
//         }

//         setYearsExistence(Math.max(0, years));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* HERO */}
//       <section className="bg-green-700 text-white py-20 px-6 text-center">
//         <img
//           src="/logo.jpeg"
//           alt="Logo DKKG"
//           className="w-32 h-32 mx-auto rounded-full border-4 border-white mb-6"
//         />

//         <h1 className="text-4xl md:text-5xl font-bold">
//           DAARA KHIDMATOUL KHADIM GOSSAS
//         </h1>

//         <p className="mt-4 text-lg md:text-xl">
//           Gestion des membres, cotisations et activités
//           du Dahira en toute simplicité
//         </p>

//         <div className="mt-8 flex justify-center gap-4">
//           <Link
//             to="/register"
//             className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition"
//           >
//             Adhérer
//           </Link>

//           <Link
//             to="/login"
//             className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
//           >
//             Connexion
//           </Link>
//         </div>
//       </section>

//       {/* A PROPOS */}
//       <section className="py-16 px-6 max-w-5xl mx-auto text-center">
//         <h2 className="text-3xl font-bold text-green-800">
//           À propos du Dahira
//         </h2>

//         <p className="mt-4 text-gray-600 text-lg leading-relaxed">
//           Le Dahira est une organisation communautaire
//           basée sur la solidarité, la spiritualité et
//           l’entraide. Cette plateforme permet de
//           moderniser la gestion des membres, des
//           cotisations et des activités afin de faciliter
//           le travail des responsables et des membres.
//         </p>
//       </section>

//       {/* STATISTIQUES */}
//       <section className="bg-green-50 py-16 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

//           {/* Membres */}
//           <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
//             <h3 className="text-3xl font-bold text-green-700">
//               {membersCount}
//             </h3>

//             <p className="text-gray-600 mt-2">
//               Membres
//             </p>
//           </div>

//           {/* Activités */}
//           <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
//             <h3 className="text-3xl font-bold text-green-700">
//               25+
//             </h3>

//             <p className="text-gray-600 mt-2">
//               Activités
//             </p>
//           </div>

//           {/* Années d'existence */}
//           <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
//             <h3 className="text-3xl font-bold text-green-700">
//               {yearsExistence}
//             </h3>

//             <p className="text-gray-600 mt-2">
//               Années d’existence
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ACTIVITÉS */}
//       <section className="py-16 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-green-800">
//             Activités récentes
//           </h2>

//           <p className="text-center text-gray-600 mt-3">
//             Découvrez les dernières activités du Dahira
//           </p>

//           <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

//             <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
//               <img
//                 src="https://i.pinimg.com/736x/6a/0d/f4/6a0df4996985851c1b2b1a842b26718a.jpg"
//                 alt="event"
//                 className="w-full h-40 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-bold text-lg text-gray-800">
//                   Réunion mensuelle
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-2">
//                   Rencontre des membres pour discuter
//                   des activités du Dahira.
//                 </p>

//                 <p className="text-green-700 text-sm mt-3 font-semibold">
//                   15 Mars 2026
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
//               <img
//                 src="https://i.pinimg.com/736x/50/ab/35/50ab35638d609cf875f9e795e07e1fa2.jpg"
//                 alt="event"
//                 className="w-full h-40 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-bold text-lg text-gray-800">
//                   Conférence religieuse
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-2">
//                   Enseignements et échanges autour des
//                   valeurs du Dahira.
//                 </p>

//                 <p className="text-green-700 text-sm mt-3 font-semibold">
//                   22 Avril 2026
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
//               <img
//                 src="https://i.pinimg.com/736x/c0/05/35/c005358469afe08994fefd3cd700852d.jpg"
//                 alt="event"
//                 className="w-full h-40 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-bold text-lg text-gray-800">
//                   Action communautaire
//                 </h3>

//                 <p className="text-gray-600 text-sm mt-2">
//                   Activité de solidarité et d'entraide
//                   entre membres.
//                 </p>

//                 <p className="text-green-700 text-sm mt-3 font-semibold">
//                   30 Mai 2026
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }







import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Home() {
  const [membersCount, setMembersCount] = useState(0);
  const [yearsExistence, setYearsExistence] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Nombre de membres
      const { count, error: membersError } = await supabase
        .from("members")
        .select("*", {
          count: "exact",
          head: true,
        });

      if (membersError) {
        console.error("Erreur membres :", membersError);
      } else {
        setMembersCount(count || 0);
      }

      // Paramètres du Dahira
      const { data, error } = await supabase
        .from("settings")
        .select("dahira_created_at")
        .limit(1);

      console.log("SETTINGS :", data);
      console.log("ERROR :", error);

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        const creationDate = new Date(
          data[0].dahira_created_at
        );

        const today = new Date();

        let years =
          today.getFullYear() -
          creationDate.getFullYear();

        const anniversary = new Date(
          today.getFullYear(),
          creationDate.getMonth(),
          creationDate.getDate()
        );

        if (today < anniversary) {
          years--;
        }

        setYearsExistence(Math.max(0, years));
      }
    } catch (error) {
      console.error("Erreur générale :", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-green-700 text-white py-20 px-6 text-center">
        <img
          src="/logo.jpeg"
          alt="Logo DKKG"
          className="w-32 h-32 mx-auto rounded-full border-4 border-white mb-6"
        />

        <h1 className="text-4xl md:text-5xl font-bold">
          DAARA KHIDMATOUL KHADIM GOSSAS
        </h1>

        <p className="mt-4 text-lg md:text-xl">
          Gestion des membres, cotisations et activités
          du Dahira en toute simplicité
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-100 transition"
          >
            Adhérer
          </Link>

          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
          >
            Connexion
          </Link>
        </div>
      </section>

      {/* A PROPOS */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800">
          À propos du Dahira
        </h2>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Le Dahira est une organisation communautaire basée sur la solidarité,
          la spiritualité et l’entraide. Cette plateforme permet de moderniser
          la gestion des membres, des cotisations et des activités.
        </p>
      </section>

      {/* STATISTIQUES */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

          {/* Membres */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-green-700">
              {membersCount}
            </h3>

            <p className="text-gray-600 mt-2">
              Membres
            </p>
          </div>

          {/* Activités */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-green-700">
              25+
            </h3>

            <p className="text-gray-600 mt-2">
              Activités
            </p>
          </div>

          {/* Années d'existence */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-3xl font-bold text-green-700">
              {yearsExistence}
            </h3>

            <p className="text-gray-600 mt-2">
              Années d’existence
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}