import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        const styles = require('./Home.scss');
        return (
            <div className={styles.home}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6"></div>
                        <div className="col-xs-6"></div>
                    </div>
                </div>
            </div>
        );
    }
}
