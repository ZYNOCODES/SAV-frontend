import React from 'react'
import './style/contactinput.css'

const Contactforminput = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
  }
  };
  return (
    <div className='contactinput'>
        <label>{props.label}</label>
        <input placeholder={props.placeholder} type={props.type} width={props.width} onChange={handleChange} />
    </div>
  )
}

export default Contactforminput