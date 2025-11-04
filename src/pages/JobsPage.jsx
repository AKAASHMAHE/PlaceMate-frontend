// src/pages/JobsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    location: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = filters.role || "software engineer";
      const res = await axios.get(`http://localhost:5000/api/jobs?q=${encodeURIComponent(query)}&limit=30`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const filteredJobs = jobs.filter((job) => {
    const matchLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    return matchLocation;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-400">Job Finder</h2>
        <Link to="/dashboard" className="text-indigo-300 hover:text-indigo-400">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-800 p-4 rounded-xl"
      >
        <input
          type="text"
          placeholder="Search role (e.g., Frontend, Java, Data)"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          className="flex-1 p-3 rounded-lg text-black"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="flex-1 p-3 rounded-lg text-black"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Search
        </button>
      </form>

      {/* Job Results */}
      {loading ? (
        <p className="text-gray-400">Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-400">No jobs found for your filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <a
              key={job.id}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition transform hover:shadow-lg hover:shadow-indigo-500/30"
            >
              <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-300">{job.company}</p>
              <p className="text-sm text-gray-400 mt-1">
                {job.location} •{" "}
                {new Date(job.date).toLocaleDateString("en-IN")}
              </p>
              <p className="mt-3 text-sm text-gray-400">
                Category: {job.category || "General"}
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-indigo-400 font-semibold text-sm">
                  View Details →
                </span>
              </div>
            </a>
          ))}
        </div>
      )}


    </div>
  );
};

export default JobsPage;
