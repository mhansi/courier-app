import { useEffect, useState } from 'react';
import { getShipments } from '../../api/shipment';
import type { Shipment } from '../../types/Shipment';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import { formatToYYYYMMDD } from '../../utill/common';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchShipments = async () => {
      setIsFetching(true);
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error('Failed to fetch shipments:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchShipments();
  }, [isAdmin]);

  const tableData = [
    { key: 'id', label: 'ID' },
    { key: 'senderId', label: 'Sender ID' },
    { key: 'recipientName', label: 'Recipient' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'status', label: 'Status' }
  ];

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <header>
          <h1 className="text-3xl font-bold text-blue-700">Shipments</h1>
          <p className="mt-2 text-gray-500 text-sm">View all shipments and their details.</p>
        </header>
        {!isAdmin && (
          <Button type="button" onClick={() => navigate('/shipment/new')} className="flex items-center gap-2">
            <Plus className='w-4 h-4' /> New Shipment
          </Button>
        )}
      </div>

      {isFetching && (
        <div className="text-center text-gray-500 py-8">Loading shipments...</div>
      )}

      {!isFetching && shipments.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No shipments found.
        </div>
      )}

      {!isFetching && shipments.length > 0 && (
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 sticky top-0 text-gray-700 text-sm font-medium z-10">
              <tr>
                {tableData.map((row) => (
                  <th
                    key={row.key}
                    className="px-4 py-3 text-left capitalize whitespace-nowrap"
                  >
                    {row.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => navigate(`/shipment/${shipment.id}/view`)}
                >
                  {tableData.map((row) => {
                    const value = shipment[row.key as keyof Shipment];

                    return (
                      <td
                        key={row.key}
                        className="px-4 py-2 whitespace-nowrap text-left truncate max-w-[200px]"
                      >
                        {row.key === 'created_at' ? formatToYYYYMMDD(value) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
