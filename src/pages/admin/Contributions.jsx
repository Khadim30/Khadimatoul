import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const months = [
  { label: "J", field: "january" },
  { label: "F", field: "february" },
  { label: "M", field: "march" },
  { label: "A", field: "april" },
  { label: "M", field: "may" },
  { label: "J", field: "june" },
  { label: "J", field: "july" },
  { label: "A", field: "august" },
  { label: "S", field: "september" },
  { label: "O", field: "october" },
  { label: "N", field: "november" },
  { label: "D", field: "december" },
];

export default function Contributions() {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] =
    useState(currentYear);

  const [contributions, setContributions] =
    useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const years = [];

  for (
    let year = currentYear - 2;
    year <= currentYear + 10;
    year++
  ) {
    years.push(year);
  }

  useEffect(() => {
    fetchContributions();
  }, [selectedYear]);

  useEffect(() => {
    const results = contributions.filter((item) =>
      item.members?.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(results);
  }, [search, contributions]);

  const createMissingContributions =
    async () => {
      const { data: members } = await supabase
        .from("members")
        .select("id");

      const { data: existing } =
        await supabase
          .from("contributions")
          .select("member_id")
          .eq("year", selectedYear);

      const existingIds =
        existing?.map(
          (item) => item.member_id
        ) || [];

      const missingMembers =
        members?.filter(
          (member) =>
            !existingIds.includes(member.id)
        ) || [];

      if (missingMembers.length > 0) {
        const rows = missingMembers.map(
          (member) => ({
            member_id: member.id,
            year: selectedYear,
          })
        );

        await supabase
          .from("contributions")
          .insert(rows);
      }
    };

  const fetchContributions = async () => {
    try {
      setLoading(true);

      await createMissingContributions();

      const { data, error } = await supabase
        .from("contributions")
        .select(`
          *,
          members (
            id,
            full_name,
            phone
          )
        `)
        .eq("year", selectedYear)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setContributions(data || []);
      setFiltered(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMonth = async (
    contributionId,
    month,
    currentValue
  ) => {
    try {
      const { error } = await supabase
        .from("contributions")
        .update({
          [month]: !currentValue,
        })
        .eq("id", contributionId);

      if (error) {
        console.error(error);
        return;
      }

      fetchContributions();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Chargement...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">

        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          Cotisations {selectedYear}
        </h1>

        <div className="bg-green-700 text-white px-4 py-2 rounded-lg">
          Membres : {filtered.length}
        </div>

      </div>

      {/* ANNÉE */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Année
        </label>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              Number(e.target.value)
            )
          }
          className="w-full md:w-64 border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
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

      {/* RECHERCHE */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">

        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            Aucun membre trouvé
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4"
            >
              <h2 className="font-bold text-lg mb-4">
                {item.members?.full_name}
              </h2>

              <div className="grid grid-cols-3 gap-3">

                {months.map((month) => (
                  <button
                    key={month.field}
                    onClick={() =>
                      toggleMonth(
                        item.id,
                        month.field,
                        item[month.field]
                      )
                    }
                    className="border rounded-lg p-3 flex flex-col items-center"
                  >
                    <span className="font-semibold">
                      {month.label}
                    </span>

                    <span
                      className={
                        item[month.field]
                          ? "text-green-600 text-xl"
                          : "text-red-600 text-xl"
                      }
                    >
                      {item[month.field]
                        ? "✅"
                        : "❌"}
                    </span>
                  </button>
                ))}

              </div>
            </div>
          ))
        )}

      </div>

      {/* DESKTOP */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead>
            <tr className="bg-green-50">

              <th className="p-3 text-left">
                Membre
              </th>

              {months.map((month) => (
                <th
                  key={month.field}
                  className="p-3 text-center"
                >
                  {month.label}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={13}
                  className="text-center p-6 text-gray-500"
                >
                  Aucun membre trouvé
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-3 font-medium">
                    {item.members?.full_name}
                  </td>

                  {months.map((month) => (
                    <td
                      key={month.field}
                      className="p-3 text-center"
                    >
                      <button
                        onClick={() =>
                          toggleMonth(
                            item.id,
                            month.field,
                            item[month.field]
                          )
                        }
                        className={
                          item[month.field]
                            ? "text-green-600 text-2xl"
                            : "text-red-600 text-2xl"
                        }
                      >
                        {item[month.field]
                          ? "✅"
                          : "❌"}
                      </button>
                    </td>
                  ))}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}