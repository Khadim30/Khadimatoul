import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function MemberDetails() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setMember(data);
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

  if (!member) {
    return (
      <div className="p-6">
        Membre introuvable.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">

      <Link
        to="/admin/members"
        className="inline-block mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
      >
        ← Retour
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">

        <div className="flex flex-col md:flex-row gap-6 items-center">

          <img
            src={member.photo_url}
            alt={member.full_name}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-600"
          />

          <div className="flex-1">

            <h1 className="text-3xl font-bold text-green-700 mb-4">
              {member.full_name}
            </h1>

            <div className="space-y-3 text-gray-700">

              <p>
                <strong className="text-green-700">
                  Email :
                </strong>{" "}
                {member.email}
              </p>

              <p>
                <strong className="text-green-700">
                  Téléphone :
                </strong>{" "}
                {member.phone}
              </p>

              <p>
                <strong className="text-green-700">
                  Adresse :
                </strong>{" "}
                {member.address}
              </p>

              <p>
                <strong className="text-green-700">
                  Date d'adhésion :
                </strong>{" "}
                {new Date(
                  member.joined_at
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}