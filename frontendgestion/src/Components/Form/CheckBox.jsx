import { Box, Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

const CheckBox = (props) => {
  return (
    <div>
        <FormControlLabel
        
          value={props.value}
          control={<Checkbox color="primary" />}
          label={
            <Box component="div" fontSize={15}>
               Sous Garantie
             </Box>
            }
          
          labelPlacement="start"
          
        />
    </div>
  )
}

export default CheckBox