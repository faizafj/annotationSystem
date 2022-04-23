import React, {useState} from 'react';  //imports required 
import { AppBar,Toolbar, CssBaseline, makeStyles,} from "@material-ui/core"; //creates the menubar itself
import { Link } from "react-router-dom"; //imports the link component 

const useStyles = makeStyles((theme) => ({ //styling to customise the navigation bar
    navlinks: {
    marginLeft: "10px",
    display: "flex",
},
    logo: {
        height: "100px",
        cursor: "pointer",
        marginRight: 'auto',     
},
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: "30px",
        textAlign: 'right',
        "&:hover": {
            color: '#8420D9',
        },
},
    bar:{
        background: 'black',
},
    alt: {
        fontSize: '3px',
},


  dropdownContent: {
      position: 'absolute',
      backgroundColor: 'black',
      minWidth: '200px',
},   
     dropDown:{
        position:'relative',
        display:'inline-block',
},

    dropLink:{
        color: 'white',
        textDecoration: 'None',
        fontSize: '20px',
        display: 'block',
        textAlign: 'left',
        margin: '4px',
        borderTop: 'grey 1px solid',
        
         "&:hover": {
             color: 'white',
             backgroundColor: '#8420D9',
             textDecoration: 'underline',
},},
    
}));

function MenuBar() { //function to create the navigation bar.
    const classes = useStyles();
    const [onHover, setOnHover] = useState(false); //set to 'off' so that the dropdown does not show up when it is not required 
    const handleLogout = () => { //called when user presses log out
        localStorage.removeItem('userID') //removes their userId
        localStorage.removeItem('authorization') //removes auth 
        window.alert("You have logged out successfully")
        window.location.href='/' //redirects to homepage
};
    const userID=localStorage.getItem('userID'); 
    
    /* Bellow the links for the menu bar are defined
     * There is a div created (inside the genres div) which creates a drop down.
     * When it is hovered, the useState is set to true so it displays.
     * Once the user leaves the hover or does not hover on it all then useState is set to false so it is hidden.
     *  */
    return (
        <AppBar position="static" >
            <CssBaseline />
            <Toolbar className={classes.bar} >
                <img  className={classes.logo}  onClick={() => {window.location=('/')}}/>
                <div className={classes.navlinks}>
                     {(() => { // If not a user logged in then it shows login and sign up link 
                    if(userID==null){
                            return(
                                <React.Fragment>
                                <Link to="/Login" className={classes.link}>  Login </Link>
                                <Link to="/SignUp" className={classes.link}> Sign Up </Link>
                                </React.Fragment>
                   )} else { //if a user is logged in they can add a movie, view their reviews and logout
                            return(
                                 <React.Fragment>
                                <Link to="/" className={classes.link}> Home </Link>
                                <Link to="/Login" className={classes.link}>  Add A Movie </Link>
                                <Link to="/Genres/Maths"  className={classes.link}>Maths</Link>
                                <Link to="/" onClick={handleLogout} className={classes.link}> Logout </Link>
                                </React.Fragment>
                        )}})()}
               </div>
        </Toolbar>
       </AppBar >
      );}

export default MenuBar;