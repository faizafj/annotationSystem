import React, {useEffect, useState} from 'react';
import '../App.css';
import { Documents } from "./Documents";
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


const useStyles =  makeStyles((theme) => ({

theTitle:{
        textAlign: 'center',
        fontSize: '30px',
        color: 'black',
},
     Buttonss: {
        color: '#8420D9',
        background: 'white',
		border: 'solid 1px #8420D9',
        font: "10px", 
        margin: "10px",
		textDecoration: 'none',
        "&:hover": {
            color: 'white',
            background: '#8420D9',
},},

  
}))

function App() {
	const userID=localStorage.getItem('userID'); 
	console.log (userID)
	const [documents, setDocuments] = useState([]);
    const classes = useStyles();
	if (userID == null) {
		window.location.href = "/Login"
	}
	useEffect(()=> {
			fetch('https://deliverrelax-amandarose-5000.codio-box.uk/documents', 
                  { credentials: 'include' }).then(response =>response.json().then(data => {setDocuments(data.documents);
			})
		);
	},[]);
	return (
                <div className= {classes.profileContainer}>   
				<center>
				        <div className={classes.linkButtons}>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/Maths')}}>Home</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/Javascript')}}>Javascript</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/Algorithms')}}>Algorithms</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/Computing')}}>Computing</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/Random')}}>Random</Button>
                        </div>    
				</center>       
                <p className= {classes.theTitle}>My Documents</p> 
		<div className="Documents">
		<Documents document={documents}/> </div> </div>
	);     
}

export default App;