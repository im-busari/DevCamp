const app = require('./app');

const PORT = process.env.NODE_PORT || 3000

app.listen(PORT, () => {
    console.log(`The API is runing on http://localhost:${PORT}`)
})