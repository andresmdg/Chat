import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginView from "./components/views/Login";
import SignupView from "./components/views/Signup";
import HomeView from "./components/views/Home";
import "./App.css";

function App() {

  /*
    esto puede causar una recarga infinita en la página
    utiliza useNavigate de React router para este tipo de casos
  */

  //  useEffect(() => {
  //   // Check if user is logged in
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // If user is logged in, redirect to home page
  //     window.location.href = "/home";
  //    }

  //   }, []);

    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/");
        return
      }
      // navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return (
    <Routes>
      <Route path='/*' element={<HomeView />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signup' element={<SignupView />} />
    </Routes>
  );
}

export default App;
