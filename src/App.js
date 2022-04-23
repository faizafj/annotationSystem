import React from 'react'; //all the required imports to use in the react app. 
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Documents from './components/Documents'; //imports all the component functions from each javascript page
import MenuBar from "./components/MenuBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Details from "./components/Details";
import Genres from "./components/Genres";
import Home from './components/Home'

function App() {  //used to route the pages and adds the hyperlink to the menu bar so it knows where to direct users
    return (
        <BrowserRouter>
            <MenuBar />
            <Routes>
			    <Route exact path='/' element={<Home />}/>
                <Route exact path="/Login" element={<Login/>}/>
                <Route exact path="/SignUp" element={<SignUp/>}/>       
                <Route exact path="/Details/:id" element={<Details/>}/>    
                <Route exact path="/Genres/:genre" element={<Genres/>}/>                          
            </Routes>
        </BrowserRouter>

    );

}
export default App;