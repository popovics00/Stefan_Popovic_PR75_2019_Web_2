import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import { toast } from 'react-toastify';
import styles from '../../styles/product.css';
import productService from '../../services/productService';
import cartService from '../../services/cartService'



const handleAddToCart = (product) => {
  cartService.addToCart(product)
  // console.log(product);
};

function ProductElement(obj) {
  const navigate = useNavigate();
  const { product } = obj;
  return (
    <>
      <div className="products-single fix">
        <div className="box-img-hover">
          <div className="type-lb">
            <p className="sale">Sale</p>
          </div>
          <img src={product.images} className="img-fluid" alt="Image" onClick={() => navigate('/product/'+product?.id)}/>
          <div className="mask-icon">
            <ul>
              <li>
                <a href="#" data-toggle="tooltip" data-placement="right" title="View" onClick={() => navigate('/product/'+product?.id)}>
                  <i className="fas fa-eye"></i>
                </a>
              </li>
            </ul>
            <a className="cart" onClick={() => handleAddToCart(product)}>
              ADD TO CART
            </a>
          </div>
        </div>
        <div className="why-text" onClick={() => navigate('/product/'+product?.id)}>
          <h4>{product.name}</h4>
          <h5>{product.price} RSD</h5>
        </div>
      </div>
    </>
  );
}

export default ProductElement;
