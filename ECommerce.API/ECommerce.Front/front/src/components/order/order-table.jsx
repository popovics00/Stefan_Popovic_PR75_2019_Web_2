import React, { useState, useEffect } from 'react';
import orderService from "../../services/orderService";
import orderDataIn from '../../models/order';
import { toast } from 'react-toastify';
import Pagination from '../pagination';
import { Style } from '../../index.css';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrash, FaRegListAlt } from 'react-icons/fa';
import OrderItemTable from './order-table copy';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // New state variable

  const openModal = (orderId) => {
    if (orderId == null) {
      setShowModal(true);
      setSelectedOrder(null);
      setIsModalOpen(true);
    } else {
      const selectedOrderTemp = orders.find(order => order.id === orderId);
      setShowModal(true);
      setSelectedOrder(selectedOrderTemp);
      setIsModalOpen(true);
    }
    setExpandedOrderId(orderId); // Update the expanded order ID
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    setIsModalOpen(false);
    reloadTable(1);
  };

  const deleteUser = (orderId) => {
    orderService.deleteUser(orderId);
    reloadTable(1);
  };

  const reloadTable = async (page) => {
    try {
      const orderData = {
        page: page,
        searchName: searchName,
        pageSize: pageSize,
      };

      if (orderData.searchName !== "") {
        orderData.page = 1;
        setCurrentPage(1);
      }

      const ordersData = await orderService.getAll(orderData);
      setOrders(ordersData.transferObject.data);
      setTotalCount(ordersData.transferObject.count);
    } catch (error) {
      console.log("Došlo je do greške:", error);
    }
  };

  const handleApprove = (orderId) => {
    orderService.approveOrRejectUser(orderId, true);
    reloadTable(1);
  };
  
  const handleReject = (orderId) => {
    orderService.approveOrRejectUser(orderId, false);
    reloadTable(1);
  };

  useEffect(() => {
    reloadTable(1);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    reloadTable(1);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    reloadTable(page);
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-..." crossOrigin="anonymous" />
      <div className="width90">
        <div className="row">
          <div className="col-md-6"><h1 className="title">ORDERS</h1></div>
          <div className="col-md-6 row">
            <div className="icons row">
              <div className="addBox" onClick={() => openModal()}>
                <i className="fas fa-plus"></i>
              </div>
              <div className="searchBox">
                <form name="search" onSubmit={handleSearchSubmit}>
                  <input type="text" className="input" name="searchName" value={searchName} onChange={handleSearchChange} />
                  <i className="fas fa-search" onClick={handleSearchSubmit}></i>
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
              <th>No orders</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <React.Fragment key={order.id}>
                <tr>
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
                        <button className='approveButton' onClick={() => handleApprove(order?.id)}>
                          <FaCheckCircle />
                        </button>
                        <button className='rejectButton' onClick={() => handleReject(order?.id)}>
                          <FaTimesCircle />
                        </button>
                      </div>
                    )}
                  </td>
                  <td>{order?.orderItems.length}</td>
                  <td>
                    <button className='editButton' onClick={() => openModal(order?.id)}>
                      <FaRegListAlt />
                    </button>
                    <button className='removeButton' onClick={() => deleteUser(order?.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order.id && (
                  <tr>
                    <td colSpan="9">
                      {isModalOpen && (
                        <OrderItemTable
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          orderItems={order.orderItems}
                        />
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>        
      </div>
    </>
  );
}

export default OrderTable;
