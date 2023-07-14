import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../ultils/withRouter';
import styles from '../scss/ProductDetail.module.scss'
import classNames from "classnames/bind";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import Card from './Card';
import MyContext from '../contexts/MyContext';
import 'react-toastify/dist/ReactToastify.css';
class ProductDetail extends Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: null,
            quantity: 1
        };
    }
    render() {
        const cx = classNames.bind(styles);
        const prod = this.state.product;
        const prodCate = this.state.products;
        // console.log(this.context)
        // console.log(this.state.product && `${this.state.product.category._id}` )
        // console.log(this.state.products)

        if (prod != null && prodCate != null) {
            return (
                <div className={cx("product")}>

                    <div className={cx("product-top")}>
                        <div className={cx("left")}>

                            <div className={cx("mainImg")}>
                                <img src={"data:image/jpg;base64," + prod.image} alt="err" />
                            </div>
                        </div>
                        <div className={cx("right")}>
                            <h1>{prod.name}</h1>
                            <span>Category: {prod.category.name}</span>
                            <span className={cx("price")}>{prod.price} $</span>
                            <p>
                                {prod.description}
                            </p>

                            <div className={cx("quantity")}>
                                <button onClick={(e) => this.setState({ quantity: this.state.quantity === 1 ? this.state.quantity = 1 : this.state.quantity - 1 })}>-</button>
                                <input type="number" min={1} max={99} value={this.state.quantity} onChange={(e) => { this.setState({ quantity: e.target.value }) }} />
                                <button onClick={(e) => this.setState({ quantity: Number(this.state.quantity) + 1 })}>+</button>
                            </div>
                            <button className={cx("add")} onClick={(e) => this.btnAdd2CartClick(e)}>
                                <AddShoppingCartIcon /> Add To Cart
                            </button>

                            <div className={cx("link")}>
                                <div className={cx("item")}>
                                    <FavoriteBorderIcon /> add to wist list
                                </div>
                                <div className={cx("item")}>
                                    <BalanceIcon /> add to compare
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("product-bottom")}>
                        <h5>Các sản phẩm khác</h5>
                        <div className={cx("list-product")}>
                            {this.state.products.map((item) => {
                                // const NameCategory = item.category.name
                                return (
                                    <Card item={item} key={item._id} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return (<div />);
    }

    componentDidMount() {
        const params = this.props.params;
        this.apiGetProduct(params.id);
    }
    // apis
    apiGetProduct(id) {
        axios.get('/api/customer/products/' + id).then(async (res) => {
            const result = res.data;
            this.setState({ product: result });
            if (this.state.product) {
                this.apiGetProductsByCatID(this.state.product.category._id)
            }

        });
    }
    apiGetProductsByCatID(cid) {
        axios.get('/api/customer/products/category/' + cid).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }
    btnAdd2CartClick(e) {
        e.preventDefault();
        const product = this.state.product;
        const quantity = parseInt(this.state.quantity);
        if (quantity) {
            const mycart = this.context.mycart;
            const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
            if (index === -1) { // not found, push newItem
                const newItem = { product: product, quantity: quantity };
                mycart.push(newItem);
            } else { // increasing the quantity
                mycart[index].quantity += quantity;
            }
            this.context.setMycart(mycart);
            this.context.SetnotifySuccess('sản phẩm đã thêm vào giỏ hàng của bạn')
        } else {
            this.context.notifyWarning('mong bạn kiểm tra lại giúp mình số lượng')
        }
    }
}
export default withRouter(ProductDetail);