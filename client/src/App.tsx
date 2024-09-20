import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginView from "./components/views/Login";
import SignupView from "./components/views/Signup";
import HomeView from "./components/views/Home";
import { useAuth } from "./components/hooks/useAuth";
import { useEffect } from "react";
import { initSocket } from "./utils/socket";
import "./App.css";

function App() {
  const {accessToken} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      initSocket(accessToken)
      navigate('/')
    }
  },[accessToken, navigate])

  return (
    <Routes>
      <Route path='/*' element={accessToken ? <HomeView /> : <Navigate to='/login' />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signup' element={<SignupView />} />
    </Routes>
  );
}

export default App;
