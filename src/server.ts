import express from 'express';
import cors from 'cors';
import connectDB from './Config/database';
import userRoutes from './Routes/api/userRoutes';
import thoughtRoutes from './Routes/api/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
