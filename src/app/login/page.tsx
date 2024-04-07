"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Header from '../component/header';

export default function LoginPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        email:"",
        password:"",
    })

    const onLogin = async ()=>{

        try {
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/lists");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
    }

    return (
        <div>
          <Header />
          <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-md rounded-lg font-Roboto overflow-hidden mx-auto mt-10 p-4 border border-gray-300"> {/* Added padding */}
            <div className="flex flex-col items-center py-2"> {/* Container with full viewport height */}
              <h1 className="text-center text-3xl font-bold mb-6">Log In</h1> {/* New heading */}
              <div className="flex flex-col space-y-4"> {/* Wrap labels and inputs in a column with spacing */}
                <div className="mb-1"> {/* Individual label and input container */}
                  <div className="flex flex-col space-y-4"> {/* Wrap labels and inputs in a column with spacing */}
                    <div className="mb-1"> {/* Individual label and input container */}
                      <label htmlFor="username" className="block text-left font-medium mr-2 mb-1">
                        Email
                      </label>
                      <input
                        className="p-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-800 text-black"
                        id="email"
                        type="email"
                        placeholder="Enter"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>

                    <div className="mb-1"> {/* Individual label and input container */}
                    <label htmlFor="password" className="block text-left font-medium mr-2 mb-1">
                      Password
                    </label>
                    <input
                      className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-800 text-black"
                      id="password"
                      type="password"
                      placeholder="Enter"
                      value={user.password}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    </div>
                    
                    
                  </div>
                  <button
                    className="p-2 bg-black text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 w-full mt-7"
                    onClick={onLogin}
                  >
                    Login
                  </button>
                </div>
                <div className="text-center mt-4 mb-4"> {/* Link moved below the button */}
                  <Link href="/signup" className="text-black"> {/* Corrected class name */}
                    Don't have an account? <span className="font-bold">SIGN UP</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
} 