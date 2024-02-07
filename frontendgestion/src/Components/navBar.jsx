import React, { useEffect } from 'react'
import { useState } from "react";
import Logo from './assets/Logo.png'
import profilIcon from './assets/Ellipse4.png'
import { FaInfoCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { CircularProgress } from '@mui/material';
import { useAuthContext } from "../hooks/useAuthContext";

export default function MyNavBar({ act, setAct }) {
  const { user } = useAuthContext();
  const [UserData, setUserData] = useState(); 
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [internetLoading, setInternetLoading] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      setInternetLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+`/User/${user?.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error("Error receiving user data", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }finally{
        setInternetLoading(false);
      }
    };
  
    fetchUserData();
  }, [user?.id, user?.token]); 
  if (internetLoading) {
    return (
      <div className="Main-app">
        <div className="CircularProgress-container">
          <CircularProgress className='CircularProgress' />
        </div>  
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="Navbar">
      <nav>
        <div className="left-nav">
          <div className="image">
            <img src={Logo} alt="logo" height={20}/>
          </div>
        </div>
        <div className="right-nav">
          <div className='aide'>
              <FaInfoCircle fill='#fff' onClick={openDialog} />
              <h1>Aide</h1>
          </div>
          <div className="doctor">
          
          <div className="doctor-pic">
            <img src={profilIcon} alt="icon"/>
          </div>
          
            <div className="doctor-name">
              {user && <h4>{UserData?.Nom}{" "}{UserData?.Prenom}</h4>}
              {user && <span>{UserData?.Centre}</span>}
            </div>

            
          </div>
        </div>
      </nav>
      <div>
       
      </div>


      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
          
            
            <iframe width="560" height="315" src="https://www.youtube.com/embed/7zXjf3Zxk-U" title="" frameBorder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  allowFullScreen><br/>Powered by <a href="https://youtubeembedcode.com">youtube embed code</a> and <a href="https://howtostopgamstop.com/">howtostopgamstop.com</a></iframe>
            <span className="close-button" onClick={closeDialog}>
              <IoCloseCircle fill="#DA171B" size={30}/>
            </span>
          </div>
        </div>
      )}
    </div>



  );
}
