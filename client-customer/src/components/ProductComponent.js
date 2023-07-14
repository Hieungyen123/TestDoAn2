import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import withRouter from '../ultils/withRouter';
import styles from '../scss/Product.module.scss'
import classNames from "classnames/bind";
import Card from "./Card";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  render() {
    
    const cx = classNames.bind(styles)
    let NameCategory = ''
    
    const prods = this.state.products.map((item) => {
      NameCategory = item.category.name
      return (
        <Card item={item} key={item._id} /> 
      );
    });
    return (
      <div className={cx('Product')}>
        <div className={cx('ListCardItem')}>
          <div className='container'> 
            <div className={cx('divContainer')}>
              <h2 className={cx('ListCard-title')}>
                {this.state.products.length > 0 ? ` List Product ${NameCategory} ` : 'Loading...'}
                
              </h2>
              <div className={cx('ListItem')}>
                {this.state.products && prods}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);