import React from 'react';
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className = "footer py-5 bg-dark">
        <div className = "container">
            <div className = "footer-content text-white grid">
                <div className = "footer-item text-center">
                    <h6 className = "fs-17 fw-6">Links</h6>
                    <ul>
                        <li><a href = "https://github.com/moisesPompilio/mypharma-front" rel="noreferrer noopener" target="_blank" className = "fs-15">Repositorie Front</a></li>
                        <li><a href = "https://github.com/moisesPompilio/API_MyPharma" rel="noreferrer noopener" target="_blank" className = "fs-15">Repositorie API</a></li>
                        <li><a href = "https://teste-api-mypharma.onrender.com/swagger/docs" rel="noreferrer noopener" target="_blank" className = "fs-15">API Documentation</a></li>
                        <li><a href = "https://github.com/moisesPompilio" rel="noreferrer noopener" target="_blank" className = "fs-15">Developer Repository</a></li>
                    </ul>
                </div>

                <div className = "footer-item text-center">
                    <h6 className='fs-17 fw-6'>Edit Inventory</h6>
                    <ul>
                        <Link to="/editInventory/editInventory/1">
                        <li><span className = "fs-15">Go Edit Inventory</span></li>
                        <li><span className = "fs-15">Go Edit Inventory</span></li>
                        <li><span className = "fs-15">Go Edit Inventory</span></li>
                        </Link>
                    </ul>
                </div>

                <div className = "footer-item text-center">
                    <h6 className='fs-17 fw-6'>About MyPharma</h6>
                    <ul>
                        <li><a href = "https://www.mypharma.com.br/" target="_blank" rel="noreferrer noopener" className = "fs-15">Company Info</a></li>
                        <li><a href = "https://www.mypharma.com.br/blog/" target="_blank" rel="noreferrer noopener" className = "fs-15">Blog</a></li>
                        <li><a href = "https://www.mypharma.com.br/blog/conheca-as-solucoes-da-mypharma/" rel="noreferrer noopener" target="_blank" className = "fs-15">Store</a></li>
                    </ul>
                </div>

                <div className = "footer-item text-center">
                    <h6 className='fs-17 fw-6'>Contact</h6>
                    <ul>
                        <li>
                            <span><i className = "fas fa-phone"></i></span>
                            <span className = "fs-15">(91)987420521</span>
                        </li>
                        <li>
                            <span><i className = "fas fa-envelope"></i></span>
                            <span className = "fs-15">moisesalexandrep.c@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer