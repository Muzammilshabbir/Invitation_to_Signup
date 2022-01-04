import React from 'react'
import Login from '../components/Authentication/Login'
import Dashboard from '../components/Dashboard'
import SignUp from '../components/Authentication/SignUp'
import { BrowserRouter, Route, Routes,Outlet } from "react-router-dom";
import Test from './components/test'
import Layout from '../components/Nav'


export default function Web() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Test1 />}>
               <Route index element={<Login />} />
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="test" element={<Test />} />
            </Route>
        </Routes>
      </BrowserRouter>
    )
}

const Test1 = () => {
  return <Outlet />
}
