import React from 'react'; //All imports requried for this page (including react itself)
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom"; //useParams is required to select the comment ID to fetch all associated comments. 

const useStyles =  makeStyles( (theme) => ({ //styling for each element including the hovers, backgrounds used. 

    container: {
        width: 'auto',
        height: '30px',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: '30px',
        
},

    description: {
        fontSize: '15px',
        color: 'black',
        textAlign: "justify",
        height: "120px",
},

    userTag:{
        fontSize: '20px',
        textAlign:'center',
    
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

       
        sectionOne:{
            gridColumnStart: '1',
            gridColumnEnd: '1',
            margin: '20px',
            height: 'auto',
            padding: '0',
    },
        sectionTwo:{
            gridColumnStart: '1',
            gridColumnEnd: '1',
            width: 'fit-content',
    },
    
        commentsDetails:{
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

        descriptionTitle: {
              fontSize: '20px',
              color: 'black',
              textAlign: "center",
              height: "auto",
              margin: '0',
},
    
    description: {
        fontSize: '15px',
        color: 'black',
        textAlign: "justify",
        height: "auto",
},

    NoComments:{
        fontSize: '20px',
        color: 'white',
        textAlign: 'center',
        marginLeft: '45%',
        border: '1px solid white',
        padding:'5px',
        borderRadius: '5px',
    },

    commentsTitle :{
        fontSize: '25px',
        color: 'black',
        textAlign: 'center',
    },

}));                                  
                                       
export const Comments = ({comments}) => {
  const classes = useStyles();
   const{id} = useParams(); //id is the documentID
   const userID=localStorage.getItem('userID'); 
   const token = localStorage.getItem('authorization'); //checks autherisation too to see if the user is the correct user.
    async function DeleteComment() { 
        const commentDetails = {userID, id }
        console.log ('this is id')
        console.log (id)
        console.log (commentDetails)
        const response = await fetch('https://deliverrelax-amandarose-5000.codio-box.uk/DeleteComments', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify(commentDetails)
            })
        if(response.ok){
            window.alert ("Your comment has been deleted")
          window.location.reload() //refreshes the page once successful
        }
}
    return (   
     <center>  
              <p className={classes.commentsTitle}> Your Comments:  </p>
              <div className = {classes.container}>                                              
                 {(() => { 
                    if (comments.length == 0){
                        return(
                                 <React.Fragment>
                                          <p className = {classes.NoComments}> No Comments have been added yet </p> 
                                 </React.Fragment>
                    )}
                })()}
            {comments.map (comments => {
                
                            return(
                               
                               <div className={classes.commentsDetails}>
                                <div className= {classes.sectionOne}>
                               <p className={classes.descriptionTitle}> {comments.commentTitle} </p>    
                               <p className={classes.description}> {comments.commentDescription} </p> 
                                </div>
                            <center>  
                               <div className={classes.sectionTwo}>
                                <Button className={classes.Buttons} onClick={DeleteComment}>Delete</Button>
                                </div> 
                            </center> 
                </div>
                               
                               )
})}

</div>  </center>

)}

export default Comments
