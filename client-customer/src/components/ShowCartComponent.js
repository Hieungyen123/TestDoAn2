import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../ultils/CartUtil';
import axios from 'axios';
import withRouter from '../ultils/withRouter';
import classNames from "classnames/bind";
import styles from '../scss/ShowCart.module.scss'
import CreditCardIcon from '@mui/icons-material/CreditCard';

class Mycart extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = { // global state
      address: ''

    };
  } // using this.context to access global state
  render() {
    const cx = classNames.bind(styles)

    // console.log(this.props)
    // console.log(this.context.customer)
    const user = this.context.customer
    // const mycart = this.context.mycart.map((item, index) => {
    //   return (

    //   );
    // });
    return (
      <div className={cx('ShowCart')}>
        <div className='container'>
          <div className={cx('ShowCart-center')}>
            <div className={cx('ShowCart-title')}>
              <CreditCardIcon className={cx('ShowCart-title-icon')} />
              <h3>Thanh Toán</h3>
              <p>Vui lòng kiểm tra thông tin, địa chỉ và giỏ hàng trước khi đặt hàng.</p>
            </div>
            {/* <h4 onClick={() => this.lnkRemoveAll()} >Clear cart</h4> */}
            <div className={cx('ShowCart-content')}>
              <div className={cx('ShowCart-userInf')}>
                <div className={cx('item')}>
                  <h4>Thông tin khách hàng</h4>
                </div>
                <div className={cx('item')}>
                  <label htmlFor="">Họ tên</label>
                  <input type="text" value={user && user.name} disabled />
                </div>
                <div className={cx('item')}>
                  <label htmlFor="">Số điện thoại</label>
                  <input type="text" value={user && user.phone} disabled />
                </div>
                <div className={cx('item')}>
                  <label htmlFor="">Email</label>
                  <input type="text" value={user && user.email} disabled />
                </div>
                <div className={cx('item')}>
                  <label htmlFor="adress">Địa chỉ</label>
                  <input name='adress' type="text" value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />
                </div>
                <div className={cx('item')}>
                  <h4 >Hình thức thanh toán</h4>
                  <div className={cx('item-thanhtoan')}>
                    <input type="radio" id="thanhtoan" checked readOnly />
                    <label htmlFor="thanhtoan">Thanh toán khi nhận hàng</label>
                  </div>
                </div>
              </div>
              <div className={cx('ShowCart-cartInf')}>
                <div className={cx('ShowCart-cartInf-title')}>
                  <h4>Thông tin đơn hàng</h4>
                  <p>SL: {this.context.mycart.length} </p>
                </div>
                <div className={cx('ShowCart-cartInf-Content')}>
                  {this.context.mycart.map(item => {
                    return (
                      <div className={cx('ShowCart-cartInf-products')}>
                          <div className={cx('ShowCart-cartInf-product')}>
                              <div className={cx('left')}>
                                <span>{item.product.name}</span>
                                <p>{item.product.price} x {item.quantity}</p>
                              </div>
                              <div className={cx('right')}>
                                <p>: {item.product.price * item.quantity} $</p>
                              </div>
                          </div>
                      </div>
                  )})}
                  
                </div>
                <div className={cx('ShowCart-cartInf-total')}>
                          <div className={cx('total')}>
                            <span>Tổng thành tiền:</span>
                            <p>{CartUtil.getTotal(this.context.mycart)} $</p>
                          </div>
                      </div>
                <div className={cx('ShowCart-cartInf-Checkout')}>
                  <button onClick={() => this.lnkCheckoutClick()} >Xác nhận</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.SetnotifySuccess('Xóa giỏ hàng thành công.')
      this.context.setMycart(mycart);
    }
  }
  lnkRemoveAll() {
    this.context.setMycart([]);
  }
  lnkCheckoutClick() {
    if (window.confirm('Bạn có muốn đặt hàng?')) {
      if (this.context.mycart.length > 0 ) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        const address = this.state.address
        if (customer) {
          if (this.state.address.length > 0) {
            this.apiCheckout(total, items, customer,address);
          } else {
            this.context.SetnotifyWarning('Bạn chưa có địa chỉ giao hàng.')
          }
        } else {
          this.props.navigate('/login');
        }
      } else {
        this.context.SetnotifyWarning('Giỏ hàng của bạn đang trống.')
      }
    }
  }
  // apis
  apiCheckout(total, items, customer,address) {
    const body = { total: total, items: items, customer: customer, address: address };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.context.SetnotifySuccess('Bạn đã đặt hàng thành công.')
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        this.context.SetnotifyWarning('Đã có lỗi gì đó với giỏ hàng của bạn.')
      }
    });
  }
}
export default withRouter(Mycart);