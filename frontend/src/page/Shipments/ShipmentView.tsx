import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useShipmentData } from "../../hooks/useShipmentData";
import Layout from "../../components/layout/Layout";
import Button from "../../components/shared/Button";
import { deleteShipment } from "../../api/shipment";
import { useAuth } from "../../context/AuthContext";
import { ShipmentStatus } from "../../types/Shipment";

export default function ShipmentView() {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipmentData, senderData, loading, error } = useShipmentData(id);

  const handleDelete = async (shipmentId: string) => {
    try {
      await deleteShipment(shipmentId);
      alert(`Shipment ${shipmentId} deleted successfully`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete shipment:", error);
      alert("Failed to delete shipment. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-blue-600">
        Loading...
      </div>
    );
  }

  if (error || !shipmentData) {
    return (
      <div className="flex justify-center items-center h-64 text-lg text-red-600">
        {error || "Shipment not found."}
      </div>
    );
  }

  return (
    <Layout title="View Shipment" showBack={true}>
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 space-y-10">
          <header>
            <h1 className="text-3xl font-bold text-blue-700">
              Shipment Overview
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              Review sender and recipient information for this shipment.
            </p>
          </header>

          {senderData && (
            <SectionCard title="Sender Details">
              <DetailGrid>
                <Detail label="Name" value={senderData.name} />
                <Detail label="Email" value={senderData.email} />
                <Detail label="Phone" value={senderData.phone} />
                <Detail label="Address" value={senderData.address} />
              </DetailGrid>
            </SectionCard>
          )}

          <SectionCard title="Recipient Details">
            <DetailGrid>
              <Detail label="Name" value={shipmentData.recipientName} />
              <Detail label="Address" value={shipmentData.recipientAddress} />
            </DetailGrid>
          </SectionCard>

          <SectionCard title="Additional Info">
            <DetailGrid>
              <Detail label="Note" value={shipmentData.note} />
              {shipmentData.status && (
                <Detail label="Status" value={shipmentData.status} />
              )}
            </DetailGrid>
          </SectionCard>

          {!isAdmin && shipmentData.status !== ShipmentStatus.PENDING && (
            <p className="text-sm text-gray-500">
              *Only PENDING shipments can be EDITED or DELETED.
            </p>
          )}

          {isAdmin && (
            <p className="text-sm text-gray-500">
              *Admins are allowed only to change shipment status.
            </p>
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => navigate("/dashboard")}
              className="mr-4 bg-gray-600 hover:bg-gray-700"
              type="button"
            >
              Back
            </Button>
            {!isAdmin && shipmentData.status == ShipmentStatus.PENDING && (
              <Button
                onClick={() => handleDelete(shipmentData.id)}
                className="flex items-center gap-2 mr-4 bg-red-600 hover:bg-red-700"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
            {isAdmin || shipmentData.status == ShipmentStatus.PENDING ? (
              <Button
                type="button"
                onClick={() => navigate(`/shipment/${id}/edit`)}
                className="flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Section container with title
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        {children}
      </div>
    </section>
  );
}

// Responsive detail grid
function DetailGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}

// Label/value pair
function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-medium text-gray-900">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </span>
    </div>
  );
}
