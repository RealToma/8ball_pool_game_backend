import {Router} from 'express'

import {RoomController} from '../../controllers/room'

export const router = Router()

/**
 * @api {post} /room
 * @apiName Create room
 * @apiPermission SUPER_ADMIN
 * @apiSuccess (201) {Object}
 */
router.post('/', RoomController.createRoom)
