import React from 'react'
import './Styles/HomeStyle.css'
import {useNavigate} from 'react-router-dom';




const Home= () =>{
  const navigate = useNavigate();

  const navigatetoOpenTicket =()=>{
    navigate('/OuvrirTicket');
  }
  return (
    <body className='main-container'>
      
      <section class="main">
        <h2>
          Avez-vous un appareil a reparer ?
        </h2>
        <h1>
        هل لديك جهاز لإصلاحه ؟
        </h1>

        <button class="main-btn" onClick={navigatetoOpenTicket} >Ouvrir un ticket</button>
      </section>
    </body>
  )
}

export default Home