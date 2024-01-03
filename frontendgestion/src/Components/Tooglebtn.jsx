import React, { useEffect, useState } from 'react';
import './Style/tooglebtn.css';
import ReactSwitch from 'react-switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const Tooglebtn = ({ label, value, onChange, disabled }) => {
  const [checked, setChecked] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState([
    false, false, false, false, false
  ]);
  const [progress, setProgress] = useState(0);

  const handleChange = (val) => {
    setChecked(val);
    if (val) {
      onChange(value);
    }
  };

  useEffect(() => {
    setChecked(disabled);
  }, [disabled]);

  return (
    <>
      <div className="toogle-button">
        <h4>{label}</h4>
        <ReactSwitch
          className="toogle"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default Tooglebtn;
