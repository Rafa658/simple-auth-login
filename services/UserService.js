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

    async ChangePassword(req) {
        const user = {"email": req.body.email, "password": req.body.password}
        const find = await( await User.find(user)).length
        if (!find) return false

        // const oldPass = req.body.password
        const newPass = req.body.newpassword
        const filter = {"email": req.body.email}
        const update = {"password": newPass}
        const stat = await User.updateOne(filter, update)

        return true

    }
}

module.exports = new UserService()