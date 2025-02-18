const express = require("express");
const cors = require("cors");
const fs = require("fs");



const jsonFile = "data.json";
const data = fs.readFileSync(jsonFile, "utf-8");
const config = JSON.parse(data);




const app = express();


app.use(express.json());
app.use(cors({ origin: "*" }));



const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};




const adminMiddleware = (req, res, next) => {
  if (req.headers.authorization !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};





 const registerRoute = (method, endpoint, middlewares, handler) => {
   if (app._router.stack.some(layer => layer.route && layer.route.path === endpoint)) {
     console.warn(`Duplicate route: ${endpoint} already exists.`);
     return;
   }
   app[method.toLowerCase()](endpoint, ...middlewares, handler);
 };




 if (Array.isArray(config.nodes)) {
       config.nodes.forEach((node) => {
         const { id, name, source, target, properties } = node;
         console.log(`Node ID: ${id}, Name: ${name}, Source: ${source}, Target: ${target}`);
    
         if (!properties || !properties.endpoint || !properties.method) return;
    
         const routeMiddleware = [];
         if (properties.auth_required) routeMiddleware.push(authMiddleware);
         if (properties.admin_required) routeMiddleware.push(adminMiddleware);
    
         registerRoute(properties.method, properties.endpoint, routeMiddleware, (req, res) => {
           res.json({ message: `${name} - Success` });
         });
       });
     } else {
       console.error("Invalid or missing 'nodes' property in JSON");
     }







config.nodes.forEach((node) => {
  console.log(
    `Node ID: ${node.id}, Name: ${node.name}, Source: ${node.source}, Target: ${node.target}`
  );
});




app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }
    res.json({ message: "Login successful" });
  });
  



  app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Missing username or password" });
    }
    res.json({ message: "Signup successful" });
  });



app.post("/signout", (req, res) => res.json({ message: "Signout successful" }));

app.get("/user", authMiddleware, (req, res) => res.json({ message: "User data" }));

app.get("/admin", authMiddleware, adminMiddleware, (req, res) =>
  res.json({ message: "Admin data" })
);

app.get("/home", (req, res) => res.json({ message: "Welcome to Home Page" }));

app.get("/about", (req, res) => res.json({ message: "About us" }));

app.get("/news", (req, res) => res.json({ message: "Latest news" }));

app.get("/blogs", (req, res) => res.json({ message: "Blogs list" }));





const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
