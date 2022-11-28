const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        //useUnifiedTopoloby: true,
        //useCreateIndex: true
    }).then( (con) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;