import TopBox from './TopBox'
import { fetchUser } from '../services/api'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'

export default function Dashboard() {

    const state = useSelector(state=>state.user)

    const [user, setUser] = useState(state.user)
    
    // console.log(`user`, user)
    if(user.length === 0){
        const getUser = async () => {
            try {
                console.log(`in api call`)
                const {data} = await fetchUser()
               setUser(data.user)
            }
            catch (err) {
                console.log(err)
            }
        }
        getUser()
    }
    return (
        <div>
            <TopBox text='Dashboard' />
            <h3>Welcome {user.user_role}</h3>
        </div>
    )
}
