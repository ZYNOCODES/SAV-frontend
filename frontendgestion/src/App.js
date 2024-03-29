import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PanneList } from './Pages/PanneList';
import { PanneListLivrees } from './Pages/PanneListLivrees';
import { useEffect, useRef, useState } from 'react';
import Login from './Pages/Login';
import DetailsPanne from './Pages/DetailsPanne';
import Users from './Pages/Users';
import { useAuthContext } from './hooks/useAuthContext';
import ProduitDepose from './Pages/ProduitDepose';
import DetailsPanneSav from './Pages/DetailsPanneSav';
import CreateNewUser from './Pages/CreateNewUser';
import UpdateUser from './Pages/UpdateUser';
import Dashboard from './Pages/dashboard';
import OuvrirUnTicket from './Pages/OuvrirUnTicket';
import Profile from './Pages/Profile';
import { CircularProgress } from '@mui/material';
import './App.css'

function App() {
  const { user } = useAuthContext();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="Main-app">
        <div className="CircularProgress-container">
          <CircularProgress className='CircularProgress' />
        </div>  
        <h1>Pas de connexion Internet...</h1>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/"
            element={user ? (
              user.Role === 'Admin' ? (
                <Navigate to="/Main-Dashboard" />
              ) : (
                <Navigate to="/liste_des_pannes" />
              )
            ) : (
              <Login />
            )}
          />
          <Route path="/Main-Dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/liste_des_pannes" element={user ? <PanneList /> : <Navigate to="/" />} />
          <Route path="/OuvrirTicket" element={user ? <OuvrirUnTicket /> : <Navigate to="/" />} />
          <Route path="/PannesLivree" element={user ? <PanneListLivrees /> : <Navigate to="/" />} />
          <Route path="/Utilisateurs" element={user ? <Users /> : <Navigate to="/" />} />
          <Route path="/Details/:id" element={user ? <DetailsPanne /> : <Navigate to="/" />} />
          <Route path="/EnAttenteDeDepot/:id" element={user ? <ProduitDepose /> : <Navigate to="/" />} />
          <Route path="/DetailPanneSav/:id" element={user ? <DetailsPanneSav /> : <Navigate to="/" />} />
          <Route path="/NouveauUser" element={user ? <CreateNewUser /> : <Navigate to="/" />} />
          <Route path="/UpdateUser/:id" element={user ? <UpdateUser /> : <Navigate to="/" />} />
          <Route path="/Profile/:id" element={user ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
