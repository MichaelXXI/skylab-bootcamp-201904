const logic = require('.')
const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/notes-api-test'

describe('logic', () => {
    let client, users

    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })
        const db = client.db()
        users = db.collection('users')
    })

    const name = 'Misha'
    const surname = 'Gusak'
    let email
    const password = '123'

    beforeEach(async () => {
        await users.deleteMany()
        email = `mishagusak${Math.random()}@email.com`
    })



    describe('register user', () => {
        it('should succed on correct data', async () => {

            const response = await logic.registerUser(name, surname, email, password)
            expect(response).toBeUndefined()
            debugger
            const _user = users.find({email:email})
            debugger
        })


    })

    afterAll(() => client.close(true))
})
