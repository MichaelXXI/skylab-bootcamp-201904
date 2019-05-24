const { ValueError, RequirementError, FormatError } = require('../errors')

const validate = {
    arguments(args) {
        args.forEach(({ name, value, type, notEmpty, optional }) => {
            if (value != undefined) {
                if (typeof value !== type) throw TypeError(`${name} ${value} is not a ${type}`)

                if (notEmpty)
                    if (type === 'string') {
                        if (!value.trim().length) throw new ValueError(`${name} is empty`)
                    } else if (type === 'object')
                        if (!Object.keys(value).length) throw new ValueError(`${name} is empty`)
            } else if (!optional) throw new RequirementError(`${name} is not optional`)
        })
    },

    url(url) {
        const re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

        if (!re.test(String(url))) throw new FormatError(`${url} is not a url`)
    }
}

module.exports = validate