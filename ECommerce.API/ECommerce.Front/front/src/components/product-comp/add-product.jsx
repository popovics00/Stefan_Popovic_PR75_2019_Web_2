import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";
import styles from "..//..//styles/add-product.css";
import productService from "../../services/productService";

function AddProduct() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (productData) => {
    try {
      // Ovdje pozovite odgovarajuću funkciju za stvaranje proizvoda
      await productService.createProduct(productData);
      navigate('/');
    } catch (error) {
      toast.error("Error creating product.");
    }
  };

  return (
      <div className="product">
        <h1>CREATE PRODUCT</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='row'>
                <div class="col-md-6">
                    <label className='input-label'>
                        Name
                        <div className='input-wrapper'>
                        <input type="text" {...register("name", { required: true })} />
                        </div>
                    </label>
                    {errors.name && <span>This field is required</span>}
                    <label className='input-label'>
                        Price
                        <div className='input-wrapper'>
                        <input type="number" step="0.01" {...register("price", { required: true })} />
                        </div>
                    </label>
                    {errors.price && <span>This field is required</span>}
                    <label className='input-label'>
                        Stock
                        <div className='input-wrapper'>
                        <input type="number" {...register("stock", { required: true })} />
                        </div>
                    </label>
                    {errors.stock && <span>This field is required</span>}
                    <label className='input-label'>
                        Categories
                        <div className='input-wrapper'>
                        <input type="number" {...register("categoryId", { required: true })} />
                        </div>
                    </label>
                    {errors.categories && <span>This field is required</span>}
                </div>
                <div class="col-md-6">
                    {/* <label className='input-label'>
                        Image
                        <div className='input-wrapper'>
                        <input type="file" accept="image/*" {...register("image", { required: true })} />
                        </div>
                    </label>
                    {errors.image && <span>This field is required</span>} */}
                    <label className='input-label'>
                        Description
                        <div className='input-wrapper'>
                        <textarea {...register("description", { required: true })}></textarea>
                        </div>
                    </label>
                    {errors.description && <span>This field is required</span>}
                </div>
                <div class="row">
                    <button type="submit">CREATE</button>
                </div>
            </div>
        </form>
      </div>
  );
}

export default AddProduct;
