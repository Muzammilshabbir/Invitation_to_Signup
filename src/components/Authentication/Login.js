import * as React from 'react';
import TopBox from '../TopBox';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast } from 'react-toastify';
import { sendRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom'
import {insertUserData} from '../../store/userSlice'
import {useDispatch} from 'react-redux'

export default function Login({ component: Component, ...restOfProps }) {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

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
    const fields = values.email && values.password !== '';

    const handleSubmit = async () => {
        try {
            const { data } = await sendRequest('login', 'POST', { email: values.email, password: values.password });
            // localStorage.setItem('user',JSON.stringify({"databaseToken":data.token,user:data.user}));
            dispatch(insertUserData(data))

            // localStorage.setItem('_token', data.token)
            localStorage.setItem('_user', JSON.stringify(data.user))
            
            if (data.user.otp_verified === 1) {
                navigate("/dashboard");
            } else {
                localStorage.setItem('_verified', data.user.otp_verified)
                navigate("/confirm-pin");
            }
        }
        catch (err) {
            console.log(err)
            err.response ? toast(err.response.data.message) : toast(err.message);
        }
    }

    return (
        <Container maxWidth='sm'>
            <TopBox text='Sign In' />

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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

                <Button disabled={!fields} variant="contained" fullWidth sx={{ m: 1 }} onClick={handleSubmit}

                    startIcon={<LockOpenIcon />}>
                    Sign in
                </Button>

            </Box>
        </Container >
    );
}
