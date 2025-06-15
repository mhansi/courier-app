import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import shipmentRoutes from './routes/shipment';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/shipments', shipmentRoutes);

export default app;
