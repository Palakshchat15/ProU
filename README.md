📌 Project Overview

ProU Task Tracker is a MERN-based workforce management system designed to help organizations manage employees, assign tasks, and track task progress efficiently.
It includes user authentication, role-based access (Admin & User), and a clean dashboard summarizing employees and tasks.
Admins can create, update, and delete tasks/employees, while regular users can only view the tasks assigned to them.
The project is optimized with JWT authentication, MongoDB integration, TailwindCSS UI, and Axios on the frontend for smooth API communication.

🌐 Live Demo URLs
Service	URL
Frontend	https://prou-1.onrender.com

Backend API	https://prou-nzc4.onrender.com

To test functionality:

Login using your created admin account
or

Create a new admin via your script before deploying.

🚀 Initial Setup Instructions

Below are all commands needed to run the project locally.

🔧 Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_generated_secret>
JWT_EXPIRES_IN=7d


Run the backend:

npm start      
npm run dev    


To create the initial admin:

node scripts/createAdmin.js

🎨 Frontend Setup
cd frontend
npm install


Create a .env file in the frontend folder:

VITE_API_URL=http://localhost:5000


Start the frontend:

npm run dev
