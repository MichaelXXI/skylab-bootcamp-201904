const mongoose = require('mongoose')
const models = require('../models')
const validate = require('../common/validate')
const { User, Note } = models;
const { ObjectId } = require('mongodb')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        return (async () => {
            try {
                await User.create({ name: name, surname: surname, email: email, password: password })
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        return (async () => {
            try {
                const user = await User.findOne({ email: email })

                if (!user) throw new Error(`Email "${email}" does not exist`)
                if (!user.password === password) throw new Error('wrong credentials')
                return user.id.toString()
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    addPublicNote(id, text) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {

                const note = await Note.create({ author: id, text })
                return note.id.toString()
            } catch (err) {

                throw Error(err.message)
            }
        })()
    },

    removePublicNote(author, id) {
        validate.arguments([
            { name: 'author', value: author, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {

                const note = await Note.findOne({ author: author, _id: id })

                if (!note) throw Error(`Note with id:${id} not exists.`)
                const response = await Note.remove({ author: author, _id: id })

                return response.toString()
            } catch (err) {

                throw Error(err.message)
            }
        })()
    },

    listPublicNotes(author) {
        validate.arguments([
            { name: 'author', value: author, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                const list = await Note.find({ author: author })
                if (!list) throw Error(`Notes from user with id:${author} not exist.`)
                return list.toString()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    addPrivateNote(id, text) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                let user = await User.findOne({ _id: id })
                if (!user) throw new Error(`User with this id:"${id}" not exist`)

                const note = await new Note({ author: id, text })

                user.notes.push(note)

                return await User.findByIdAndUpdate(id, { $set: user }, { new: true })
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    removePrivateNote(author, id) {
        validate.arguments([
            { name: 'author', value: author, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                let user = await User.findOne({ _id: author })
                if (!user) throw new Error(`User with this id:"${author}" not exist`)
                const acc = user.notes.findIndex(note => {
                    return note._id == id
                })

                if (acc === -1) throw new Error(`Notes with id:${id} not exists`)
                user.notes.splice(acc, 1)

                return await User.findByIdAndUpdate({ _id: author }, { $set: user }, { new: true })

            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    listPrivateNotes(author) {
        validate.arguments([
            { name: 'author', value: author, type: 'string', notEmpty: true },
        ])

        return (async () => {
            try {
                let user = await User.findOne({ _id: author })

                if (!user) throw new Error(`User with this id:"${author}" not exist`)

                return user.notes
            } catch (err) {

                throw Error(err.message)
            }
        })()
    }



}

module.exports = logic