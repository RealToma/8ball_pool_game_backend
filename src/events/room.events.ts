import {Server, Socket} from 'socket.io'

import {SocketConstants} from '../constants/socket.constants'
import {RoomStatus} from '../constants/status.constant'
import {RoomModel} from '../models'
import {SocketException} from '../utils/exception/socket.exception'

export const startGame = (io: Server, socket: Socket) => async () => {
  try {
    await RoomModel.create({player1: socket.id})
  } catch (err: any) {
    console.warn(err)
    socket.emit(SocketConstants.EXCEPTION, new SocketException(SocketConstants.CREATE_GAME, err.toString()))
  }
}

export const updateRoomData =
  (io: Server, socket: Socket, onlineUsers: any) =>
  async ({roomID, updatedData}: {roomID: string; updatedData: any}) => {
    try {
      const room = await RoomModel.findOne({_id: roomID, status: {$ne: RoomStatus.FINISHED}})
      if (room?.player2) {
        io.to(onlineUsers[room.player2]).emit(SocketConstants.UPDATE, updatedData)
      }
    } catch (err: any) {
      console.warn(err)
      socket.emit(SocketConstants.EXCEPTION, new SocketException(SocketConstants.UPDATE, err.toString()))
    }
  }

export const finishGame =
  (io: Server, socket: Socket, onlineUsers: any) =>
  async ({roomID, winner}: {roomID: string; winner: string}) => {
    try {
      const room = await RoomModel.findOneAndUpdate(
        {_id: roomID, status: {$ne: RoomStatus.FINISHED}},
        {
          winner,
          status: RoomStatus.FINISHED,
        },
      )

      if (!room) {
        return socket.emit(SocketConstants.EXCEPTION, new SocketException(SocketConstants.FINISH, 'room not found'))
      }

      if (room?.player2) {
        io.to(onlineUsers[room.player2]).emit(SocketConstants.FINISH, room)
      }
    } catch (err: any) {
      console.warn(err)
      socket.emit(SocketConstants.EXCEPTION, new SocketException(SocketConstants.FINISH, err.toString()))
    }
  }
