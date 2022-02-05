import React, {useState,useEffect } from 'react';
import { Modal, Button, Form, Container, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import CategoriesService from '../../../services/categoriesService';
import TagsService from '../../../services/tagsService';
import BookmarksService from '../../../services/bookmarksService';
import './AddBookmark.css';


function AddBookmark(props) {
    const [show, setShow] = useState(props.show);
    const [validated, setValidated] = useState(false);
    const [categoriesOpt,setCategoriesOpt] = useState([]);
    const [tagsOpt,setTagsOpt] = useState([]);
    
    const [bookmarkData, setBookmarkData] = useState({
      name: null,
      URL: null,
      icon: null,
      tags: {},
      categoryId:null,
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation()
      setValidated(true);
      handleClose();
      props.bookmarkAdd("New Bookmark Added!")
      getIconBookmark();
      AddBookmark();
      setTimeout(function() {window.location.reload(false);}, 1000);
    };

    const handleClose = () => {
      setShow(false);
      props.closeModel();
    };

    const getIconBookmark = () => {
      let domain = (new URL(bookmarkData.URL));
      domain = domain.hostname.replace('www.','');
      domain = domain.split('.')[0];
      const iconUrl = "https://img.icons8.com/color/48/000000/" + domain;
      bookmarkData.icon = iconUrl;
    };

    const AddBookmark = async () => {
      try {
        await BookmarksService.addBookmark(bookmarkData);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const categories = await CategoriesService.getCategories();
          categories.forEach((category)=>{
            setCategoriesOpt(categoriesOpt => categoriesOpt.concat({value:category.id, label:category.name}))
          })
          const tags = await TagsService.getTags();
          tags.forEach((tag)=>{
            setTagsOpt(tagsOpt => tagsOpt.concat({value:tag.name, label:tag.name}))
          })
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    },[])

  return (
      <>
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Add BookMark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form validated={validated} onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Titel:</InputGroup.Text>
                <Form.Control required type="text" onChange={e => setBookmarkData(data =>{return{...data,name:e.target.value}})}/>
                <Form.Control.Feedback type="invalid">Please choose a Titel.</Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>URL:</InputGroup.Text>
                <Form.Control required type="url" onChange={e => setBookmarkData(data =>{return{...data,URL:e.target.value}})}/>
                <Form.Control.Feedback type="invalid">Please add a URL.</Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Category:</InputGroup.Text>
                <Form.Select required className="selectCate" onChange={e => setBookmarkData(data =>{return{...data,categoryId:parseInt(e.target.value, 10)}})}>
                  <option></option>
                  {categoriesOpt.length && categoriesOpt.map((data,index)=>{
                    return(<option key={index} value={data.value}>{data.label}</option>)})}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please choose a Category.</Form.Control.Feedback>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Tags:</InputGroup.Text>
                <Select isMulti classNamePrefix="select" className="selectTags"  options={tagsOpt} onChange={e => setBookmarkData(data =>{return{...data,tags:e}})}/>
              </InputGroup>
              <Button className="submit" type="submit" >Submit</Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      </>
  )
}

export default AddBookmark;
