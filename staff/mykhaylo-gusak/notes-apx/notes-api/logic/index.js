const mongoose = require('mongoose');
const models = require('../models')
const { User } = models;
// const { ObjectId } = require('mongodb')

const logic = {
    registerUser(name, surname, email, password) {
        return (async () => {
            try {
                await User.create({ name: name, surname: surname, email: email, password: password })
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    loginUser(email, password) {
        return (async () => {
            try {
                const user = await User.findOne({ email: email })

                if (!user) throw new Error(`Email "${email}" does not exist`)
                if (!user.password === password)   throw new Error('wrong credentials')
                return user.id.toString()
            } catch (err) {
                throw Error(err.message)
            }
        })()

    }



}

module.exports = logic