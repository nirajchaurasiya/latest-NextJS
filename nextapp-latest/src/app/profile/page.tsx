"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const Logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data._id);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>Profile</Link>
        )}
      </h2>
      <button
        onClick={Logout}
        className="mt-3 border bg-blue-500 text-white font-bold py-2 px-4 hover:bg-blue-700"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="mt-3 border bg-gray-500 text-white font-bold py-2 px-4 hover:bg-gray-700"
      >
        getUserDetails
      </button>
    </div>
  );
}
