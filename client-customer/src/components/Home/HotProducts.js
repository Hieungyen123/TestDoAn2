import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import classNames from "classnames/bind";
import "./scss/HotProducts.scss"
import Card from "../Card";
import { useState,useEffect } from "react";
import img from './img/flash.svg'
function HotProducts({ type }) {
  // const cx = classNames.bind(styles);

  const [hotProduct,setHotProduct] = useState([]);
  useEffect(() => { 
    const fetchData = async () => {
        const ProductHot = await axios.get('/api/customer/products/hot');
        setHotProduct(ProductHot.data)
    };
    fetchData();
    
  },[])

  

  return (
    <div className="HotProducts">
      <div className="HotProductsTitle">
        <div  className="HotProducts-img"> 
          <img src={img} alt="" />
          <h1>{type} Products</h1>
        </div>
        <div  className="HotProducts-more">
          <Link to={'/products'}>Xem thêm <ArrowForwardIosIcon className="icon"/> </Link>
        </div>
      </div>
      <div className="ProductHotList">
         {hotProduct.length > 0 ? hotProduct?.map((item) => 
           <Card item={item} key={item._id} /> 
        ) : ''}
      </div>
    </div>
  );
}

export default HotProducts;
