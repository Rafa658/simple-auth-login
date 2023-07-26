const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const connectToDatabase = require('./database')
const UserService = require('./services/UserService')

const app = express()
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

const port = 4000
app.listen(process.env.PORT || port, () => console.log(`App started @ ${port}`))

app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

connectToDatabase()

app.get('/', (_, res) => res.send("Running"))
app.get('/users', async (_, res) => {
    var results = await UserService.GetAll()
    res.send(results)
    res.status(200)
})