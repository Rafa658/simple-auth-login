const mongoose = require('mongoose')
const user = require('../models/User')

const User = mongoose.model('User', user)

class UserService {
    async GetAll() {
        try {
            var result = await User.find()
            return result
        } catch (error) {
            return []
        }
    }
}

module.exports = new UserService()