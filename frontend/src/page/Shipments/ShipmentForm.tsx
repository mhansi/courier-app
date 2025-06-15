import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  createShipment,
  updateShipment,
  updateStatus,
} from "../../api/shipment";
import { useShipmentData } from "../../hooks/useShipmentData";
import InputField from "../../components/shared/InputField";
import SelectField from "../../components/shared/SelectField";
import Layout from "../../components/layout/Layout";
import Button from "../../components/shared/Button";
import { useAuth } from "../../context/AuthContext";
import { ShipmentStatus } from "../../types/Shipment";

export default function ShipmentForm() {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const navigate = useNavigate();
  const { shipmentData, senderData, loading, error } = useShipmentData(id);

  const validate = (values: any) => {
    const errors: Record<string, string> = {};
    if (!values.recipientName)
      errors.recipientName = "Recipient name is required";
    if (!values.recipientAddress)
      errors.recipientAddress = "Recipient address is required";
    return errors;
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

  const shipmentStatuses: { value: ShipmentStatus; label: string }[] = [
    { value: ShipmentStatus.PENDING, label: "Pending" },
    { value: ShipmentStatus.PROCESSING, label: "Processing" },
    { value: ShipmentStatus.PICKEDUP, label: "Picked Up" },
    { value: ShipmentStatus.INTRANSIT, label: "In Transit" },
    { value: ShipmentStatus.SHIPPED, label: "Shipped" },
    { value: ShipmentStatus.DELIVERED, label: "Delivered" },
    { value: ShipmentStatus.CANCELLED, label: "Cancelled" },
  ];

  return (
    <Layout title={id ? "Update Shipment" : "Create Shipment"} showBack>
      <div className="mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl space-y-8 border border-gray-100 max-w-4xl">
        <Formik
          initialValues={shipmentData}
          enableReinitialize={true}
          validate={validate}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (id) {
                if (isAdmin) {
                  await updateStatus(id, values.status);
                } else {
                  await updateShipment(id, values);
                }
              } else {
                await createShipment(values);
              }
              alert("Shipment saved successfully");
              resetForm();
              navigate("/dashboard");
            } catch (err) {
              alert("Failed to save shipment");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-8">
              {senderData && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Sender Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <InputField
                      name="senderName"
                      label="Sender Name"
                      value={senderData.name}
                      disabled
                    />
                    <InputField
                      name="senderEmail"
                      label="Sender Email"
                      value={senderData.email}
                      disabled
                    />
                    <InputField
                      name="senderPhone"
                      label="Sender Phone"
                      value={senderData.phone}
                      disabled
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Recipient Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <InputField
                    name="recipientName"
                    label="Recipient Name"
                    value={values.recipientName}
                    disabled={isAdmin}
                  />
                  <InputField
                    name="recipientAddress"
                    label="Recipient Address"
                    value={values.recipientAddress}
                    disabled={isAdmin}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
                  <InputField
                    name="note"
                    label="Note"
                    value={values.note}
                    disabled={isAdmin}
                  />
                  {id && (
                    <SelectField
                      name="status"
                      label="Status"
                      value={values.status || ShipmentStatus.PENDING}
                      options={shipmentStatuses}
                      disabled={!isAdmin}
                    />
                  )}
                </div>
              </div>

              {!isAdmin && (
                <p className="text-sm text-gray-500">
                  *Only Admins are allowed to change shipment status.
                </p>
              )}

              <div className="flex justify-end pt-6">
                <Button
                  onClick={() => navigate(-1)}
                  className="mr-4 bg-gray-600 hover:bg-gray-700"
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  {id ? "Update Shipment" : "Create Shipment"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
