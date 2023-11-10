const mongoose = require('mongoose');
const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_DATABASE}/todo-api?retryWrites=true&w=majority`

async function startServer() {
    try {
        await mongoose.connect(DB_URL);
        console.log(`Connected to database.`)
    } catch (err) {
        console.error(`Error connecting to database: ${err}`);
        return;
    }

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    });
};

startServer().catch(err => console.error(err));