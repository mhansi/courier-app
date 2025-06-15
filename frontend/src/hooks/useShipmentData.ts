import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { type Shipment, type Sender, ShipmentStatus} from '../types/Shipment';
import { getShipmentById } from '../api/shipment';
import { getUser } from '../api/auth';

export function useShipmentData(id?: string) {
    const { isAdmin } = useAuth();

    const [shipmentData, setShipmentData] = useState<Shipment | null>(null);
    const [senderData, setSenderData] = useState<Sender | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setShipmentData({
                id: '',
                senderId: '',
                recipientName: '',
                recipientAddress: '',
                note: '',
                status: ShipmentStatus.PENDING,
            });
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const shipment = await getShipmentById(id);
                setShipmentData(shipment);

                if (isAdmin) {
                    const sender = await getUser(shipment.senderId);
                    setSenderData(sender);
                }
            } catch (err) {
                setError('Failed to fetch shipment');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, isAdmin]);

    return { shipmentData, senderData, loading, error };
}
