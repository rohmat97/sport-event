"use client";

import axiosInstance from "@/api/interceptor";
import { getDataFromLocalStorage } from "@/utils/localStorageAuth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Basic validation example
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Handle registration logic (submit data, etc.)
      console.log("Form submitted:", formData);
      try {
        const responseData = await axiosInstance.post(
          "/api/User/login",
          formData
        );
        console.log("Response:", responseData.data);
        alert("Register Success");
        router.replace("/login");
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
      router.back();
    }
  };

  const checkCredentials = async () => {
    const localStorageAuth = await getDataFromLocalStorage();
    if (!!localStorageAuth) {
      router.replace("/dashboard");
    }
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/05/switzerland-grindelwald-town-eiger-mountains-bernese-oberland-490287294.jpg?w=1224&h=647&crop=1)`,
      }}
    >
      <form className="max-w-md mx-auto bg-white p-8 rounded shadow-md bg-opacity-80">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Register</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded text-gray-700"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-gray-700"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
