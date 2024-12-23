'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
      const [questions, setQuestions] = useState([]);
  const [dsaList, setDsaList] = useState([]);
  const [form, setForm] = useState({ title: '', topic: '', bruteForce: '', optimal: '', level: 'Easy' });
    const [filter, setFilter] = useState('All');
    const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions=async()=>{
    // fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`,{
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`,{
      // mode:'no-cors',
    })
      .then(res => res.json())
      .then(data => (
        data.reverse(),
        setDsaList(data),
      setQuestions(data)));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted with data: ",JSON.stringify(form))
    // const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    //   // mode:'no-cors',
    // });

    const res = await axios.post('https://dsa-tracker-backend-kappa.vercel.app/api/dsa', JSON.stringify(from));

    const data = await res.json();
    setDsaList([data,...dsaList]);
    setQuestions([data,...questions])
    setForm({ title: '', topic: '', bruteForce: '', optimal: '', level: 'Easy' });
  };

  const handleDelete = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dsa/${id}`, { method: 'DELETE' });
    fetchQuestions();
  };

  const handleFilter = (level) => {
    setFilter(level);
    setDsaList(questions)
    if (level === 'All') {
        setDsaList(questions);
    } else {
        setDsaList(questions.filter(q => q.level === level));
        // console.log("question ",questions)
    }
};

  return (
    <div className='w-[100vw]'>

          <h1 className="text-4xl font-bold mb-4 text-center text-gray-700">DSA Tracker</h1>
       
    <div className="md:flex space-x-5 justify-evenly container p-8  max-w-screen mx-auto max-h-screen">

      
    


      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded w-full h-max text-gray-600">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-3 border rounded" />
        <input type="text" placeholder="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full p-3 border rounded" />
        <textarea placeholder="Brute Force Solution" value={form.bruteForce} onChange={(e) => setForm({ ...form, bruteForce: e.target.value })} className="w-full p-3 border rounded" />
        <textarea placeholder="Optimal Solution" value={form.optimal} onChange={(e) => setForm({ ...form, optimal: e.target.value })} className="w-full p-3 border rounded" />
        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full p-3 border rounded text-gray-500">
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full">Add</button>
      </form>

      <div className=" overflow-y-auto">
        {dsaList.map((dsa, index) => (
          <div key={index} className={`p-6 bg-white shadow mb-4 rounded border-l-4 text-gray-600 ${dsa.level === 'Easy' ? 'border-green-500' : dsa.level === 'Medium' ? 'border-yellow-500' : 'border-red-500'}`}>
            <h3 className="text-2xl font-bold">{dsa.title.toUpperCase()}</h3>
            <p className='font-semibold'><strong>Question:</strong> {dsa.topic.toUpperCase()}</p>
            <p><strong>Brute Force:</strong> {dsa.bruteForce}</p>
            <p><strong>Optimal:</strong> {dsa.optimal}</p>
             <p className={`${dsa.level === 'Easy' ? 'text-green-500' : dsa.level === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{dsa.level}</p>
            <button onClick={() => handleDelete(dsa._id)} className="bg-red-500 text-white p-2 mr-2 rounded mt-4 hover:opacity-50">Delete</button>
            <button onClick={() => handleEdit(dsa._id)} className="bg-blue-500 text-white p-2 rounded mt-4 hover:opacity-50">Edit</button>

          </div>
        ))}
      </div>
      <div className="filter-bar flex h-max space-x-2 text-gray-500">
                <button className={` ${filter=='All'?'bg-gray-600 text-gray-400':null} rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`} onClick={() => handleFilter('All')}>All</button>
                <button className={` ${filter=='Easy'?'bg-gray-600 text-gray-400':null} rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`} onClick={() => handleFilter('Easy')}>Easy</button>
                <button className={` ${filter=='Medium'?'bg-gray-600 text-gray-400':null} rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`} onClick={() => handleFilter('Medium')}>Medium</button>
                <button className={` ${filter=='Hard'?'bg-gray-600 text-gray-400':null} rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`} onClick={() => handleFilter('Hard')}>Hard</button>
            </div>
    </div>
    
    </div>
  );
}
