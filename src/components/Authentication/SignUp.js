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
import { useNavigate,useParams  } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {insertUserData} from '../../store/userSlice'

export default function SignUp({ component: Component, ...restOfProps }) {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    // const token = localStorage.getItem('_token')
    const token = useSelector(state => state.user.token)

    React.useEffect(() => {
        if (token) navigate('/dashboard', { replace: true })
    }, [navigate, token])

    const [values, setValues] = React.useState({
        userName: '',
        password: '',
        showPassword: false,
        confirmPassword:''
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
    const fields = values.userName && values.password && values.confirmPassword!== '';

    const inputs = { user_name: values.userName, password: values.password,password_confirmation: values.confirmPassword }

    const handleSubmit = async () => {

        try {
            const { data } = await sendRequest(`/register/${params.token}`, 'POST', inputs);

            dispatch(insertUserData(data))
            localStorage.setItem('_user', JSON.stringify(data.user))

            localStorage.setItem('_token', data.token)
            localStorage.setItem('_verified', data.user.otp_verified)
            navigate("/dashboard");
        }
        catch (err) {
            err.response ? toast(err.response.data.message) : toast(err.message);
        }
    }
    return (
        <Container maxWidth='sm'>
            <TopBox text='Sign Up' />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <TextField fullWidth sx={{ m: 1 }}
                        id="outlined-email"
                        value={values.userName}
                        label="User Name"
                        onChange={handleChange('userName')}
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
                    <TextField fullWidth sx={{ m: 1 }}
                        id="outlined-password"
                        type='password'
                        value={values.confirmPassword}
                        label="Confirm Password"
                        onChange={handleChange('confirmPassword')}
                    />

                    <Button disabled={!fields} variant="contained" fullWidth sx={{ m: 1 }} onClick={handleSubmit}

                        startIcon={<LockOpenIcon />}>
                        Sign Up
                    </Button>

                </div>
            </Box>
        </Container >
    );
}
