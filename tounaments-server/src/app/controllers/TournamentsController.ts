import { Request, Response } from 'express'
import TournamentsService from '../services/TournamentsService'

export default class TournamentsController {
  public static service = new TournamentsService()

  static async index(req: Request, res: Response) {
    const data = await TournamentsController.service.getTournaments()
    res.json(data)
  }

  public static async getTournamentByPlayer(req: Request, res: Response) {
    const { tournamentId, playerId } = req.params
    const data = await TournamentsController.service.getTournamentByPlayer(
      playerId,
      tournamentId
    )
    res.json(data)
  }

  public static async getTournament(req: Request, res: Response) {
    const { id } = req.params
    const data = await TournamentsController.service.getTournament(id)
    res.json(data)
  }

  public static async getPlayer(req: Request, res: Response) {
    const { id } = req.params
    const data = await TournamentsController.service.getPlayer(id)
    res.json(data)
  }
}
