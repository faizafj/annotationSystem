import React, {useEffect, useState} from 'react';
import '../App.css';
import { Documents } from "./Documents";
import {makeStyles} from '@material-ui/core/styles'

const useStyles =  makeStyles((theme) => ({

theTitle:{
        textAlign: 'center',
        fontSize: '30px',
        color: 'black',
},
  
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
                <p className= {classes.theTitle}>My Documents</p> 
		<div className="Documents">
		<Documents document={documents}/> </div> </div>
	);     
}

export default App;