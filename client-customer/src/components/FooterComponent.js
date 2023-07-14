import React from "react";
import classNames from "classnames/bind";
import styles from "../scss/Footer.module.scss";


// import img from '../../img/payment.jpg'
function Footer() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("footer")}>
      <div className="container">
        <div className="footerCenter">
          <div className={cx("top")}>
            <div className={cx("item")}>
              <h1>Categories</h1>
              <span>Women</span>
              <span>Men</span>
              <span>Shoes</span>
              <span>Accesories</span>
              <span>New Arrivals</span>
            </div>
            <div className={cx("item")}>
              <h1>Link</h1>
              <span>FAQ</span>
              <span>Pages</span>
              <span>Stores</span>
              <span>Compare</span>
              <span>Cookies</span>
            </div>
            <div className={cx("item")}>
              <h1>About</h1>
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
                animi eos culpa assumenda numquam consequatur magni dolore earum
                maxime repudiandae, vel sunt itaque. Minus magni fugiat
                reprehenderit molestiae repudiandae. Consequuntur.
              </span>
            </div>
            <div className={cx("item")}>
              <h1>Contact</h1>
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
                animi eos culpa assumenda numquam consequatur magni dolore earum
                maxime repudiandae, vel sunt itaque. Minus magni fugiat
                reprehenderit molestiae repudiandae. Consequuntur.
              </span>
            </div>
    
          </div>
          <div className={cx("bottom")}>
            <div className={cx('left')}>
                <span className={cx('logo')}>
                    Unowned Store
                </span>
                <span className={cx('copy-right')}>
                    Copyright 2023  
                </span> 
    
            </div>
            <div className={cx('right')}>
                {/* <img src={img} alt="err" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
