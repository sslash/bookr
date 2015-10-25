'use strict';
module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define('Booking', {
        bookingTime: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Booking.belongsTo(models.User);
            }
        }
    });
    return Booking;
};
