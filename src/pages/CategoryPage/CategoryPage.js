import React, {useEffect} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link } from 'react-router-dom';
import "./CategoryPage.scss";
import { findCategoryById } from '../../utils/findCategoryById';
import PageSelector from '../../components/PageSelector/PageSelector';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const {id, numberPage} = useParams();
    const {catProductSingle: products, catProductSingleStatus: status} = useSelector((state) => state.category);
    const {data: categories} =useSelector(state => state.category)

    useEffect(() => {
      dispatch(fetchProductsByCategory(id, 'single', numberPage));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const handlePageChange = (newPage) => {
      dispatch(fetchProductsByCategory(id, 'single', newPage));
    };
    return (
      <div className = "category-page">
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
                Category
                <span className = "breadcrumb-separator">
                  <i className = "fas fa-chevron-right"></i>
                </span>
              </li>
              <li>
                { products[0] && findCategoryById(categories, products[0].categoriesId).name}
              </li>
            </ul>
          </div>
        </div>
        <ProductList products = {products} status = {status} />
        <PageSelector totalPages={20} currentPage={numberPage} onPageChange={handlePageChange}/>
      </div>
    )
}

export default CategoryPage