import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import { PDFViewer } from 'react-view-pdf'; //https://www.npmjs.com/package/pdf-viewer-reactjs
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
}));    
 

function Categories (){
    const classes = useStyles();
    const [documents, setDocuments] = useState([]);  
    let {category} = useParams();
    	
        useEffect(()=> {
                fetch('https://deliverrelax-amandarose-5000.codio-box.uk/Categories', { 
                    method: "POST", 
                    credentials: 'include', 
                    headers: {'Content-type': 'application/json' }, 
                    body: JSON.stringify(category) }).then(response =>response.json().then(data => {setDocuments(data.Categories);
                })
            );
        },[category]);  
             console.log(documents)
             console.log (category)
     return ( 
                <div className= {classes.profileContainer}>  
                <center>
				        <div className={classes.linkButtons}>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Maths')}}>Home</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Javascript')}}>Javascript</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Algorithms')}}>Algorithms</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Computing')}}>Computing</Button>
                            <Button className={classes.Buttonss} onClick={() => {window.location=('./Random')}}>Random</Button>   
                        </div>    
				</center>    
                <center>            
                <h1 className= {classes.theTitle}> {category} </h1> 
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
                                    {(() => { // If the file contains the file type .pdf then it will show in the pdf viewer.
                                    const docName = document.documentFile
                                    console.log (docName)
                    if(docName.includes(".pdf")){
                            return(
                                <React.Fragment>
                                                <div className={classes.fileview}>
                                                   <PDFViewer url= {"/documentFiles/"+ document.documentFile} className={classes.sized} />
                                                </div>
                                </React.Fragment>
                   )} else { //if the file is an image it will show as an image
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

export default Categories;

