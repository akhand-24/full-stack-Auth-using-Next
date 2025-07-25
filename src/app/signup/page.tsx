"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function signup(){
    const router=useRouter()
    const [user,setUser]=useState({
        email:"",
        password:"",
        username:""
    })
    useEffect(()=>{
  if(user.username.length>0 && user.email.length>0 && user.password.length>0){
    setButtonDisabled(false)
  }
  else{ setButtonDisabled(true) }
    },[user])

    const [buttonDisabled,setButtonDisabled]=useState(false)
    const onSignup= async ()=>{
        try {
          const res=await axios.post("/api/users/signup",user)
          console.log(res)
          router.push("/login")
        } catch (error:any) {
          console.log(error)
          toast.error(error.response.data.error || "Something went wrong!");
          
          
        }
    }




    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl text-blue-600 p-4">Signup</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="bg-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <hr />
        <label htmlFor="email">email</label>
        <input
          className="bg-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <hr />
        <label htmlFor="password">password</label>
        <input
          className="bg-white p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button 
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    );
}