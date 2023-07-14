import axios from "axios";

// import classNames from "classnames/bind";
import Card from "./Card";
import { useState,useEffect } from "react";
function NewProducts({ type }) {
  // const cx = classNames.bind(styles);

  const [newProDuct,setNewProduct] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
        const ProductNew = await axios.get('/api/customer/products/new');
        setNewProduct(ProductNew.data);
    };
    fetchData();
  },[])
  
  return (
    <div className="NewProducts">
      <div className="NewProductsTitle">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="NewProductsList">
        {newProDuct?.map((item) => 
           <Card item={item} key={item._id} /> 
        )}
      </div>
    </div>
  );
}

export default NewProducts;
