
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const results = members.filter((member) =>
      member.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredMembers(results);
  }, [search, members]);

  const fetchMembers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("joined_at", { ascending: false });

    if (!error) {
      setMembers(data);
      setFilteredMembers(data);
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

  return (
    <div className="p-4 md:p-6">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">
          Membres
        </h1>

        <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Total : {members.length}
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un membre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6">
          Aucun membre trouvé.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {member.full_name}
                  </h2>

                  <p className="text-gray-600">
                    {member.phone}
                  </p>
                </div>

                <Link
                  to={`/admin/members/${member.id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Voir plus
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}