import React, {useEffect, useState} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import "./SearchProductByNamePage.scss";
import PageSelector from '../../components/PageSelector/PageSelector';
import { fetchSeachProducts } from '../../store/searchProductByNameSlice';
import SelectOrderingofProducts from '../../components/SelectOrderingofProducts/SelectOrderingofProducts';
import { readTotalPageFromLocalStorage } from '../../utils/localStorage';
import { getPageNumberFromPathname } from '../../utils/getPageNumberFromPathname';
const SearchProductByNamePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search, numberPage} = useParams();
    const {data: products, status} = useSelector((state) => state.seachProductsByName);
    const [currentPage, setCurrentPage] = useState(numberPage);
    const [ordering, setOrdering] = useState('A-Z');
    const {data: totalPageState} = useSelector(state => state.totalPage)
    const [totalpage, setTotalPage] = useState(totalPageState)
    const location = useLocation();
    useEffect(() => {
      dispatch(fetchSeachProducts(search, currentPage, ordering));    
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, currentPage, ordering]);
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
      navigate(`/searchProductByName/${search}/${newPage}`);
    };
    const handleOrderChange = (option) => {
      setOrdering(option);
    }
    return (
      <div className = "searchProductByName-page">
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
                Search
                <span className = "breadcrumb-separator">
                  <i className = "fas fa-chevron-right"></i>
                </span>
              </li>
              <li>
                { search && search}
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

export default SearchProductByNamePage