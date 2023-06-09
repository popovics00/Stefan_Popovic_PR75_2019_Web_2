import React from 'react';
import productService from "../../services/productService";
import ProductDataIn from '../../models/product';
import { toast } from 'react-toastify';
import Pagination from '../pagination';
import { Style } from '../../index.css';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import orderService from '../../services/orderService';
class OrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      showModal: false,
      selectedProduct: null,
      searchName: "",
      currentPage: 1,
      pageSize: 7,
      totalCount: 0,
    };
  }

  openModal = (productId) => {
    if (productId == null) {
      this.setState({ showModal: true, selectedProduct: null });
    } else {
      const selectedProductTemp = this.state.orders.find(product => product.id === productId);
      this.setState({ showModal: true, selectedProduct: selectedProductTemp });
    }
  }

  closeModal = () => {
    this.setState({ showModal: false, selectedProduct: null, productId: null });
    this.reloadTable(1);
  }


  deleteUser = (productId) => {
    orderService.deleteUser(productId);
    this.reloadTable(1);
  };

  async reloadTable(page) {
    try {
      const productData = {
        page: page,
        searchName: this.state.searchName,
        pageSize: this.state.pageSize,
      };

      if (productData.searchName !== "") {
        productData.page = 1;
        this.setState({ currentPage: 1 });
      }

      const productsData = await orderService.getAll(productData);
      console.log(productsData.transferObject.data); // Ispisuje vrednost orders na konzolu
      this.setState({ orders: productsData.transferObject.data, totalCount: productsData.transferObject.count });
    } catch (error) {
      console.log("Došlo je do greške:", error);
    }
  }

  handleApprove = (productId) => {
    orderService.approveOrRejectUser(productId,true);
    this.reloadTable(1);
  };
  
  handleReject = (productId) => {
    orderService.approveOrRejectUser(productId,false);
    this.reloadTable(1);
  };

  componentDidMount() {
    this.reloadTable(1);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.reloadTable(1);
  }

  handleSearchChange = (event) => {
    this.setState({ searchName: event.target.value });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.reloadTable(page);
  };

  render() {
    const { totalCount, currentPage, pageSize } = this.state;

    return (
      <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-..." crossOrigin="anonymous" />
        <div className="width90">
          <div className="row">
            <div className="col-md-6"><h1 className="title">ORDERS</h1></div>
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
                <th>Id</th>
                <th>Customer</th>
                <th>Shipping Data</th>
                <th>Comment</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>No products</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map(order => (
                <tr key={order.id}>
                  <td>{order?.id}</td>
                  <td>{order?.customerId}</td>
                  <td>{order?.firstName} {order?.lastName} <br/> {order?.address}</td>
                  <td>{order?.comment}</td>
                  <td>{order?.total}</td>
                  <td>{order?.orderDate}</td>
                  <td>
                    {order?.status}
                    {order?.status === 'Pending' && (
                      <div>
                        <button className='approveButton' onClick={() => this.handleApprove(order?.id)}>
                          <FaCheckCircle />
                        </button>
                        <button className='rejectButton' onClick={() => this.handleReject(order?.id)}>
                          <FaTimesCircle />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <button className='editButton' onClick={() => this.openModal(order?.id)}>
                      <FaEdit />
                    </button>
                    <button className='removeButton' onClick={() => this.deleteUser(order?.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange} />
        </div>
      </>
    );
  }
}

export default OrderTable;
