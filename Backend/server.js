const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors"); // Import CORS middleware

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sachin@6763",
  database: "project",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);
});

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Serve static files from the root public folder of your React app
app.use(express.static(path.join(__dirname, "../Frontend/public")));

app.get("/api/products", (req, res) => {
  // const { UserID } = req.params;
  const query = "SELECT * FROM products";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res
        .status(500)
        .json({ error: "Error fetching products from the database" });
      return;
    }
    res.json(results);
  });
});

// app.post("/api/getCartID", (req, res) => {
//   const { Username } = req.body;
//   const query = `SELECT cart.CartID FROM cart WHERE cart.UserID = (SELECT users.UserID FROM users WHERE users.Username='${Username}')`;

//   connection.query(query, (error, results, fields) => {
//     if (error) {
//       console.error("Error in getting CartID", error.stack);
//       res.status(500).json({ error: "Error in getting cartId" });
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get("/api/cartDetails/:UserID", (req, res) => {
  const { UserID } = req.params;
  const query = `SELECT distinct products.productID, products.ProductName, products.Price, cartDetails.Quantity 
                 FROM cartDetails 
                 JOIN products ON cartDetails.ProductID = products.ProductID 
                 WHERE cartDetails.userID = '${UserID}'`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res
        .status(500)
        .json({ error: "Error fetching cartDetails from the database" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/addToCart/:ProductID/:UserID", (req, res) => {
  const { ProductID, UserID } = req.params;
  // const CartID = 1; // Assuming CartID is hardcoded as 1 for this example
  const Quantity = 1; // Assuming Quantity is hardcoded as 1 for this example

  const query = `INSERT INTO cartdetails (UserID, ProductID, Quantity) VALUES ('${UserID}', ${ProductID}, ${Quantity})`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).json({ error: "Error adding item to cartDetails" });
    } else {
      // If the query is successful, send a success response
      res.json("success");
    }
  });
});

app.get("/api/modifyCart/:ProductID/:Offset/:UserID", (req, res) => {
  const { ProductID, Offset, UserID } = req.params;
  // const CartID = 1; // Assuming CartID is hardcoded as 1 for this example
  console.log(Offset, ProductID);

  const query = `UPDATE cartdetails SET Quantity = Quantity + ${Offset} WHERE (UserID = '${UserID}' AND ProductID = ${ProductID} AND Quantity + ${Offset} >= 1);`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).json({ error: "Error updating item to cartDetails" });
    } else {
      // If the query is successful, send a success response
      res.json("success");
    }
  });
});

app.get("/api/removeProductFromCart/:ProductID/:UserID", (req, res) => {
  const { ProductID, UserID } = req.params;
  // const CartID = 1; // Assuming CartID is hardcoded as 1 for this example
  // console.log(Offset, ProductID);

  const query = `DELETE From cartdetails  where  ProductID = ${ProductID} AND UserID='${UserID}' ;`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).json({ error: "Error updating item to cartDetails" });
    } else {
      // If the query is successful, send a success response
      res.json("success");
    }
  });
});

app.post("/api/signup", (req, res) => {
  const { UserID, Password, Email, PhoneNumber } = req.body;

  // Check if the email is already registered
  const emailCheckQuery = `SELECT * FROM users WHERE Email = ?`;
  connection.query(emailCheckQuery, [Email], (emailError, emailResults) => {
    if (emailError) {
      console.error("Error checking email: " + emailError.stack);
      res.status(500).json({ error: "Error checking email" });
    } else if (emailResults.length > 0) {
      // Email already exists, send an error response
      res.status(400).json({ error: "Email is already taken" });
    } else {
      // Email is unique, check if the UserID is unique
      const userIDCheckQuery = "SELECT * FROM users WHERE UserID = ?";
      connection.query(
        userIDCheckQuery,
        [UserID],
        (userIDError, userIDResults) => {
          if (userIDError) {
            console.error("Error checking UserID: " + userIDError.stack);
            res.status(500).json({ error: "Error checking UserID" });
          } else if (userIDResults.length > 0) {
            // UserID already exists, send an error response
            res.status(400).json({ error: "UserID is already taken" });
          } else {
            // UserID is also unique, proceed with registration
            const insertQuery =
              "INSERT INTO users (UserID, Password, Phonenumber, Email) VALUES (?, ?, ?, ?)";
            connection.query(
              insertQuery,
              [UserID, Password, PhoneNumber, Email],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error("Error executing query: " + insertError.stack);
                  res.status(500).json({ error: "Error registering user" });
                } else {
                  res.json({ message: "User registered successfully" });
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post("/api/login", (req, res) => {
  const { userID, password } = req.body;
  const query = `SELECT * FROM users WHERE userID = ? AND password = ?`;
  connection.query(query, [userID, password], (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).json({ error: "Error logging in" });
    } else {
      if (results.length > 0) {
        // User found, send a success response
        res.json({ message: "Login successful" });
      } else {
        // User not found, send an error response
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
});

app.post("/api/storeAddress", (req, res) => {
  const { UserID, StreetAddress, City, State, ZipCode, Country, Extra } =
    req.body;
  console.log("jere");
  console.log("s" + req.body);

  // const userId = req.body.UserID; // Assuming UserID is sent in the request

  const sql = `INSERT INTO useraddresses (UserID, StreetAddress, City, State, ZipCode, Country) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [UserID, StreetAddress, City, State, ZipCode, Country];

  // Insert data into the useraddresses table
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error storing address in database: ", err);
      console.log(UserID, StreetAddress, City, State, ZipCode, Country, Extra);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Address stored in database successfully!");
      res.status(200).json({ message: "Address stored successfully" });
    }
  });
});

app.get("/api/checkAddress/:UserID", (req, res) => {
  const { UserID } = req.params;
  const query = `SELECT COUNT(*) as addressCount FROM useraddresses WHERE UserID='${UserID}'`;

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res
        .status(500)
        .json({ error: "Error in Checking for existence of the addresses" });
    } else {
      // If the query is successful, send the count of addresses
      res.json(results[0].addressCount);
    }
  });
});

app.get("*", (req, res) => {
  // Serve the React app's index.html from the root public folder
  res.sendFile(path.join(__dirname, "../Frontend/public/index.html"));
});

const PORT = process.env.PORT || 4000; // Use environment variable for port or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
