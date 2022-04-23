import React from 'react'; //required imports
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
//import { PDFViewer } from 'react-view-pdf';

const useStyles =  makeStyles( (theme) => ({ //styling
    movieDetails:{
        font: "10px", 
        width: "90%",
        height: "200px",
        border: "1px solid black",
        borderRadius: '3px',
        marginLeft:'25px',
        marginRight: '10px',
        marginTop: '20px',
        marginBottom: '40px',
        rowGap: '2em',
        background: 'white',
},
    container: {
        width: 'auto',
        height: '300px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        rowGap: '5px',
},
    viewDetails: {
        color: '#BF4E30',
        background: 'None',
        font: "10px", 
        marginLeft: "25px",
         "&:hover": {
            color: 'black',
            background:'white',
        },
}, 
    title:{
        fontSize: '30px;',
        color: 'black',
        paddingTop: '5px',
        textDecoration: 'bold',
 },
    summary: {
        fontSize: '12px',
        color: 'black',
        marginLeft: "5px",
        marginRight: "5px",
        textAlign: "justify",
        height: "120px",
},

    moviePoster:{
        height:"280px",
        width: "200px",
        marginLeft: "25px",
        marginRight: "25px",
        borderRadius: '5px', 
        cursor: "pointer",
},

    
    titleHeading:{
        color: 'green',
        fontSize: '20px',
    },
    
        
    sized:{
        width: '300px',
        height: '500px',
    },
    
}));    

export const Documents = ({document}) => { 
  const classes = useStyles(); 
    return ( 
        <div> 
            {document.map (documents => { 
             console.log(documents)
            return (
                <center> 
               <div className={classes.movieDetails}> 
               <div className={classes.sectionOne}>
                  <h2> {documents.documentTitle} </h2> 
                </div>
               <div className={classes.sectionTwo}>
                  <h2> {documents.documentDescription} </h2> 
                </div>
                <div className={classes.sectionThree}>
                <p> {documents.documentGenre} </p>
                <Button className={classes.viewDetails} onClick={() => {window.location=('/Details/'+ documents.documentID)}} > View Details </Button> 
                </div>
               </div> 
               </center>
)})} 
    </div>    
)}

export default Documents 

//                 <PDFViewer url="/documentFiles/5008CEM.pdf" className={classes.sized} />