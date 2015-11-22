import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default class Login extends Component {
        static propTypes = {
            user: PropTypes.object,
            login: PropTypes.func,
            signup: PropTypes.func,
            logout: PropTypes.func
        }

        handleSubmit(event) {
            event.preventDefault();
            const input = this.refs.loginEmail;
            const password = this.refs.loginPassword;
            this.props.login(input.value, password.value);
            input.value = '';
            password.value = '';
        }

        handleSignup(event) {
            event.preventDefault();
            const input = this.refs.signupEmail;
            const password = this.refs.signupPassword;
            this.props.signup(input.value, password.value);
            input.value = '';
            password.value = '';
        }

        // renderSignup() {
        //     return (
        //         <div>
        //             <p>Or Register</p>
        //             <form className="login-form signup-form" onSubmit={::this.handleSignup}>
        //                 <input type="email" ref="signupEmail" placeholder="Enter your email"/>
        //                 <input type="password" ref="signupPassword" placeholder="Enter a password"/>
        //                 <button className="btn btn-primary" onClick={::this.handleSignup}><i className="fa fa-sign-in"/>{' '}Signup
        //                 </button>
        //             </form>
        //         </div>
        //     );
        // }

        render() {
            const {user, logout} = this.props;
            const styles = require('./Login.scss');
            return (
                <div className={styles.loginPage + ' container'}>
                    <DocumentMeta title="React Redux Example: Login"/>
                    <h1>Login</h1>
                    {!user &&
                        <div>
                            <form className="login-form" onSubmit={::this.handleSubmit}>
                                <input type="text" ref="loginEmail" placeholder="Email"/>
                                <input type="password" ref="loginPassword" placeholder="Password"/>
                                <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Login
                                </button>
                            </form>
                        </div>
                    }
                    {/*this.renderSignup()*/}

                    {user &&
                        <div>
                            <p>You are currently logged in as {user.name}.</p>

                            <div>
                                <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
                            </div>
                        </div>
                    }
                </div>
            );
        }
    }
