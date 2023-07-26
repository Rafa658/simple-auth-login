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

    async FindOne(user) {
        const find = await User.findOne(user)
        if (find) return true
        
        return false
    }

    async Add(user) {
        if (!user.email || !user.password) return false

        let findEmail = await(await User.find({"email": user.email})).length
        if (findEmail) return false

        var newUser = new User (user)
        try {
            await newUser.save()
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = new UserService()