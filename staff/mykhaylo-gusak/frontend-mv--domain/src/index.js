import MovieUseCasesFactories from './movie/UseCases/factories'
import Config from './Config/index'

const config = new Config()

const useCases = {
    search_movies_use_cases: MovieUseCasesFactories.searchMovieUseCase({ config })
}

export default class Domain {
    get(useCase) {
        return useCases[useCase]
    }
}