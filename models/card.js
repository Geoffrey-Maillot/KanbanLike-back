const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Card extends Model {};

Card.init({
    name: {
        type: DataTypes.TEXT, 
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    status: {
       type: DataTypes.TEXT, 
       allowNull: true
}
}, {
    sequelize,
    tableName: "card",
    timestamp: true
});

module.exports = Card;