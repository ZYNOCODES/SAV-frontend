import '../Form/style/FormInput.css'
import React from 'react'


const FormInput = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
  }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <input placeholder={props.placeholder} type={props.type} onChange={handleChange} />
    </div>
  )
}

export default FormInput