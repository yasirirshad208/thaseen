"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthAdmin } from "@/context/AuthAdminContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();
  const { checkAdmin } = useAuthAdmin();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/login",
        {
          email: email,
          password,
        }
      );
      setLoginMessage("Successfully logged in!");

      // Save the token to localStorage
      localStorage.setItem("authToken", response.data.token);
      checkAdmin()
      router.push("/account");
    } catch (error) {
      setLoginMessage("Failed to log in. Please try again.");
    }
  };
  return (
    <form
      className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-6"
      onSubmit={handleLogin}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

      {loginMessage && (
        <div
          className={`mb-4 text-center ${
            loginMessage.includes("Success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {loginMessage}
        </div>
      )}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-500 font-bold">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2 leading-tight"
          />
          Remember Me
        </label>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>

      {/* <div className="mt-4 text-center">
        <a href="/forgot-password" className="text-blue-500">
          Forgot Password?
        </a>
      </div> */}

      <div className="mt-4 text-center">
        <p>
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}
