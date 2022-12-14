import React, { useState } from "react"; //imports the required imports (e.g a material ui button)
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
const useStyles =  makeStyles( (theme) => ({ //This adds styling to each of the elements used below.
    usernameForm: {
        font: '16px',
        background: 'white',
        borderRadius: '2px',
        border: 'black 1px solid',
        height: '50px',
        width: '250px',
        color: 'black',
        marginBottom: '20px',
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
        background: 'white',
        borderRadius: '2px',
        border: 'black 1px solid',
        height: '50px',
        width: '250px',
        color: 'black',
        marginBottom: '20px',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        }, '&:focus': {
            color: 'black',
            fontSize: "16px",
            marignLeft:"10px",
},},
    signUpButton: {
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
    background: 'white',
    height: '500px',
    width: 'auto',
    marginTop: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    borderRadius: '5px',

},
    logo: {
        height: "200px",
        cursor: "pointer",
},
    
     linkSU:{
        color: '#BF4E30 !important',
        textAlign: 'center',
        width: '450px',
        margin: '10px',
        fontSize: '14px',
        textDecoration: 'None !important',
},
    heading:{
        fontSize: '30px',
        color: 'black',
    },
    
    helpTitle:{ 
        fontSize: '20px',
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
}));

export default function SignUp () {
    //sets the user states for each input
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //re-enter password double checks the user has entered the password in right
    const [reenterPassword, setreenterPassword] = useState("");
	const classes = useStyles();  
    function onAccountSubmit(event) {
    /*Function is called when users click the submit button
     * This checks if users have enetered a username and password and if not send an alert informing users to do so
     * Then checks if the passwords both match up and if not then there's a an alert informing users to re-type the passwords.
     * */  
        if (username === '' || password === ''){
             alert("Please enter username and password details")
        }else if(password !== reenterPassword){
                      alert("The passswords do not match, please re-enter.")
      }
        /* Then the api is called to send the data to the database if everything is fine
         * within this, it also checks to see if the username already exists and if so asks users to try a different username.
         * But if everything is fine, it sets the userID into local storage (as it is rquired for many other componenets/functions)
         * And then adds autherization token to it and sends the user an alert saying the account has been created and re-directs them to the homepage
         * */
        const account = [username, password];
                        fetch('https://deliverrelax-amandarose-5000.codio-box.uk/SignUp', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(account),})
                            .then(response =>response.json().then(data => {
                            if (data.userID==null){
                                alert("Sorry this username already exists! Please try a different username.")
                            }else{      
                              localStorage.setItem('userId',data.userID)
                              const token = `Basic ` +btoa(`${username}:${password}`)
                              localStorage.setItem('authorization', token)
                              localStorage.setItem('username', username)
                              console.log (username)
                              alert("Your account has been created!")
                              window.location.href='/'
                         }}))
    event.preventDefault();
  }
    /* Below is all the elements that are required to build the page
     * Then the form itself is created using three inputs and then two buttons below.
     * One button takes the users back to the homepage if they decide to cancel
     * and the other button calls the SignUp function and runs it
     * There is also a hyperlink to the login page incase users already have an account and want to login
     *  */
     return (
     
           <center>  
                 <div className={classes.container}>
                     <p className={classes.heading}> Sign Up: </p>
                    <div className={classes.helpTitle}>
                        <p> Enter a username: </p>
                    </div>
                    <div className={classes.form}>
                         <input value={username} className={classes.usernameForm} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className={classes.form}>
                        <div className={classes.helpTitle}>
                        <p> Enter a password: </p>
                    </div>
                         <input value={password} className={classes.passwordForm} placeholder="Enter Password" type="password"  onChange={(e) => setPassword(e.target.value)}/>
                    <div className={classes.helpTitle}>
                        <p> Re-enter password: </p>
                    </div>
                         <input value={reenterPassword} className={classes.passwordForm} placeholder="Re-Enter Password" type="password"  onChange={(e) => setreenterPassword(e.target.value)}/>
                     </div>
                      <div className={classes.linkSU}> 
                        <Link to="/Login" className={classes.dropLink}>Already have an account? Login instead</Link>
                        </div>
                     <div className={classes.btnContainer}>
                          <Button className={classes.backButton} onClick={() => {window.location=('/')}}>BACK</Button>
                          <Button className ={classes.signUpButton} onClick={onAccountSubmit}>SIGN UP</Button>
                     </div>
                </div>  
        </center>
)}