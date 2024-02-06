import React, { useEffect } from 'react'
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { ToastContainer, toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment-timezone';
import { Box, Checkbox, CircularProgress, FormControlLabel } from '@mui/material';

const ProduitDepose = () => {
    const [act, setAct] = useState(false);
    const notifyFailed = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);
    const navigate = useNavigate();
    const [PanneData, setPanneData] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false); // State for CircularProgress
    const [open,setOpen] = React.useState(false);
    const [openGarentieDialog, setopenGarentieDialog] = useState(false);
    const [openCauseGarentieDialog, setopenCauseGarentieDialog] = useState(false);

    const [CodePostal, setCodePostal] = useState('0');
    const [NbrSerie, setNbrSerie] = useState('');
    const [sousGarantieChecked, setSousGarantieChecked] = useState(false);
    const [horsGarantieChecked, setHorsGarantieChecked] = useState(false);
    const [sousReserveChecked, setSousReserveChecked] = useState(false);
    const [selectedCheckboxLabel, setSelectedCheckboxLabel] = useState('');
    const [IfCauseGarentieUpdated, setIfCauseGarentieUpdated] = useState(false);
    const [CauseGarentie, setCauseGarentie] = useState("");
    const [TLC, setTLC] = useState(false);
    const [Carton, setCarton] = useState(false);
    const [Pied, setPied] = useState(false);
    const [SupportMural, setSupportMural] = useState(false);
    const [Sansaccessoires, setSansaccessoires] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setopenGarentieDialog(false);
        setopenCauseGarentieDialog(false);
        setSousGarantieChecked(false);
        setHorsGarantieChecked(false);
        setSousReserveChecked(false);
    };
    const GoBackPressed =()=>{
        navigate(-1);
    }
    useEffect(() => {
        const fetchPanneData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setPanneData(data);
            } else {
            console.error("Error receiving Panne data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching Panne data:", error);
        }
        };
    
        fetchPanneData();
        if (PanneData?.Progres === 1) {
            navigate(`/DetailPanneSav/${id}`)
        }
    }, [PanneData?.Progres, id, navigate, user?.token]);
    useEffect(() => {
        const fetchCodePostalData = async () => {
          try {
            const response = await fetch(process.env.REACT_APP_URL_BASE+`/Willaya/${PanneData?.Wilaya}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
              },
            });
      
            if (response.ok) {
              const data = await response.json();
              setCodePostal(data.code);
            } else {
              console.error("Error receiving Panne data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching Panne data:", error);
          }
        };
      
        fetchCodePostalData();
    }, [PanneData?.Wilaya, user?.token]);
    const createAndDownloadPdf = async () => {
        try {
          if((!sousGarantieChecked && !horsGarantieChecked && !sousReserveChecked) || (!TLC && !Carton && !Pied && !SupportMural && !Sansaccessoires)){
            setOpen(false);
            notifyFailed('Statut de garantie ou Accessoires non sélectionné');
          }else{
            setLoading(true); // Show CircularProgress
            const response = await fetch(process.env.REACT_APP_URL_BASE+'/EmailGenerator/createPDF/BonV3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nom: PanneData.Nom,
                    Prenom: PanneData.Prenom,
                    Email: PanneData.Email,
                    Telephone: PanneData.Telephone,
                    ReferanceProduit: PanneData.ReferanceProduit,
                    TypePanne: PanneData.TypePanne,
                    Wilaya: PanneData.Wilaya,
                    CentreDepot: PanneData.CentreDepot,
                    NbrSerie: NbrSerie,
                    DateDepot: new Date().toISOString().slice(0, 10),
                    type: 'BD',  
                    postalCode: CodePostal,
                    CauseGarentie: CauseGarentie,
                    sousGarantieChecked: sousGarantieChecked,
                    horsGarantieChecked: horsGarantieChecked,
                    sousReserveChecked: sousReserveChecked,
                    TLC: TLC,
                    Carton: Carton,
                    Pied: Pied,
                    SupportMural: SupportMural,
                    Sansaccessoires: Sansaccessoires,
                })
                });
                const data = await response.json();
                if (!response.ok) {
                  setLoading(false);
                  handleClose();
                  notifyFailed(data.message);
                }
        
                if(response.ok){
                    const uniqueFilename = data.uniqueFilename;
        
                    const pdfResponse = await fetch(process.env.REACT_APP_URL_BASE+`/EmailGenerator/fetchPDF?filename=${uniqueFilename}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/pdf',
                        },
                    });
            
                    if (!pdfResponse.ok) {
                      setLoading(false);
                      handleClose();
                    }
            
                    if(pdfResponse.ok){
                        const pdfBlob = await pdfResponse.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(pdfBlob);
                        link.download = uniqueFilename;
                        link.click();
                        UpdatePanne(uniqueFilename);
                    }
                }
          }
            
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    const UpdatePanne = async (PDFFilename) =>{
        const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ 
            progres : 1, userID: user?.id, action: `deposer la panne ID= ${id}`,
            PDFFilename, NbrSerie: NbrSerie
          }),
        });
    
        const json = await reponse.json();
    
        if (!reponse.ok) {
            notifyFailed(json.message);
            setLoading(false); // Hide CircularProgress
            handleClose();
        }
        if (reponse.ok) {
            setLoading(false); // Hide CircularProgress
            handleClose();
            notifySuccess(json.message);
            navigate(`/DetailPanneSav/${id}`);
        }
    }
    const handleNbrSerieInputChange = (value) => {
        setNbrSerie(value);
    }
    //statue garantie
    //update statue garantie
    const UpdatePanneGarantie = async (val) => {
      const reponse = await fetch(process.env.REACT_APP_URL_BASE+`/Pannes/Garantie/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          StatueGarantie: val,userID: user?.id, action: `Mettre à jour le Statut Garantie avec ${val} pour la panne ID= ${id}`
        }),
      });
  
      const json = await reponse.json();
  
      if (!reponse.ok) {
        notifyFailed(json.message);
      }
      if (reponse.ok) {
        if (val === 'Sous Garantie') {
          notifySuccess("Sous Garantie a été vérifiée avec succès.");
        } else if (val === 'Hors Garantie') {
          notifySuccess("Hors Garantie a été vérifiée avec succès.");
        } else if (val === 'Sous Reserve') {
          notifySuccess("Sous Reserve a été vérifiée avec succès.");
        }
      }
    };
    // handle open the dialog based on the selected value
    const handleCheckboxClick = (label) => {
      setSelectedCheckboxLabel(label);
      if(label === "Hors Garantie"){
        setopenCauseGarentieDialog(true);
        setopenGarentieDialog(false);
      }else{
        setopenGarentieDialog(true);
        setopenCauseGarentieDialog(false);
      }
    };
    // handle the "Confirmer" button click of the dialog
    const handleChange = () => {
      if (selectedCheckboxLabel === 'Sous Garantie') {
        setSousGarantieChecked(true);
        setopenGarentieDialog(false);
        UpdatePanneGarantie('Sous Garantie');
      }
    };
    // handle sous rederve check box change
    const handleSousReserveChange = () => {
      if (sousReserveChecked) {
        setSousGarantieChecked(false);
        setHorsGarantieChecked(false);
        setSousReserveChecked(false);
        UpdatePanneGarantie(null);
      } else {
        setSousGarantieChecked(false);
        setHorsGarantieChecked(false);
        setSousReserveChecked(true);
        UpdatePanneGarantie('Sous Reserve');
      }
    };

    // handle cause garentie input change
    const handleCauseGarentieInput = (newValue)=>{
      setCauseGarentie(newValue);
      setIfCauseGarentieUpdated(true);
    }
    // handle cause garentie
    const handleCauseGarentie = () => {
      if (IfCauseGarentieUpdated === false) {
        notifyFailed('Aucune modification n\'a été effectuée');
      }else{
        setHorsGarantieChecked(true);
        setopenCauseGarentieDialog(false);
        UpdatePanneGarantie('Hors Garantie');
      }
    }
    const handleAccessoirClick = (label) => {
      switch (label) {
        case 'TLC':
          if (TLC) {
            setTLC(false);
          } else {
            setTLC(true);
            setSansaccessoires(false);
          }
          break;
        case 'Carton':
          if (Carton) {
            setCarton(false);
          } else {
            setCarton(true);
            setSansaccessoires(false);
          }
          break;
        case 'Pied':
          if (Pied) {
            setPied(false);
          } else {
            setPied(true);
            setSansaccessoires(false);
          }
          break;
        case 'Support Mural':
          if (SupportMural) {
            setSupportMural(false);
          } else {
            setSupportMural(true);
            setSansaccessoires(false);
          }
          break;
        case 'Sans accessoires':
          if (Sansaccessoires) {
            setSansaccessoires(false);
          } else {
            setSansaccessoires(true);
          }
          break;
        default:
          break;
      }
    };
    return (
    <>
      <MyNavBar  act={act} setAct={setAct} />
      <div className='pannedetails-container'>
          <div className='pannedetails-title'>
              <div className='back-button' onClick={GoBackPressed}>
                  <IoIosArrowBack className='icon' size={33} fill='#fff'/>
              </div>
              <h3>Details de panne</h3>
          </div>
          <div className='pannedetails-info form-section'>
              <form>
                  <FormInput label='Nom :' value={PanneData?.Nom} readOnly type='text'/>
                  <FormInput label='Prenom :' value={PanneData?.Prenom} readOnly type='text' />
                  <FormInput label='Email' value={PanneData?.Email} readOnly type='text' />
                  <FormInput label='Num Tel:' value={PanneData?.Telephone} readOnly type='text' />
                  <FormInput label='Wilaya:' value={PanneData?.Wilaya} readOnly type='text' />
              </form>
              <form>
                  <FormInput label='N° de serie :' placeholder= 'Entrer le numero de serie de ce produit' type='text' defaultValue = {PanneData?.NbrSerie} onChange={handleNbrSerieInputChange}/>
                  <FormInput label='Referance de produit :' value={PanneData?.ReferanceProduit} readOnly type='text'/>
                  <FormInput label='Type de panne :' value={PanneData?.TypePanne} readOnly type='text' />
                  <FormInput label='Centre de depot:' value={"SAV de "+PanneData?.CentreDepot} readOnly type='text' />
                  <FormInput label='Date de depot:' value={formatDate(PanneData?.DateDepot)} readOnly type='text' />
              </form>
          </div>
        <div className="pannedetails-title progress">
          <h3>Statue Garantie :</h3>
        </div>
        <div className="STATUEG">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={sousGarantieChecked}
                  onChange={() => handleCheckboxClick('Sous Garantie')}
                  disabled={horsGarantieChecked || sousReserveChecked}
                />
              }
              label={
                <Box className="Box" component="div" fontSize={18} marginLeft={10}>
                  Sous Garantie
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={horsGarantieChecked}
                  onChange={() => handleCheckboxClick('Hors Garantie')}
                  disabled={sousReserveChecked || sousGarantieChecked}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Hors Garantie
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={sousReserveChecked}
                  onChange={() =>handleSousReserveChange('Sous Reserve')}
                  disabled={horsGarantieChecked || sousGarantieChecked}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Sous Réserve
                </Box>
              }
              labelPlacement="start"
            />
          </div>
        </div>
        <div className="pannedetails-title progress">
          <h3>Accessoires :</h3>
        </div>
        <div className="STATUEG">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={TLC}
                  onChange={() => handleAccessoirClick('TLC')}
                />
              }
              label={
                <Box className="Box" component="div" fontSize={18} marginLeft={10}>
                  TLC
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Carton}
                  onChange={() => handleAccessoirClick('Carton')}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Carton
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Pied}
                  onChange={() =>handleAccessoirClick('Pied')}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Pied
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={SupportMural}
                  onChange={() =>handleAccessoirClick('Support Mural')}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Support Mural
                </Box>
              }
              labelPlacement="start"
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={Sansaccessoires}
                  onChange={() =>handleAccessoirClick("Sans accessoires")}
                  disabled={TLC || Carton || Pied || SupportMural}
                />
              }
              label={
                <Box component="div" fontSize={18} marginLeft={10}>
                  Sans accessoires
                </Box>
              }
              labelPlacement="start"
            />
          </div>
        </div>
        <div className='pannedetails-Button1'>
            <button className='Cancel-btn' type='button' onClick={GoBackPressed}>Annuler</button>
            <button className='depose-btn' type='submit' onClick={handleClickOpen}>Deposer</button>
        </div>
        <ToastContainer />
      </div>
      <div>
        <Dialog
          open={open}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmez-vous le dépôt de ce produit ? "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Cette action permet de passe de l'etat en attente de depot a l'etat en attente de reparation.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Annuller</Button>
            <Button onClick={createAndDownloadPdf} autoFocus disabled={loading}>
              Confirmer
            </Button>
          </DialogActions>
          {loading && (
          <div className="CircularProgress-container">
            <CircularProgress className="CircularProgress" />
          </div>
          )}
        </Dialog>
        <Dialog
          open={openGarentieDialog}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmez-vous la sélection de l'état "${selectedCheckboxLabel}" ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleChange} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openCauseGarentieDialog}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          width="100%"
        >
          <DialogTitle id="alert-dialog-title">{`Ajouter la cause de garentie :`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <select className="select" value={CauseGarentie} onChange={(e)=>handleCauseGarentieInput(e.target.value)}>
                <option value="">Choisir la cause de garentie</option>
                <option value="Présence d’insectes">Présence d’insectes وجودالحشرات</option>
                <option value="Sticker ouvert">Sticker ouvert  ملصق مفتوح</option>
                <option value="Manque fiche de garantie">Manque fiche de garantie غياب ورقة ضمان </option>
                <option value="Présence de moisissure">Présence de moisissure وجودالرطوبة</option>
                <option value="Dalle cassée">Dalle cassée  شاشة مكسورة</option>
                <option value="Autre">Autre</option>
              </select>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleCauseGarentie} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
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
export default ProduitDepose;