import './App.css';
import React from "react";
import {
  BrowserRouter,
  Route, 
  Routes,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'; 
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {

  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element = {<LandingPage/>} />
        <Route exact path="/login" element = {<LoginPage/>} />
        <Route exact path="/register" element = {<RegisterPage/>} /> */}
        <Route exact path="/" element = {<AuthLandingPage/>} />
        <Route exact path="/login" element = {<AuthLoginPage/>} />
        <Route exact path="/register" element = {<AuthRegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
