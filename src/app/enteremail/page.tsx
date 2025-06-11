"use client"
import React, { useState } from "react";
import axios from "axios";
import {  useRouter } from "next/navigation";
import { sendEmail } from "@/helpers/mailer";

export default function EnterEmailPage() {
    const [email, setEmail] = useState("");
    const router=useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        if (email.length === 0) {
            throw new Error("Please enter your email");
        }
        // Here you would typically send the email to your backend for processing
        axios.post("/api/users/enteremail",{email})

       

        

        console.log("Email submitted:", email);
        // Redirect or show success message
        } catch (error: any) {
        console.error(error);
        alert(error.message || "Something went wrong!");
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Enter Your Email</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="border-2 border-gray-300 p-2 rounded-md w-full mb-4"
            />
            <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full"
            >
            Submit
            </button>
        </form>
        </div>
    );

}