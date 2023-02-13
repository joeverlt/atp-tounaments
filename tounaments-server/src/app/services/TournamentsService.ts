import TournamentsRepository from '../repositories/TournamentsRepository'

interface TournamentWinner {
  code: string
  tourney: string
  winner: string
  winnerId: string
}

interface TournamentByPlayer {
  code: string
  name: string
  date: Date
  location: string
  winner: string
  winnerId: string
}

interface Tournament {
  code: string
  name: string
  location: string
  winners: { id: string; name: string }[]
}

interface Player {
  id: string
  name: string
  lastTournamentWon: string
  locationOfLastTournamentWon: string
  dateOfLastTournamentWon: Date
}

export default class TournamentsService {
  public repository

  constructor() {
    this.repository = TournamentsRepository
  }

  private getWinners(tournaments: TournamentByPlayer[]) {
    const winnersCount = new Map<string, Map<string, number>>()
    for (const tournament of tournaments) {
      if (!winnersCount.has(tournament.code)) {
        winnersCount.set(tournament.code, new Map<string, number>())
      }
      const tournamentWinners = winnersCount.get(tournament.code)
      if (!tournamentWinners!.has(tournament.winnerId)) {
        tournamentWinners!.set(tournament.winnerId, 0)
      }
      tournamentWinners!.set(
        tournament.winnerId,
        tournamentWinners!.get(tournament.winnerId)! + 1
      )
    }

    const results = []
    for (const [tournamentCode, tournamentWinners] of winnersCount) {
      let mostWins = 0
      let winnerId = ''
      let winnerName = ''
      for (const [playerId, wins] of tournamentWinners) {
        if (wins > mostWins) {
          mostWins = wins
          winnerId = playerId
          winnerName = tournaments.find((t) => t.winnerId === playerId)!.winner
        }
      }
      results.push({
        code: tournamentCode,
        tourney: tournaments.find((t) => t.code === tournamentCode)!.name,
        winner: winnerName,
        winnerId: winnerId
      })
    }
    return results
  }

  public async getTournamentByPlayer(
    winnerId: string,
    tournamentCode: string
  ): Promise<Player | undefined> {
    const data = await this.repository.list({ code: tournamentCode, winnerId })
    const tournaments = data.rows
    const lastTournamentWon = tournaments.reduce((prev, current) =>
      prev.date > current.date ? prev : current
    )

    const info: Player = {
      id: winnerId,
      name: lastTournamentWon.winner,
      lastTournamentWon: lastTournamentWon.name,
      dateOfLastTournamentWon: lastTournamentWon.date,
      locationOfLastTournamentWon: lastTournamentWon.location
    }
    return info
  }

  public async getTournaments(): Promise<TournamentWinner[]> {
    const data = await this.repository.list({})
    const tournaments = data.rows
    const tournamentsWinners = this.getWinners(
      tournaments as TournamentByPlayer[]
    )
    const result: TournamentWinner[] = tournamentsWinners
    return result
  }

  public async getTournament(code: string): Promise<Tournament> {
    const data = await this.repository.list({ code })
    const tournaments = data.rows
    const tournament: Tournament = {
      code,
      name: tournaments[0].name,
      location: tournaments[0].location,
      winners: tournaments.map((item) => ({
        id: item.winnerIdm,
        name: item.winenr
      }))
    }
    return tournament
  }

  public async getPlayer(id: string): Promise<Player> {
    const data = await this.repository.list({ winnerId: id })
    const tournaments = data.rows
    const lastTournamentWon = tournaments.reduce((prev, current) =>
      prev.date > current.date ? prev : current
    )
    const player: Player = {
      id,
      name: tournaments[0].winner,
      lastTournamentWon: lastTournamentWon.name,
      dateOfLastTournamentWon: lastTournamentWon.date,
      locationOfLastTournamentWon: lastTournamentWon.location
    }
    return player
  }
}
