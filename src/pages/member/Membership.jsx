import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Membership() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [receipt, setReceipt] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [alreadyMember, setAlreadyMember] = useState(false);
  const [existingRequest, setExistingRequest] = useState(null);

  useEffect(() => {
    checkMembershipStatus();
  }, []);

  const checkMembershipStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER CONNECTÉ :", user);

    if (!user) return;

    const {
      data: member,
      error: memberError,
    } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("MEMBER :", member);
    console.log("MEMBER ERROR :", memberError);

    if (member) {
      setAlreadyMember(true);
      return;
    }

    const {
      data: request,
      error: requestError,
    } = await supabase
      .from("membership_requests")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    console.log("REQUEST :", request);
    console.log("REQUEST ERROR :", requestError);

    if (request) {
      setExistingRequest(request);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!photo || !receipt) {
  //     setMessage(
  //       "Veuillez ajouter votre photo et votre reçu de paiement."
  //     );
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setMessage("");

  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (!user) {
  //       setMessage("Utilisateur non connecté.");
  //       return;
  //     }

  //     const { data: existingMember } = await supabase
  //       .from("members")
  //       .select("id")
  //       .eq("user_id", user.id)
  //       .maybeSingle();

  //     if (existingMember) {
  //       setMessage("Vous êtes déjà membre.");
  //       return;
  //     }

  //     if (existingRequest) {

  //       if (existingRequest.status === "pending") {
  //         setMessage(
  //           "Vous avez déjà une demande en attente."
  //         );
  //         return;
  //       }

  //       if (existingRequest.status === "approved") {
  //         setMessage(
  //           "Votre demande a déjà été approuvée."
  //         );
  //         return;
  //       }

  //       if (existingRequest.status === "rejected") {

  //         const { error } = await supabase
  //           .from("membership_requests")
  //           .update({
  //             full_name: fullName,
  //             phone,
  //             address,
  //             photo_url: photoUrl,
  //             receipt_url: receiptUrl,
  //             status: "pending",
  //             created_at: new Date().toISOString(),
  //           })
  //           .eq("user_id", user.id);

  //         if (error) throw error;

  //         setMessage(
  //           "✅ Nouvelle demande envoyée avec succès."
  //         );

  //         checkMembershipStatus();

  //         return;
  //       }
  //     }

  //     // Upload Photo
  //     const photoExt = photo.name.split(".").pop();

  //     const photoName =
  //       `${user.id}-photo-${Date.now()}.${photoExt}`;

  //     const { error: photoError } =
  //       await supabase.storage
  //         .from("member-photos")
  //         .upload(photoName, photo);

  //     if (photoError) throw photoError;

  //     const { data: photoData } =
  //       supabase.storage
  //         .from("member-photos")
  //         .getPublicUrl(photoName);

  //     const photoUrl = photoData.publicUrl;

  //     // Upload Reçu
  //     const receiptExt = receipt.name
  //       .split(".")
  //       .pop();

  //     const receiptName =
  //       `${user.id}-receipt-${Date.now()}.${receiptExt}`;

  //     const { error: receiptError } =
  //       await supabase.storage
  //         .from("receipts")
  //         .upload(receiptName, receipt);

  //     if (receiptError) throw receiptError;

  //     const { data: receiptData } =
  //       supabase.storage
  //         .from("receipts")
  //         .getPublicUrl(receiptName);

  //     const receiptUrl = receiptData.publicUrl;

  //     // Enregistrement
  //     const { error: insertError } =
  //       await supabase
  //         .from("membership_requests")
  //         .insert({
  //           user_id: user.id,
  //           full_name: fullName,
  //           email: user.email,
  //           phone,
  //           address,
  //           photo_url: photoUrl,
  //           receipt_url: receiptUrl,
  //           status: "pending",
  //         });

  //     if (insertError) throw insertError;

  //     setMessage(
  //       "✅ Votre demande d'adhésion a été envoyée avec succès."
  //     );

  //     setFullName("");
  //     setPhone("");
  //     setAddress("");
  //     setPhoto(null);
  //     setPhotoPreview(null);
  //     setReceipt(null);

  //     checkMembershipStatus();

  //   } catch (error) {
  //     console.error(error);
  //     setMessage(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo || !receipt) {
      setMessage(
        "Veuillez ajouter votre photo et votre reçu de paiement."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Utilisateur non connecté.");
        return;
      }

      // Vérifier si l'utilisateur est déjà membre
      const { data: existingMember } = await supabase
        .from("members")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingMember) {
        setMessage("Vous êtes déjà membre.");
        return;
      }

      // ==========================
      // Upload Photo
      // ==========================
      const photoExt = photo.name.split(".").pop();

      const photoName =
        `${user.id}-photo-${Date.now()}.${photoExt}`;

      const { error: photoError } =
        await supabase.storage
          .from("member-photos")
          .upload(photoName, photo);

      if (photoError) throw photoError;

      const { data: photoData } =
        supabase.storage
          .from("member-photos")
          .getPublicUrl(photoName);

      const photoUrl = photoData.publicUrl;

      // ==========================
      // Upload Reçu
      // ==========================
      const receiptExt = receipt.name
        .split(".")
        .pop();

      const receiptName =
        `${user.id}-receipt-${Date.now()}.${receiptExt}`;

      const { error: receiptError } =
        await supabase.storage
          .from("receipts")
          .upload(receiptName, receipt);

      if (receiptError) throw receiptError;

      const { data: receiptData } =
        supabase.storage
          .from("receipts")
          .getPublicUrl(receiptName);

      const receiptUrl = receiptData.publicUrl;

      // ==========================
      // Vérifier demande existante
      // ==========================
      const { data: existingRequest } =
        await supabase
          .from("membership_requests")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

      // Demande en attente
      if (
        existingRequest &&
        existingRequest.status === "pending"
      ) {
        setMessage(
          "Vous avez déjà une demande en attente."
        );
        return;
      }

      // Déjà approuvée
      if (
        existingRequest &&
        existingRequest.status === "approved"
      ) {
        setMessage(
          "Votre demande a déjà été approuvée."
        );
        return;
      }

      // ==========================
      // Cas demande rejetée
      // ==========================
      if (
        existingRequest &&
        existingRequest.status === "rejected"
      ) {
        const { error: updateError } =
          await supabase
            .from("membership_requests")
            .update({
              full_name: fullName,
              email: user.email,
              phone,
              address,
              photo_url: photoUrl,
              receipt_url: receiptUrl,
              status: "pending",
              created_at:
                new Date().toISOString(),
            })
            .eq("id", existingRequest.id);

        if (updateError) throw updateError;

        setMessage(
          "✅ Nouvelle demande envoyée avec succès."
        );

        setFullName("");
        setPhone("");
        setAddress("");
        setPhoto(null);
        setPhotoPreview(null);
        setReceipt(null);

        checkMembershipStatus();

        return;
      }

      // ==========================
      // Nouvelle demande
      // ==========================
      const { error: insertError } =
        await supabase
          .from("membership_requests")
          .insert({
            user_id: user.id,
            full_name: fullName,
            email: user.email,
            phone,
            address,
            photo_url: photoUrl,
            receipt_url: receiptUrl,
            status: "pending",
          });

      if (insertError) throw insertError;

      setMessage(
        "✅ Votre demande d'adhésion a été envoyée avec succès."
      );

      setFullName("");
      setPhone("");
      setAddress("");
      setPhoto(null);
      setPhotoPreview(null);
      setReceipt(null);

      checkMembershipStatus();

    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Déjà membre
  if (alreadyMember) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold mb-2">
            Vous êtes déjà membre
          </h2>

          <p>
            Votre adhésion a déjà été validée.
          </p>
        </div>
      </div>
    );
  }

  // Demande en attente
  if (existingRequest?.status === "pending") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl font-bold mb-2">
            Demande en attente
          </h2>

          <p>
            Votre demande est en cours de validation.
          </p>
        </div>
      </div>
    );
  }


  // Demande rejetée
  if (existingRequest?.status === "rejected") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center shadow">

          <h2 className="text-2xl font-bold mb-2">
            Demande rejetée
          </h2>

          <p className="mb-4">
            Votre demande d'adhésion a été rejetée par l'administration.
          </p>

          <p>
            Veuillez corriger les informations fournies ou joindre un nouveau reçu de paiement puis réessayer.
          </p>

          <button
            onClick={() => {
              setExistingRequest(null);
            }}
            className="mt-5 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg"
          >
            Réessayer
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-3 md:p-6">
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-8">

        <h1 className="text-xl md:text-3xl font-bold text-green-700 mb-6 text-center">
          Demande d'adhésion
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Nom complet
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Téléphone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Adresse
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Photo de profil
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  setPhoto(file);
                  setPhotoPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
              className="w-full border rounded-lg p-3"
              required
            />

            {photoPreview && (
              <img
                src={photoPreview}
                alt="preview"
                className="w-32 h-32 rounded-full mx-auto mt-4 object-cover border-4 border-green-600 shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Reçu de paiement
            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                setReceipt(e.target.files[0])
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-center ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Envoi en cours..."
              : "Envoyer la demande"}
          </button>

        </form>
      </div>
    </div>
  );
}