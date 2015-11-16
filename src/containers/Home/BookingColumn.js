 import React, { Component } from 'react';
 const moment = require('moment');
 import _range from 'lodash/utility/range';

 export default class BookingColumn extends Component {

     constructor(props) {
         super(props);

         this.onBookClicked = this.onBookClicked.bind(this);
     }

     onBookClicked() {
         if (!this.props.user) {
             window.location.replace('/login');
         }

         if (!this.props.available) {
            return alert('Denne er allerede booket');
         }

         const date = moment(this.props.currentDate)
             .seconds(0)
             .hours(this.props.hour)
             .minutes(0)
             .toDate();

         this.props.save({
             bookingTime: date,
             facility: this.props.facility,
             user: 1337
         });
     }

     render() {
         const styles = require('./Home.scss');
         const txt = this.props.available ? ' - ' : 'Booket';
         //
        //  if (this.props.available) {
        //      classes.push(styles.available);
        //  }

         return (
             <td onClick={this.onBookClicked} className={this.props.available ? styles.available: ''}>
                  <span>{txt}</span>
              </td>
         );
     }
 }

 BookingColumn.propTypes = {
     save: React.PropTypes.func
 };
