import React, { useEffect, useState } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useThemeHook } from "./GlobalComponents/ThemeProvider"
import Header from "./components/Header"
import { Router } from "@reach/router"
import { useDispatch } from "react-redux"

//Pages
import Home from "./Pages/Home"
import Cart from "./Pages/Cart"
import { axiosInstance } from "./api"

import Login from "./Pages/LoginPage"
import Register from "./Pages/Register"
import LandingPage from "./Pages/LandingPage"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"

function App() {
  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }
      const response = await axiosInstance.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })
      localStorage.setItem("auth_token", response.data.token)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }

  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  const [theme] = useThemeHook()
  return (
    <main
      className={theme ? "bg-black" : "bg-light-2"}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {/* <Header /> */}
      <Navbar />

      {/* <Router> */}
      {/* <Home path="/" /> */}

      {/* <Cart path="/cart" /> */}
      {/* </Router> */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </main>
  )
}

export default App
