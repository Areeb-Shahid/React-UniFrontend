import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="mt-32 min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <Container>
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={token ? <Home /> : <Navigate to="/sign-in" />} />
          <Route path="/posts" element={token ? <Posts /> : <Navigate to="/sign-in" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/sign-in" />} />
          <Route path="/post-details" element={token ? <Details /> : <Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
