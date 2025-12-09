Shipment Management API
A production-ready RESTful API for managing shipments built with Node.js, Express, and MongoDB.
🚀 Live Demo
Base URL: https://your-app.onrender.com
📋 Table of Contents

Features
Tech Stack
Getting Started
API Documentation
Testing
Deployment

✨ Features

Complete CRUD operations for shipments
Data validation with express-validator
Error handling middleware
MongoDB with Mongoose ODM
Query filtering and pagination
Auto-generated tracking numbers
Clean, modular code structure
Unit tests with Jest
Production-ready security (Helmet, CORS)

🛠 Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB
ODM: Mongoose
Validation: express-validator
Testing: Jest & Supertest
Security: Helmet, CORS
Logging: Morgan

🏁 Getting Started
Prerequisites

Node.js (v16 or higher)
MongoDB (local or cloud)
npm or yarn

Installation

Clone the repository:

bashgit clone <your-repo-url>
cd shipment-api

Install dependencies:

npm install

Create .env file:

envPORT=8000
MONGODB_URI=mongodb://localhost:27017/shipment_db
NODE_ENV=development

Start the server:

bash# Development mode
npm run dev

# Production mode
npm start
The API will be running at http://localhost:8000
📚 API Documentation
Base Response Format
All responses follow this structure:
json{
  "success": true/false,
  "message": "Response message",
  "data": {} or []
}
Endpoints
1. Get All Shipments
GET /api/shipments
Query Parameters:

status (optional): Filter by status (pending, in_transit, delivered, cancelled)
origin (optional): Filter by origin (case-insensitive)
destination (optional): Filter by destination (case-insensitive)
page (optional): Page number (default: 1)
limit (optional): Items per page (default: 10)

Example Request:
bashGET /api/shipments?status=pending&page=1&limit=10
Success Response (200):
json{
  "success": true,
  "count": 10,
  "total": 25,
  "page": 1,
  "pages": 3,
  "data": [
    {
      "_id": "657abc123def456789",
      "trackingNumber": "TRK1702123456789",
      "senderName": "Tolulope Akinniyi",
      "receiverName": "Joshua Akinniyi",
      "origin": "Lagos",
      "destination": "Abuja",
      "status": "pending",
      "createdAt": "2024-12-01T10:30:00.000Z",
      "updatedAt": "2024-12-01T10:30:00.000Z"
    }
  ]
}

2. Get Single Shipment
GET /api/shipments/:id
Example Request:
bashGET /api/shipments/657abc123def456789
Success Response (200):
json{
  "success": true,
  "data": {
    "_id": "657abc123def456789",
    "trackingNumber": "TRK1702123456789",
    "senderName": "John Doe",
    "receiverName": "Jane Smith",
    "origin": "Lagos",
    "destination": "Abuja",
    "status": "pending",
    "createdAt": "2024-12-01T10:30:00.000Z",
    "updatedAt": "2024-12-01T10:30:00.000Z"
  }
}
Error Response (404):
json{
  "success": false,
  "message": "Shipment not found"
}

3. Create Shipment
POST /api/shipments
Request Body:
json{
  "trackingNumber": "TRK123456789",
  "senderName": "John Doe",
  "receiverName": "Jane Smith",
  "origin": "Lagos",
  "destination": "Abuja",
  "status": "pending"
}
Required Fields:

senderName (string, min 2 characters)
receiverName (string, min 2 characters)
origin (string)
destination (string)

Optional Fields:

trackingNumber (string, min 5 characters) - auto-generated if not provided
status (enum: pending, in_transit, delivered, cancelled) - defaults to "pending"

Success Response (201):
json{
  "success": true,
  "message": "Shipment created successfully",
  "data": {
    "_id": "657abc123def456789",
    "trackingNumber": "TRK123456789",
    "senderName": "John Doe",
    "receiverName": "Jane Smith",
    "origin": "Lagos",
    "destination": "Abuja",
    "status": "pending",
    "createdAt": "2024-12-01T10:30:00.000Z",
    "updatedAt": "2024-12-01T10:30:00.000Z"
  }
}
Error Response (400):
json{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "senderName",
      "message": "Sender name is required"
    }
  ]
}

4. Update Shipment
PUT /api/shipments/:id
Request Body (all fields optional):
json{
  "senderName": "John Updated",
  "status": "in_transit"
}
Success Response (200):
json{
  "success": true,
  "message": "Shipment updated successfully",
  "data": {
    "_id": "657abc123def456789",
    "trackingNumber": "TRK123456789",
    "senderName": "John Updated",
    "receiverName": "Jane Smith",
    "origin": "Lagos",
    "destination": "Abuja",
    "status": "in_transit",
    "createdAt": "2024-12-01T10:30:00.000Z",
    "updatedAt": "2024-12-01T11:45:00.000Z"
  }
}

5. Delete Shipment
DELETE /api/shipments/:id
Success Response (200):
json{
  "success": true,
  "message": "Shipment deleted successfully",
  "data": {}
}
Error Response (404):
json{
  "success": false,
  "message": "Shipment not found"
}

Error Responses
Invalid ID Format (400)
json{
  "success": false,
  "message": "Invalid ID format"
}
Duplicate Tracking Number (409)
json{
  "success": false,
  "message": "Duplicate tracking number. This shipment already exists."
}
Route Not Found (404)
json{
  "success": false,
  "message": "Route /api/invalid not found"
}

🧪 Testing
Run the test suite:
npm test
The test suite includes:

Creating shipments
Retrieving all shipments
Getting single shipment
Updating shipment
Deleting shipment
Validation error handling
404 error handling

🚢 Deployment
Deploy to Render

Create account at render.com
Create new Web Service
Connect your GitHub repository
Configure:

Build Command: npm install
Start Command: npm start
Environment Variables: Add MONGODB_URI, NODE_ENV=production


<!-- Deploy

Deploy to Railway

Create account at railway.app
Create new project from GitHub repo
Add MongoDB plugin
Configure environment variables
Deploy automatically -->

MongoDB Atlas Setup

Create free cluster at mongodb.com
Create database user
Whitelist IP (0.0.0.0/0 for all IPs)
Get connection string
Add to MONGODB_URI in environment variables

📁 Project Structure
shipment-api/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── Shipment.js          # Shipment schema
│   ├── controllers/
│   │   └── shipment.controller.js # Business logic
│   ├── routes/
│   │   └── shipment.route.js    # API routes
│   ├── middleware/
│   │   ├── errorHandler.js      # Error handling
│   │   └── validateRequest.js   # Validation middleware
│   ├── validators/
│   │   └── shipment.validator.js # Input validation rules
│   └── server.js                   # Express app setup
├── tests/
│   └── shipment.test.js         # Unit tests
├── .env                         # Environment variables
├── .gitignore
├── package.json
├── README.md
└── postman_collection.json      # Postman collection
📦 Postman Collection
Import the postman_collection.json file included in the repository, or access the public collection:
Public Link: View Postman Collection
🔐 Security Features

Helmet.js for security headers
CORS enabled
Input validation and sanitization
MongoDB injection prevention
Error messages don't expose sensitive data

👤 Author
Tolulope Joshua Akinniyi


GitHub: @joshuafreemant


🙏 Acknowledgments

Assessment provided by TaxTech
Built for Backend Engineer position evaluation