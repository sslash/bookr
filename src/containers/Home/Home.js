import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as bookingActions from 'redux/modules/bookings';
import {load as loadBookings} from 'redux/modules/bookings';
const configure = require('react-widgets/lib/configure');
const moment = require('moment');
const localizers = require('react-widgets/lib/localizers/moment');
configure.setDateLocalizer(localizers(moment));
const Calendar = require('react-widgets').Calendar;
import _range from 'lodash/utility/range';


@connect(
    state => ({
        bookings: state.bookings.data,
        editing: state.bookings.editing,
        error: state.bookings.error,
        loading: state.bookings.loading
    }),
    {...bookingActions })
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        };

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onMouseOver(evt) {
        const target = evt.target;

        if (!target.textContent.match(/Booket/)) {
            target.textContent = 'book';
        }
    }

    onMouseOut(evt) {
        if (evt.target.textContent.match(/book/)) {
            evt.target.textContent = ' - ';
        }
    }

    onBookClicked(hour, facility) {
        const date = moment(this.state.currentDate)
            .seconds(0)
            .hours(hour)
            .minutes(0)
            .toDate();

        this.props.save({
            bookingTime: date,
            facility,
            user: 1337
        });
    }

    changeCurrentDate(value) {
        this.setState({currentDate: value});
    }

    static fetchDataDeferred(getState, dispatch) {
        return dispatch(loadBookings());
    }

    renderRow (hour, facility) {

        const currentDate = moment(this.state.currentDate)
            .seconds(0)
            .hours(hour)
            .minutes(0);

            let txt;

            const booked = this.props.bookings.filter(booking => {

                return facility === booking.facility &&
                    currentDate.isSame(booking.bookingTime, 'day') &&
                    currentDate.isSame(booking.bookingTime, 'hour');
            });

            txt = (booked && booked.length) ? 'Booket' : ' - ';

        return (
            <td onClick={this.onBookClicked.bind(this, hour, facility)}
                 onMouseOver={this.onMouseOver}
                 onMouseOut={this.onMouseOut}><span>{txt}</span>
             </td>
        );
    }

    renderHours() {

        return _range(24).map((hour) => {
            let hourStr = hour;

            if ((hourStr + '').length < 2) {hourStr = '0' + hourStr; }

            hourStr = hourStr + ':00';

            return (
                <tr className="calendarRow" key={`cal-${hour}`}>
                    <th scope="row">{hourStr}</th>
                    {this.renderRow(hour, 'facility')}
                    {this.renderRow(hour, 'boblebad')}
                    {this.renderRow(hour, 'trimrom')}
                    {this.renderRow(hour, 'solarium')}
                    {this.renderRow(hour, 'fellesrom')}
                </tr>
            );
        });
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
                            <Calendar
                                defaultValue={this.state.currentDate}
                                onChange={this.changeCurrentDate.bind(this)}
                                />

                            <div className="panel panel-primary" style={{marginTop: 50}}>
                                <div className="panel-heading">
                                    Siste beskjeder
                                </div>
                                <div className="panel-body">
                                    ...
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <h4 style={{marginTop: 50}}>{moment(this.state.currentDate).format('MMM Do YY')}</h4>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Klokken</th>
                                        <th>Badstue</th>
                                        <th>Boblebad</th>
                                        <th>Trimrom</th>
                                        <th>Solarium</th>
                                        <th>Fellesrom</th>
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

Home.propTypes = {
    save: React.PropTypes.func
};
