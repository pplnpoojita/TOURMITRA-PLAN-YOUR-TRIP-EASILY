# Tour Mitra

A comprehensive tourism platform that helps travelers discover and explore destinations across various districts. The application provides an intuitive interface for browsing destinations, managing user profiles, and contacting administrators.

## Project Overview

Tour Mitra is a full-stack web application built with modern technologies:

- **Frontend**: React.js with Vite, styled with Tailwind CSS
- **Backend**: Node.js with Express.js, MongoDB database
- **Authentication**: JWT-based user authentication
- **Features**: Destination browsing, user management, district-wise organization, contact forms

## Architecture

### Backend Structure
```
backend/
├── controllers/     # Business logic for API endpoints
├── middleware/      # Authentication and validation middleware
├── models/         # MongoDB schemas (User, Destination, District, Contact)
├── routes/         # API route definitions
├── server.js       # Main server file
└── package.json    # Backend dependencies
```

### Frontend Structure
```
frontend/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Page components
│   ├── data/       # Static data files
│   └── App.jsx     # Main application component
└── package.json    # Frontend dependencies
```

## Key Features

- **User Authentication**: Login/signup for tourists and admins
- **Destination Management**: Browse destinations by district
- **Admin Dashboard**: Manage destinations and users
- **Contact System**: Submit inquiries to administrators
- **Responsive Design**: Mobile-friendly interface

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Districts
- `GET /api/districts` - Get all districts
- `GET /api/districts/:id` - Get district by ID

### Contact
- `POST /api/contact` - Submit contact form

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (if needed for API URL configuration):
   ```
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (Vite default)

## Running the Full Stack Locally

### Quick Start (One-Command Setup)
```bash
# From project root, install both frontend and backend dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev
```

### Manual Setup
1. **Backend**: Start the backend server first (runs on `http://localhost:5000`)
2. **Frontend**: Then start the frontend development server (runs on `http://localhost:5173`)

Ensure the backend is running before accessing the frontend to avoid API connection errors.

## Database Models

### User
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `role`: String (tourist/admin)

### Destination
- `name`: String
- `description`: String
- `district`: ObjectId (reference to District)
- `images`: Array of Strings
- `rating`: Number

### District
- `name`: String
- `description`: String
- `destinations`: Array of ObjectIds

### Contact
- `name`: String
- `email`: String
- `message`: String

## Technologies Used

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Deployment Guide

### Frontend Deployment (Vercel)

1. Push code to GitHub (already done ✓)
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings:
   ```
   Framework Preset: Vite
   Root Directory: ./frontend
   Build Command: npm run build
   Output Directory: dist
   ```
5. Add environment variables:
   ```
   VITE_API_URL=<your-backend-url>
   ```
6. Deploy!

### Backend Deployment (Railway or Render)

#### Option 1: Railway
1. Visit [railway.app](https://railway.app)
2. Create new project → Import from GitHub
3. Select repository and `backend` directory
4. Configure environment variables:
   ```
   MONGO_URI=<your-mongodb-atlas-url>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   NODE_ENV=production
   ```
5. Deploy

#### Option 2: Render
1. Visit [render.com](https://render.com)
2. Create new Web Service → GitHub
3. Connect repository, set root directory to `backend`
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in dashboard
6. Deploy

### MongoDB Atlas Setup (Cloud Database)

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user with strong password
4. Get connection string and add to `.env`:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

## Environment Variables Reference

### Backend (.env)
```
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local or .env)
```
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Check backend is running on port 5000
- Verify `VITE_API_URL` environment variable is correct
- Check browser console for CORS errors
- Ensure backend CORS is configured for frontend URL

**MongoDB connection error:**
- Verify `MONGO_URI` is correct
- Check MongoDB cluster IP whitelist includes your IP
- Ensure database credentials are correct
- For local MongoDB, verify `mongod` service is running

**Port already in use:**
```bash
# Kill process on port 5000 (Unix/Mac)
lsof -ti :5000 | xargs kill -9

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Dependencies installation fails:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Project Statistics

- **Total Files**: 175+
- **Frontend Components**: 8
- **Backend Routes**: 5 API modules
- **Database Collections**: 5 (User, Destination, District, Contact, Feedback)
- **Destinations**: 100+ tourist locations across districts

## Support & Contact

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review API documentation in the code

## License

This project is licensed under the MIT License.</content>
<parameter name="filePath">c:\Users\LENOVO\Desktop\FINALPROJECT\README.md