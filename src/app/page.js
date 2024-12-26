"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from './components/Navar'
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
// import {  useRouter } from "next/router";
export default function Home() {
  const auth=useAuth();

  const router=useRouter();
  useEffect(()=>{
      if(auth.isLoggedIn===false)
        router.push('/api/auth/signin')

      fetchQuestions()
  },[auth])
  const [questions, setQuestions] = useState([]);
  const [dsaList, setDsaList] = useState([]);
  const [form, setForm] = useState({
    title: "",
    topic: "",
    bruteForce: "",
    optimal: "",
    level: "Easy",
  });
  const [filter, setFilter] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  

  const fetchQuestions = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`, {
      credentials:'include'
      // await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`,{
      // mode:'no-cors',
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.length)
          data.reverse();
        setDsaList(data), setQuestions(data)
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted with data: ", JSON.stringify(form));
    toast.loading("Adding",{id:"Add"})
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials:'include'
        // mode:'no-cors',
      }
    );
    if(res.status===201)
      toast.success("Added",{id:"Add"})
    else toast.error("Failed to add ",{id:"Add"})

    // const res = await axios.post('https://dsa-tracker-backend-kappa.vercel.app/api/dsa', JSON);

    const data = await res.json();
    console.log("recieved ",data)
    setDsaList([data, ...dsaList]);
    setQuestions([data, ...questions]);
    setForm({
      title: "",
      topic: "",
      bruteForce: "",
      optimal: "",
      level: "Easy",
    });
  };

  const handleDelete = async (id) => {
  toast.loading("Deleting",{id:"Delete"});
   const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa/${id}`, {
      method: "DELETE",
      credentials:'include'
    });
    if(res.status===200)
    toast.success("Deleted",{id:"Delete"});
    else toast.error("Retry!",{id:"Delete"});
    fetchQuestions();
  };

  const handleFilter = (level) => {
    setFilter(level);
    setDsaList(questions);
    if (level === "All") {
      setDsaList(questions);
    } else {
      setDsaList(questions.filter((q) => q.level === level));
      // console.log("question ",questions)
    }
  };

  return (
  <>
  <Navbar />
    <div className="w-[100vw]">
     <Toaster position="top-right"/>
      <p className="text-red-400 text-center md:hidden">To add questions, shift to desktop size.</p>

      <div className="md:flex space-x-5 justify-evenly container p-8  max-w-screen mx-auto max-h-screen">
        {/* filter bar for mobile size  */}
        <div className="filter-bar flex justify-center md:hidden h-max space-x-2 text-gray-500">
          <button
            className={` ${
              filter == "All" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            className={` ${
              filter == "Easy" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Easy")}
          >
            Easy
          </button>
          <button
            className={` ${
              filter == "Medium" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Medium")}
          >
            Medium
          </button>
          <button
            className={` ${
              filter == "Hard" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Hard")}
          >
            Hard
          </button>
        </div>
        <form
  onSubmit={handleSubmit}
  className="hidden md:block space-y-4 bg-white p-6 shadow rounded w-full h-max text-gray-600"
>
  <input
   required
    type="text"
    placeholder="Title"
    value={form.title}
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
  />
  <input
   required
    type="text"
    placeholder="Topic"
    value={form.topic}
    onChange={(e) => setForm({ ...form, topic: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
  />
  <textarea
   required
    placeholder="Brute Force Solution"
    value={form.bruteForce}
    onChange={(e) => setForm({ ...form, bruteForce: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
  />
  <textarea
  required
    placeholder="Optimal Solution"
    value={form.optimal}
    onChange={(e) => setForm({ ...form, optimal: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
  />
  <select
    value={form.level}
    onChange={(e) => setForm({ ...form, level: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
  >
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
  <button
    type="submit"
    className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
  >
    Add Question
  </button>
</form>




        <div className="min-w-[30vw] overflow-y-auto">
          {console.log("Dsa list",dsaList)}
          {dsaList?.map((dsa, index) => (
            <div
              key={index}
              className={`p-6 bg-white shadow mb-4 rounded border-l-4 text-gray-600 ${
                dsa.level === "Easy"
                  ? "border-green-500"
                  : dsa.level === "Medium"
                  ? "border-yellow-500"
                  : "border-red-500"
              }`}
            >
              <h3 className="text-2xl font-bold">{dsa.title?.toUpperCase()}</h3>
              <p className="font-semibold">
                <strong>Question:</strong> {dsa.topic?.toUpperCase()}
              </p>
              <p>
                <strong>Brute Force:</strong> {dsa.bruteForce}
              </p>
              <p>
                <strong>Optimal:</strong> {dsa.optimal}
              </p>
              <p
                className={`${
                  dsa.level === "Easy"
                    ? "text-green-500"
                    : dsa.level === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {dsa.level}
              </p>
              <button
                onClick={() => handleDelete(dsa._id)}
                className="bg-red-500 text-white p-2 mr-2 rounded mt-4 hover:opacity-50"
              >
                Delete
              </button>
              {/* <button
                onClick={() => handleEdit(dsa._id)}
                className="bg-blue-500 text-white p-2 rounded mt-4 hover:opacity-50"
              >
                Edit
              </button> */}
            </div>
          ))}
        </div>
        <div className="filter-bar hidden md:flex h-max space-x-2 text-gray-500">
          <button
            className={` ${
              filter == "All" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            className={` ${
              filter == "Easy" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Easy")}
          >
            Easy
          </button>
          <button
            className={` ${
              filter == "Medium" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Medium")}
          >
            Medium
          </button>
          <button
            className={` ${
              filter == "Hard" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Hard")}
          >
            Hard
          </button>
          <p>{dsaList?.length}</p>
        </div>
      </div>
    </div>
    </>
  );
}
// DSA Tracker App - Full Implementation with NextAuth for Authentication
// 'use client'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { signIn, signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const DsaTracker = () => {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [questions, setQuestions] = useState([]);
//     const [filteredQuestions, setFilteredQuestions] = useState([]);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({ title: '', level: '', solution: '' });
//     const [filter, setFilter] = useState('All');

//     useEffect(() => {
//         if (status === 'authenticated') {
//             fetchQuestions();
//         } else if (status === 'unauthenticated') {
//             router.push('/api/auth/signin');
//         }
//     }, [status]);

//     const fetchQuestions = async () => {
//         try {
//             const res = await axios.get('https://dsa-tracker-backend-kappa.vercel.app/api/dsa');
//             setQuestions(res.data);
//             setFilteredQuestions(res.data);
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//         }
//     };

//     if (status === 'loading') {
//         return <div>Loading...</div>;
//     }

//     if (!session) {
//         return (
//             <div className="container">
//                 <h1>Please Sign In to Access DSA Tracker</h1>
//                 <button onClick={() => signIn()}>Sign In</button>
//             </div>
//         );
//     }

//     return (
//         <div className="container">
//             <h1>DSA Tracker</h1>
//             <button onClick={() => signOut()}>Sign Out</button>
            
//             <div className="filter-bar">
//                 <button onClick={() => handleFilter('All')}>All</button>
//                 <button onClick={() => handleFilter('Easy')}>Easy</button>
//                 <button onClick={() => handleFilter('Medium')}>Medium</button>
//                 <button onClick={() => handleFilter('Hard')}>Hard</button>
//             </div>

//             <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={formData.title}
//                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                     required
//                 />
//                 <select
//                     value={formData.level}
//                     onChange={(e) => setFormData({ ...formData, level: e.target.value })}
//                     required
//                 >
//                     <option value="">Select Level</option>
//                     <option value="Easy">Easy</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Hard">Hard</option>
//                 </select>
//                 <textarea
//                     placeholder="Solution"
//                     value={formData.solution}
//                     onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
//                     required
//                 />
//                 <button type="submit">{editId ? 'Update' : 'Add'}</button>
//             </form>

//             <ul>
//                 {filteredQuestions.map(q => (
//                     <li key={q._id}>
//                         <h3>{q.title} - {q.level}</h3>
//                         <p>{q.solution}</p>
//                         <button onClick={() => handleEdit(q._id)}>Edit</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default DsaTracker;
