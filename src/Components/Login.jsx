import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { app } from "../../firebaseConfig"
import { AuthContext } from "../Auth.jsx"
import fb from "/fb.png"
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import './Login.css'


const Login = ({ history }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigateTo = useNavigate();
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                await signInWithPopup(auth, provider)
                    .then((result) => {
                        console.log(result);

                    })
                // history.push("/");
            } catch (error) {
                alert(error);
            }
        }
    );

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            return navigateTo("/");
        }

    })
    return (
        <div>
            {!currentUser &&
                <div className="Login">
                    <div className="fb-image">
                        <img src={fb} alt="" />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                    >
                        <GoogleIcon />
                        <p>Sign in with Google</p>
                    </Button>
                </div>}
        </div >
    )
}

export default Login