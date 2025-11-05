import React from "react";

function Landing() {
  // ✅ Automatically detect backend URL
  const API_BASE =
    process.env.REACT_APP_API_BASE;

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white font-inter">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-5 sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-gray-800">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-500 tracking-wide">
          PlaceMate
        </h1>

        <nav className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <a href="#about" className="hover:text-indigo-400 transition">
            About
          </a>
          <a href="#features" className="hover:text-indigo-400 transition">
            Features
          </a>
          <a href="#stats" className="hover:text-indigo-400 transition">
            Stats
          </a>
          <a href="#recruiters" className="hover:text-indigo-400 transition">
            Recruiters
          </a>
          <a
            href={`${API_BASE}/auth/google`}
            className="hover:text-indigo-400 transition"
          >
            Join
          </a>
        </nav>

        <a
          href={`${API_BASE}/auth/google`}
          className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg text-sm md:text-base font-semibold transition-transform hover:scale-105 shadow-md"
        >
          Get Started
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] text-center px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Empower Your{" "}
            <span className="text-indigo-400">Placement Journey</span> at VIT
            Vellore
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
            Connect with verified seniors, explore curated placement resources,
            and use AI-powered guidance — everything you need for a successful
            placement experience, all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${API_BASE}/auth/google`}
              className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-indigo-500/40 transition-transform hover:scale-105"
            >
              Join Now
            </a>
            <a
              href="#about"
              className="border border-gray-600 hover:border-indigo-400 px-8 py-3 rounded-xl font-semibold text-lg text-gray-200 hover:text-white transition-transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-6 md:px-20 bg-gradient-to-b from-gray-950 to-black text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">
          About VIT Vellore
        </h3>
        <p className="max-w-4xl mx-auto text-gray-300 leading-relaxed text-lg">
          Vellore Institute of Technology (VIT) is one of India’s top private
          universities, with NAAC A++ accreditation and consistent global
          recognition. Over <span className="text-indigo-400">867+</span>{" "}
          companies visit every year, offering dream opportunities across
          domains. PlaceMate aims to connect students, mentors, and placement
          tools in one unified platform for smarter preparation.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 md:px-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Designed for Every Stage of Your Journey
        </h3>
        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Community Forum",
              desc: "Discuss topics, share placement experiences, and get guidance from verified seniors and peers.",
            },
            {
              title: "AI Chat Assistant",
              desc: "Get instant answers about companies, resumes, and preparation strategies through smart AI support.",
            },
            {
              title: "Placement Insights",
              desc: "Access curated data on company packages, test patterns, and success stories — all verified by students.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-400/20 transition-transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold mb-3 text-indigo-400">
                {feature.title}
              </h4>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section
        id="stats"
        className="py-24 px-6 md:px-16 bg-gradient-to-b from-black to-gray-950 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-16">
          Placement Highlights – VIT Vellore 2024
        </h3>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { label: "Highest Package", value: "₹88 LPA" },
            { label: "Average Package", value: "₹9.9 LPA" },
            { label: "Students Placed", value: "7,526" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-800/60 p-8 rounded-2xl border border-gray-700 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/20 transition-transform hover:scale-105"
            >
              <p className="text-5xl font-bold text-indigo-400 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiters */}
      <section
        id="recruiters"
        className="py-24 px-6 md:px-16 bg-gray-950 text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-12">
          Top Recruiters at VIT
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            "Google",
            "Microsoft",
            "Amazon",
            "Deloitte",
            "Accenture",
            "Wipro",
            "Cognizant",
            "Infosys",
          ].map((company) => (
            <div
              key={company}
              className="bg-gray-800/70 border border-gray-700 p-6 rounded-xl text-gray-300 font-medium hover:scale-105 hover:border-indigo-400 transition"
            >
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 md:px-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-16 text-indigo-400">
          Success Stories
        </h3>
        <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
          {[
            {
              quote:
                "PlaceMate helped me get the right mentorship and stay updated about companies. I cracked my dream job at Microsoft!",
              name: "Ananya, CSE 2024",
            },
            {
              quote:
                "The forum and AI guidance made my prep smoother. Landed a Super Dream role at Deloitte!",
              name: "Karthik, ECE 2024",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-gray-800/60 p-8 rounded-2xl border border-gray-700 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/20 transition-transform hover:scale-105"
            >
              <p className="italic text-gray-300 leading-relaxed mb-4">
                “{t.quote}”
              </p>
              <h4 className="text-indigo-400 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Join */}
      <section
        id="join"
        className="py-24 px-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600"
      >
        <h3 className="text-4xl font-extrabold mb-6">
          Ready to Accelerate Your Career?
        </h3>
        <p className="max-w-2xl mx-auto text-indigo-100 text-lg mb-10">
          Join PlaceMate today using your VIT email and start learning, growing,
          and connecting with the right mentors for your dream job.
        </p>
        <a
          href={`${API_BASE}/auth/google`}
          className="bg-black text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-gray-900 transition-transform transform hover:scale-105"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-800">
        © 2025 PlaceMate @ VIT Vellore. Built with 💜 by Students, for Students.
      </footer>
    </div>
  );
}

export default Landing;
