import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileService";

function Farmer() {
  const [farmer, setFarmer] = useState({
    name: "",
    email: "",
    village: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFarmer(data.farmer);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFarmer({
      ...farmer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfile({
        name: farmer.name,
        village: farmer.village,
        phone: farmer.phone,
      });

      setFarmer(data.farmer);

      // Update localStorage so Navbar shows the new name
      localStorage.setItem(
        "farmer",
        JSON.stringify(data.farmer)
      );

      alert("Profile Updated Successfully ✅");

    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading Profile...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          👨‍🌾 Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold">Name</label>

            <input
              type="text"
              name="name"
              value={farmer.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <input
              type="email"
              value={farmer.email}
              disabled
              className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Village</label>

            <input
              type="text"
              name="village"
              value={farmer.village}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>

            <input
              type="text"
              name="phone"
              value={farmer.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default Farmer;