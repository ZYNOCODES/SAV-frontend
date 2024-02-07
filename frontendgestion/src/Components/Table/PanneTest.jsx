import React from 'react'
import VoirButton from '../Buttons/buttonVoir';

import { useState} from 'react';
import moment from 'moment';


function PanneTest ({Panne}){

  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.ReferanceProduit}</td>
      <td className="table-patients-td-annee">{formatDate(Panne.FinReparation)}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.TypePanne}</td>
    </tr>
  )
}
function formatDate(dateString) {
  const timeZone = 'Africa/Algiers'; // Algeria's time zone
  const date = moment.tz(dateString, timeZone); // Parse the date string with the specified time zone
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const month = monthNames[date.month()];
  const day = date.date();
  const year = date.year();
  const hours = date.hours();
  const minutes = date.minutes();

  const formattedDate = `${month} ${day}, ${year} at ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedDate;
}
export default PanneTest