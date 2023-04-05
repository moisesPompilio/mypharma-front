import "./EditInventory.scss";

import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getPageNumberFromPathname } from "../../utils/getPageNumberFromPathname";
import { readTotalPageFromLocalStorage } from "../../utils/localStorage";
import { findCategoryById } from "../../utils/findCategoryById";
import SelectOrderingofProducts from "../../components/SelectOrderingofProducts/SelectOrderingofProducts";
import PageSelector from "../../components/PageSelector/PageSelector";
import CategoriesEdit from "../../components/CategoriesEdit/CategoriesEdit";
import { getCategorieIdFromPathname } from "../../utils/getCategorieIdFromPathname";
import ProductListEdit from "../../components/ProductListEdit/ProductListEdit";


const EditInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {categoriesId, numberPage} = useParams();
  const {data: categories, status: categoryStatus} = useSelector((state) => state.category);
  const {catProductAll: products, catProductAllStatus: productStatus} = useSelector((state) => state.category);
  const {data: totalPageState} = useSelector(state => state.totalPage)
  const [id, setId] = useState(categoriesId)
  const [totalpage, setTotalPage] = useState(totalPageState)
  const [currentPage, setCurrentPage] = useState(numberPage);
  const [ordering, setOrdering] = useState('A-Z');
  const location = useLocation();
  

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(fetchProductsByCategory(id, 'all', currentPage, ordering));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage, ordering]);
  useEffect(() => {
    const numberPageComparision = getPageNumberFromPathname(location.pathname);
    if (numberPageComparision !== undefined && numberPageComparision !== currentPage) {
      setCurrentPage(numberPageComparision)
    }
    const categoryIdComparision = getCategorieIdFromPathname(location.pathname);
    if (categoryIdComparision !== undefined && categoryIdComparision !== id) {
      setId(categoryIdComparision)
    }
    // eslint-disable-next-line
  }, [location.pathname])
  useEffect(() =>{
    setTotalPage(readTotalPageFromLocalStorage);
  }, [products])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`/editInventory/${id}/${newPage}`);
  };

  const handleOrderChange = (option) => {
    setOrdering(option);
  }

  return (
    <div className = "edit-inventory-page">
      <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items flex">
              <li className = "breadcrumb-item">
                <Link to = "/">
                  <i className = "fas fa-home"></i>
                  <span className = "breadcrumb-separator">
                    <i className = "fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>
                Edit Inventory
                <span className = "breadcrumb-separator">
                  <i className = "fas fa-chevron-right"></i>
                </span>
              </li>
              <li>
                { id !== "editInventory" && findCategoryById(categories, id).name}
              </li>
            </ul>
          </div>
          <SelectOrderingofProducts 
          currentOption={ordering}
          onOrderChange={handleOrderChange}
           />
        </div>  
      <ProductListEdit products = {products} status = {productStatus} />
      { products[0] && <PageSelector totalPages={totalpage} currentPage={currentPage} onPageChange={handlePageChange}/>}
      <CategoriesEdit categories = {categories} status = {categoryStatus} />
      
    </div>
  )
}

export default EditInventory;