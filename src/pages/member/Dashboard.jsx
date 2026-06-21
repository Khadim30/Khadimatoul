
import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { FaWhatsapp } from "react-icons/fa";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default function Dashboard() {
  const [member, setMember] = useState(null);
  const [contribution, setContribution] = useState(null);
  const [whatsappLink, setWhatsappLink] = useState("");

  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Récupération du membre
      const { data: memberData, error: memberError } =
        await supabase
          .from("members")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (memberError) {
        console.error(memberError);
        setLoading(false);
        return;
      }

      setMember(memberData);

      // Récupération des cotisations
      const {
        data: contributionData,
        error: contributionError,
      } = await supabase
        .from("contributions")
        .select("*")
        .eq("member_id", memberData.id)
        .eq("year", currentYear)
        .single();

      if (!contributionError) {
        setContribution(contributionData);
      }

      // Récupération du lien WhatsApp
      const { data: settings } = await supabase
        .from("settings")
        .select("whatsapp_link")
        .single();

      if (settings) {
        setWhatsappLink(settings.whatsapp_link);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        Chargement...
      </div>
    );
  }

  const paidMonths = contribution
    ? months.filter((month) => contribution[month]).length
    : 0;

  const percentage = Math.round(
    (paidMonths / 12) * 100
  );

  return (
    <div className="p-4 md:p-6">
      {/* Bienvenue */}
      <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          Bonjour {member?.full_name || "Membre"} 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Bienvenue dans votre espace membre.
        </p>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <h2 className="text-gray-500 mb-2">
            Statut
          </h2>

          <p className="text-2xl font-bold text-green-600">
            Actif ✅
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <h2 className="text-gray-500 mb-2">
            Cotisations
          </h2>

          <p className="text-2xl font-bold text-green-700">
            {paidMonths} / 12
          </p>

          <p className="text-gray-500">
            mois payés
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <h2 className="text-gray-500 mb-2">
            Progression
          </h2>

          <p className="text-2xl font-bold text-green-700">
            {percentage}%
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
          <h2 className="text-gray-500 mb-2">
            Année
          </h2>

          <p className="text-2xl font-bold text-green-700">
            {currentYear}
          </p>
        </div>
      </div>

      {/* Progression */}
      <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          Progression des cotisations
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
          <div
            className="bg-green-600 h-5 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-3 text-gray-600">
          {paidMonths} mois sur 12 payés
        </p>
      </div>

      {/* WhatsApp */}
      {whatsappLink && (
        <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 mt-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">
            Groupe WhatsApp du Dahira
          </h2>

          <p className="text-gray-600 mb-4">
            Rejoignez le groupe officiel du Dahira pour recevoir toutes les informations importantes.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>
      )}
    </div>
  );
}