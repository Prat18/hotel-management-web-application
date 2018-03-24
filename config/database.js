const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/test' + this.db,
    secret: crypto,
    db: 'Hotel-Database '
}