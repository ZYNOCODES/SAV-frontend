import React from 'react'
import { FaRegEye } from "react-icons/fa";

export default function VoirButton({Redirect, red}) {
  return (
    <div className={`voir-btn-class${red ? '-red' : ''}`} onClick={Redirect}>
      <FaRegEye size={15} fill={`${red ? '#DA171B' : '#fff'}`} />
      <input type="submit" value="Voir" className="voir-btn"/>
    </div>
  );
}
