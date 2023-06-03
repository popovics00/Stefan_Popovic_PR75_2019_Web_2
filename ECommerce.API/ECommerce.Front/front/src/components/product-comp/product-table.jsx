import React from 'react';
import productService from "../../services/productService";
import CreateEditProduct from './create-edit-product';
import ProductDataIn from '../../models/product'
import { toast } from 'react-toastify';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showModal: false,
      selectedProduct: null,
      searchName: ""
    };
  }

  openModal = (productId) => {
    if(productId==null){
      this.setState({ showModal: true, selectedProduct: null });
    }
    else{
      const selectedProductTemp = this.state.products.find(product => product.id === productId);
      this.setState({ showModal: true, selectedProduct: selectedProductTemp });
    }
}

  closeModal = () => {
    this.setState({ showModal: false, selectedProduct: null, productId: null });
    this.reloadTable("");
  }

  async reloadTable() {
    try {
      const productData = {
        page: 1,
        pageSize: 5,
        searchName: this.state.searchName
      };
  
      const productsData = await productService.getAll(productData);
      const products = productsData.map(item => new ProductDataIn(
        item.category,
        item.categoryId,
        item.description,
        item.id,
        item.images,
        item.name,
        item.lastUpdateTime,
        item.isDeleted,
        item.price,
        item.stock
      ));
      this.setState({ products });
    } catch (error) {
      console.log("Došlo je do greške:", error);
    }
  }
  
  componentDidMount() {
    this.reloadTable();
  }
  
  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.reloadTable();
  }

  handleSearchChange = (event) => {
    this.setState({ searchName: event.target.value });
  }

  render() {
    return (
      <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-..." crossOrigin="anonymous" />
        <div className="width90">
          <div className="row">
            <div className="col-md-6"><h1 className="title">PROIZVODI</h1></div>
            <div className="col-md-6 row">
              <div className="icons row">
                <div className="addBox" onClick={() => this.openModal()}>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="searchBox">
                  <form name="search" onSubmit={this.handleSearchSubmit}>
                    <input type="text" className="input" name="searchName" value={this.state.searchName} onChange={this.handleSearchChange} />
                    <i className="fas fa-search" onClick={this.handleSearchSubmit}></i>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <button onClick={() => this.openModal(product.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateEditProduct isOpen={this.state.showModal} onClose={this.closeModal} product={this.state.selectedProduct} />
      </>
    );
  }
}

export default ProductTable;
