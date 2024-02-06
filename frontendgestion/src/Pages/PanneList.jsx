import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import {IoArrowBackCircleSharp, IoArrowForwardCircle} from  "react-icons/io5"
import { FaCircle } from "react-icons/fa";
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from '../hooks/useAuthContext';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import ProgressionSelect from '../Components/Form/ProgressionSelect';
import './Style/PanneList.css'
import { CircularProgress } from '@mui/material';
import moment from 'moment';

export const PanneList = () => {
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centredepot, setcentredepot] = useState("All");
    const [progres, setprogres] = useState("All");
    const [datedepot, setdatedepot] = useState(null);
    const [ProduitenPanne, setProduitenPanne] = useState([]);
    const { user } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const [totalPages, settotalPages] = useState(0);

    const handleCentreInputChange = (newValue) => {
      setcentredepot(newValue);
    };
    const handleProgresInputChange = (newValue) => {
      setprogres(newValue);
    };
    const handleDateInputChange = (event) => {
      setdatedepot(event.target.value);
    };
    useEffect(() => {
      const fetchPannesData = async () => {
        try {
          const queryParams = new URLSearchParams({
            Role: user?.Role,
            CentreDepot: user?.Centre,
            UserID: user?.id,
          });
    
          const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/?${queryParams}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setProduitenPanne(data.Pannes);
          } else {
            console.error("Error receiving Panne data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching Panne data:", error);
        }
      };
    
      fetchPannesData();
    }, [user?.Centre, user?.Role, user?.id, user?.token, search, datedepot, progres, centredepot]);
    // Filter data based on search criteria
    const filteredPanneData = ProduitenPanne?.filter(item => {
        if(
          (
            search.toLowerCase() === "" ||
            item.id.toString().includes(search.toLowerCase()) ||
            item.Nom.toLowerCase().includes(search.toLowerCase()) ||
            item.Prenom.toLowerCase().includes(search.toLowerCase()) ||
            item.Progres.toString().includes(search.toLowerCase()) ||
            item.CentreDepot.toLowerCase().includes(search.toLowerCase()) ||
            item.ReferanceProduit.toLowerCase().includes(search.toLowerCase()) ||
            item.TypePanne.toLowerCase().includes(search.toLowerCase()) ||
            formatDate(item.DateDepot).toLowerCase().includes(search.toLowerCase())
          )
          &&
          (
            centredepot === "All" ||
            item.CentreDepot.toLowerCase().includes(centredepot.toLowerCase())
          )
          &&
          (
            datedepot === null || item.DateDepot.includes(datedepot)
          )
          &&
          (
            progres === "All" ||
            (item.Progres.toString().includes(progres.toString()) && item.Etat === null) ||
            (progres.toString() === '6' ? item.Etat !== null : null)
          )
        ){
          return item;
        }
        return null;
    });
    const slicedData = (filteredPanneData.length < 1 && (search === "" && datedepot === null && progres === "All" && centredepot === "All")) ? ProduitenPanne : filteredPanneData;
    const handleNextPage = () => {
      if(ProduitenPanne !== null){
        if (currentPage < Math.ceil(ProduitenPanne.length / rowsPerPage)) {
          setCurrentPage(currentPage + 1);
        }
      }
      
    };
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    // Reset currentPage to 1 when search criteria change or data is filtered
    useEffect(() => {
      settotalPages(Math.ceil(slicedData.length / rowsPerPage));
      setCurrentPage(1); 
    }, [search, datedepot, progres, centredepot, slicedData.length, rowsPerPage]);
    return (
    <>
    <MyNavBar  act={act} setAct={setAct} />
      <MyAsideBar />
    <div className="Patients-Details">
      <div className="patient-table">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="patient-table-container">
          <div className="patient-table-header">
            <div className="table-header-item">
              <label>Date :</label>
              <input
              type="Date"
              className="class-search"
              placeholder="Date"
              onChange={handleDateInputChange}
            />
            </div>
            <div className="table-header-item">
            <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>
            </div>
            <div className="table-header-item">
              <ProgressionSelect label='Progression:' onChange={handleProgresInputChange}/>
            </div>
            <div className="table-header-item">
              <label>Recherche</label>
              <input
              type="search"
              className="class-search"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            
          </div>
          {ProduitenPanne && ProduitenPanne !== undefined ?
          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Id</td>
                <td className="table-patients-header-annee">Nom Complet</td>
                <td className="table-patients-header-annee">Date</td>
                <td className="table-patients-header-willaya">Centre</td>
                <td className="table-patients-header-progress">Statut garantie</td>
                <td className="table-patients-header-progress">Suspension</td>
                <td className="table-patients-header-button">
                  <div className="pagination-buttons">
                      <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        {(currentPage > 1) ?
                          <IoArrowBackCircleSharp className='next-back-row-table'/>
                          :
                          <FaCircle className='null-next-back-row-table'/>
                        }
                      </button>
                    <h1>{currentPage}</h1>
                      <button onClick={ProduitenPanne ? handleNextPage : null} disabled={ProduitenPanne ? currentPage === totalPages : null}>
                        {currentPage < totalPages ?
                          <IoArrowForwardCircle className='next-back-row-table'/>
                          :
                          <FaCircle className='null-next-back-row-table'/>
                        }
                      </button>
                  </div>
                </td>
                <td className="table-patients-header-button"></td>
              </tr>
              {slicedData.length < 1 ? (
                <td colSpan={7}>
                  <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <h1>Aucune panne disponible</h1>
                  </div>                
                </td>
                ) : (
                  slicedData.slice(startIndex, endIndex).map(Panne => (
                    <TablePanneRow key={Panne.id} Panne={Panne} />
                  )
                )
              )
            }
            </table>
          </div>
          :
          <div className="CircularProgress-container">
            <CircularProgress className='CircularProgress' />
          </div>
          }
        </div>
      </div>
    </div>
    </>
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

  const formattedDate = `${month} ${day}, ${year} at ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  return formattedDate;

}
