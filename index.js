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
app.get('/find', async(req, res) => {
    var user = {email: req.body.email, password: req.body.password}
    var stat = await UserService.FindOne(user)
    res.send(stat)
    res.status(200)
})
app.post('/user', async(req, res) => {
    var user = {email: req.body.email, password: req.body.password}
    var stat = await UserService.Add(user)
    
    if (stat) {
        res.send("Successfully added user")
        res.status(200)
    } else {
        res.send("Error adding user, please try again")
        res.status(400)
    }
})