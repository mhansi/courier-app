import express from 'express';
import {
    getShipments,
    getShipmentById,
    createShipment,
    updateShipment,
    deleteShipment,
    updateShipmentStatus,
} from '../controllers/shipmentController';
import { authenticate } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { Role } from '../models/Auth';

const router = express.Router();

router.use(authenticate);

router.get('/', getShipments);
router.get('/:id', getShipmentById);

// CLIENT routes
router.post('/', requireRole(Role.CLIENT), createShipment);
router.put('/:id', requireRole(Role.CLIENT), updateShipment);
router.delete('/:id', requireRole(Role.CLIENT), deleteShipment);

// ADMIN routes
router.patch('/:id/status', requireRole(Role.ADMIN), updateShipmentStatus);

export default router;
