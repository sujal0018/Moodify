require('dotenv').config();

const connectDb = require('./src/config/database');
connectDb();
const app = require('./src/app')
app.listen(3000, () => {
    console.log("server is running on port 3000")
})