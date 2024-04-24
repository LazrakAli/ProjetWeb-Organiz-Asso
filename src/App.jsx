import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationPanel from './components/Shared/NavigationPanel';
import ProfilePage from './components/User/ProfilePage';
import MainPage from './components/Forum/MainPage';
import LoginPage from './components/User/Login';
import LoginAdminPage from './components/Admin/LoginAdmin';
import SigninPage from './components/User/Signin';
import ListUsers from './components/Forum/ListUsers'
import ListMessages from './components/Forum/ListMessages'
import Logout from './components/User/Logout';
import LogoutAdmin from './components/Admin/LogoutAdmin';


function App() {
  return (
    <>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/admin" element={<LoginAdminPage/>}/>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/messages" element={<ListMessages />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logout/admin" element={<LogoutAdmin />} />
        <Route path="/user/:userId" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
