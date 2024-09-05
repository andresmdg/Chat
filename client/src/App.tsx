import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginView from "./components/views/Login";
import SignupView from "./components/views/Signup";
import HomeView from "./components/views/Home";
import { useEffect } from "react";

function App() {

   useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      // If user is logged in, redirect to home page
      window.location.href = "/home";
     }
     
    }, []);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignupView />} />
      </Routes>
    </Router>
  );
}

export default App;
