import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/productService';
import { Style } from '../../styles/single-product.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  
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
        <div class="shop-detail-box-main">
            <div class="container">
                <div class="row">
                    <div class="col-xl-5 col-lg-5 col-md-6">
                        <div id="carousel-example-1" class="single-product-slider carousel slide" data-ride="carousel">
                            <div class="carousel-inner" role="listbox">
                                <div class="carousel-item active">
                                    <img class="d-block w-100 img-product" src={product?.images} alt="Product Image"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-6">
                        <div class="single-product-details">
                            <h2>{product?.name}</h2>
                            <h5>{product?.price} RSD</h5>
                            <p class="available-stock">
                                <span>More than {product?.stock} available</span>
                            </p>
                            <h4>Short Description:</h4>
                            <p>
                              {product?.description}
                            </p>
                            <ul>
                                <li>
                                    <div class="form-group quantity-box">
                                        <label class="control-label">Quantity</label>
                                        <input class="form-control" value="0" min="0" max="20" type="number"/>
                                    </div>
                                </li>
                            </ul>
                            <div class="price-box-bar">
                                <div class="cart-and-bay-btn">
                                    <a class="btn hvr-hover" data-fancybox-close="" href="#">Buy New</a>
                                    <a class="btn hvr-hover" data-fancybox-close="" href="#">Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ProductPage;
