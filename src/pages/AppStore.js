import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import client from '../apis/client'
import client_auth from '../apis/client_auth'


const AppStore = (props) => {

    const navigate = useNavigate()

    const [user, setUser] = useState()

    function isTokenExpired(token) {

        var decoded = jwt_decode(token)

        if (decoded.exp < Date.now() / 1000) {
            return true
        } else {
            return false
        }
    }

    React.useEffect(() => {
        const tryLocalSignin = (dispatch) => async () => {
            try {

                const refreshToken = localStorage.getItem('refreshToken');


                if (refreshToken !== null) {
                    /* we have token!! 
                        and we can check if refresh token is expired
                    */

                    if (!isTokenExpired(refreshToken)) {
                        const ref = await client_auth.post('/auth/jwt/refresh/', { refresh: refreshToken });
                        const tok = JSON.stringify(ref.data);
                        const parsedData = JSON.parse(tok);

                        localStorage.setItem('token', parsedData.access)
                        localStorage.setItem('refreshToken', parsedData.refresh)

                        const r = await client.get(`/auth/users/me/`)
                        setUser(r.data.email);


                        //navigate('/');


                    } else {

                        navigate('/');
                    }
                } else {

                    //navigate('/');
                }

            } catch (err) {

            }


        };

        tryLocalSignin()
    }, []);

    return (
        <>
            {props.children}
        </>
    )
}

export default AppStore
