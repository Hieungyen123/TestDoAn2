import axios from 'axios';
import React, { Component } from 'react';
import classNames from "classnames/bind";
import styles from '../scss/SignUp.module.scss'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Signup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: '',
            txtPassword: '',
            txtName: '',
            txtPhone: '',
            txtEmail: '',
            imgProduct: '',
        };
    }
    render() {
        const cx = classNames.bind(styles)
        return (
            
            <div className={cx('Signup')}>
                <div className={cx('Form')}>
                    <div className={cx('title-signup')}>
                        Sign-Up
                    </div >
                    <div className={cx('box')}>
                        <div className={cx('input-group')}>
                            <label htmlFor="username">Username</label>
                            <input placeholder='UserName..' name="username" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} />
                        </div>


                        <div className={cx('input-group')}>
                            <label htmlFor="password">Password</label>
                            <input placeholder='Password' name="password" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} />
                        </div>


                        <div className={cx('input-group')}>
                            <label htmlFor="name">Name</label>
                            <input placeholder='Name..' name='name' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} />
                        </div>


                        <div className={cx('input-group')}>
                            <label htmlFor='phone'>Phone</label>
                            <input placeholder='Number Phone..' name="phone" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} />
                        </div>


                        <div className={cx('input-group')}>
                            <label htmlFor='email'>Email</label>
                            <input placeholder='Your Email..' name="email" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} />
                        </div>
                        <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} />


                        <div className={cx("LoginAndSignUp")}>
                            <input type="submit" value="SIGN-UP" className={cx("login-btn")} onClick={(e) => this.btnSignupClick(e)} />
                            <Link className={cx('toLogin')} to="/login">Login</Link>
                        </div>
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </div>
            </div>
        );
    }

    notifySuccess = (message) => toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    notifyWarning = (message) => toast.warn(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    // event-handlers
    
    btnSignupClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
        if (username && password && name && phone && email && image) {
            const account = { username: username, password: password, name: name, phone: phone, email: email, image: image };
            this.apiSignup(account);
            this.setState({ txtUsername: '', txtPassword: '', txtName: '', txtPhone: '', txtEmail: '' })
        } else {
            this.notifyWarning('Mời bạn nhập các trường còn thiếu')
        }
    }
    previewImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({ imgProduct: evt.target.result });
            }
            reader.readAsDataURL(file);
        }
    }
    // apis
    apiSignup(account) {
        axios.post('/api/customer/signup', account).then((res) => {
            this.notifySuccess('Bạn đã đăng kí thành công')
            const result = res.data;
            alert(result.message)
        });
    }
}
export default Signup;