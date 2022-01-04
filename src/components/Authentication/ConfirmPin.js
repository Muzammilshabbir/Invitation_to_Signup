import * as React from 'react';
import TextField from '@mui/material/TextField';
import TopBox from '../TopBox';
import { confrirmPin } from '../../services/api'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export default function ConfirmPin() {

  const [pin, setPin] = React.useState('');  

  const handleSubmit = async () => {

    try{
      const response = await confrirmPin({pin:pin})
      localStorage.removeItem('_verified')
      toast(response.data.message);
      console.log(`response`, response)
    }        
    catch(err){
      toast(err.response.data[0]); 
    }
  }
  
  return (
    <>
      <TopBox text='Confirm Pin' />
      <TextField fullWidth
        onChange={(e) => setPin(e.target.value)}
        id="demo-helper-text-misaligned"
        label="Enter Pin"
      />
      <Button variant="contained" fullWidth sx={{ my: 1 }} onClick={handleSubmit}>
        Confirm
      </Button>

    </>
  );
}
