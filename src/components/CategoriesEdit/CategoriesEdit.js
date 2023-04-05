import React, { useState } from 'react';
import { STATUS } from "../../utils/status";
import "./CategoriesEdit.scss";
import {Link} from "react-router-dom";
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import { deleteCategory } from '../../apiInsertAndEdit/deleteCategory';
import { fetchCategories } from '../../store/categorySlice';
import { useDispatch } from 'react-redux';
import SingleCategoryEdit from '../SingleCategoryEdit/SingleCategoryEdit';
import { editCategory } from '../../apiInsertAndEdit/editCategory';
import { creatCategory } from '../../apiInsertAndEdit/creatCategory';

const CategoriesEdit = ({categories, status}) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [categoryEdit, setCategoryEdit] = useState(categories[0]);
    const [singleCategoryEditVisible, setSingleCategoryEditVisible] = useState(false);
    const categoryNew = {name: "", url_photo: "", id: ""}
    if(status === STATUS.LOADING) return (<Loader />);

    const handleDelteCategory = async (categoryId) =>{
        const data = await deleteCategory(categoryId);
        setMessage(data.message)
        setType(data.type)
        dispatch(fetchCategories())
    }
    const visibleEditCategory = (category) =>{
        setCategoryEdit(category)
        setSingleCategoryEditVisible(true);
    }
    const handleEditOrCreateCategory = async (categoryEditConfirmd) =>{
        if(categoryEditConfirmd.id === ""){
            const data = await creatCategory(categoryEditConfirmd);
            setMessage(data.message)
            setType(data.type)
            if(type === "cert"){
                dispatch(fetchCategories())
                setSingleCategoryEditVisible(false)
            }  
            
        }else{
            const data = await editCategory(categoryEditConfirmd);
            setMessage(data.message)
            setType(data.type)
            if(type === "cert"){
                dispatch(fetchCategories())
                setSingleCategoryEditVisible(false)
            }  
        }
             
    }

    return (
    <section className = "categories py-5 bg-ghost-white" id = "categories">
        {singleCategoryEditVisible 
          && 
          <SingleCategoryEdit
           category={categoryEdit}
            confirmCategoryEdit={(categoryEditConfirmd) => handleEditOrCreateCategory(categoryEditConfirmd)}
             singleCategoryEditVisible={(visible) => setSingleCategoryEditVisible(visible)} 
        />}
        <div className = "container">
            <div className = "categories-content">
                <div className='section-title'>
                    <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">Category <button onClick={() => visibleEditCategory(categoryNew)}><i className="category-add fas fa-plus text-uppercase fw-7 text-regal-blue ls-1"></i></button></h3>

                </div>
                
                <div className = "category-items grid">
                    {
                        categories.map(category => (
                            <div className = "category-item" key={category.id} >
                                    <Link to = {`/editInventory/${category.id}/1`} key = {category.id}>
                                    <div className='category-item-img'>
                                        <img src = {category.url_photo} alt = "" />
                                    </div>
                                    <div className = "category-item-name text-center">
                                        <h6 className='fs-20'>{category.name}</h6>
                                    </div>
                                    </Link>
                                    <div className = "category-item-button text-center">
                                        <button onClick={ () => visibleEditCategory(category)}  className='category-item-edit fs-20'>Edit</button>
                                    </div>
                                    <div className = "category-item-button text-center">
                                        <button className='category-item-delete fs-20' onClick={()=> handleDelteCategory(category.id)}><i className="fas fa-trash"></i></button>
                                    </div>
                                </div>
                        ))
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

export default CategoriesEdit