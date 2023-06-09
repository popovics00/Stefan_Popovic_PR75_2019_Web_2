import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/productService';
import { Style } from '../../styles/single-product.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import cartService from '../../services/cartService';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    cartService.addToCart(product)
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productService.get(id);
        setProduct(response.transferObject); // Pretpostavka da je odgovor strukturiran kao { data: {} }
        if (response.status != 200) {
          navigate("/");
          toast.error(response.message);
        }
      } catch (error) {
        console.error('Greška prilikom dobavljanja proizvoda:', error);
      }
    };

    fetchProduct();
  }, [id]);


  return (
    <div class="container-product">
      <div class="card-product">
        <div className='row'>
        <div className='col-md-4 kol2'>
            <img src={product?.images} width="400px"/>
        </div>
        <div class='col-md-6 kol1'>
            <p className='title'>{product?.name}</p>
            <p className='product-desc'>{product?.description}</p>
            <p className='product-price'>{product?.price} RSD</p>
            <button className='addtocartproductpage' onClick={() => handleAddToCart(product)}>ADD TO CART</button>
        </div>
        </div> 
      </div> 
    </div> 
  );
};

export default ProductPage;
