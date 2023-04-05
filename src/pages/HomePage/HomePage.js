import "./HomePage.scss";

import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';

import { fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const {data: categories, status: categoryStatus} = useSelector((state) => state.category);
  const {data: products, status: productStatus} = useSelector((state) => state.product);
  

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className = "home-page">
      <Slider />
      <Category categories = {categories} status = {categoryStatus} />
      <ProductList products = {products} status = {productStatus} />
    </div>
  )
}

export default HomePage;