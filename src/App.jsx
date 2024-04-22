import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationPanel from './components/Shared/NavigationPanel';
import ProfilePage from './components/User/ProfilePage';
import MainPage from './components/Forum/MainPage';
import LoginPage from './components/User/Login';
import SigninPage from './components/User/Signin';
import Logout from './components/User/Logout';


function App() {
  return (
    <>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
