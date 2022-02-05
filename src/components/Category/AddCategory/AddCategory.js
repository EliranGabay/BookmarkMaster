import React, { useState } from 'react';
import { Modal, Button, Form, Container, InputGroup } from 'react-bootstrap';
import CategoriesService from "../../../services/categoriesService";
import './AddCategory.css';


function AddCategory(props) {
    const [show, setShow] = useState(props.show);
    const [validated, setValidated] = useState(false);

    const [CategotyData, setCategotyData] = useState({
      name: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation()
        setValidated(true);
        handleClose();
        props.categoryAdd("New Categoty Added!")
        AddCategory();
        setTimeout(function() {window.location.reload(false);}, 1000);
      };

    const handleClose = () => {
      setShow(false);
      props.closeModel();
    };
    
    const AddCategory = async () => {
      try {
        await CategoriesService.addCategory(CategotyData);
      } catch (error) {
        console.error(error);
      }
    };

  return (
      <>
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form validated={validated} onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text>Titel:</InputGroup.Text>
                <Form.Control required type="text" onChange={e => setCategotyData(data =>{return{...data,name:e.target.value}})}/>
                <Form.Control.Feedback type="invalid">Please choose a Titel.</Form.Control.Feedback>
              </InputGroup>
              <Button className="submit" type="submit" >Submit</Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
      </>
  )
}

export default AddCategory;