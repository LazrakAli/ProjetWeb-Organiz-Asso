import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationPanel from './src/Shared/NavigationPanel';
import ProfilePage from './src/User/ProfilePage';
import MainPage from './src/Forum/MainPage';
import LoginPage from './src/User/Login';
import SigninPage from './src/User/Signin';
import ListUsers from './src/Forum/ListUsers'
import AdminPage from './src/Forum/AdminPage'
import Logout from './src/User/Logout';
import Acceuil from './src/Forum/Accueil'
import PageReponse from './src/Forum/PageReponse';
import UserProfile from './src/Forum/UserProfile';


function App() {
  return (
    <>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/admin/page" element={<AdminPage />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/messages/:messageId" element={<PageReponse/>}/>
        <Route path="/user/:login" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
