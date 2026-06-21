import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const months = [
  { label: "Janvier", field: "january" },
  { label: "Février", field: "february" },
  { label: "Mars", field: "march" },
  { label: "Avril", field: "april" },
  { label: "Mai", field: "may" },
  { label: "Juin", field: "june" },
  { label: "Juillet", field: "july" },
  { label: "Août", field: "august" },
  { label: "Septembre", field: "september" },
  { label: "Octobre", field: "october" },
  { label: "Novembre", field: "november" },
  { label: "Décembre", field: "december" },
];

export default function MyContributions() {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] =
    useState(currentYear);

  const [contribution, setContribution] =
    useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContribution();
  }, [selectedYear]);

  const fetchContribution = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Trouver le membre connecté
      const { data: member } = await supabase
        .from("members")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!member) return;

      // Chercher ses cotisations
      const { data } = await supabase
        .from("contributions")
        .select("*")
        .eq("member_id", member.id)
        .eq("year", selectedYear)
        .single();

      setContribution(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const years = [];

  for (
    let year = currentYear - 2;
    year <= currentYear + 5;
    year++
  ) {
    years.push(year);
  }

  if (loading) {
    return (
      <div className="p-6">
        Chargement...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold">
          Mes cotisations
        </h1>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(Number(e.target.value))
          }
          className="border rounded-lg p-3"
        >
          {years.map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

      </div>

      {!contribution ? (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          Aucune cotisation trouvée pour {selectedYear}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow">

          {months.map((month) => (
            <div
              key={month.field}
              className="flex justify-between items-center border-b p-4"
            >
              <span className="font-medium">
                {month.label}
              </span>

              <span
                className={
                  contribution[month.field]
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {contribution[month.field]
                  ? "✅ Payé"
                  : "❌ Non payé"}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}