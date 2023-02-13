import Repository from '../models/@repository.domain'

class TournamentRepository extends Repository {
  constructor(model: string) {
    super(model)
  }
}

export default new TournamentRepository('Tournament') as TournamentRepository
