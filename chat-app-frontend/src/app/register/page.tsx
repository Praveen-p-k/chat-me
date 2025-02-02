"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaMicrosoft, FaApple } from "react-icons/fa"; // Microsoft and Apple icons
import { useState } from "react";
import axios from "axios";

export default function RegisterUser() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Basic client-side validation (you can add more as needed)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      phone,
      email,
      password,
    };

    console.log(userData);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/signup",
        userData
      );

      alert("Registration successful!"); // Or redirect the user, etc.
      console.log(data); // Optionally log the response
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <section className="bg-primary-dark">
      <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full shadow md:mt-0 sm:max-w-md xl:p-0 bg-primary">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Create your free account
            </h1>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-text-primary-dark focus:outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-primary-dark focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-primary-dark focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5 text-primary-dark focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 dark ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-dark font-medium text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
            </form>

            <div className="relative flex items-center justify-center my-6">
              <div className="w-1/4 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="w-1/4 h-px bg-gray-300"></div>
            </div>

            {/* Social login buttons */}
            <div className="space-y-4">
              <button
                onClick={() => signIn("google")}
                className="w-full bg-transparent border border-white text-white font-medium text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                <FcGoogle className="mr-2" size={24} /> Continue with Google
              </button>
              <button
                onClick={() => signIn("microsoft")}
                className="w-full bg-transparent border border-white text-white font-medium text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                <FaMicrosoft className="mr-2" size={24} /> Continue with
                Microsoft
              </button>
              <button
                onClick={() => signIn("apple")}
                className="w-full bg-transparent border border-white text-white font-medium text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                <FaApple className="mr-2" size={24} /> Continue with Apple
              </button>
            </div>

            <p className="text-sm font-light text-gray-500 text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline text-primary-500"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
