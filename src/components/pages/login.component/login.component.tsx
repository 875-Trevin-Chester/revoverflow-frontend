/**
 * @file Manage the login component for the web application
 * @author Michel Charles <mcharl05@nyit.edu>
 */

import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./login.component.css";
import * as loginRemote from '../../../remotes/login.remote'
import { useHistory } from 'react-router';
import { useState } from 'react';
import { authAxios } from "../../../remotes/internal.axios";
import firebase from '../../../firebase/config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "100ch",
      },
    },
  })
);

export const LoginComponent: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => { }, []);

  let response: any;
  const setInformation = async () => {
    authAxios.defaults.headers["Authorization"]= response.headers.authorization
    setInputEmail('');
    setInputPassword('');
    localStorage.setItem('accessToken', response.headers.authorization);
    localStorage.setItem('admin', response.data.admin);
    localStorage.setItem('email', response.data.email)
    localStorage.setItem('firstName', response.data.firstName);
    localStorage.setItem('lastName', response.data.lastName);
    localStorage.setItem('points', response.data.points);
    localStorage.setItem('profilePicture', response.data.profilePicture);
    localStorage.setItem('rssaccountId', response.data.rssaccountId);
    localStorage.setItem('userId', response.data.userID);
    history.push('/feed')
  }

/// Check firebase up here for authentication
/// If credentials are bad do not send anything to the back end
// If they are good send the credentials to the back end
  const CheckFireBase = async (e: any) =>{
    e.preventDefault()
   try { 
    response = await firebase.auth().signInWithEmailAndPassword(inputEmail,inputPassword)
    await localStorage.setItem("FirebaseAuth" , response.isSignedIn)
    //console.log(response.operationType)
    
    addLoginCredentials(e)
  }catch {
    alert("Bad Login")
  }
    // .then(response =>{
    //   console.log(response)
    //   console.log(response.operationType)
      // if(response.operationType === "signIn"){
      //   console.log("Yaya I'm logged in")
      // }        else{
      //   alert("Bad login")
      // }
    // })
   // console.log("In check firebase")

     // addLoginCredentials(e)
  }



  const addLoginCredentials = async (e: any) => {
    // e.preventDefault()
    const payload = {
      email: inputEmail,
      password: inputPassword
    };
    try {
      response = await loginRemote.checkLoginCredentials(payload);
      await setInformation();
    } catch {
      alert('Incorrect username and/or password')
    }
  }



  return (
    <div>
      <img alt="logo" id="logo" src={require("../../../logo/image.png")} />

      <div className="wrapper">
        <div className="form-wrapper">
          <h3 className="h3">Login</h3>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <div className="logIn">
              <button type="submit" onClick={(e) => CheckFireBase(e)}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
