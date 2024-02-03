import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import UpdateProfile from './components/UpdateProfile';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  const user = useSelector((state) => state.user.currentUser);


  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
          path="/"
          element={user ? <UserProfile/> : <Login />}
        />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<UserList />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/view-profile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
