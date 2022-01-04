import * as React from 'react';
import Login from './components/Authentication/Login'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Test from './components/test'
import Layout from './components/Nav'
import Auth from './components/Authentication/Auth'
import SignUp from './components/Authentication/SignUp'
import InviteUser from './components/InviteUser'
import ConfirmPin from './components/Authentication/ConfirmPin'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} >
            <Route index element={<Login/>} />
            <Route path="login" element={<Login />} />
            <Route path="signup/:token" element={<SignUp />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path='invite-user' element={<InviteUser />} />
            <Route path='confirm-pin' element={<ConfirmPin />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
