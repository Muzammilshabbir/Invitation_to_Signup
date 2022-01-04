import { useEffect, useState } from 'react';
import TopBox from './TopBox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { sendRequest, fetchUser } from '../services/api';

export default function Profile({ component: Component, ...restOfProps }) {

    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',        
        showPassword: false,
        // image:[]
    });

    useEffect(() => {
         (async () => {
            try {
                const { data } = await fetchUser()
                setValues(
                    {
                        userName: data.user.user_name,
                        email: data.user.email,
                        password: '',
                        confirmPassword: '',
                        showPassword: false,
                    })
            }
            catch (err) {
                console.log(err)
            }
        })();
      
    }, [])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const inputs = {
        user_name: values.userName,
        email: values.email,
        password: values.password,
        // avatar: values.image
    }

    const handleSubmit = async () => {

        try {
            const { data } = await sendRequest('/update-profile', 'POST', inputs);
            toast(data.message)
        }
        catch (err) {
            err.response ? (err?.response?.data).map(message => {
                toast(message)
            }) : toast(err.message);
        }
    }
    return (
        <Container maxWidth='sm'>
            <TopBox text='Profile Page' />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField fullWidth sx={{ m: 1 }}
                    id="outlined-username"
                    value={values.userName}
                    label="User Name"
                    onChange={handleChange('userName')}
                />

                <TextField fullWidth sx={{ m: 1 }}
                    id="outlined-email"
                    value={values.email}
                    label="Email"
                    onChange={handleChange('email')}
                />
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>         

                {/* <TextField fullWidth sx={{ m: 1 }}
                    id="outlined-image"
                    type='file'
                    value={values.image}                    
                    onChange={handleChange('image')}
                /> */}

                <Button variant="contained" fullWidth sx={{ m: 1 }} onClick={handleSubmit}>
                    Update
                </Button>
            </Box>
        </Container >
    );
}
