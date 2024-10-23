import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { Button, Input } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError(""); // Clear previous errors

    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error); // Log the full error for debugging

      // Detailed error handling
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(`Signup failed: ${error.response.data.message}`);
      } else if (error.message) {
        setError(`Signup failed: ${error.message}`);
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg flex w-1/2">
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Sign up to create account
          </h2>

          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Full Name *
              </label>
              <Input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="name"
                id="name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email *
              </label>
              <Input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password *
              </label>
              <Input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="mb-6">
              <a href="#" className="text-green-500 text-sm">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div
          className="w-1/2 bg-cover bg-center rounded-r-lg"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/923192/pexels-photo-923192.jpeg`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Signup;
