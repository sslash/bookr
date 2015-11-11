module.exports = function(sequelize, DataTypes) {

    const Booking = sequelize.define('Booking', {
        bookingTime: DataTypes.DATE,
        facility: DataTypes.STRING
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
