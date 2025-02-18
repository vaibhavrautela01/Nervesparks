#Nervesparks
# Dynamic Express Server

## First Step
type 
npm i (for installing all the important file modules)

## For Run
npm start (basically it is a nodemon server.js file that is being started)

## Assignment

This project dynamically generates Express routes based on a provided JSON configuration file (`example2.json`).

## Features
- Dynamic route generation from JSON configuration
- Authentication and admin authorization middleware
- Static routes for login, signup, signout, and informational pages
- 404 handler for unknown routes

## Project Structure
```
.
├── example2.json   # JSON file defining dynamic routes
├── test.js         # Main Express server script
└── README.md       # Project documentation
```

## Prerequisites
- Node.js (version 18.x or higher)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install express cors
   ```

## Configuration
Ensure the `example2.json` file is properly structured. Example structure:

```json
{
  "nodes": [
    {
      "id": 1,
      "name": "Get Users",
      "source": "user-service",
      "target": "frontend",
      "properties": {
        "method": "GET",
        "endpoint": "/users",
        "auth_required": true,
        "admin_required": false
      }
    }
  ]
}
```

## Usage
1. Start the server:
   ```bash
   node test.js
   ```

2. Access the API:
- `POST /login` - User login
- `POST /signup` - User signup
- `POST /signout` - User signout
- `GET /home` - Home page
- `GET /about` - About page
- `GET /news` - News page
- `GET /blogs` - Blogs page

### Dynamic Routes
Dynamic routes are generated from `example2.json` based on the properties:
- `method` - HTTP method (GET, POST, PUT, DELETE)
- `endpoint` - Route path (e.g., `/users`)
- `auth_required` - Requires authentication
- `admin_required` - Requires admin privileges

## Example Request
```bash
curl -H "Authorization: admin" http://localhost:8080/users
```



