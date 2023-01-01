const officeRoutes = require('./office');
const officeAvailabilityRoutes = require('./office-availability');

module.exports = function(app) {
    app.use('/', officeRoutes);
    app.use('/', officeAvailabilityRoutes);
}