import React, { useState, useEffect } from 'react';
import { Nav, Container, Row, ButtonGroup, Button } from "react-bootstrap";
import './Category.css';
import Bookmark from '../Bookmark/Bookmark';
import BookmarksService from '../../services/bookmarksService';
import CategoriesService from '../../services/categoriesService';

function Category(props) {

  const [bookmarksList,setBookmarksList] = useState([]);
  const [edit,setEdit] = useState(false);


  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarks = await BookmarksService.getBookmarks(props.categoryId);
        setBookmarksList(bookmarks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookmarks();
  },[props.categoryId])

  const delCategory = async () => {
    if(window.confirm('Are you sure you wish to delete category '+ props.categoryName +'?')) {
    await CategoriesService.deleteCategory(props.categoryId)
    window.location.reload(false);
    };
  };

  const EditMode = () => (
    <div>
        <Nav className="topNar">
        <Nav.Item style={{paddingLeft:10}}>
            <h1 className="titelEdit">{props.categoryName}</h1>
        </Nav.Item>
        <Nav.Item className="navDrop">
          <ButtonGroup className="nav-buttons">
            <Button variant="secondary" onClick={()=>{setEdit(false); window.location.reload(false);}}>Close</Button>
            <Button variant="secondary" onClick={delCategory}>Delete</Button>
          </ButtonGroup>
        </Nav.Item>
        </Nav>
        <Container>
            { bookmarksList.length && bookmarksList.map((data,index)=>{
             return(<Row key={index}><Bookmark  title={data.name} link={data.URL} icon={data.icon} edit={edit} markId={data.id}/></Row>)
            })}
        </Container>
    </div>
   );

  const NormalMode = () => (
    <div>
        <Nav className="topNar">
        <Nav.Item style={{paddingLeft:10}}>
            <h1 className="titel">{props.categoryName}</h1>
        </Nav.Item>
        <Nav.Item className="navDrop">
          <img className="nav-edit" src="https://img.icons8.com/color/48/000000/gear.png" onClick={()=>setEdit(true)} alt="Edit"/>
        </Nav.Item>
        </Nav>
        <Container>
            {bookmarksList.length && bookmarksList.map((data,index)=>{
             return(<Row key={index}><Bookmark  title={data.name} link={data.URL} icon={data.icon}/></Row>)
            })}
        </Container>
    </div>
  );

  return (
    <div className="categoryCard" id={props.categoryId}>
        {!edit? <NormalMode/> : <EditMode/>}
    </div>
  )
}

export default Category;
