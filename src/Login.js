import { Button } from '@material-ui/core';
import React from 'react';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch ({
                    type:actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_container">
                <img 
                src="https://media-exp1.licdn.com/dms/image/C510BAQG3XMapZQ6GiQ/company-logo_200_200/0/1557855501559?e=1637798400&v=beta&t=x30Aml1MCEq27Lw-7t1_Tff6CtXMlWtBOAygFIvniJs"
                alt="HelpNow"/>
            
            <div className="login_text">
                <h1>Sign in to HelpNow App</h1> 
            </div>
            <Button onClick={signIn}>
                Sign in With Google
            </Button>
            </div>
        </div>
    )
}

export default Login
