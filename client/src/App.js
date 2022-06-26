import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthMovieDetail = Auth(MovieDetail, null);

  return (
    <Suspense fallback={<div> Loading... </div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route exact path="/login" element={<AuthLoginPage />} />
            <Route exact path="/register" element={<AuthRegisterPage />} />
            <Route exact path="/movie/:movieId" element={<AuthMovieDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
