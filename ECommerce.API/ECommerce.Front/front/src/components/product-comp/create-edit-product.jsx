import React, { useEffect } from 'react';
import productService from '../../services/productService';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

function CreateEditProduct({ isOpen, onClose, children, product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: product
  });

  const resetProduct = () => {
    reset({
      name: '',
      price: '',
      stock: '',
      categoryId: '',
      description: ''
    });
    reset(product);
  };
  
  const onSubmit = async (productData) => {
    try {
      await productService.createProduct(productData);
      onClose();
      resetProduct();
    } catch (error) {
      toast.error('Error creating product.');
    }
  };

  // Reagujte na promenu vrednosti `product` i resetujte formu
  useEffect(() => {
    reset(product);
  }, [product, reset]);

  //reset forme
  useEffect(() => {
    if (product === null) {
      reset({
        id: 0,
        name: '',
        price: '',
        stock: '',
        categoryId: '',
        description: ''
      });    }
  }, [product, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}      
        <h1 className="title">{product != null ? "EDIT" : "CREATE"} PRODUCT</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <input type="number" {...register('id', { required: true })} defaultValue={product?.id || null} hidden/>
                  <label className="input-label">
                    Name
                    <div className="input-wrapper">
                      <input type="text" {...register('name', { required: true })} defaultValue={product?.name || ''}/>
                    </div>
                  </label>
                  {errors.name && <span>This field is required</span>}
                  <label className="input-label">
                    Price
                    <div className="input-wrapper">
                      <input type="number" step="0.01" {...register('price', { required: true })} defaultValue={product?.price || ''}/>
                    </div>
                  </label>
                  {errors.price && <span>This field is required</span>}
                  <label className="input-label">
                    Stock
                    <div className="input-wrapper">
                      <input type="number" {...register('stock', { required: true })} defaultValue={product?.stock || ''}/>
                    </div>
                  </label>
                  {errors.stock && <span>This field is required</span>}
                  <label className="input-label">
                    Categories
                    <div className="input-wrapper">
                      <input type="number" {...register('categoryId', { required: true })} defaultValue={product?.categoryId || ''}/>
                    </div>
                  </label>
                  {errors.categoryId && <span>This field is required</span>}
                </div>
                <div className="col-md-6">
                  <label className="input-label">
                    Description
                    <div className="input-wrapper">
                      <textarea {...register('description', { required: true })} defaultValue={product?.description || ''}></textarea>
                    </div>
                  </label>
                  {errors.description && <span>This field is required</span>}
                </div>
              </div>
              <div className="row">
                <button type="submit">{product != null ? "EDIT" : "CREATE"} PRODUCT</button>
              </div>
            </form>
            </div>
      </div>  
      );
}

export default CreateEditProduct;