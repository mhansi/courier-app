import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { Role, TokenUser } from '../models/Auth';
import { ShipmentStatus } from '../models/Shipment';

export const getShipmentById = async (req: Request, res: Response) => {
    const user: TokenUser = (req as any).user;
    const shipmentId = req.params.id;

    try {
        const shipment = await prisma.shipment.findUnique({
            where: { id: shipmentId }
        });

        if (!shipment) {
            res.status(404).json({ message: 'Shipment not found' });
            return;
        }

        if (user.role !== Role.ADMIN && shipment.senderId !== user.userId) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }

        res.json(shipment);
    } catch {
        res.status(500).json({ error: 'Failed to fetch shipments' });
    }
};

export const getShipments = async (req: Request, res: Response) => {
    const user: TokenUser = (req as any).user;
    
    try {
        if (user.role !== Role.ADMIN) {
            const shipments = await prisma.shipment.findMany({
                where: { senderId: user.userId },
                orderBy: { created_at: 'desc' },
            });
            res.json(shipments);
            return;
        }

        const shipments = await prisma.shipment.findMany({
            orderBy: { created_at: 'desc' },
        });

        res.json(shipments);
    } catch {
        res.status(500).json({ error: 'Failed to fetch all shipments' });
    }
};

// CLIENT: Create shipment
export const createShipment = async (req: Request, res: Response) => {
    const { recipientName, recipientAddress, note } = req.body;
    const userId = (req as any).user.userId;

    try {
        const shipment = await prisma.shipment.create({
            data: {
                senderId: userId,
                recipientName,
                recipientAddress,
                note,
            },
        });
        res.status(201).json(shipment);
    } catch {
        res.status(500).json({ error: 'Failed to create shipment' });
    }
};

// CLIENT: Update shipment (if PENDING)
export const updateShipment = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { recipientName, recipientAddress, note } = req.body;

    try {
        const shipment = await prisma.shipment.findUnique({ where: { id } });
        if (!shipment || shipment.senderId !== userId) {
            res.status(404).json({ message: 'Shipment not found' });
            return;
        }

        if (shipment.status !== ShipmentStatus.PENDING) {
            res.status(400).json({ message: 'Only pending shipments can be updated' });
            return;
        }

        const updated = await prisma.shipment.update({
            where: { id },
            data: { recipientName, recipientAddress, note },
        });

        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Failed to update shipment' });
    }
};

// CLIENT: Delete shipment (if PENDING)
export const deleteShipment = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { id } = req.params;

    try {
        const shipment = await prisma.shipment.findUnique({ where: { id } });
        if (!shipment || shipment.senderId !== userId) {
            res.status(404).json({ message: 'Shipment not found' });
            return;
        }

        if (shipment.status !== ShipmentStatus.PENDING) {
            res.status(400).json({ message: 'Only pending shipments can be deleted' });
            return;
        }

        await prisma.shipment.delete({ where: { id } });
        res.status(204).json({ message: 'Shipment deleted successfully' });
    } catch {
        res.status(500).json({ error: 'Failed to delete shipment' });
    }
};

// ADMIN: Update status
export const updateShipmentStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const shipment = await prisma.shipment.update({
            where: { id },
            data: { status },
        });
        res.json(shipment);
    } catch {
        res.status(500).json({ error: 'Failed to update shipment status' });
    }
};
