"use client";

import axiosInstance from "@/api/interceptor";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const responseData = await axiosInstance.post("/api/User/login", {
        email: username,
        password: password,
      });
      //   router.replace("/dashboard");
      console.log("Response:", responseData.data);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
      console.error("Error config:", error.config);
    }

    // Handle login logic here
  };

  const handleRegister = () => [router.push("/register")];
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/05/switzerland-grindelwald-town-eiger-mountains-bernese-oberland-490287294.jpg?w=1224&h=647&crop=1)`,
      }}
    >
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-sm  bg-opacity-80">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-6xl  text-gray-700 font-bold">
            Welcome to our Sport Event
          </h1>
        </div>
        <div className="mb-4 mt-12">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline  text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline  text-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRegister}
          >
            Register
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
