import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { PDFViewer } from 'react-view-pdf';
const useStyles =  makeStyles( (theme) => ({ //styling
    documentDetails:{
        font: "10px", 
        width: "90%",
        padding: "10px",
        height: "fit-content",
        border: "1px solid black",
        borderRadius: '3px',
        margin:'25px',
        // rowGap: '2em',
        background: 'white',
        display:'grid',
        
},
    sectionOne:{
        // border: "1px solid black",
        gridColumnStart: '1',
        gridColumnEnd: '3',
    },
    sectionTwo:{
        // border: "1px solid black",
        margin: '0',
        gridColumnStart: '1',
        gridColumnEnd: '2',
    },  
    
    sectionThree:{
    margin: '0',
    //    border: "1px solid black",
        gridColumnStart: '2',
        gridColumnEnd: '3',        
            
    },  

    sectionFour:{
    margin: '0',
    //    border: "1px solid black",
        gridColumnStart: '1',
        gridColumnEnd: '3',    
        textAlign: 'right',      
    },  
    container: {
        width: 'auto',
        height: '300px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        rowGap: '5px',
},

    title:{
        fontSize: '25px;',
        color: 'black',
        textDecoration: 'bold',
 },
  
    desc:{
        overflowWrap: "break-word",
        hyphens: "manual",
        inlineSize: '600px',
        margin: '10px',
    },

    viewDetails:{
        color: 'white',
        background: 'black',
        width: '100px',
        margin: '10px', 
        fontSize: '12px',
            "&:hover": {
            color: 'white',
            background:'#8420D9',
        },
    },

    docImage:{
        width: '200px',
        height: 'auto', 
        marginLeft: '50px',
        border: "1px solid black",
    },
        fileview:{
        width: '300px',
        height: 'auto',
},
}));    
 

function Genres (){
    const classes = useStyles();
    const [documents, setDocuments] = useState([]);  
    let {genre} = useParams();
    	
        useEffect(()=> {
                fetch('https://deliverrelax-amandarose-5000.codio-box.uk/Genres', { 
                    method: "POST", 
                    credentials: 'include', 
                    headers: {'Content-type': 'application/json' }, 
                    body: JSON.stringify(genre) }).then(response =>response.json().then(data => {setDocuments(data.Genres);
                })
            );
        },[genre]);  
             console.log(documents)
             console.log (genre)
     return ( 
                <div className= {classes.profileContainer}>  
                <center>            
                <h1 className= {classes.theTitle}> {genre} </h1> 
                </center> 
            <div className = {classes.container}> 
                {documents.map (document => { 
                return (
               <div className={classes.documentDetails}> 
               <div className={classes.sectionOne}>
               <center>
                  <h1> {document.documentTitle} </h1> 
                </center>
                </div>
               <div className={classes.sectionTwo}>
                                    {(() => { // If not a user logged in then it shows login and sign up link 
                                    const docName = document.documentFile
                                    console.log (docName)
                    if(docName.includes(".pdf") || docName.includes(".ppt") || docName.includes(".docx") ){
                            return(
                                <React.Fragment>
                                                <div className={classes.fileview}>
                                                   <PDFViewer url= {"/documentFiles/"+ document.documentFile} className={classes.sized} />
                                                </div>
                                </React.Fragment>
                   )} else { //if a user is logged in they can add a movie, view their reviews and logout
                            return(
                                 <React.Fragment>
                                    <img className ={classes.docImage} src= {"/documentFiles/"+ document.documentFile} onClick={() => {window.location=('/Details/'+ document.documentID)}}/> 
                                </React.Fragment>
                )}})()}
                </div>
                <div className={classes.sectionThree}>
                <p className={classes.desc}> {document.documentDescription}  </p> 
                </div>
                 <div className={classes.sectionFour}>
                <Button className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ document.documentID)}} > View Details </Button> 
                </div>
               </div> 
)})} 
        </div> </div>
)}

export default Genres;

