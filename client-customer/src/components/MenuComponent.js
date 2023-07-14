import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';

import withRouter from '../ultils/withRouter';
import classNames from "classnames/bind";
import styles from '../scss/Menu.module.scss'
import { Link } from 'react-router-dom'
import Cart from './Cart';

import MyContext from '../contexts/MyContext';

// class Menu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       categories: [],
//       handleuser: '',
//       handleCart: true,
//       handleCategories: ''
//     };
//   }
//   render() {
//     const cx = classNames.bind(styles)

//     // const cates = this.state.categories.map((item) => {
//     //   return (
//     //     <li key={item._id} className="menu"><a href="#">{item.name}</a></li>
//     //   );
//     // });

//     return (
//       <div className={cx('Navbar')}>
//         <div className={cx('Wrapper')}>
//           <div className={cx('left')}>
//             <div className={cx('item')}>
//               <KeyboardArrowDownIcon />
//               <a className={cx('link')} to="/products">Categories</a>
//             </div>
//             <div className={cx('item')}><a className={cx('link')} to="/">HomePage</a></div>
//             <div className={cx('item')}>

//             </div>
//           </div>
//           <div className={cx('center')}>
//             <a className={cx('link')} to="/" >Unowned Store</a>
//           </div>
//           <div className={cx('right')}>

//             <div className={cx('icons')}>
//               <div className={cx('search-bar')}>
//                 <SearchIcon  className={cx('icon')} />
//                 <input type="text" placeholder="Tìm kiếm..."/>
//               </div>
//               <PersonOutlineOutlinedIcon />
//               {/* <FavoriteBorderOutlinedIcon /> */}
//               <div className={cx('cart-icon')}>
//                 <ShoppingCartOutlinedIcon onClick={() => this.setState({handleCart : !this.state.handleCart})} />
//                 {/* <span>{products.length}</span> */}
//               </div>
//             </div>
//           </div>
//         </div>
//         {handleCart && 'cart nè'}
//       </div>
//     )
//   }
//   componentDidMount() {
//     this.apiGetCategories();
//   }
//   // apis
//   apiGetCategories() {
//     axios.get('/api/customer/categories').then((res) => {
//       const result = res.data;
//       this.setState({ categories: result });
//     });
//   }
// }
// export default Menu;



function Navbar() {
    const Context = useContext(MyContext);
    // console.log(Context)
    const navigate = useNavigate();
    const cx = classNames.bind(styles)
    const [open, setOpen] = useState(false)
    // const products = useSelector(state => state.cart.products)
    const [categories, setCategories] = useState([])
    const [handleCategorires, setHandleCategories] = useState(false)
    const [handleUser, setHandleUser] = useState(false)
    const [downIconState, setDownIconState] = useState(false)
    const [txtKeyword, setTxtKeyword] = useState('')

    const HandleCategorires = () => {
        setHandleCategories(!handleCategorires)
        setOpen(false)
        setHandleUser(false)
        setDownIconState(!downIconState)
    }
    const HandleUser = () => {
        setHandleUser(!handleUser)
        setOpen(false)
        setHandleCategories(false)
    }
    const HandleCart = () => {
        setOpen(!open)
        setHandleUser(false)
        setHandleCategories(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            const ProductNew = await axios.get('/api/customer/categories');
            setCategories(ProductNew.data);
        };
        fetchData();
    }, [])

    const HandleHome = () => {
        setHandleUser(false)
        setHandleCategories(false)
        setOpen(false)
    }


    // console.log(categories)
    const btnSearchClick = (e) => {
        e.preventDefault();
        if (txtKeyword !== '') {
            navigate('/product/search/' + txtKeyword);
        }
    }
    return (
        <div className={cx('Navbar')}>
            <div className='container'>
                <div className={cx('Wrapper')}>
                    <div className={cx('left')}>
                        <div className={cx('item')}>
                            <div className={cx('item-categories')} onClick={() => HandleCategorires()} >
                                <p className={cx('link')}>Categories</p>
                                <KeyboardArrowDownIcon className={cx(downIconState ? 'DownIcon' : 'DownIcon-not')} />
                            </div>
                            <div className={cx('item')}><Link className={cx('link')} onClick={() => HandleHome()} to="/home">HomePage</Link></div>
                            <div className={cx(handleCategorires ? 'dropDown-categories' : 'hide-categories')}>
                                {categories ? categories.map((item, index) =>
                                    [index] < 4 ? <Link to={'/product/category/' + item._id} onClick={() => HandleCategorires()} key={item._id}> {item.name} </Link> : ""
                                ) : 'loading'}
                                <Link to={'/products'} onClick={() => HandleCategorires()}> All category</Link>
                            </div>
                        </div>

                    </div>
                    <div className={cx('right')}>

                        <div className={cx('icons')}>
                            <div className={cx('search-bar')}>
                                <input type="text" placeholder="Tìm kiếm..." value={txtKeyword} onChange={(e) => setTxtKeyword(e.target.value)} />
                                <SearchIcon className={cx('icon')} onClick={(e) => btnSearchClick(e)} />

                            </div>
                            {Context.token === ""
                                ? (
                                    <div className={cx('user-bar')}>
                                        <LockPersonOutlinedIcon className={cx('user-icon')} onClick={() => HandleUser()} />
                                        <div className={cx(handleUser ? 'user-active' : 'userNone')}>
                                            <ul>
                                                <li onClick={() => HandleUser()}><Link to="/login"><p>Login</p></Link></li>
                                                <li onClick={() => HandleUser()}><Link to="/signup"><p> Sign-up</p></Link></li>
                                                <li onClick={() => HandleUser()}><Link to="/active"><p>Active</p></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )

                                : (
                                    <div className={cx('user-bar')}>
                                        <Link to='/myprofile/profile'><AccountCircleOutlinedIcon className={cx('user-icon')}  /></Link>
                                    </div>
                                )

                            }
                            <div className={cx('cart-icon')} >
                                {/* <Link to='/mycart' ><ShoppingCartOutlinedIcon/>  </Link>  */}
                                <span>{Context.mycart.length}</span>
                                <ShoppingCartOutlinedIcon onClick={() => HandleCart()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx(open ? 'show' : 'hide')}><Cart   handleCart={() => HandleCart()} /></div>
            </div>

        </div>
    );

}

export default withRouter(Navbar);