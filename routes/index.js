const officeRoutes = require('./office');

module.exports = function(app) {
    app.use('/', officeRoutes);
}