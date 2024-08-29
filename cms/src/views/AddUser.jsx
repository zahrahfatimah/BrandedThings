import React, { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSetEmail = (e) => setEmail(e.target.value);
  const handleSetPassowrd = (e) => setPassword(e.target.value);
  const handleSetUsername = (e) => setUsername(e.target.value);
  const handleSetPhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleSetAddress = (e) => setAddress(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://h8-phase2-gc.vercel.app/apis/add-user`,
        {
          email,
          password,
          username,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Toastify({
        text: `Success Create User ${username}`,
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
      navigate("/home");
    } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
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
  };

  return (
    <div className="bg-[#F1EEDC] flex items-center justify-center min-h-screen">
      <div className="bg-[#B3C8CF] p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
        {/* Left side: Register form */}
        <div className="w-1/2 pr-4 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-[#B3C8CF] p-8 rounded-lg w-full max-w-sm"
          >
            <div className="mb-4 text-center">
              <label
                htmlFor="register-email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="register-email"
                value={email}
                onChange={handleSetEmail}
                placeholder="Enter email address ..."
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="register-password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="register-password"
                value={password}
                onChange={handleSetPassowrd}
                placeholder="Enter your password ..."
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="register-username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="register-username"
                value={username}
                onChange={handleSetUsername}
                placeholder="Enter your username ..."
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 text-center">
              <label
                htmlFor="register-phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="register-phone"
                value={phoneNumber}
                onChange={handleSetPhoneNumber}
                placeholder="Enter your phone number ..."
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-6 text-center">
              <label
                htmlFor="register-address"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="register-address"
                value={address}
                onChange={handleSetAddress}
                placeholder="Enter your address ..."
                required
                className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#E5DDC5] text-gray-700 font-bold py-2 px-4 rounded hover:bg-white hover:text-[#B3C8CF] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
            >
              Add User
            </button>
          </form>
        </div>
        {/* Right side: Image */}
        <div className="w-1/2 pl-4 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/originals/d7/cf/88/d7cf88dd4fff542ebada40ca70dec992.jpg"
            alt="Register Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
