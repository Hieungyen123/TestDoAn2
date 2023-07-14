import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import classNames from "classnames/bind";
import styles from "./scss/Order.module.scss";
import ReactPaginate from 'react-paginate';

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      orders: [],
      order: null,
      selectedOption: '',
      customer: [],
      checked: 'all',
      noPages: 0,
      curPage: 1,
    };
  }
  render() {
    const handlePageClick = async (data) => {
      const curPage = await data.selected + 1;
      this.apiGetOrders(curPage);
    }
    const cx = classNames.bind(styles);

    const orders = this.state.orders.map((item) => {
      if (this.state.selectedOption !== '') {
        if ( this.state.selectedOption === item.customer._id ) {
          return (
            <tr key={item._id} className={''} onClick={() => this.trItemClick(item)}>
              <td>{item._id}</td>
              <td>{new Date(item.cdate).toLocaleString()}</td>
              <td>{item.customer.name}</td>
              <td>{item.customer.phone}</td>
              <td>{item.total}</td>
              <td>{item.status}</td>
              <td>
                {item.status === 'PENDING' ?
                  <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
                  : <div />}
              </td>
            </tr>
          )
        } else {
           this.setState({orders: []})
        }
      } else {
        return (
          <tr key={item._id} className={''} onClick={() => this.trItemClick(item)}>
            <td>{item._id}</td>
            <td>{new Date(item.cdate).toLocaleString()}</td>
            <td>{item.customer.name}</td>
            <td>{item.customer.phone}</td>
            <td>{item.total}</td>
            <td>{item.status}</td>
            <td>
              {item.status === 'PENDING' ?
                <div><span className="link" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</span> || <span className="link" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</span></div>
                : <div />}
            </td>
          </tr>
        )
      }
      

    });

    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }

    const customer = this.state.customer.map((item) => {
      return (
        <label key={item._id} htmlFor={item._id}>
          <input
            type="radio"
            name="vote"
            value={item._id}
            id={item._id}
            checked={this.state.checked === item._id}
            onChange={(e) => this.handleOnChange(e, item._id)} />
          {item.name}
        </label>
      )
    })


    return (
    
        <div className>
         <h2 className="text-center">ORDER LIST</h2>
           { this.state.loading ?
            <div className='container'>
              <div className='center-container-order'>
                <div>
                  {this.state.customer ? customer : ''}
                  <div onClick={(e) => this.handleOnChange2(e)}>clear</div>
                </div>

                <div>
                  { this.state.orders.length > 0 ?
                    <table className="datatable" border="1">
                      <tbody>
                        <tr className="datatable">
                          <th>ID</th>
                          <th>Creation date</th>
                          <th>Cust.name</th>
                          <th>Cust.phone</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        { orders }
                        <ReactPaginate
                          previousLabel={'<<'}
                          nextLabel={">>"}
                          breakLabel={'...'}
                          pageCount={this.state.noPages}
                          marginPagesDisplayed={3}
                          pageRangeDisplayed={1}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination justify-content-center'}
                          pageClassName={'page-item'}
                          pageLinkClassName={'page-link'}
                          previousClassName={'page-item'}
                          previousLinkClassName={'page-link'}
                          nextClassName={'page-item'}
                          nextLinkClassName={'page-link'}
                          breakClassName={'page-item'}
                          breakLinkClassName={'page-link'}
                          activeClassName='active'
                        /> 
      
                      </tbody>
                    </table>
                  : 'khách hàng chưa mua gì cả'}
                  
                  {this.state.order ?
                    <div className="align-center">
                      <h2 className="text-center">ORDER DETAIL</h2>
                      <table className="datatable" border="1">
                        <tbody>
                          <tr className="datatable">
                            <th>No.</th>
                            <th>Prod.ID</th>
                            <th>Prod.name</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                          </tr>
                          {items}
                        </tbody>
                      </table>
                    </div>
                    : <div />}
                </div>
              </div>
            </div>
           : 'loadding....'}
        
        </div> 
    
    );
  }
  componentDidMount() {
    this.apiGetOrders(this.state.curPage);
    this.apiGetCustomers();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      const result = res.data;
      this.setState({ customer: result });
    });
  }
  apiGetOrders(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result.orders, noPages: result.noPages, curPage: result.curPage, loading: true });
      

    });
  }
  handleOnChange(e, id) {
    // console.log('selected option', e.target.value);
    this.setState({ selectedOption: e.target.value, checked: id });
  }
  handleOnChange2(e) {
    this.apiGetOrders(1);
    this.setState({ selectedOption: '', checked: 'all' ,loading: false});
    // console.log(this.state.orders)
    // this.apiGetOrders(curPage);
  }
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }


}
export default Order;