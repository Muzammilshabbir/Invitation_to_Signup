import React, { useEffect } from 'react'
import Navbar from '../layouts/Navbar'
import Container from '@mui/material/Container';
import { useNavigate, Outlet } from 'react-router-dom'
export default function Layout() {

    const token = localStorage.getItem('_token')
    const verified = localStorage.getItem('_verified')

    const navigate = useNavigate()

    useEffect(() => {
        if (token && verified === '0') {
            navigate('/confirm-pin', { replace: true })
        }       

        if(!token || token==='undefined') {
            console.log(`token`, token)
            navigate('/', { replace: true })
        }
        
    }, [navigate,verified, token])

    return (
        <div>
            <Navbar/>
            <Container maxWidth='sm'>
                <Outlet />
            </Container>
        </div>
    )
}