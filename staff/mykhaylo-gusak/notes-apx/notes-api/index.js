const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logic = require('./logic')
const express = require('express')
var jwt = require('jsonwebtoken');


const app = express();



(async () => {
    try {
        await mongoose.connect('mongodb://localhost/notes-api', { useNewUrlParser: true })
        console.log('connected to database')

    } catch (error) {
        console.error(error)
    }

    app.use(bodyParser.json())

    app.post('/register', (req, res) => {
        const { body: { name, surname, email, password } } = req
        return (async () => {
            try {
                await logic.registerUser(name, surname, email, password)
                res.status(200).json({ message: 'Register ok' })
            } catch (err) {

                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/login', (req, res) => {
        const { body: { email, password } } = req
        return (async () => {
            try {
                const id = await logic.loginUser(email, password)
                const token = jwt.sign({ id }, 'hola', { expiresIn: '47m' })
                res.status(200).json({ token: token, id: id })
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.get('/user', (req, res) => {
        const { headers: { authorization } } = req
        let token = authorization.slice(7)

        return (async () => {
            try {
                const data = await logic.retrievUser(token)
                res.status(200).json({ data })
            } catch (err) {
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/public/add', (req, res) => {
        const { body: { id, text } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const response = await logic.addPublicNote(id, text)
                res.status(200).json({ response })
                debugger
            } catch (err) {
                debugger
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/public/remove', (req, res) => {
        const { body: { id, author } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const response = await logic.removePublicNote(author, id)
                res.status(200).json({ response })
                debugger
            } catch (err) {
                debugger
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/public/list', (req, res) => {
        const { body: { author } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const notes = await logic.listPublicNotes(author)
                res.status(200).json({ notes })
                debugger
            } catch (err) {
                debugger
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/private/add', (req, res) => {
        const { body: { id, text } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const response = await logic.addPrivateNote(id, text)
                res.status(200).json({ response })
                debugger
            } catch (err) {
                debugger
                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/private/remove', (req, res) => {
        const { body: { id, author } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const response = await logic.removePrivateNote(author, id)
                res.status(200).json({ response })

            } catch (err) {

                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.post('/note/private/list', (req, res) => {
        const { body: { author } } = req
        // const { headers: { authorization } } = req
        // let token = authorization.slice(7)

        return (async () => {
            try {
                const notes = await logic.listPrivateNotes(author)
                res.status(200).json({ notes })

            } catch (err) {

                res.status(400).json({ message: err.message })
            }
        })()
    });

    app.listen(3030, function () {
        console.log('Example app listening on port 3030!');
    });

    // await mongoose.disconnect()
})()