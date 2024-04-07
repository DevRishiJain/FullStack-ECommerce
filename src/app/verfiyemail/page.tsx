"use client";
import React, { FormEvent, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importing useRouter from next/router instead of next/navigation
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../component/header";

function VerifyEmail() {
  // const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const inputs = useRef([]);
 console.log(email);
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("/api/users/verifyemail");
        const data = await response.json();
        if (response.ok && data.email) {
          setEmail(data.email);
        } else {
          console.error("Empty or invalid response from server");
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchUserEmail();

    inputs.current[0]?.focus();
  }, []);

  const handleInputChange = (e, index) => {
    const newOtp = otp.slice(0, index) + e.target.value + otp.slice(index + 1);
    setOtp(newOtp);

    if (e.target.value.length === 1) {
      const nextInput = inputs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/users/verifyemail", {
        email,
        otp,
      });

      if (response.data.success) {
        router.push("/lists");
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Verification failed. Please try again.");
    }
  }

  return (
    <div>
      <Header />
      <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-md rounded-lg font-Roboto overflow-hidden mx-auto mt-10 p-4 border border-gray-300"> 
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-center">
            A verification email has been sent to {email}.
            {/* {console.log(email)} */}
          </p>
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">
                OTP Code
              </label>
              <div className="flex gap-1">
                {[...Array(8)].map((_, _InputIndex) => (
                  <input
                    key={_InputIndex}
                    ref={(el) => (inputs.current[_InputIndex] = el)}
                    type="text"
                    id="otp"
                    className="p-1 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-gray-800 text-black w-8"
                    value={otp.split("")[_InputIndex] || ""}
                    maxLength={1}
                    onChange={(e) => handleInputChange(e, _InputIndex)}
                    required
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              onSubmit={handleVerify}
              className="p-2 bg-black text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 w-full mt-7"
            >
              Verify Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
