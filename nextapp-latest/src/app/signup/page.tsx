"use client";
import React ,{useEffect} from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`,user)
      console.log("Signup success",response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed.");
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if(user.email.length>0 && user.password.length > 0 && user.username.length>0){
      setBtnDisabled(false);
    }
    else{
      setBtnDisabled(true);
    }
  }, [user])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input 
      className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text" 
      placeholder="username"
      id="username"
      value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      />
      <hr />
      <label htmlFor="email">Email</label>
      <input 
      placeholder="Email"
      className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
      id="email"
      value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})} />
      <hr />
      <label htmlFor="password">Password</label>
      <input 
      className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
      id="password"
      placeholder="Password"
      value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})} />

      <button onClick={onSignUp} className="p-2 border border-gray-300 rounder-lg mb-4">
        {btnDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}
