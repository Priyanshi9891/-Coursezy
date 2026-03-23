
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Dashboard(){

    
    const user = localStorage.getItem("username");

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        handleSuccess('User logged out');

        setTimeout(()=>{
          navigate('/home');
        },500);
    };

    return(
      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <img className='logoimg' src="logo.png" alt="logo" />
            Coursezy
          </div>
          <nav>
            <a href="#">Dashboard</a>
            <a href="#">My Courses</a>
            <a href="#">Progress</a>
            <a href="#">Profile</a>
            <a href="#" onClick={handleLogout}>Logout</a>
            <ToastContainer />
          </nav>
        </aside>

        {/* Main */}
        <div className="main-content">
          {/* Navbar */}
          <header className="navbar">
            <h2>Welcome, {user } 👋</h2>
            <div className="user-info">👤 {user}</div>
          </header>

          {/* Content */}
          <div className="content">
            {/* Stats */}
            <div className="stats">
              <div className="stat-card">Enrolled <span>3</span></div>
              <div className="stat-card">Completed <span>1</span></div>
              <div className="stat-card">In Progress <span>2</span></div>
            </div>

            {/* Courses */}
            <div className="courses-section">
              <h2>My Courses</h2>

              <div className='course'>
                <div className="course-card">
                  <img src="https://udemy.benesse.co.jp/wp-content/uploads/what-is-css-01-large.jpg" alt="CSS" />
                  <h3>CSS Course</h3>
                  <p>UI Design</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "40%" }}></div>
                  </div>
                  <span>40%</span>
                </div>

                <div className="course-card">
                  <img src="https://cdn.hackr.io/uploads/posts/large/1582104017JvTCRiVe0D.png" alt="HTML" />
                  <h3>HTML Course</h3>
                  <p>Beginner Friendly</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "100%" }}></div>
                  </div>
                  <span>100%</span>
                </div>

                <div className="course-card">
                  <img src="https://img-c.udemycdn.com/course/480x270/548278_b005_9.jpg" alt="NodeJS" />
                  <h3>Node.js Course</h3>
                  <p>Backend Development</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "20%" }}></div>
                  </div>
                  <span>20%</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
