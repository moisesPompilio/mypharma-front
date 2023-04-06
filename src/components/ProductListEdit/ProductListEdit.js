import React, { useState } from 'react';
import { STATUS } from '../../utils/status';
import "./ProductListEdit.scss";
import { setModalData, setIsModalVisible } from '../../store/modalSlice';
import SingleProduct from '../SingleProduct/SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrice } from '../../utils/helpers';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { findCategoryById } from '../../utils/findCategoryById';
import SingleProductEdit from '../SingleProductEdit/SingleProductEdit';
import { editProduct } from '../../apiInsertAndEdit/editProduct';
import { creatProduct } from '../../apiInsertAndEdit/creatProduct';
import { deleteProduct } from '../../apiInsertAndEdit/deleteProduct';
import { fetchProductsByCategory } from '../../store/categorySlice';
import { useParams } from 'react-router-dom';

const ProductListEdit = ({products, status, ordering}) => {
    const dispatch = useDispatch();
    const {isModalVisible} = useSelector((state) => state.modal);
    const {data: categories} = useSelector((state) => state.category);
    const productNew = {id:"", name: "", description:"", price: 0, url_photo: ""}
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
     const {categoriesId, numberPage} = useParams();

    const [productEdit, setProductEdit] = useState(products[0]);
    const [singleProductEditVisible, setSingleProductEditVisible] = useState(false);
    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }
    const handleDelteProduct = async (productId) =>{
        const data = await deleteProduct(productId);
        setMessage(data.message)
        setType(data.type)
    }
    const visibleEditProduct = (product) =>{
        setProductEdit(product)
        setSingleProductEditVisible(true);
    }
    const handleEditOrCreateProduct = async (productEditConfirmd) =>{
        if(productEditConfirmd.id === ""){
            const data = await creatProduct(productEditConfirmd);
            setMessage(data.message)
            setType(data.type)
            if(data.type === "cert"){
                setSingleProductEditVisible(false)
                dispatch(fetchProductsByCategory(categoriesId, 'all', numberPage, ordering));
            }  
            
        }else{
            const data = await editProduct(productEditConfirmd);
            setMessage(data.message)
            setType(data.type)
            if(data.type === "cert"){
                dispatch(fetchProductsByCategory(categoriesId, 'all', numberPage, ordering));
                setSingleProductEditVisible(false)
            }  
        }
             
    }

    if(status === STATUS.ERROR) return (<Message />);
    if(status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='product py-5 bg-ghost-white' id = "products">
            { isModalVisible && <SingleProduct />}

            {singleProductEditVisible 
          && 
          <SingleProductEdit
            product={productEdit}
            confirmProductEdit={(categoryEditConfirmd) => handleEditOrCreateProduct(categoryEditConfirmd)}
            singleProductEditVisible={(visible) => setSingleProductEditVisible(visible)} 
            categories={categories}
        />}

            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products <button onClick={() => visibleEditProduct(productNew)}><i className="category-add fas fa-plus text-uppercase fw-7 text-regal-blue ls-1"></i></button></h3>
                    </div>
                    <div className='product-items grid'>
                        {
                            products[0] !== undefined?
                            (products.map(product => (
                                <div className='product-item bg-white' key = {product.id}>
                                    <div onClick = {() => viewModalHandler(product)}>
                                        <div className='product-item-img'>
                                            <img src = {product.url_photo} alt = "" />
                                            <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{findCategoryById(categories, product.categoriesId).name}</div>
                                        </div>
                                        <div className='product-item-body'>
                                            <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                            <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                        </div>
                                    </div>
                                    
                                    <div className = "product-item-button text-center">
                                        <button onClick={ () => visibleEditProduct(product)}  className='product-item-edit fs-20'>Edit</button>
                                    </div>
                                    <div className = "product-item-button text-center">
                                        <button className='product-item-delete fs-20' onClick={()=> handleDelteProduct(product.id)}><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            )))
                            : <h1 className='text-uppercase fw-7 text-regal-blue ls-1'>No product found.</h1>
                        }
                    </div>
                </div>
            </div>
            {message && (
        <Message message={message} type={type} onClose={() => setMessage('')} />
      )}
        </section>
    )
}

export default ProductListEdit