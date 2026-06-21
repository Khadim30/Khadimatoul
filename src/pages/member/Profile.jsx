import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Profile() {
  const [member, setMember] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("members")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      setMember(data);
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      let photoUrl = member.photo_url;

      if (photo) {
        const fileExt = photo.name.split(".").pop();

        const fileName =
          `${member.user_id}-profile-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("member-photos")
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("member-photos")
          .getPublicUrl(fileName);

        photoUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("members")
        .update({
          full_name: fullName,
          phone,
          address,
          photo_url: photoUrl,
        })
        .eq("id", member.id);

      if (error) throw error;

      alert("✅ Profil mis à jour avec succès");

      setPhoto(null);

      await fetchProfile();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Chargement...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-6 text-center">
        Aucun profil trouvé.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">

        <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
          Mon Profil
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">

          <img
            src={
              photo
                ? URL.createObjectURL(photo)
                : member.photo_url
            }
            alt={member.full_name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-green-600"
          />

          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">
              {member.full_name}
            </h2>

            <p className="text-gray-600">
              {member.email}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Membre depuis le{" "}
              {new Date(member.joined_at).toLocaleDateString()}
            </p>
          </div>

        </div>

        <form onSubmit={updateProfile}>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Nom complet
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Téléphone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Adresse
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">
              Changer la photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition"
          >
            {saving
              ? "Enregistrement..."
              : "Mettre à jour"}
          </button>

        </form>

      </div>
    </div>
  );
}