import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerFarmer } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    village: "",
    phone: "",
  });


  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password
  ) {
    return alert("Please fill all required fields.");
  }

  if (formData.password.length < 6) {
    return alert("Password must be at least 6 characters.");
  }

  try {
    await registerFarmer(formData);

    alert("✅ Registration Successful!");

    navigate("/login");

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">

  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

    <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
      🌾 Farmer Registration
    </h1>

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <input
        type="text"
        name="village"
        placeholder="Village"
        value={formData.village}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-4"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        Register
      </button>

    </form>

    <p className="mt-6 text-center">
      Already have an account?

      <Link
        to="/login"
        className="text-green-700 font-bold ml-2"
      >
        Login
      </Link>

    </p>

  </div>

</div>
  );
}

export default Register;

