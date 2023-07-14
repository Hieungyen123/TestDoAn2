import axios from "axios";

// import classNames from "classnames/bind";
import "../scss/HotProducts.scss"
import Card from "./Card";
import { useState,useEffect } from "react";
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
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="ProductHotList">
        {hotProduct?.map((item) => 
           <Card item={item} key={item._id} /> 
        )}
      </div>
    </div>
  );
}

export default HotProducts;
