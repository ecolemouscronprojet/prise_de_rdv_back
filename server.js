const express = require('express')
const app = express()
const port = 3000


app.get('/ma-premiere-page', (req, res) => {
    res.send('Hello World')
});

app.post('/', (req, res) => {
    res.send('HEllo tout le monde')
});


app.listen(port, () => {
    console.log(`App started ${port}`)
});