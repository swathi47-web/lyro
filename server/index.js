// ✅ FILE: server/index.js (UPDATED with MongoDB connection success + organized)
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// ✅ Route imports
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/user.js';
import petRoutes from './routes/pets.js';
import favoriteRoutes from './routes/favorites.js';
import adoptionRequestRoutes from './routes/adoptionRequests.js';
import aiChatRoutes from './routes/aiChat.js';


dotenv.config();

const app = express();

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/adoption-requests', adoptionRequestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai-chat', aiChatRoutes);



const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

















