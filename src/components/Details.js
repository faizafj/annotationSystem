import React, {useEffect, useState} from 'react'; //selects imports required
import '../App.css'; //takes in the Apps.css as it requires the background to be black which was changed there.
import { useParams } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import { PDFViewer } from 'react-view-pdf';
const useStyles =  makeStyles( (theme) => ({ //styling for elements
    documentDetails:{
        height: 'fit-content',
},
    documentTitle:{
        fontSize: '25px',
    },

    docImage:{
        width: '300px',
        height: 'auto', 
        border: "1px solid black",
    },
    main:{
        borderRadius: '15px',
        width: '90%',
        margin: '20px', 
        border: 'solid black 1px',
        height: 'fit-content',
        padding:'20px',
},

    fileview:{
        width: '50%',
        height: 'auto',
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
               <div className={classes.documentDetails}>
                    <center>
                        <h2 className={classes.documentTitle}> {document.documentTitle}</h2> 
                    </center>
                             <center>                   
                    <div className={classes.main}>
                                {(() => { 
                                        const docName = document.documentFile
                                        if(docName.includes(".pdf") || docName.includes(".ppt") || docName.includes(".docx") ){
                                            return(
                                                <React.Fragment>
                                                <div className={classes.fileview}>
                                                   <PDFViewer url= {"/documentFiles/"+ document.documentFile} className={classes.sized} />
                                                   </div>
                                                </React.Fragment>
                                        )} else { 
                                            return(
                                                    <React.Fragment>
                                                        <img className ={classes.docImage} src= {"/documentFiles/"+ document.documentFile}/> 
                                                    </React.Fragment>
                                )}})()}
                                <p className={classes.desc}> {document.documentDescription}</p> 
                    </div>
                                                </center>
               </div>
)})} </div> )}

export default Details;