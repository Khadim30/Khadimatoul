import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function MembershipRequests() {
const [requests, setRequests] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchRequests();
}, []);

const fetchRequests = async () => {
setLoading(true);


const { data, error } = await supabase
  .from("membership_requests")
  .select("*")
  .order("created_at", {
    ascending: false,
  });

if (!error) {
  setRequests(data || []);
}

setLoading(false);

};


  const approveRequest = async (request) => {
    try {
      alert("APPROVE CLICKED");

      console.log("=================================");
      console.log("APPROVE REQUEST");
      console.log("REQUEST =", request);

      // Vérifier si membre existe déjà
      const {
        data: existingMember,
        error: existingMemberError,
      } = await supabase
        .from("members")
        .select("*")
        .eq("user_id", request.user_id)
        .maybeSingle();

      console.log("EXISTING MEMBER =", existingMember);
      console.log("EXISTING MEMBER ERROR =", existingMemberError);

      if (existingMemberError) {
        alert(
          "ERREUR EXISTING MEMBER:\n" +
            JSON.stringify(existingMemberError, null, 2)
        );
        return;
      }

      let memberId;

      // Création membre
      if (!existingMember) {
        console.log("CRÉATION DU MEMBRE...");

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
          .select();

        console.log("MEMBER DATA =", memberData);
        console.log("MEMBER ERROR =", memberError);

        if (memberError) {
          alert(
            "ERREUR INSERT MEMBER:\n" +
              JSON.stringify(memberError, null, 2)
          );
          return;
        }

        if (!memberData || memberData.length === 0) {
          alert("AUCUN MEMBRE RETOURNÉ APRÈS INSERT");
          return;
        }

        memberId = memberData[0].id;
      } else {
        memberId = existingMember.id;
      }

      console.log("MEMBER ID =", memberId);

      // Vérifier contribution
      const currentYear = new Date().getFullYear();

      const {
        data: existingContribution,
        error: contributionCheckError,
      } = await supabase
        .from("contributions")
        .select("*")
        .eq("member_id", memberId)
        .eq("year", currentYear)
        .maybeSingle();

      console.log(
        "EXISTING CONTRIBUTION =",
        existingContribution
      );

      console.log(
        "CONTRIBUTION CHECK ERROR =",
        contributionCheckError
      );

      if (contributionCheckError) {
        alert(
          "ERREUR CHECK CONTRIBUTION:\n" +
            JSON.stringify(contributionCheckError, null, 2)
        );
        return;
      }

      if (!existingContribution) {
        console.log("CRÉATION CONTRIBUTION...");

        const {
          data: contributionData,
          error: contributionError,
        } = await supabase
          .from("contributions")
          .insert({
            member_id: memberId,
            year: currentYear,
          })
          .select();

        console.log(
          "CONTRIBUTION DATA =",
          contributionData
        );

        console.log(
          "CONTRIBUTION ERROR =",
          contributionError
        );

        if (contributionError) {
          alert(
            "ERREUR INSERT CONTRIBUTION:\n" +
              JSON.stringify(contributionError, null, 2)
          );
          return;
        }
      }

      console.log("MISE À JOUR DE LA DEMANDE...");

      const {
        data: requestData,
        error: requestError,
      } = await supabase
        .from("membership_requests")
        .update({
          status: "approved",
          approved_at: new Date().toISOString(),
        })
        .eq("id", request.id)
        .select();

      console.log("REQUEST DATA =", requestData);
      console.log("REQUEST ERROR =", requestError);

      if (requestError) {
        alert(
          "ERREUR UPDATE REQUEST:\n" +
            JSON.stringify(requestError, null, 2)
        );
        return;
      }

      alert("✅ Membre approuvé avec succès");

      fetchRequests();

    } catch (error) {
      console.error("ERREUR GLOBALE =", error);

      alert(
        "ERREUR GLOBALE:\n" +
          JSON.stringify(error, null, 2)
      );
    }
  };

const rejectRequest = async (id) => {
  const { error } = await supabase
  .from("membership_requests")
  .update({
  status: "rejected",
  })
  .eq("id", id);


  if (error) {
    alert(error.message);
    return;
  }

  fetchRequests();


  };

  if (loading) {
  return ( <div className="p-6">
  Chargement... </div>
  );
}

return ( <div className="p-4 md:p-6">


  <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
    Demandes d'adhésion
  </h1>

  {requests.length === 0 ? (
    <div className="bg-white p-6 rounded-xl shadow">
      Aucune demande trouvée.
    </div>
  ) : (
    <div className="grid gap-6">

      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white rounded-xl shadow-lg border-l-4 border-green-600 p-5"
        >
          <div className="flex flex-col md:flex-row gap-6">

            {/* PHOTO */}
            <div className="flex justify-center">
              <img
                src={request.photo_url}
                alt={request.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-600"
              />
            </div>

            {/* INFOS */}
            <div className="flex-1">

              <h2 className="text-xl font-bold text-gray-800">
                {request.full_name}
              </h2>

              <p className="text-gray-700">
                {request.email}
              </p>

              <p className="mt-2">
                <strong>
                  Téléphone :
                </strong>{" "}
                {request.phone}
              </p>

              <p>
                <strong>
                  Adresse :
                </strong>{" "}
                {request.address}
              </p>

              <p>
                <strong>
                  Statut :
                </strong>{" "}
                <span
                  className={
                    request.status ===
                    "approved"
                      ? "text-green-600 font-bold"
                      : request.status ===
                        "rejected"
                      ? "text-red-600 font-bold"
                      : "text-green-700 font-bold"
                  }
                >
                  {request.status}
                </span>
              </p>

              <div className="mt-3">
                <a
                  href={
                    request.receipt_url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-700 underline hover:text-green-800"
                >
                  Voir le reçu
                </a>
              </div>

              {request.status ===
                "pending" && (
                <div className="mt-4 flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() =>
                      approveRequest(
                        request
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Approuver
                  </button>

                  <button
                    onClick={() =>
                      rejectRequest(
                        request.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Refuser
                  </button>

                </div>
              )}

            </div>

          </div>
        </div>
      ))}

    </div>
  )}
</div>


);
}
