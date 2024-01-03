import './App.css';

import Home from './Routes/Home'
import Service from './Routes/Service'
import Guide from './Routes/Help'
import Contact from './Routes/Contact';
import Openticket from './Routes/Openticket';
import MyNavBar from './Comp/NavBar';


import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React from 'react';
function App() {
  return (
    
    <BrowserRouter>
      <main>
        <React.Fragment>
          <MyNavBar/>
        </React.Fragment>
        
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path='/Services' element={< Service />}/>
          <Route path='/Help' element={<Guide/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/OuvrirTicket' element={<Openticket />}/>
        </Routes>
      </main>
    </BrowserRouter>
   
  );
}

export default App;
