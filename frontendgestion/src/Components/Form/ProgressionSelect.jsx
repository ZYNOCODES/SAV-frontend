import './FormInput.css'
import React from 'react'

const ProgressionSelect = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select
      onChange={handleChange}>
        <option value={"All"}>All</option>
        <option value={0}>Produits En attente depot</option>
        <option value={6}>Produits suspendu</option>
        <option value={1}>Produits deposés</option>
        <option value={2}>En reparation au centre</option>
        <option value={3}>Produits reparés</option>
        <option value={4}>Produits reparés en attente de livraison</option>
      </select>
    </div>
    
  )
}

export default ProgressionSelect