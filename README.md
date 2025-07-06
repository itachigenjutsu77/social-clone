# Social Connect

A monorepo for a social media app with a React frontend and Node.js backend.

## Project Structure

```
social-connect/
  ├── client/                 # React frontend
  │   ├── src/
  │   │   ├── components/     # React components like Header, PostCard
  │   │   ├── pages/          # Pages like Home, Profile, Login
  │   │   ├── context/        # Context API for global state (auth, user)
  │   │   ├── api.js          # Axios instance for API requests
  │   │   └── App.js          # Main React entry point
  │   └── tailwind.config.js  # TailwindCSS config file
  ├── server/                 # Node.js backend
  │   ├── controllers/        # Handle business logic (auth, posts, users)
  │   ├── models/             # Mongoose models (User, Post, Comment)
  │   ├── routes/             # API routes (auth, posts, users)
  │   ├── middleware/         # Middleware for things like authentication
  │   ├── utils/              # Utility functions (JWT, image processing)
  │   ├── uploads/            # Optional local upload storage (if not using Cloudinary)
  │   └── server.js           # Main server file
  └── README.md               # Project overview & setup instructions
```

## Setup Instructions

### Frontend (client)
1. `cd client`
2. `npm install`
3. `npm run dev`

### Backend (server)
1. `cd server`
2. `npm install express mongoose cors dotenv`
3. `node server.js`


- Update `.env` files as needed for environment variables.
- Replace placeholder code with your actual implementation.
