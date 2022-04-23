import React, {useEffect, useState} from 'react'; //selects imports required
import '../App.css'; //takes in the Apps.css as it requires the background to be black which was changed there.
import { useParams } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip'; //tooltip used for extra guidance. 

const useStyles =  makeStyles( (theme) => ({ //styling for elements
    movieDetails:{
        font: "10px", 
        width: "80%",
        height: 'auto',
        borderRadius: '25px',
        background: 'white',
        marginTop: '20px',
        boxShadow: 'inset 0 0 10px black',
        display:'grid',
        gridGap: '0px',
        marginBottom: '50px',
        paddingBottom: '50px',
},
    container: {
        width: 'auto',
        height: '300px',
},
    title:{
        fontSize: '30px;',
        height: '40px',
        color: '#BF4E30',
        textAlign: 'left',
 },
    summary: {
        fontSize: '16px',
        color: 'black',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',
},
    
    cast: {
        fontSize: '16px',
        color: 'black',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',
        marginTop: '40px',
},
     release: {
        fontSize: '16px',
        color: '#BF4E30',
        textAlign: "justify",
        width: '80%',
        marginRight: '25%',
        lineHeight: '1.2',   
},

    moviePoster:{
        height:"480px",
        width: "325px",
        borderRadius: '5px', 
        marginLeft: '30px',
        marginBottom: '50px',
    },
    sectionOne:{
        marginTop: '50px',
        gridColumnStart: '1',
        gridColumnEnd: '3',
        marginLeft: '30px',
    },
    sectionTwo:{
        marginTop: '50px',
        gridColumnStart: '3',
        gridColumnEnd: '4',
        marginLeft: '30px',
    },  
    
    sectionThree:{
        marginTop: '50px',
        gridColumnStart: '1',
        gridColumnEnd: '5',        
        margin: '50px',
        paddingLeft:'20px',
        border: 'Solid grey 1px',
        borderRadius: '25px',
        boxShadow: 'inset 0 0 10px black',
            
    },  
        Buttons: {
        color: 'white',
        background: '#BF4E30',
        font: "10px", 
        margin: "10px",
        "&:hover": {
            color: 'white',
            background: 'black',
},},
    movieDesc:{
                gridColumnStart: '1',
                gridColumnEnd: '5',

    },
    
    movieDescr:{
                fontSize: '15px',
                textAlign: 'center',
                margin: '50px',
                marginTop: '5px',
                

    },
 

    
    Tooltip:{
            fontSize: '20px',
    },
    
}));                   


function Details() { 
    const{id} = useParams(); //useParams finds the documentID to know which document details to show.
    const classes = useStyles();  //adds styling by referring to classes.
    const [documents, setDocuments] = useState([]); //sets the use states for each element
    const userID=localStorage.getItem('userID') //gets userId from local storage

	useEffect(()=> { //fetches the details for the movie
			fetch('https://deliverrelax-amandarose-5000.codio-box.uk/Details', { 
                method: "POST", 
                credentials: 'include', 
                headers: {'Content-type': 'application/json' }, 
                body: JSON.stringify(id) })
                .then(response =>response.json().then(data => {setDocuments(data.detailsList);
			})
		);
	},[id]); //uses the documentID
    return ( 
        <div className = {classes.container}> 
            {documents.map (document => {
            return (
               <div className={classes.movieDetails}>
                  <p> {document.documentTitle}</p> 
                  <p> Hellloo</p> 
               </div>
)})} </div> )}

export default Details;