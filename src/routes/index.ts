import {ConstantAPI} from '../constants/api.constant'
import {Controller} from '../controllers/types.d'
import {router as RoomRouter} from './room'

export const Routes: Controller[] = [
  {
    path: ConstantAPI.ROOMS,
    router: RoomRouter,
  },
]
