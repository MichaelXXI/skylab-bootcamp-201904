import weatherApi from '.'
import {ValueError, RequirementError } from '../../common/errors'

describe('weather api', () => {
    const city = 'Barcelona'

    describe('retrieve', () => {
        it('should succeed on correct city', () =>
            weatherApi.retrieve(city)
                .then(response => {
                    expect(response).toBeDefined()

                    const {weather:[{main, description, icon}], name } = response
                    expect(name).toBeDefined()
                    expect(name).toBe('Barcelona')
                    expect(main).toBeDefined()
                    expect(typeof main).toBe('String')
                    expect(description).toBeDefined()
                    expect(typeof description).toBe('String')
                    expect(icon).toBeDefined()
                    expect(typeof icon).toBe('string')
                })
        )

        it('should fail on timeout', () =>{
            weatherApi.__timeout__ = 1
            weatherApi.retrieve(city)
            .then(response => {
                expect(response).toBeUndefined()
            })
            .catch(error => {
                weatherApi.__timeout__= 0
                expect(error).toThrowError('timeout error')
            })
        })

        it('should fail on city not found', () => {
            weatherApi.retrieve(city)
            .then(response => {
                expect(response).toBeDefined()
                const {cod, message} = response
                expect(cod).toBeDefined()
                expect(typeof cod).toBe('string')
                expect(cod).toBe('400')
                expect(message).toBeDefined()
                expect(typeof message).toBe('string')
                expect(message).toBe('Nothing to geocode')
            })
        })

        it('should fail on undefined city', () => {
            const city = undefined

            expect(() => weatherApi.retrieve(city)).toThrowError(RequirementError, `city is not optional`)
        })

        it('should fail on null city', () => {
            const city = null

            expect(() => weatherApi.retrieve(city)).toThrowError(RequirementError, `city is not optional`)
        })

        it('should fail on empty city', () => {
            const city = ''

            expect(() => weatherApi.retrieve(city)).toThrowError(ValueError, 'city is empty')
        })

        it('should fail on blank city', () => {
            const city = ' \t    \n'

            expect(() => weatherApi.retrieve(city)).toThrowError(ValueError, 'city is empty')
        })
    })
})