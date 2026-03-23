
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import coursesData from "../data/coursesData";

// function Home() {
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
// const [query, setQuery] = useState("");

// const handleSearch = () => {
//   setQuery(searchText);
// };

// const filteredCourses = coursesData.filter(course =>
//   course.title.toLowerCase().includes(query.toLowerCase())
// );

//   return (
//     <>
//       {/* NAVBAR */}
//       <div className='nav'>
//         <div className="navbar">
//           <div className="logo">
//             <img className='logoimg' src="logo.png" alt="logo" />
//             Coursezy
//           </div>

//           <div className="nav-buttons">
//             <button className="btn btn-login" onClick={() => navigate("/login")}>
//               Login
//             </button>

//             <button className="btn btn-signup" onClick={() => navigate("/signup")}>
//               Signup
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* HERO SECTION */}
//       <section className="hero">
//         <h1>Find the Best Courses for You</h1>
//         <p>Discover, Learn, and Upskill with our wide range of courses</p>

//         <div className="search-box">
//           <input
//          type="text"
//           placeholder="Search Courses"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           />
//         <button onClick={handleSearch}>Search</button>
//         </div>

//         <button className="explore-btn">Explore Courses</button>
//       </section>

//       {/* COURSES SECTION */}
//       <section className="courses">
//         <h2>Our Courses</h2>

//         <div className="course-grid">
//           {filteredCourses.length > 0 ? (
//             filteredCourses.map(course => (
//               <div className="course-card" key={course.id}>
//                 <img src={course.img} alt={course.title} />
//                 <h3>{course.title}</h3>
//                 <p>{course.category}</p>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">No courses found 😢</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import coursesData from "../data/coursesData";

function Home() {
  const navigate = useNavigate();

  /* ================= THEME ================= */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  /* ================= SEARCH ================= */
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setQuery(searchText);
  };

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`app ${theme}`}>
      {/* NAVBAR */}
      <div className='nav'>
        <div className="navbar">
          <div className="logo">
            <img className='logoimg' src="logo.png" alt="logo" />
            Coursezy
          </div>

          <div className="nav-buttons">
            
            {/* THEME BUTTON */}
            <button className="btn btn-theme" onClick={toggleTheme}>
              {theme === "light" ? <img className='mood' src='moon.png'></img> : <img className='mood'  src='Sun.png'></img> }
            </button>

            <button className="btn btn-login" onClick={() => navigate("/login")}>
              Login
            </button>

            <button className="btn btn-signup" onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Find the Best Courses for You</h1>
        <p>Discover, Learn, and Upskill with our wide range of courses</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Courses"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <button className="explore-btn">Explore Courses</button>
      </section>

      {/* COURSES SECTION */}
      <section className="courses">
        <h2>Our Courses</h2>

        <div className="course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div className="course-card" key={course.id}>
                <img src={course.img} alt={course.title} />
                <h3>{course.title}</h3>
                <p>{course.category}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No courses found 😢</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
