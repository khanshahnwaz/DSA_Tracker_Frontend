"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from './components/Navar'
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoggedIn === false) router.push('/api/auth/signin');
    fetchQuestions();
  }, [auth]);

  const [questions, setQuestions] = useState([]);
  const [dsaList, setDsaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    topic: "",
    bruteforce: "",
    optimal: "",
    level: 'Easy',
  });
  const [filter, setFilter] = useState("All");

  const fetchQuestions = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`, {
      credentials: 'include'
    });

    if (res.status === 200) {
      const response = await res.json();
      response.reverse();
      setQuestions(response);
      setDsaList(response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Adding", { id: "Add" });
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: 'include'
    });

    if (res.status === 201) toast.success("Added", { id: "Add" });
    else toast.error("Failed to add", { id: "Add" });

    const data = await res.json();
    setQuestions([data, ...questions]);
    setDsaList([data, ...dsaList]);
    setForm({ title: "", topic: "", bruteForce: "", optimal: "", level: "Easy" });

    if (showForm) setShowForm(false);
  };

  const handleDelete = async (id) => {
    toast.loading("Deleting", { id: "Delete" });
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa/${id}`, {
      method: "DELETE",
      credentials: 'include'
    });

    if (res.status === 200) toast.success("Deleted", { id: "Delete" });
    else toast.error("Retry!", { id: "Delete" });

    fetchQuestions();
  };

  const handleFilter = (level) => {
    setFilter(level);
    const filtered = level === "All" ? questions : questions.filter((q) => q.level === level);
    setDsaList(filtered);
    setCurrentPage(1);
  };

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

  return (
    <>
      <Navbar />
      <div className="w-[100vw]">
        <Toaster position="top-right" />

        <div className="md:hidden flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="py-2 px-6 mb-6 bg-gray-800 text-white rounded-lg"
          >
            {showForm ? 'Close Form' : 'Open Form To Add'}
          </button>
        </div>

        <div className="md:flex space-x-5 justify-evenly container p-8 max-w-screen mx-auto max-h-screen">
          <form
            onSubmit={handleSubmit}
            className={`${!showForm ? 'hidden' : null} md:block space-y-4 bg-white p-6 shadow rounded w-full min-w-[30vw] h-max text-gray-600`}
          >
            <input required type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-3 border border-gray-300 rounded" />
            <textarea required placeholder="Brute Force Solution" value={form.bruteForce} onChange={(e) => setForm({ ...form, bruteForce: e.target.value })} className="w-full p-3 border border-gray-300 rounded" />
            <textarea required placeholder="Optimal Solution" value={form.optimal} onChange={(e) => setForm({ ...form, optimal: e.target.value })} className="w-full p-3 border border-gray-300 rounded" />
            <button type="submit" className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg">Add Question</button>
          </form>

          <div className="min-w-[30vw] overflow-y-auto">
            {currentQuestions.map((dsa, index) => (
              <div key={index} className={`p-6 bg-white shadow mb-4 rounded border-l-4 text-gray-600`}>  
                <h3 className="text-2xl font-bold">{dsa.title?.toUpperCase()}</h3>
                <p><strong>Brute Force:</strong> {dsa.bruteForce}</p>
                <button onClick={() => handleDelete(dsa._id)} className="bg-red-500 text-white p-2 mr-2 rounded mt-4">Delete</button>
              </div>
            ))}

            <div className="flex justify-center space-x-2 mt-4">
              <button onClick={prevPage} className="px-4 py-2 bg-gray-200 rounded-lg">Prev</button>
              <span className="px-4 py-2">Page {currentPage}</span>
              <button onClick={nextPage} className="px-4 py-2 bg-gray-200 rounded-lg">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
