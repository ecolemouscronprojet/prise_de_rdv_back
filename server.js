const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3005
const initAllRoutes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }))

initAllRoutes(app)

app.listen(port, () => {
    console.log(`App started ${port}`)
});