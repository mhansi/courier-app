import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './page/Auth/Register';
import Login from './page/Auth/Login';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './page/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Layout from './components/layout/Layout';
import ShipmentView from './page/Shipments/ShipmentView';
import ShipmentForm from './page/Shipments/ShipmentForm';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Layout title="Login"><Login /></Layout>} />
            <Route path="/register" element={<Layout title="Register"><Register /></Layout>} />
            <Route path="/dashboard" element={<ProtectedRoute ><Layout title="Dashboard"><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/shipment/new" element={<ProtectedRoute ><ShipmentForm /></ProtectedRoute>} />
            <Route path="/shipment/:id/edit" element={<ProtectedRoute ><ShipmentForm /></ProtectedRoute>} />
            <Route path="/shipment/:id/view" element={<ProtectedRoute ><ShipmentView /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
