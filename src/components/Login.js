import React, {useState} from 'react'; //required imports such as makeStyles which is used for styling
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
const useStyles =  makeStyles( (theme) => ({ //styling the page
    usernameForm: {
        font: '16px',
        color: 'black',
        margin: '10px',
        borderRadius: '2px',
        border: 'black 1px solid',
        height: '50px',
        width: '250px',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        }, '&:focus': {
            color: 'black',
            fontSize: "16px",
            marignLeft:"10px",
},},
    passwordForm: {
        font: '16px',
        color: 'black',
        margin: '10px',
        borderRadius: '2px',
        border: 'black 1px solid',
        height: '50px',
        width: '250px',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        }, '&:focus': {
            color: 'black',
            fontSize: "16px",
            marignLeft:"10px",
},},
    loginButton: {
        color: 'white',
        background: 'black',
        font: "10px", 
        marginLeft: "10px",
        "&:hover": {
            color: 'white',
            background:'#8420D9',
},},   
    backButton: {
        color: 'white',
        background: 'black',
        font: "10px", 
        marginLeft: "120px",
        "&:hover": {
            color: 'white',
            background:'#8420D9',
},},
    container:{
    height: '500px',
    width: 'auto',
    marginTop: '100px',
    marginLeft: '100px',
    marginRight: '100px',
    borderRadius: '5px',

},
    heading:{
        fontSize: '30px',
        color: 'black',
    },
    
    dropLink:{
        color: '#8420D9',
        textAlign: 'right',
        width: '500px',
        margin: '15px',
       fontSize: '14px',
        "&:hover": {
            color: '#8420D9',
            textDecoration: 'underline',
},},
}))

function Login() {
    const [username, setUsername] = useState([]); //use states for inputs
    const [password, setPassword] = useState([]);
    const classes = useStyles();
    async function onSubmit(){ //when the button is clicked it calls this function
        if(username ==='' || password===''){ //checks if there's something being entered if not then an alert shows up
            alert ('Please enter username and password')
            return
            }
            const token = `Basic `+btoa(`${username}:${password}`) //calls the login API to authenticate user
            console.log(token)
            fetch('https://deliverrelax-amandarose-5000.codio-box.uk/Login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                'Content-type': 'application/json',
                'Authorization': token },
            }).then(response =>response.json().then(data => {
             if(data.userID==null){ //checks if the password entered matches the userID, if not then the API returns userID = null so it knows the password is wrong
                   alert ('Incorrect Password')   
        }else{
            localStorage.setItem('userID',data.userID) //once successful adds userID to local storange along with the auth token
            localStorage.setItem('authorization',token) 
            window.location.href='./' //redirects user to the homepage
        }})); };
    
    /* 
     * Uses input fields so users can enter their username and password. When a value is entered this is set to be the set useState
     * There is a hyperlink to the sign up page for users who enetered the wrong page and actually need to sign up
     * Submit button calls the API which checks everything is correct
     * */
	   return (
            <React.Fragment>
                <center> 
                   <div className= {classes.container}>
                       <p className={classes.heading}> Login: </p>
                       <div className={classes.usrcontainer}>
                            <input className={classes.usernameForm} label="Username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className={classes.pwdContainer}>
                            <input className={classes.passwordForm} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className={classes.linkSU}> 
                        <Link to="/signUp" className={classes.dropLink}>Don't have an account? Sign-Up instead</Link>
                        </div>
                        <div className={classes.btnContainer}>
                            <Button className={classes.backButton} onClick={() => {window.location=('/')}}>BACK</Button>
                            <Button className={classes.loginButton} onClick={onSubmit}>LOGIN</Button>
                        </div>
                    </div>
            </center>
            </React.Fragment>
	);     
}

export default Login;