import React from 'react';
import { Navbar } from 'react-bootstrap';
import { GiMeepleKing } from 'react-icons/gi';
import './Navigation.css';

function Navigation(){
  return (
    <Navbar 
      bg="dark" 
      variant="dark"
      sticky="top" 
      expand="sm" 
      collapseOnSelect>
        <Navbar.Brand className="brand" href="home">
          Book-Mark Master <GiMeepleKing/>
        </Navbar.Brand>
        <Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
  );
};

export default Navigation;
