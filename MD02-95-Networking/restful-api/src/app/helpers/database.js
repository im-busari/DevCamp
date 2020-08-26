const mongoose = require('mongoose');

const connect = async() => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(
            //  Please make sure you have created .env and provided DB_URL link
            process.env.NODE_ENV === 'test' ? global.__DB_URL__ : process.env.DB_URL,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }
        )
    }
}

module.exports = { connect };