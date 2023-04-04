import "./HomePage.scss";

import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';
import SingleCategory from '../../components/SingleCategory/SingleCategory';

import { fetchProducts } from '../../store/productSlice';
import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const {data: categories, status: categoryStatus} = useSelector((state) => state.category);
  const {data: products, status: productStatus} = useSelector((state) => state.product);
  const {catProductAll: productsByCategory, catProductAllStatus} = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    if(categories[0] !== undefined){
      dispatch(fetchProductsByCategory(categories[0].id, 'all', 1));
    }
    if(categories[1] !== undefined){
      dispatch(fetchProductsByCategory(categories[1].id, 'all', 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className = "home-page">
      <Slider />
      <Category categories = {categories} status = {categoryStatus} />
      <ProductList products = {products} status = {productStatus} />
      <section>
        { productsByCategory[0] && <SingleCategory products = {productsByCategory[0]} status = {catProductAllStatus} /> }
      </section>
      <section>
        { productsByCategory[1] && <SingleCategory products = {productsByCategory[1]} status = {catProductAllStatus} /> }
      </section>
    </div>
  )
}

export default HomePage;