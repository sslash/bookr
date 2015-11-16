import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { pushState } from 'redux-router';
import config from '../../config';

const NavbarLink = ({to, className, component, children}) => {
    const Comp = component || Link;

    return (
        <Comp to={to} className={className} activeStyle={{
            color: '#33e0ff'
        }}>
            {children}
        </Comp>
    );
};

@connect(
    state => ({user: state.auth.user}),
    {logout, pushState})
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired,
        user: PropTypes.object,
        logout: PropTypes.func.isRequired,
        pushState: PropTypes.func.isRequired
    };

    static contextTypes = {
        store: PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.user && nextProps.user) {
            // login
            this.props.pushState(null, '/loginSuccess');
        } else if (this.props.user && !nextProps.user) {
            // logout
            this.props.pushState(null, '/');
        }
    }

    static fetchData(getState, dispatch) {
        const promises = [];
        if (!isAuthLoaded(getState())) {
            promises.push(dispatch(loadAuth()));
        }
        return Promise.all(promises);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.logout();
    }

    render() {
        const {user} = this.props;
        const styles = require('./App.scss');

        return (
            <div className={styles.app}>
                <DocumentMeta {...config.app}/>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <NavbarLink to="/" className="navbar-brand" component={IndexLink}>
                            <div className={styles.brand}/>
                            Tromsøbygget booking
                        </NavbarLink>

                        <ul className="nav navbar-nav">
                            <li><NavbarLink to="/chat">Beskjeder</NavbarLink></li>
                            {!user && <li><NavbarLink to="/login">Login</NavbarLink></li>}
                            {user && <li className="logout-link"><a href="/logout" onClick={::this.handleLogout}>Logout</a></li>}
                        </ul>
                        {user &&
                            <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.email}</strong>.</p>}
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="https://github.com/erikras/react-redux-universal-hot-example"
                                            target="_blank" title="View on Github"><i className="fa fa-github"/></a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className={styles.appContent}>
                            {this.props.children}
                        </div>
                    </div>
                );
    }
}
