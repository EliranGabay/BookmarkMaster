import React, { useState } from 'react';
import { Col, Row,  ButtonGroup, Button } from "react-bootstrap";
import BookmarksService from '../../services/bookmarksService';
import './Bookmark.css';

function Bookmark(props) {

  const [edit,setEdit] = useState(props.edit);
  const [delItem,setDelItem] = useState(false);


  const delBookmark = async () => {
    if(window.confirm('Are you sure you wish to delete '+ props.title +'?')) {
      await BookmarksService.deleteBookmark(props.markId);
      setDelItem(true);
    }
  };

  const EditMode = () => (
    <Row>
      <Col xs={5} md={6} lg={7} xl={8}>
      <img src={props.icon} 
      onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src="https://img.icons8.com/color/48/000000/web";}}
      alt=''/>
      <a href={props.link} target="_blank" rel="noreferrer">{props.title} </a>
      </Col>
      <Col/>
      <Col>
      {!delItem? 
      <ButtonGroup className="label-buttons">
              <Button className="label-btn" variant="secondary" onClick={delBookmark} >Delete</Button>
      </ButtonGroup>
      : <img src="https://img.icons8.com/color/48/000000/cancel-2--v1.png" alt="Cancel"/>}
        </Col>
      </Row>
  );

  const NormalMode = () => (
    <>
    <img src={props.icon} 
      onError={({ currentTarget }) => {
      currentTarget.onerror = null; // prevents looping
      currentTarget.src="https://img.icons8.com/color/48/000000/web";}}
      alt=''/>
    <a href={props.link} target="_blank" rel="noreferrer">{props.title} </a>
    </>
  );
  
  return (
    <>
    <Col className="bookmark">
      {!edit? <NormalMode/> : <EditMode/> }
    </Col>
    </>
  )
}

export default Bookmark;
