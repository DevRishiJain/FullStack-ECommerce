// "use client";
// import axios from "axios";
// import Link from "next/link";
// import React, {useState,useEffect} from "react";
// import {toast} from "react-hot-toast";
// import {useRouter} from "next/navigation";
// import { categories } from "./categories";
// import Header from '../component/header';

// const ListPage = () => {
//   const [interests, setInterests] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchInterests = async () => {
//       try {
//         const response = await axios.get("./api/users/lists");
//         setInterests(response.data.data);
//       } catch (error) {
//         console.error(error);
//         setError("Error fetching interests");
//       }
//     };

//     fetchInterests();
//   }, []);
//         const logout = async () => {
//             try {
//                 await axios.get('/api/users/logout')
//                 toast.success('Logout successful')
//                 router.push('/login')
//             } catch (error:any) {
//                 console.log(error.message);
//                 toast.error(error.message)
//             }
//         }

//     return (
//       <div>
//         <Header/>
//         <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-md rounded-lg font-Roboto overflow-hidden mx-auto mt-10 p-4  border border-gray-300 ">
          
      
//         <div className="flex flex-col items-center justify-center  py-2">
//             <h1>Lists</h1>
//             <hr />
//             <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <h2>{data}</h2> }</h2><hr />
//             <p>lists of </p>
//             <hr />
//             <button
//                 onClick={logout}
//                 className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 >Logout
//             </button>

//             </div>
//           </div>
//         </div>
//     )
// }


"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import categories from "./categories";
import Header from '../component/header';

export default function ListPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userEmail = response.data.data.email;
        setEmail(userEmail);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error(error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
      console.log(selectedCategories);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const totalPages = Math.ceil(categories.length / pageSize);

  const handlePageChange = (direction) => {
    if (direction === "prev") {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>

    <Header/>
      <div className="flex items-center justify-center "> {/* Center everything within the viewport */}
        
        <div className="bg-white shadow-[0_2px_18px_-6px_rgba(0,0,0,0.2)] w-full max-w-md rounded-lg font-Roboto overflow-hidden mx-auto p-4 border border-gray-300 ">
          <div className="flex flex-col justify-center items-center space-y-4"> {/* Center content and reduce spacing */}
            <h1 className="text-center text-3xl font-bold mb-2">Lists</h1>
    
            {/* List with Checkboxes */}
            <h2>Select your interests:</h2>
            <ul className="list-disc">
              {/* ... your category list with checkboxes ... */}
            </ul>
    
            {/* Pagination controls (if applicable) */}
            <div className="flex justify-center"> {/* Center pagination */}
              {totalPages > 1 && (
                <>
                  <button
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => handlePageChange("prev")}
                  >
                    Previous
                  </button>
                  <span className="mx-2"> {currentPage} of {totalPages} </span>
                  <button
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => handlePageChange("next")}
                  >
                    Next
                  </button>
                </>
              )}
            </div>
    
            {/* Logout button */}
            <div className="mt-4"> {/* Adjust spacing above logout */}
              {/* ... your logout button code ... */}
            </div>
          </div>
        </div>
      </div>
      </div>
    );
}



