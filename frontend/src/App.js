import React, { useCallback, useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LoginContext } from "./context/login-context"
import Header from "./components/Header/Header"
import Login from "./pages/Login/Login"
import Main from "./pages/Main/Main"
import Recipient from "./pages/Recipient/Recipient"
import CreateNewsletter from "./pages/Newsletter/Create/Create"
import SendNewsletter from "./pages/Newsletter/Send/Send"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((userid) => {
    setIsLoggedIn(true)
    setUserId(userid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes = (
    <Routes>
      <Route path="/newsletter-send" element={<SendNewsletter/>}></Route>
      <Route path="/newsletter-create" element={<CreateNewsletter/>}></Route>
      <Route path="/recipient" element={<Recipient />}></Route>
      <Route path="/main" element={<Main />}></Route>
      <Route path="/" element={<Login />} exact></Route>
      <Route path="*" element={<Login />}></Route>
    </Routes>
  )

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </LoginContext.Provider>
  )
}

export default App
