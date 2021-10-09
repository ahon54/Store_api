require('dotenv').config()
require('express-async-errors'); //this packages saves time with the try catch errors
const express = require('express');
const app = express();

//DB
const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1> store api </h1><a href="/api/v1/product"> products route</a>')
})

app.use('/api/v1/products', productsRouter)

//product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()