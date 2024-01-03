import React from 'react'
import '../Routes/Styles/servicesstyle.css'
import locationicon from '../Routes/assets/Images/locationicon.png'

function ServiceCard(props){
  return (
    <div className="card">
    <div className="icon-section">
      <div className='icon'>
        <img src={locationicon}/>
      </div>
    </div>
    <div class="info">
      <h5>{props.title}</h5>
      <span>{props.location}</span>
      <hr/>
      <h6>{props.number}</h6>
    </div>
    </div>  
  )
}

export default ServiceCard