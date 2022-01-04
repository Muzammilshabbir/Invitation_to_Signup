import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Auth() {

    const token = localStorage.getItem('_token')
    const verified = localStorage.getItem('_verified')

    const navigate = useNavigate();

    React.useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true })

        }if (token && token !== 'undefined' && verified === '0'){
            navigate('/confirm-pin', { replace: true })            
        }
             
    }, [navigate,verified, token])

    return (
        <div>
            <Outlet />
        </div>
    )
}
