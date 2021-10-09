require('dotenv').config()

//dynamically add all products to db
const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts);
        process.exit(0) //dont need the file to run all the time
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()