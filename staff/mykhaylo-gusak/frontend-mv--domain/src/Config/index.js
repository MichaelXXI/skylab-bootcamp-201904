export default class Config {
    constructor() {
        this._config = {
            API_HOST: 'https://api.themoviedb.org/3',
            API_KEY: 'b5100f1a25ba8a2b0de1e5f2f65347dc'
        }
    }
    get(key) {
        return this._config[key]
    }
}