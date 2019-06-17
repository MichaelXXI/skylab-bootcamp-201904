import FetcherFactories from '../../Fetcher/factories'
import HTTPMovieRepository from './HTTPMovieRepository.js'

// Contexto     ...    ...
export default class MovieRepositoriesFactories {
    static httpMovieRepository = ({ config }) =>
        new this.HTTPMovieRepository({
            fetcher: FetcherFactories.httpFetcher({ config })
        })
}