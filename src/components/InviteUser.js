import * as React from 'react';
import TextField from '@mui/material/TextField';
import TopBox from './TopBox';
import { inviteUser } from '../services/api'
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import {Wrapper} from './StyleComponents/Style'

export default function InviteUser() {

  const [email, setEmail] = React.useState('');  

  const handleSubmit = async () => {

    try{
      const response = await inviteUser({email:email})
      toast(response.data.message);
      
      setEmail('')
      console.log(`response`, response)
    }        
    catch(err){
      toast(err.response.data[0]); 
    }
  }

  return (
    <Wrapper>
      <TopBox text='Invite User' />
      <TextField fullWidth
        onChange={(e) => setEmail(e.target.value)}
        id="demo-helper-text-misaligned"
        label="Enter Email"
        value={email}
      />
      <Button variant="contained" fullWidth sx={{ my: 1 }} onClick={handleSubmit}>
        Invite
      </Button>

    </Wrapper>
  );
}
