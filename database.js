const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/auth-login'

function connectToDatabase() {
    mongoose.connect(url, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    const db = mongoose.connection
    db.on("error", e => console.log(e))
    db.on("open", () => console.log("Conected to DB"))
}

module.exports = connectToDatabase