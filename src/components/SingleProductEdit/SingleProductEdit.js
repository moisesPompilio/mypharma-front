import React, {useState} from 'react';
import "./SingleProductEdit.scss";

const SingleProductEdit = ({product, confirmProductEdit, singleProductEditVisible, categories}) => {
    const [productEdit, setProductEdit] = useState(product)  
    const closeEditOverlay = (e) => {
        if(e.target.classList.contains('overlay-bg')){
            singleProductEditVisible(false)
        }
      }
      const confirmEdit = () => {
      confirmProductEdit(productEdit);
    };
  

  return (
    <div className='overlay-bg' onClick = {closeEditOverlay}>
      <div className = "product-details-modal bg-white">
        <button type = "button" className='modal-close-btn flex flex-center fs-14' onClick={() => singleProductEditVisible(false)}>
          <i className = "fas fa-times"></i>
        </button>
        <div className = "details-content grid">
          {/* details left */}
          <div className = "details-right">
            <div className = "details-img">
              <img src = {productEdit.url_photo} alt = {productEdit.name} />
            </div>
          </div>
          {/* detials right */}
          <div className='details-left'>
            <div className = "details-info">
                <div>
                    <label className = "title text-regal-blue fs-22 fw-5">Link image: </label>
                    <input type="text" value={productEdit.url_photo} onChange={(e) => setProductEdit({...productEdit, url_photo: e.target.value})} />
                </div>
                <div>
                    <label className = "title text-regal-blue fs-22 fw-5">Name: </label>
                    <input type="text" value={productEdit.name}  onChange={(e) => setProductEdit({...productEdit, name: e.target.value})}/>
                </div>
                <div>
                    <label className = "title text-regal-blue fs-22 fw-5">Category: </label>
                    <select id='order-selec' value={productEdit.categoriesId}  onChange={(e) => setProductEdit({...productEdit, categoriesId: e.target.value})}><option>Select Category</option>  {categories.map((category) => ( <option value={category.id}>{category.name}</option>))}</select>
                </div>
                <div>
                    <label className='title text-regal-blue fs-22 fw-5'>Description: </label>
                    <input type="text" value={productEdit.description} onChange={(e) => setProductEdit({...productEdit, description: e.target.value})} />
                </div>
                <div>
                    <label className='title text-regal-blue fs-22 fw-5'>Price:  </label>
                    <input type="number" value={productEdit.price}  onChange={(e) => setProductEdit({...productEdit, price: e.target.value})}/>
                </div>
             
              <button onClick={() => confirmEdit()} type = "button" className='btn-primary add-to-cart-btn' >
                  <span className = 'btn-text'>Confirm edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductEdit