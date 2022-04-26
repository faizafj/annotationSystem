import React from 'react'; //required imports
import {makeStyles} from '@material-ui/core/styles'
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
        border: "1px solid black",
        gridColumnStart: '2',
        gridColumnEnd: '3',   
        padding: '0',     
            
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
        inlineSize: '900px',
        margin: '10px',
        fontSize: '20px', 
        //border: 'solid 1px black',
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
        border: "1px solid black",
    },
        fileview:{
        width: '300px',
        height: 'auto',
        border: "1px solid black",
},
}));    

export const Documents = ({document}) => { 
  const classes = useStyles(); 
  	const userID=localStorage.getItem('userID'); 
    return ( 
        <div> 
            {document.map (documents => { 
             console.log(documents)
            const docName = documents.documentFile
            console.log (docName)
            return (
                <center> 
               <div className={classes.documentDetails}> 
               <div className={classes.sectionOne}>
                  <h1> {documents.documentTitle} </h1> 
                </div>
               <div className={classes.sectionTwo}>
                                    {(() => { 
                    if(docName.includes(".pdf") ){
                            return(
                                <React.Fragment>
                                                <div className={classes.fileview}>
                                                   <PDFViewer url= {"/documentFiles/"+ documents.documentFile} className={classes.sized} />
                                                </div>
                                </React.Fragment>
                   )} else { 
                            return(
                                 <React.Fragment>
                                    <img className ={classes.docImage} src= {"/documentFiles/"+ documents.documentFile} onClick={() => {window.location=('/Details/'+ documents.documentID)}}/> 
                                </React.Fragment>
                        )}})()}
                </div>
                <div className={classes.sectionThree}>
                <p className={classes.desc}> {documents.documentDescription}  </p> 
                <Button className={classes.Buttonss} onClick={() => {window.location=('./Categories/'+documents.documentGenre)}}>{documents.documentGenre}</Button>
                </div>

                 <div className={classes.sectionFour}>
                <Button className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ documents.documentID)}} > View Details </Button> 
                </div>
               </div> 
               </center>
)})} 
    </div>    
)}

export default Documents 
