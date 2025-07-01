# TatvaBox—AI

TatvaBox is a React-based AI-powered platform to explore, create, and interact with Tatvas. It offers user authentication, admin tools for content creation, Markdown-supported descriptions, and AI Q&A functionality.

---

## Features

-  **Authentication**
  - User Signup & Login
  - Role-based access (Admin/User)
  - Token storage using `sessionStorage`

- **Tatva Exploration**
  - View Tatva elements
  - Ask questions about each Tatva (AI integration using `/ai/ask`)
  - Rich Markdown descriptions (rendered with `react-markdown`)

- **Admin Capabilities**
  - Create new Tatvas (`/tatva/create`)
  - Update existing Tatvas (`/tatva/update/:id`)
  - Delete Tatvas
  - Markdown editor for rich content (`@uiw/react-md-editor`)

- **AI Interaction**
  - Ask personalized questions about a Tatva
  - Real-time insights powered via backend AI API

- **Design**
  - TailwindCSS styling
  - Background image, gradient overlays, and responsive layout
  - Heroicons for action buttons

  # TatvaBox Backend

This is the backend server for **TatvaBox**, a Tatva AI-powered knowledge system. It handles authentication, role-based access, Tatva CRUD operations, image uploads, and AI question answering via **Groq AI**.

---

## Features

-  Authentication (JWT-based)
- Role-based access (Admin, User)
- Tatva CRUD (Create, Read, Update, Delete)
- Image upload via Cloudinary
- AI interaction with **Groq AI**
- MongoDB-based storage

---

##  Environment Variables (`.env`)

Create a `.env` file in the root of the backend with the following keys:

```env
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>
PORT=2233
CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_SECRET_KEY=<Your Cloudinary Secret Key>
GROQ_API_KEY=<Your Groq AI Key>

---

To run backend use 
`dotenvx run -- node index.js`

## Future Improvements 

- Adding Listing Page for Tatva
- Develop community page 
- Implement Real-time communication 
- Add a Q&A to give more information about it and what it is for
- UI improvements
- Backend Api improments 