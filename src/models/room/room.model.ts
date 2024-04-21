import {Schema, model} from 'mongoose'

import {CollectionNames} from '../../constants/db.constants'
import {RoomStatus} from '../../constants/status.constant'

export const roomSchema = new Schema(
  {
    status: {
      type: Number,
      default: RoomStatus.STARTED,
      enum: RoomStatus,
    },
    winner: String,
    player1: {
      type: String,
      required: true,
    },
    player2: String,
  },
  {timestamps: true},
)

export const RoomModel = model(CollectionNames.ROOM, roomSchema)
