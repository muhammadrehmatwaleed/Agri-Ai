import { useState } from "react";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { loginFarmer } from "../services/authService";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginFarmer({
      email,
      password,
    });

    // Save JWT Token
    localStorage.setItem("token", data.token);
    localStorage.setItem("farmer", JSON.stringify(data.farmer));

    alert("Login Successful 🎉");

    window.location.href = "/";

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <FaLeaf className="text-5xl text-green-700 mb-2" />
          <h1 className="text-3xl font-bold text-green-700">
            AgriAI
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome Back!
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Email Address
            </label>

            <input type="email" placeholder="Enter your email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold">
              Password
            </label>

            <div className="relative">

              <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-600"
             />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>
          </div>

          <div className="flex justify-between mb-6 text-sm">

            <label>
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>

            <button
              type="button"
              className="text-green-700"
            >
              Forgot Password?
            </button>

          </div>

          <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
         >
             Login
          </button>

          <p className="text-center mt-6">
            Don't have an account?

            <span className="text-green-700 font-semibold cursor-pointer ml-2">
              Register
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;