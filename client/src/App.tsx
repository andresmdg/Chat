import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginView from "./components/views/Login";
import SignupView from "./components/views/Signup";
import HomeView from "./components/views/Home";
import { useAuth } from "./components/hooks/useAuth";
import { useEffect } from "react";
import { useSocket } from "@/components/hooks/useSocket";
import "./App.css";

function App() {
  const {accessToken} = useAuth();
  const {initSocket} = useSocket();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      initSocket(accessToken)
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[accessToken])

  return (
    <Routes>
      <Route path='/*' element={accessToken ? <HomeView /> : <Navigate to='/login' />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signup' element={<SignupView />} />
    </Routes>
  );
}

export default App;
