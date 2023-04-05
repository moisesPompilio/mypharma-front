import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible, setModalData } from '../../store/modalSlice';
import { formatPrice } from '../../utils/helpers';
import SingleProduct from '../SingleProduct/SingleProduct';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import {STATUS} from "../../utils/status";
import { findCategoryById } from '../../utils/findCategoryById';

const SingleCategory = ({products, status}) => {
    const dispatch = useDispatch();
    const {isModalVisible} = useSelector((state) => state.modal);
    const {data: categories} =useSelector(state => state.category)

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }

    if(status === STATUS.ERROR) return (<Message />);
    if(status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='cat-single py-5 bg-ghost-white'>
            { isModalVisible && <SingleProduct />}

            <div className='container'>
                <div className='cat-single-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>{findCategoryById(categories, products[0].categoriesId).name}</h3>
                    </div>
                    <div className='product-items grid'>
                        {   products[0] !== undefined?
                            (products.map(product => (
                                <div className='product-item bg-white' key = {product.id} onClick = {() => viewModalHandler(product)}>
                                    <div className='product-item-img'>
                                        <img src = {product.url_photo} alt = "" />
                                        <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{findCategoryById(categories, productcategoriesId).name}</div>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                        <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                    </div>
                                </div>
                            )))
                            : <h1 className='text-uppercase fw-7 text-regal-blue ls-1'>No product found.</h1>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleCategory;
