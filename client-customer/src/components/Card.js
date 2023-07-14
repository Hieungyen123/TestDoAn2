import React from "react";
import classNames from "classnames/bind";
import styles from '../scss/Card.module.scss'
import { Link } from "react-router-dom";

function Card({item}) {

    const cx = classNames.bind(styles)
    // console.log('item',item)
    return (  
        // <Link className={cx('link')} to={`/product/${item.id}`}>
            <div>
                <div className={cx('card')}>
    
                     <div className={cx('image')}>
                        <figure>
                            <Link to={'/product/' + item._id}>
                                <img src={"data:image/jpg;base64," + item.image} alt="" className={cx('mainImg')}/>
                            </Link>
                        </figure>
                     </div>
                     <h2>{item?.name}</h2>
                     <div className={cx('prices')}>
                        <h3>{item.price} $</h3>
                        <p>đã bán...</p>
                     </div>
                </div>
            </div>
        // </Link>
    );
}

export default Card;
