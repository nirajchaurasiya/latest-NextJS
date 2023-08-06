"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/login`, user);
      console.log("Login success", response.data);
      router.push(`/profile`);
    } catch (error: any) {
      console.log("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        placeholder="Email"
        className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <hr />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounder-lg mb-4"
      >
        {btnDisabled ? "No login" : "login"}
      </button>
      <Link href="/signup">Visit signup page</Link>
    </div>
  );
}
