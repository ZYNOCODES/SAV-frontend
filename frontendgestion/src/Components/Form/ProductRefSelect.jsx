import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

const ProductSelect = (props) => {
  const { user } = useAuthContext();
  const handleChange = (selectedOption) => {
    if (selectedOption === null) {
      // Handle clearable button click
      if (props.onChange) {
        props.onChange(null);
      }
    } else {
      // Handle regular selection
      if (props.onChange) {
        props.onChange(selectedOption.value);
      }
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BASE+'/Product', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchProductData();
  }, [user?.token]);

  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <Select
        className="select-custom"
        classNamePrefix="select"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: 10,
            borderColor: state.isFocused ? '#000' : 'grey',
            textAlign: 'center',
            fontSize: '1em',
            display: 'flex',
            backgroundColor: '#dfdcdc',
            marginTop: 5
          }),
        }}
        placeholder = "Sélectionné votre produit"
        isClearable={true}
        isSearchable={true}
        options={products.map(option => ({
          value: option.ReferanceProduit,
          label: option.ReferanceProduit
        }))}
        onChange={handleChange}
      />
    </div>
  )
}

export default ProductSelect
