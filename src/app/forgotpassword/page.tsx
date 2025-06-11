"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  // Combined useEffect for token extraction and verification
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    const tokenValue = urlToken || "";

    setToken(tokenValue);

    if (tokenValue.length > 0) {
      axios
        .post("/api/users/verifyemail", { token: tokenValue })
        .then(() => setIsVerified(true))
        .catch((error) => {
          setIsVerified(false);
          console.log("Error in verifying email:", error.response?.data);
        });
    }
  }, []);

  const getresponse = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (oldPassword.length === 0 || newPassword.length === 0) {
        throw new Error("Please fill all the fields");
      }

      const res = await axios.post("/api/users/forgotpassword", {
        oldPassword: oldPassword,
        newPassword: newPassword,   
        token: token,
      });

      console.log(res);
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div>
      {isVerified ? (
        <>
          <h1 className="text-4xl text-center mt-10">Forgot Password</h1>
          <p className="text-center mt-5">Enter your old and new password.</p>
          <form onSubmit={getresponse}>
            <div className="flex flex-col items-center justify-center mt-10">
              <input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                placeholder="Old Password"
                className="border-2 border-gray-300 p-2 rounded-md mb-4 w-1/3"
              />
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="New Password"
                className="border-2 border-gray-300 p-2 rounded-md mb-4 w-1/3"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-1/3"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl">Email Not Verified</h1>
          <p className="text-red-500">Please verify your email first.</p>
        </div>
      )}
    </div>
  );
}
