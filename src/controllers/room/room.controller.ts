import {StatusCodes} from 'http-status-codes'

import {Request, Response} from 'express'

import {RoomModel} from '../../models'

export class RoomController {
  public static async createRoom(req: Request, res: Response) {
    try {
      const room = await RoomModel.create({})

      return res.status(StatusCodes.OK).json({
        success: true,
        data: room,
      })
    } catch (error: any) {
      return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error,
      })
    }
  }
}
