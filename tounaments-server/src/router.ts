import { Router as RouterExpress } from 'express'
import TournamentsController from './app/controllers/TournamentsController'
import auth from './auth'

export default class Router {
  public router: RouterExpress

  constructor() {
    this.router = RouterExpress()
    this.setRoutes()
  }

  private setRoutes() {
    this.router.get('/tournaments', auth, TournamentsController.index)
    this.router.get(
      '/tournament/:id',
      auth,
      TournamentsController.getTournament
    )
    this.router.get('/player/:id', auth, TournamentsController.getPlayer)
    this.router.get(
      '/tournament-by-player/:tournamentId/:playerId',
      auth,
      TournamentsController.getTournamentByPlayer
    )
  }

  public getRoutes() {
    return this.router
  }
}
