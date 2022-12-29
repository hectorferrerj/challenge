import React, { useCallback, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { LoginContext } from './context/login-context';
import Header from './components/Header/Header';
import Login from "./pages/Login/Login";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(userid => {
    setIsLoggedIn(true);
    setUserId(userid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);


  let routes = (
    <Routes>
      <Route path="/" element={<Login/>} exact></Route>
      <Route path="*" element={<Login/>}></Route>
    </Routes>
  );

  return (
    <LoginContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      login: login,
      logout: logout
    }}
  >
    <Router>
      <Header/>
      <main>{routes}</main>
    </Router>
  </LoginContext.Provider>

   
  );
}

export default App;
