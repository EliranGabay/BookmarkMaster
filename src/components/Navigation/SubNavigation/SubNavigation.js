import React, { useState } from 'react';
import { Alert, Nav } from 'react-bootstrap';
import AddBookmark from '../../Bookmark/AddBookmark/AddBookmark';
import AddCategory from '../../Category/AddCategory/AddCategory';
import './SubNavigation.css'

function SubNavigation() {
  const [addMark,setAddMark] = useState(false);
  const [addCategoty,setAddCategoty] = useState(false);
  const [alertM,setAlertM] = useState(false);
  const [message,setMessage] = useState("");
  

  const alertMessage = (msg) => {
    setMessage(msg)
    setTimeout(setAlertM(true), 3000);
  };
  
  return (
    <>
    <Nav className="subNav">
    <Nav.Item as="li">
      <Nav.Link className="navLink" onClick={()=>{setAddCategoty(true)}}>Add Category</Nav.Link>
      { addCategoty && 
        <AddCategory show={addCategoty} closeModel={() => setAddCategoty(false)} categoryAdd={(msg)=>alertMessage(msg)} />}
    </Nav.Item>
    <Nav.Item as="li">
      <Nav.Link className="navLink" onClick={()=>{setAddMark(true)}}>Add Bookmark</Nav.Link>
      { addMark && 
        <AddBookmark show={addMark} closeModel={() => setAddMark(false)} bookmarkAdd={(msg)=>alertMessage(msg)} />}
    </Nav.Item>
    </Nav>
    {alertM && <Alert variant="success">{message}</Alert>}
    </>
  )
}

export default SubNavigation;
