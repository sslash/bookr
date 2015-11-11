module.exports = function(sequelize, DataTypes) {

    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Booking);
            }
        }
    });
    return User;
};
