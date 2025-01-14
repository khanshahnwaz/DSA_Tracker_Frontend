"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from './components/Navar'
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import FilterBox from '../app/components/FIlterBox'
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
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = dsaList.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const nextPage = () => {
    if (currentPage < Math.ceil(dsaList.length / questionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const [showForm,setShowForm]=useState(false);
  const [form, setForm] = useState({
    title: "",
    topic: "",
    bruteforce: "",
    optimal: "",
    level: 'Easy',
  });
  const [filter, setFilter] = useState("All");
  const [filteredQuestions, setFilteredQuestions] = useState([
  
  ]);

  

  const fetchQuestions = async () => {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`, {
      credentials:'include'
      // await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`,{
      // mode:'no-cors',
    })
   
    if(res.status===200){
    const response=await res.json();
    response.reverse();
    setDsaList(response);
    setQuestions(response);
  }
      // .then((res) => res.json())
      // .then((data) => {
      //   if(data.length)
      //     data.reverse();
        
      //   setDsaList(data), setQuestions(data)
      // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form submitted with data: ", JSON.stringify(form));
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
    // console.log("recieved ",data)
    setDsaList([data, ...dsaList]);
    setQuestions([data, ...questions]);
    setForm({
      title: "",
      topic: "",
      bruteForce: "",
      optimal: "",
      level: "Easy",
    });


    // if mobile sizse
    if(showForm)
      setShowForm(false)
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
      {/* <p className="text-red-400 text-center md:hidden">To add questions, switch to desktop size.</p> */}

       
      {/* Button for Small Screens */}
      <div className="md:hidden flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="py-2 px-6 mb-6 bg-gray-800 text-white rounded-lg"
        >
          {showForm ? 'Close Form' : 'Open Form To Add'}
        </button>
      </div>

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
  className={`${!showForm?'hidden':null} md:block space-y-4 bg-white p-6 shadow rounded w-full min-w-[30vw] h-max text-gray-600`}
>
  <input
   required
    type="text"
    placeholder="Title e.g. Array"
    value={form.title}
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-100"
  />
  <input
   required
    type="text"
    placeholder="Question"
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


{/* Questions  */}

        <div className="min-w-[30vw] overflow-y-auto">
          {/* {console.log("Dsa list",dsaList)} */}
          {currentQuestions?.map((dsa, index) => (
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

          {/* pagination */}
          {dsaList.length>10?
           <div className="flex justify-center space-x-2 mt-4">
              <button onClick={prevPage} className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg">Prev</button>
              <span className="px-4 py-2 text-gray-500">Page {currentPage}</span>
              <button onClick={nextPage} className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg">Next</button>
            </div>
            :null}
        </div>

{/* Filter Box */}

        <FilterBox dsaList={dsaList} handleFilter={handleFilter} filter={filter}/>
      </div>
    </div>
    </>
  );
}