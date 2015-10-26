import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as bookingActions from 'redux/modules/bookings';
import {load as loadBookings} from 'redux/modules/bookings';
import {initializeWithKey} from 'redux-form';
const configure = require('react-widgets/lib/configure');
const moment = require('moment');
const localizers = require('react-widgets/lib/localizers/moment');
configure.setDateLocalizer(localizers(moment));
const Calendar = require('react-widgets').Calendar;
import momentIterator from 'moment-iterator';



@connect(
    state => ({
        bookings: state.bookings.data,
        editing: state.bookings.editing,
        error: state.bookings.error,
        loading: state.bookings.loading
    }),
    {...bookingActions, initializeWithKey })
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        };
    }

    static fetchDataDeferred(getState, dispatch) {
        return dispatch(loadBookings());
    }

    renderHours() {

        // TODO: CONTINUE HERE
        var start = new Date(2015, 4, 12);
        var end = new Date(2015, 10, 2);

        const hours = [];
        momentIterator(start, end).each('hours', function(d) {
            hours.push(d);
        });

        return hours.map((hour) => {
            return (
                <tr>
                    <th scope="row">{moment(hour).format('YYYY-MM-DD HH:mm')}</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            );
        })
    }


    render() {
        const styles = require('./Home.scss');

        return (
            <div className={[styles.home]}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <h1>Bookr</h1>
                            <button className="rw-btn"></button>
                            <Calendar defaultValue={this.state.currentDate} />
                        </div>
                        <div className="col-xs-6">
                            <h4>{moment(this.state.currentDate).format('MMM Do YY')}</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderHours()}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
