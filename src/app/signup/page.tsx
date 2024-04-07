"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Header from '../component/header';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    user_name: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up success", response.data);
      router.push("/verfiyemail");
    } catch (error: any) {
      console.log("SignUp failed", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
       <Header /> 

      <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-md rounded-lg font-Roboto overflow-hidden mx-auto mt-10 p-4  border border-gray-300 "> {/* Added padding */}
  <div className="flex flex-col items-center py-2"> {/* Container with full viewport height */}
    <h1 className="text-center text-3xl font-bold mb-6">Create your account</h1> {/* New heading */}

    <div className="flex flex-col space-y-4"> {/* Wrap labels and inputs in a column with spacing */}
      <div className="mb-1"> {/* Individual label and input container */}
        <label htmlFor="username" className="block text-left font-medium mr-2">
          Name
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-black w-full "
          id="username"
          type="text"
          placeholder="Enter"
          value={user.user_name}
          onChange={(e) => setUser({ ...user, user_name: e.target.value })}
          
        />
      </div>

      <div className="mb-4"> {/* Individual label and input container */}
        <label htmlFor="email" className="block text-left font-medium mr-2">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-black w-full"
          id="email"
          type="email"
          placeholder="Enter"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="mb-4"> {/* Individual label and input container */}
        <label htmlFor="password" className="block text-left font-medium mr-2">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 text-black w-full"
          id="password"
          type="password"
          placeholder="Enter"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        className="p-2 bg-black text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 w-full mt-4"
        onClick={onSignup}
      >
        CREATE ACCOUNT
      </button>
    </div>
  </div>

  <div className="text-center mt-4 mb-4"> {/* Link moved below the button */}
    <Link href="/login" className="text-balck ">
      Have an Account? <span className="font-bold">LOGIN</span> 
    </Link>
  </div>
</div>



</div>
      
  );
}
