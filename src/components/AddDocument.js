import React, {useEffect, useState} from 'react'; //All the imports required for this page.
import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const useStyles =  makeStyles( (theme) => ({ //used for styling of each element on the page.
    documentForm: {
        font: '16px',
        margin: '10px',
        background: 'white',
        borderRadius: '7px',
        border: 'black 1px solid',
        height: '50px',
        width: '500px',
        '&::placeholder': {
            color: 'grey',
            fontSize: "16px",
        }, 
    },
 
     addTitle:{
        font: '16px',
        margin: '10px',
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

    mainHeading:{
        fontSize: '35px',
        color: 'black',
        marginTop: '20px',
    },
     headings:{
        fontSize: '20px',
        color: 'black',
        textAlign:'Left',
        marginLeft: '15%',
    },
                                                   
    container:{
        font: "10px", 
        width: "80%",
        height: 'fit-content',
        borderRadius: '15px',
        border: 'solid black 1px',
        background: 'white',
        marginTop: '20px',
        padding: '70px',
},
    Buttons: {
        color: 'white',
        background: 'black',
        font: "10px", 
        margin: "10px",
        "&:hover": {
            color: '#white',
            background:'#8420D9',
},},  

    description:{
        font: '16px',
        margin: '10px',
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
        categories:{
        padding: '10px',
        fontSize: '15px',
        height: '50px',
        width: '300px',
        textAlign: 'Left',
        borderRadius: '5px',
},

}));                         

function file2Base64(file) { //used for turning the image into a base64 file, renaming it and saving it. 
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}



function AddDocument() {   //The function used to run the page itself. This creates a form so the user can add a document which is then pushed to the database through an API.
	const classes = useStyles();   //this is used to create a class for each element when defined so it can styled. 
    const [documentTitle, setDocumentTitle] = useState(''); //use states for each element set to the before and after it is dealt with. 
    const [documentDescription, setDocumentDescription] = useState("");     
    const [documentCategory, setDocumentCategory] = useState('');
    const [documents, setDocuments] = useState([]);
    const [documentFile, setDocumentFile] = useState('');
    const userID = localStorage.getItem('userID') //Gets the user ID from local storage so it can be used for setting which user adds the document. 

    async function addDocuments (event) { 
        const filesToUploads = document.querySelector('#ImageSelect').files  //gets the image/document file once it has been added so that it can rename it 
        const file = filesToUploads[0]
        const fileName = file.name
        const data = await file2Base64(file) //uses base 64 to rename the file
        const documentInfo = [documentTitle, documentDescription, documentCategory, fileName, data]; //sets each field which is required by the api and form. 
        console.log (documentInfo)
              fetch('https://deliverrelax-amandarose-5000.codio-box.uk/AddDocument', { 
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-type': 'application/json',
                        },
                            body: JSON.stringify(documentInfo),
                    }).then(response =>response.json().then(data => {
                      window.location=('./')  //redirects users to homepage when the document is added
                  }))
    event.preventDefault();
    }
    
    
    /*
     * Creates the form used to input details.
     *  */
    return (  <center> 
                        <div className={classes.mainHeading}> 
                        <p> Add a Document: </p>
                    </div>
                    <div className= {classes.container}>
                    <div className={classes.headings}>
                        <p> 1. Upload a document or image</p>
                     </div>
                    <div className= {classes.Poster}> 
                        <input id='ImageSelect' type="file"  value={documentFile}  onChange={(e) => setDocumentFile(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p> 2. Add a Title </p>
                     </div>
                    <div className= {classes.Title}>
                        <input className={classes.addTitle} type="text" placeholder="Document Title" value={documentTitle}  onChange={(e) => setDocumentTitle(e.target.value)}/>
                    </div>

                    <div className={classes.headings}>
                        <p> 3. Add a Description </p>
                     </div>
                    <div className= {classes.Description}>
                        <textarea className={classes.description} type="text" placeholder="Document Description" value={documentDescription} onChange={(e) => setDocumentDescription(e.target.value)}/>
                    </div>
                    <div className={classes.headings}>
                        <p>4.  Add a Category </p>
                     </div>
                    <div className= {classes.containersCategories}>
                            <select value={documentCategory} className= {classes.categories} onChange={(e) => setDocumentCategory(e.target.value)}>
                                    <option value="Maths">Maths</option>
                                    <option value="Computing">Computing</option>
                                    <option value="Algorithms">Algorithms</option>
                                    <option value="Javascript">Javascript</option>
                                    <option value="Random">Random</option>
                          </select> 
                    </div>

                    <div className= {classes.Button}>
                        <Button className={classes.Buttons} onClick={() => {window.location=('./')}}>BACK</Button>
                        <Button className={classes.Buttons} onClick={addDocuments}>Add File</Button>
                    </div>
                </div> </center>
)} 
export default AddDocument;


