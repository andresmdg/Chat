import { Navigate, Route, Routes } from "react-router-dom";
import LoginView from "./components/views/Login";
import SignupView from "./components/views/Signup";
import HomeView from "./components/views/Home";
import { useAuth } from "./components/hooks/useAuth";
import "./App.css";

function App() {
  const {accessToken} = useAuth();

  return (
    <Routes>
      <Route path='/*' element={accessToken ? <HomeView /> : <Navigate to='/login' />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signup' element={<SignupView />} />
    </Routes>
  );
}

export default App;
