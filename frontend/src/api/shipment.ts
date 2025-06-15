import axios from './axiosInstance';
import type { ShipmentStatus } from '../types/Shipment';
import type { ShipmentData, ShipmentResponse } from './types';

export const getShipmentById = async (id: string) => {
  const res = await axios.get<ShipmentResponse>(`/shipments/${id}`);
  return res.data;
}

export const getShipments = async () => {
  const res = await axios.get<ShipmentResponse[]>('/shipments');
  return res.data;
}

// CLIENT APIs
export const createShipment = async (data: ShipmentData) => {
  const res = await axios.post<ShipmentResponse>('/shipments', data);
  return res.data;
}

export const updateShipment = async (id: string, data: ShipmentData) => {
  const res = await axios.put<ShipmentResponse>(`/shipments/${id}`, data);
  return res.data;
}

export const deleteShipment = async (id: string) => {
  const res = await axios.delete(`/shipments/${id}`);
  return res.data;
}

// ADMIN APIs
export const updateStatus = async (id: string, status: ShipmentStatus) => {
  const res = await axios.patch<ShipmentResponse>(`/shipments/${id}/status`, { status });
  return res.data;
}
