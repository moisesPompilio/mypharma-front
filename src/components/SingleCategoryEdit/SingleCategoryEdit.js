import React, {useState} from 'react';
import "./SingleCategoryEdit.scss";


  const SingleCategoryEdit = ({ category, confirmCategoryEdit,singleCategoryEditVisible }) => {
    const [nameCategory, setNameCategory] = useState(category.name);
    const [url_photodCategory, setUrl_photodCategory] = useState(category.url_photo);
    console.log(category)
    const confirmEdit = () => {
      
      confirmCategoryEdit({
        id: category.id,
        name: nameCategory,
        url_photo: url_photodCategory
      });
    };
    const closeEditOverlay = (e) => {
      if(e.target.classList.contains('overlay-bg')){
        singleCategoryEditVisible(false)
      }
    }
    const closeEdit = () => {
      singleCategoryEditVisible(false)
    }
    const handleCategoryEditChange = (event) => {
      setNameCategory(event.target.value);
    };
    const handleUrl_photodCategoryChange = (event) => {
      setUrl_photodCategory(event.target.value);
    };
    
      return (
      <div className='overlay-bg' onClick={closeEditOverlay}>
        <div className="category-details-modal bg-white">
          <button type="button" className='modal-close-btn flex flex-center fs-14' onClick={closeEdit}>
            <i className="fas fa-times"></i>
          </button>
          <div className="details-content grid">
            {/* details left */}
            <div className="details-right">
              <div className="details-img">
                <img src={url_photodCategory} alt={nameCategory} />
              </div>
            </div>
            {/* details right */}
            <div className='details-left'>
              <div className="details-info">
                <div>
                  <label>Category Name:</label>
                  <input placeholder='category name' type="text" value={nameCategory} onChange={handleCategoryEditChange} className="name-input" />
                </div>
                <div>
                  <label>Link Image:</label>
                 <input placeholder='category photo link' type="text" value={url_photodCategory} onChange={handleUrl_photodCategoryChange} className="photo-url-input" />
                </div>
                <button type="button" className='btn-primary add-to-cart-btn' onClick={confirmEdit}>
                    <span className="btn-icon">
                      <i className='fas fa-ok'></i>
                    </span>
                    <span className='btn-text'>Confirm Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SingleCategoryEdit;