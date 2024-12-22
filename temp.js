// DSA Tracker App - Full Implementation with Edit and Filter Functionality
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DsaTracker = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ title: '', level: '', solution: '' });
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        const res = await axios.get('https://dsa-tracker-backend-kappa.vercel.app/api/dsa');
        setQuestions(res.data);
        setFilteredQuestions(res.data);
    };

    const handleEdit = (id) => {
        const question = questions.find(q => q._id === id);
        setFormData({ title: question.title, level: question.level, solution: question.solution });
        setEditId(id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`https://dsa-tracker-backend-kappa.vercel.app/api/dsa/${id}`);
        fetchQuestions();
    };

    const handleSave = async () => {
        if (editId) {
            await axios.put(`https://dsa-tracker-backend-kappa.vercel.app/api/dsa/${editId}`, formData);
        } else {
            await axios.post('https://dsa-tracker-backend-kappa.vercel.app/api/dsa', formData);
        }
        fetchQuestions();
        setFormData({ title: '', level: '', solution: '' });
        setEditId(null);
    };

    const handleFilter = (level) => {
        setFilter(level);
        
        if (level === 'All') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(q => q.level === level));
        }
    };

    return (
        <div className="container">
            <h1>DSA Tracker</h1>

            <div className="filter-bar">
                <button onClick={() => handleFilter('All')}>All</button>
                <button onClick={() => handleFilter('Easy')}>Easy</button>
                <button onClick={() => handleFilter('Medium')}>Medium</button>
                <button onClick={() => handleFilter('Hard')}>Hard</button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    required
                >
                    <option value="">Select Level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <textarea
                    placeholder="Solution"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    required
                />
                <button type="submit">{editId ? 'Update' : 'Add'}</button>
            </form>

            <ul>
                {filteredQuestions.map(q => (
                    <li key={q._id}>
                        <h3>{q.title} - {q.level}</h3>
                        <p>{q.solution}</p>
                        <button onClick={() => handleEdit(q._id)}>Edit</button>
                        <button onClick={() => handleDelete(q._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DsaTracker;
