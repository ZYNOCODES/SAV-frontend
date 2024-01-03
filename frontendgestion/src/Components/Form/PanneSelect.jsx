import './FormInput.css'
import React from 'react'

const PanneSelect = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        <option value=''>Sélectionné votre panne</option>
        <option value='Blocage'>Blocage</option>
        <option value='Blocage logo'>Blocage logo</option>
        <option value="Problème d'afficheur">Problème d'afficheur</option>
        <option value="Problème de télécommande">Problème de télécommande</option>
        <option value="Problème d'affichage">Problème d'affichage</option>
        <option value="Écran noir">Écran noir</option>
        <option value="Écran blanc">Écran blanc</option>
        <option value="Écran bleu">Écran bleu</option>
        <option value="Problème de couleur">Problème de couleur</option>
        <option value="Problème d'allumage">Problème d'allumage</option>
        <option value="Problème de carte mère">Problème de carte mère</option>
        <option value="Problème de led">Problème de led</option>
        <option value="Problème de démo">Problème de démo</option>
        <option value="Ne démarre pas">Ne démarre pas</option>
        <option value="Problème HDMI">Problème HDMI</option>
        <option value="Problème USB">Problème USB</option>
        <option value="Problème du son">Problème du son</option>
        <option value="Problème de mise à jour">Problème de mise à jour</option>
        <option value="Problème de connectivité">Problème de connectivité</option>
        <option value="Problème d'application">Problème d'application</option>
        <option value="Tache sur écran">Tache sur écran</option>
        <option value="Trait sur écran (vertical)">Trait sur écran (vertical)</option>
        <option value="Trait sur écran (horizontal)">Trait sur écran (horizontal)</option>
        <option value="Autres">Autres</option>
      </select>
    </div>
    
  )
}

export default PanneSelect
