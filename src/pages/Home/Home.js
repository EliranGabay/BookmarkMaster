import React, { useState, useEffect } from 'react';
import Category from '../../components/Category/Category';
import { Row, Col } from 'react-bootstrap';
import CategoriesService from "../../services/categoriesService";
import SubNavigation from "../../components/Navigation/SubNavigation/SubNavigation"
import './Home.css';

function Home() {

  const [categoriesList,setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await CategoriesService.getCategories();
        setCategoriesList(categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  },[]);

  return (
    <div id="category-list">
      <SubNavigation/>
      <Row xs={1} md={2} lg={3} style={{paddingTop: 10, paddingLeft: 5,paddingRight: 5}}>
          {categoriesList && categoriesList.map((data,index)=>{
             return(<Col key={index}><Category categoryId={data.id} categoryName={data.name}/></Col>)
          })}
      </Row>
    </div>
  )
}

export default Home;

