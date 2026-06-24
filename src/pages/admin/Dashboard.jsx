import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


export default function DashboardAdmin() {
const [members, setMembers] = useState([]);
const [requests, setRequests] = useState([]);
const [allRequests, setAllRequests] = useState([]);



useEffect(() => {
fetchMembers();
fetchRequests();
}, []);

const fetchMembers = async () => {
const { data } = await supabase
.from("members")
.select("*");


setMembers(data || []);


};

const fetchRequests = async () => {
const { data: pending } = await supabase
.from("membership_requests")
.select("*")
.eq("status", "pending");


const { data: all } = await supabase
  .from("membership_requests")
  .select("*");

setRequests(pending || []);
setAllRequests(all || []);


};

  const approveRequest = async (request) => {
    try {

      const { data: existingMember } =
        await supabase
          .from("members")
          .select("*")
          .eq("user_id", request.user_id)
          .maybeSingle();

      let memberId;

      if (!existingMember) {

        const {
          data: memberData,
          error: memberError,
        } = await supabase
          .from("members")
          .insert({
            user_id: request.user_id,
            full_name: request.full_name,
            email: request.email,
            phone: request.phone,
            address: request.address,
            photo_url: request.photo_url,
          })
          .select()
          .single();

        if (memberError) throw memberError;

        memberId = memberData.id;

      } else {

        memberId = existingMember.id;

      }

      const currentYear =
        new Date().getFullYear();

      const { data: contribution } =
        await supabase
          .from("contributions")
          .select("id")
          .eq("member_id", memberId)
          .eq("year", currentYear)
          .maybeSingle();

      if (!contribution) {

        await supabase
          .from("contributions")
          .insert({
            member_id: memberId,
            year: currentYear,
          });

      }

      await supabase
        .from("membership_requests")
        .update({
          status: "approved",
          approved_at:
            new Date().toISOString(),
        })
        .eq("id", request.id);

      await supabase
        .from("profiles")
        .update({
          role: "member",
        })
        .eq("id", request.user_id);

      fetchMembers();
      fetchRequests();

      alert(
        "✅ Membre approuvé avec succès"
      );

    } catch (error) {

      console.error(error);
      alert(error.message);

    }
  };

const rejectRequest = async (id) => {
try {
await supabase
.from("membership_requests")
.update({
status: "rejected",
})
.eq("id", id);

  fetchRequests();

} catch (error) {
  console.error(error);
}


};

return ( <div className="p-4 md:p-6">

  <h1 className="text-3xl font-bold text-green-700 mb-8">
    Tableau de bord Administrateur
  </h1>

  {/* STATS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    <div className="bg-green-700 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold">
        {members.length}
      </h2>
      <p className="mt-2">
        Membres actifs
      </p>
    </div>

    <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold">
        {requests.length}
      </h2>
      <p className="mt-2">
        Demandes en attente
      </p>
    </div>

    <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold">
        {allRequests.length}
      </h2>
      <p className="mt-2">
        Total des demandes
      </p>
    </div>

  </div>

  {/* DEMANDES */}
  <div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800 mb-5">
      Demandes d'adhésion
    </h2>

    {requests.length === 0 ? (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        Aucune demande en attente.
      </div>
    ) : (
      <div className="space-y-4">

        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <p className="font-bold text-lg">
                {req.full_name}
              </p>

              <p className="text-gray-500">
                {req.email}
              </p>

              <p className="text-gray-500">
                {req.phone}
              </p>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">

              <button
               onClick={() =>
                  approveRequest(req)
                }
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
              >
                Valider
              </button>

              <button
                onClick={() =>
                  rejectRequest(req.id)
                }
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Rejeter
              </button>

            </div>
          </div>
        ))}

      </div>
    )}

  </div>

  {/* MEMBRES */}
  <div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800 mb-5">
      Membres validés
    </h2>

    {members.length === 0 ? (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        Aucun membre.
      </div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="flex items-center gap-3">

              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.full_name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                  {member.full_name?.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="font-bold">
                  {member.full_name}
                </h3>

                <p className="text-sm text-gray-500">
                  {member.phone}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    )}

  </div>

</div>


);
}
