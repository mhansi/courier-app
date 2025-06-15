import type { User } from "./Auth";

export enum ShipmentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    PICKEDUP = 'PICKEDUP',
    INTRANSIT = 'INTRANSIT',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface Shipment {
    id: string;
    senderId: string;
    recipientName: string;
    recipientAddress: string;
    note: string;
    status: ShipmentStatus;
}

export interface Sender extends User { }
