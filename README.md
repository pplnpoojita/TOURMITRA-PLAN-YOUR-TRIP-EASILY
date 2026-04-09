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

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.</content>
<parameter name="filePath">c:\Users\LENOVO\Desktop\FINALPROJECT\README.md