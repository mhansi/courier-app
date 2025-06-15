import type { User } from "../types/Auth";
import type { Shipment } from "../types/Shipment";

// Auth types

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterData extends Omit<User, 'id'> {
    password: string;
}

export interface RegisterResponse {
    message: string;
    user: Omit<User, 'password'>;
}

export interface UserResponse extends Omit<User, 'password'> {
    createdAt: string;
    updatedAt: string;
}

// Shipment types

export interface ShipmentData extends Shipment { }

export interface ShipmentResponse extends Shipment {
    createdAt: string;
    updatedAt: string;
}