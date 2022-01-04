import { Axios } from './Axios';

export async function LoginApi(props) {

    const response = await Axios.post('/login', props);
    return new Promise((resolve, reject) => {
        try {
            resolve(response);
            localStorage.setItem('_token', response.data.token)
        } catch (err) {
            console.log("failed")
            reject(err);
        }
    })
}

export const logout = async () => {
    return Axios.post('logout',{})
}

export function inviteUser(props) {

    return Axios.post('invite', props)
}

export const confrirmPin =(props) => {

    return Axios.post('confirm-pin',props);
}

export const fetchUser = () => {

    return Axios.get('get-user');
}

// headers={'Content-Type':'application/json','X-Requested-with':'XMLHttpRequest'},
export async function sendRequest(url,method = 'GET', data = {}, isAuthenticated = true) {
    const config = {
        url,
        method,
        // headers,
        data
    }
    return Axios(config);
}