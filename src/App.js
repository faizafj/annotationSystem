import React from 'react'; //all the required imports to use in the react app. 
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import MenuBar from "./components/MenuBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Details from "./components/Details";
import Genres from "./components/Genres";
import AddDocument from "./components/AddDocument";
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
                <Route exact path="/AddDocument" element={<AddDocument/>}/>  
            </Routes>
        </BrowserRouter>

    );

}
export default App;