import React, {useEffect, useState} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams, Link, useLocation } from 'react-router-dom';
import "./CategoryPage.scss";
import { findCategoryById } from '../../utils/findCategoryById';
import PageSelector from '../../components/PageSelector/PageSelector';
import SelectOrderingofProducts from '../../components/SelectOrderingofProducts/SelectOrderingofProducts';
import { useNavigate } from 'react-router-dom';
import { readTotalPageFromLocalStorage } from '../../utils/localStorage';
import { getPageNumberFromPathname } from '../../utils/getPageNumberFromPathname';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, numberPage} = useParams();
    const {catProductSingle: products, catProductSingleStatus: status} = useSelector((state) => state.category);
    const {data: categories} =useSelector(state => state.category)
    const {data: totalPageState} = useSelector(state => state.totalPage)
    const [totalpage, setTotalPage] = useState(totalPageState)
    const [currentPage, setCurrentPage] = useState(numberPage);
    const [ordering, setOrdering] = useState('A-Z');
    const location = useLocation();
    useEffect(() => {
      dispatch(fetchProductsByCategory(id, 'single', currentPage, ordering));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, currentPage, ordering]);
    useEffect(() => {
      const numberPageComparision = getPageNumberFromPathname(location.pathname);
      if (numberPageComparision !== undefined && numberPageComparision !== currentPage) {
        setCurrentPage(numberPageComparision)
      }
      // eslint-disable-next-line
    }, [location.pathname])
    useEffect(() =>{
      setTotalPage(readTotalPageFromLocalStorage);
    }, [products])
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage)
      navigate(`/category/${id}/${newPage}`);
    };

    const handleOrderChange = (option) => {
      setOrdering(option);
    }
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
          <SelectOrderingofProducts 
          currentOption={ordering}
          onOrderChange={handleOrderChange}
           />
        </div>
        <ProductList products = {products} status = {status} />
        { products[0] && <PageSelector totalPages={totalpage} currentPage={currentPage} onPageChange={handlePageChange}/>}
      </div>
    )
}

export default CategoryPage