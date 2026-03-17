// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';

// function Home() {
//   return (
//     <div className="home-landing">
//       <section className="home-hero container">
//         <div className="home-hero-card shadow-lg">
//           <div className="row g-4 align-items-center justify-content-between">
//             <div className="col-md-6 col-lg-5">
//               <p className="text-uppercase fw-semibold small text-success mb-2">Smart Garbage • Clean City</p>
//               <h1 className="home-hero-title mb-3">Smart Garbage Reporting System</h1>
//               <p className="home-hero-subtitle mb-4">
//                 Citizens can quickly report garbage issues, upload photos, and track cleaning status so municipal teams
//                 can respond faster and keep every neighborhood clean.
//               </p>
//               <div className="d-flex flex-wrap gap-2">
//                 <Link to="/login" className="btn btn-primary btn-lg px-4">
//                   Login
//                 </Link>
//                 <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">
//                   Register
//                 </Link>
//               </div>
//             </div>
//             <div className="col-md-6 col-lg-6 d-none d-md-flex justify-content-center">
//               <div className="home-hero-illustration-wrapper">
//                 <img
//                   src="https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&w=1200&q=80"
//                   alt="Municipal worker collecting garbage"
//                   className="img-fluid"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="container py-4 py-md-5">
//         <div className="card shadow-sm border-0">
//           <div className="card-body p-4 p-md-5">
//             <h5 className="card-title mb-2">How it works</h5>
//             <p className="text-muted mb-3">
//               A simple flow designed for citizens and municipal staff to resolve issues faster.
//             </p>
//             <ol className="mb-0">
//               <li className="mb-2">Register or login to your account.</li>
//               <li className="mb-2">Submit a complaint with photo, location and details.</li>
//               <li className="mb-2">Municipal staff assigns and tracks cleaning.</li>
//               <li>Follow progress until the issue is marked completed.</li>
//             </ol>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">
        <h2>Smart Garbage</h2>
        <div>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-text">
          <h1>Smart Garbage Reporting System</h1>

          <p>
            Report garbage issues in your area and help municipal authorities
            maintain a clean and healthy city environment.
          </p>

          <div className="hero-buttons">
            <a href="/login">
              <button className="btn-login">Login</button>
            </a>

            <a href="/register">
              <button className="btn-register">Register</button>
            </a>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1604187351574-c75ca79f5807"
          alt="Garbage Management"
        />

      </section>

      {/* About Section */}
      <section className="about">
        <h2>About the System</h2>

        <p>
          This system allows citizens to easily report garbage problems
          in their locality by uploading photos and location details.
          Municipal authorities can monitor complaints and update
          the cleaning status in real-time.
        </p>
      </section>

      {/* How it Works */}
      <section className="steps">

        <h2>How It Works</h2>

        <div className="steps-container">

          <div className="step-card">
            <h3>1. Register</h3>
            <p>Create an account to report garbage issues.</p>
          </div>

          <div className="step-card">
            <h3>2. Report Issue</h3>
            <p>Upload garbage photo and location details.</p>
          </div>

          <div className="step-card">
            <h3>3. Cleaning</h3>
            <p>Municipal team reviews and cleans the location.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Smart Garbage Reporting System</p>
      </footer>

    </div>
  );
}

export default Home;

