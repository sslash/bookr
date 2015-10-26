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

    static propTypes: {
        save: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        };

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onBookClicked = this.onBookClicked.bind(this);
    }

    onMouseOver(evt) {
        const target = evt.target;

        target.textContent = target.textContent === ' - ' ?
            'book' : 'avbook';
    }

    onMouseOut(evt) {
        evt.target.textContent = ' - ';
    }

    onBookClicked() {
        this.props.save({
            date: this.state.currentDate,
            hour: 10,
            user: 1337
        });
    }

    static fetchDataDeferred(getState, dispatch) {
        return dispatch(loadBookings());
    }

    renderHours() {

        // TODO: CONTINUE HERE
        return _range(24).map((hour, index) => {
            let hourStr = hour;
            if (hourStr === 0) { hourStr = 12; }

            if ((hourStr + '').length < 2) {hourStr = '0' + hourStr; }

            hourStr = hourStr + ':00';

            return (
                <tr className="calendarRow" key={`cal-${index}`}>
                    <th scope="row">{hourStr}</th>
                    <td onClick={this.onBookClicked} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}> - </td>
                    <td onClick={this.onBookClicked} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}> - </td>
                    <td onClick={this.onBookClicked} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}> - </td>
                    <td onClick={this.onBookClicked} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}> - </td>
                    <td onClick={this.onBookClicked} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}> - </td>
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
                            <Calendar defaultValue={this.state.currentDate} />

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
