import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../ultils/withRouter';
import styles from '../scss/Product.module.scss'
import classNames from "classnames/bind";
import Card from "./Card";
import ReactPaginate from 'react-paginate';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
    };
  }
  render() {


    const cx = classNames.bind(styles)
    const prods = this.state.products.map((item) => <Card item={item} key={item._id} />);

    const handlePageClick = async (data) => {
      const curPage = await data.selected + 1;
      this.apiGetProducts(curPage);
    }
    return (
      <div>
        <div>
          <div className={cx('Product')}>
            <div className={cx('ListCardItem')}>
              <div className='container'>

                <div className={cx('divContainer')}>
                  <h2 className={cx('ListCard-title')}>All product</h2>
                  <div className={cx('ListItem')}>
                    {prods}
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  componentDidMount() { // first: /product/...
    this.apiGetProducts(this.state.curPage);
  }

  apiGetProducts(page) {
    axios.get('/api/customer/products?page=' + page).then(async (res) => {
      const result = await res.data;
      // console.log(result)
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default withRouter(Product);



