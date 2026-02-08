

const Sequelize = require('sequelize')
const sequelize = new Sequelize("node_complete", "app", "Test123456", { dialect: 'mysql', host: '127.0.0.1' });

module.exports = sequelize