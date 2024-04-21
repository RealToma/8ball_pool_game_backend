import {Server, Socket} from 'socket.io'

import {SocketConstants} from '../constants/socket.constants'
import {finishGame, startGame, updateRoomData} from './room.events'

export interface SocketEvent {
  eventName: string | symbol
  listener: (io: Server, socket: Socket, chatUsers: {[x: string]: string | undefined}) => (...args: any[]) => void
}

export const Events: SocketEvent[] = [
  {eventName: SocketConstants.UPDATE, listener: updateRoomData},
  {eventName: SocketConstants.FINISH, listener: finishGame},
  {eventName: SocketConstants.CREATE_GAME, listener: startGame},
]
