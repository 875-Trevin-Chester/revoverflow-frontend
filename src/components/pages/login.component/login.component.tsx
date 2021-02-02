/**
 * @file Manage the login component for the web application
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
import { Alert } from '@material-ui/lab';


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
  const [badLogin, setBadLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { }, []);

  //Below code will set the User Object fields retreieved from the backend to the localStorage.
  let response: any;
  const setInformation = async () => {
    authAxios.defaults.headers["Authorization"] = response.headers.authorization
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

  // Check firebase up here for authentication 
  /// If credentials are bad do not send anything to the back end 
  // If they are good send the credentials to the back end 
  // firebase keyword imported in with firebase app from config 
  //Allows user to use firebase as the veryfying authentication ensuring 
  //That any call to the database will be a legitemate call that will bring 
  // back either a user or admin
  const CheckFireBase = async (e: any) => {
    setBadLogin(false)
    setLoading(true)
    e.preventDefault()
    try {
      response = await firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword)
      await console.log(firebase.auth().currentUser)
      await console.log(response)
      addLoginCredentials(e)

    } catch {
      setBadLogin(true)
      setLoading(false)
    }

  }


  //Triggers the checkLoginCredentials() function which send the "correct" credentials to the backend
  //to request the User Object
  const addLoginCredentials = async (e: any) => {
    const payload = {
      email: inputEmail,
      password: inputPassword
    };
    try {
      response = await loginRemote.checkLoginCredentials(payload);
      await setInformation();
    } catch {
      console.log("Wrong credentials");
    }
  }



  return (

    <div>
      <img alt="logo" id="logo" src={require("../../../logo/image.png")} />

      <div className="wrapper">
        <div className="form-wrapper">
          <h3 className="h3">Login</h3>
          <form className={classes.root} noValidate autoComplete="off">
            {badLogin && <Alert className="alerts" severity="error">Invalid Credentials</Alert>}
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
              <button disabled={loading} type="submit" onClick={(e) => CheckFireBase(e)}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
