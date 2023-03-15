import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import Businesses from "./pages/Businesses";
import { Navbar } from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuthState } from "./Context";
import SubmitBusiness from "./pages/SubmitBusiness";

function App() {
  const [count, setCount] = useState(0);

  const { isLoggedIn } = useAuthState();
  console.log(isLoggedIn);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/submit-business" element={<SubmitBusiness />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
