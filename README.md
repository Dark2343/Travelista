# Travelista — MERN Stack Event Management System

## Overview  
Travelista is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with TailwindCSS. It enables users to browse, book, and manage events with distinct roles for Admins and regular Users.

## Design  
The entire UI/UX design was created first using **Figma**, allowing for a clean and modern user experience that was then implemented in React with TailwindCSS.

---

## Features

### Authentication  
- User registration and login system with JWT-based authentication.  
- Role-based access control differentiating Admin and User privileges.  

### Event Listings  
- Responsive flex layout using TailwindCSS for event display.                         ---EDIT
- Filtering by categories and tags for easy event discovery.  
- Booked events display a "Booked" label instead of "Book Now" for users.  

### Event Details  
- Detailed event page showing event name, description, category, date, location, price, and image.  
- One-click booking functionality that redirects to a confirmation screen upon success.  

### Admin Panel  
- Separate admin dashboard to Create, Read, Update, and Delete (CRUD) events.  
- Event image upload support with file validation.                                    ---EDIT
- Management of event tags and categories.
- Pagination implemented for performance optimization.

### UI/UX  
- Dark mode support throughout the application with seamless toggling.  
- Clean and modern UI design built entirely with TailwindCSS.  

---

## Technical Highlights  

### Backend  
- Built with Node.js and Express.js, following REST API principles.  
- Secure authentication and authorization using JSON Web Tokens (JWT).  
- MongoDB with Mongoose for schema-based data modeling.  
- Role-based permissions to restrict access to admin-only routes.  

### Frontend  
- React.js functional components with React Router for SPA navigation.  
- State management using React Context API.                                           ---EDIT
- TailwindCSS for utility-first responsive styling and theming.  

### Deployment  
- Backend and frontend deployed on [Insert Platform: Render, Vercel, Heroku, etc.].   ---EDIT
- Environment variables managed securely.  
- Continuous deployment setup via GitHub Actions (optional).                          ---EDIT

---

## Installation & Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/travelista.git
   cd travelista
   ```

2. Backend:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

3. Frontend:
    ```bash
    cd ../frontend
    npm install
    npm start
    ```
