import React, { useEffect, useState } from 'react'
import VoirButton from '../Buttons/buttonVoir';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import moment from 'moment-timezone';

const DelaiRepRow = ({data}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [timeDiff, setTimeDiff] = useState('');
  const Redirect =()=>{
    if(user?.Role === "SAV" && (data.UserID === user?.id || data.UserID === null) && data.Progres !== 5){
      navigate(`/DetailPanneSav/${data.id}`)
    }else{
      navigate(`/Details/${data.id}`)
    }
  }
  useEffect(() => {
    if (data.DateDepot && data.FinReparation) {
      const startDate = new Date(data.DateDepot);
      const endDate = new Date(data.FinReparation);
      //to this forma DD days HH hours MM minutes SS seconds
      const time = (endDate - startDate)
      const seconds = Math.floor(time / 1000);
      const days = Math.floor(seconds / (3600 * 24));
      const remainingSeconds = seconds - days * 3600 * 24;
      const hours = Math.floor(remainingSeconds / 3600);
      const remainingSecondsAfterHours = remainingSeconds - hours * 3600;
      const minutes = Math.floor(remainingSecondsAfterHours / 60);
      const secondsRemaining = (remainingSecondsAfterHours - minutes * 60);

      setTimeDiff(`${String(days).padStart(2, '0')}J ${String(hours).padStart(2, '0')}h 
      ${String(minutes).padStart(2, '0')}min ${String(secondsRemaining).padStart(2, '0')}s`)
    }
  }, [data]);

  return (
    <tr className='table-nouveau-ne-ligne'>
        <td className="table-patients-td-nom">{data.ReferanceProduit}</td>
        <td className="table-patients-td-annee">{formatDate(data.DateDepot)}</td>
        <td className="table-patients-td-willaya">{data.FinReparation ? formatDate(data.FinReparation) : 'en train de réparation'}</td>
        <td className="table-patients-td-region"><div className='delaimoy'>{timeDiff ? timeDiff : '00J 00h 00min 00s'}</div></td>
        <td className="table-patients-td-region">{data.CentreDepot}</td>
        <td className="table-patients-td table-patient-td-button">
          <VoirButton Redirect={Redirect}/>
        </td>
      </tr>
  )
}
function formatDate(dateString) {
  const timeZone = 'Africa/Algiers'; // Algeria's time zone
  const date = moment(dateString).tz(timeZone);
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  const month = monthNames[date.month()];
  const day = date.date();
  const year = date.year();
  const hours = date.hours();
  const minutes = date.minutes();

  const formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}`;
  return formattedDate;

}
export default DelaiRepRow