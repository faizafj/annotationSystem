import React, {useEffect, useState} from 'react'; //selects imports required
import '../App.css'; //takes in the Apps.css as it requires the background to be black which was changed there.
import { useParams } from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import { PDFViewer } from 'react-view-pdf'; //https://www.npmjs.com/package/pdf-viewer-reactjs
import { Comments } from "./Comments";
import Button from '@material-ui/core/Button';


const useStyles =  makeStyles( (theme) => ({ //styling for elements
    documentDetails:{
        height: 'fit-content',
},
    documentTitle:{
        fontSize: '25px',
    },

    commentTitle:{
        fontSize: '25px',
        textAlign: 'center',
    },
    commentsHelpTitle:{
                fontSize: '20px',
                textAlign: 'left',
                margin: '0',
    },

    commentDescription:{
        font: '16px',
        background: 'white',
        borderRadius: '5px',
        border: 'black 1px solid',
        height: '100px',
        width: '500px',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        },
    }, 

    commentTitles:{
        font: '16px',
        background: 'white',
        borderRadius: '5px',
        border: 'black 1px solid',
        height: '50px',
        width: '500px',
        '&::placeholder': {
            color: 'black',
            fontSize: "16px",
        },
    }, 
    desc:{
        fontSize: '20px',
        color: 'black',
        margin: '20px',
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
        width: '70%',
        height: 'fit-content',
},

     Buttons: {
        color: 'white',
        background: 'black',
        font: "10px", 
        margin: "10px",
        "&:hover": {
            color: 'white',
            background: '#8420D9',
},},

addCommentSection:{
            font: "10px", 
            width: "75%",
            height: "fit-content",
            borderRadius: "25px",
            marginLeft: '12%',
            padding: '10px',
            background: 'white',
            flexWrap: 'wrap',
            display:'grid',
            border: 'black solid 1px ',
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
        gridColumnEnd: '3',
    },  
    
    sectionThree:{
    margin: '0',
        gridColumnStart: '1',
        gridColumnEnd: '3',   
        padding: '0',     
       
    },
        
    sectionFour:{
    margin: '0',
        gridColumnStart: '1',
        gridColumnEnd: '3',   
        padding: '0',   
        textAlign:'center',  
       
    },

}));                   


function Details() { 
    const{id} = useParams(); //useParams finds the documentID to know which document details to show.
    const classes = useStyles();  //adds styling by referring to classes.
    const [documents, setDocuments] = useState([]); //sets the use states for each element
    const [comments, setComments] = useState([]); //sets the use states for each element
    const [commentTitle, setCommentTitle] = useState([]); //sets the use states for each element
    const [commentDescription, setCommentDescription] = useState([]); //sets the use states for each element
    const userID=localStorage.getItem('userID') //gets userID from local storage

    function submitComment (event) { //adds a comment when the button clicked (event listener)
        const commentInfo = [id, userID, commentTitle, commentDescription]; 
            console.log (commentInfo)
              fetch('https://deliverrelax-amandarose-5000.codio-box.uk/AddComments', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json',
                        },
                            body: JSON.stringify(commentInfo),
                    }).then(response =>response.json().then(data => {
                      window.location.reload() //refreshes the page when it is done
                  }))
    event.preventDefault();
    }   


	useEffect(()=> { //fetches the comments and document details
			fetch('https://deliverrelax-amandarose-5000.codio-box.uk/Details', { 
                method: "POST", 
                credentials: 'include', 
                headers: {'Content-type': 'application/json' }, 
                body: JSON.stringify(id) })
                .then(response =>response.json().then(data => {setDocuments(data.detailsList); ; setComments(data.commentsList);
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
                    <div className={classes.addCommentSection}>
                    <div className={classes.sectionOne}>
                                     <p className={classes.commentTitle}>Add Your Comments</p> 
                    </div>
                    <div className= {classes.sectionTwo}>                    
                                            <div className= {classes.description}>
                                                 <p className={classes.commentsHelpTitle}>Add a Title:</p> 
                                                  <textarea className={classes.commentTitles} type="text" placeholder="Add A Title" value={commentTitle} onChange={(e) => setCommentTitle(e.target.value)}/>
                                        </div>
                    </div>
                    <div className= {classes.sectionThree}>   
                                        <div className= {classes.description}>
                                                 <p className={classes.commentsHelpTitle}>Add comments:</p> 
                                                <textarea className={classes.commentDescription} type="text" placeholder="Add your comments..." value={commentDescription} onChange={(e) => setCommentDescription(e.target.value)}/>
                                        </div>
                                        </div>
                            <div className= {classes.sectionFour}>   
                                         <div className= {classes.Button}>
                                            <Button className={classes.Buttons} onClick={() => {window.location=('./')}}>Cancel</Button>
                                            <Button className={classes.Buttons} onClick={submitComment}>Submit</Button>
                                        </div>
                        </div> 

                    </div>
               </div>
)})} 
<center> 
            <div>
                 <Comments comments = {comments}/> 
            </div> 
        </center>

</div> )}

export default Details;