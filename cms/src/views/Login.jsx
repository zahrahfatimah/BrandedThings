import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";

export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // Prevent auto refresh
    try {
      let { data } = await axios.post(`${url}/apis/login`, { email, password });
      // console.log(data);

      localStorage.setItem("access_token", data.data.access_token);
      navigate("/home");
      Toastify({
        text: "Success Login",
        duration: 2000,
        close: false, 
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        position: "right",
      }).showToast();
      
    } catch (error) {
      console.log(error);
      Toastify({
        text: "Gagal login",
        duration: 2000,
        newWindow: true,
        close: true,
        style: {
          background: "#B3C8CF",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
        position: "right",
      }).showToast();
    }
  }

  return (
    <div
      className="bg-[#E5DDC5] flex items-center justify-center min-h-screen w-full m-0"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="bg-[#B3C8CF] p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        {/* Left: Login Form */}
        <div className="w-1/2 pr-4 flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="bg-[#B3C8CF] p-8 rounded-lg w-full max-w-sm"
          >
            <h1 className="text-gray-700 font-medium mb-5 text-center text-2xl">
              Login to your account
            </h1>
            <div className="mb-4 text-center">
              <label
                htmlFor="login-email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter email address ..."
                autoComplete="off"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 text-center">
              <label
                htmlFor="login-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                placeholder="Enter your password ..."
                autoComplete="off"
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#E5DDC5] text-gray-700 font-bold py-2 px-4 rounded hover:bg-white hover:text-[#B3C8CF] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              Login
            </button>
            <p className="text-gray-700 text-center mt-4">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-gray-900 hover:text-white">
                Register
              </Link>
            </p>
          </form>
        </div>
        {/* Right: Image */}
        <div className="w-1/2 pl-4 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/originals/d7/cf/88/d7cf88dd4fff542ebada40ca70dec992.jpg"
            alt="Login Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
