const User = require('./user');
const List = require('./list');
const Card = require('./card');
const Label = require('./label');

// relation 1N
User.hasMany(List, {
    foreignKey: 'user_id',
    as: 'lists',
});

List.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

List.hasMany(Card, {
    foreignKey: 'list_id',
    as: 'cards',
});

Card.belongsTo(List, {
    foreignKey: 'list_id',
    as: 'list',
});

// relation NN

Card.belongsToMany(Label, {
    as: "labels",
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id'
});

Label.belongsToMany(Card, {
    as: "cards",
    through: 'card_has_label',
    foreignKey: 'label_id',
    otherKey: 'card_id'
});

module.exports = {User, List, Card, Label};