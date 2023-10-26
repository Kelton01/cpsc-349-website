const http = require("http");
const fs = require("fs");
const path = require("path");

const mysql = require("mysql2/promise");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: "sql3.freesqldatabase.com",
  user: "sql3653603",
  password: "JbAepJD1Ir",
  database: "sql3653603"
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/save-data", async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const [results, fields] = await connection.execute(
        "INSERT INTO user_info (background_color, font_family, name, position, phone_number, email, website) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          data.backgroundColor,
          data.fontFamily,
          data.name,
          data.position,
          data.number,
          data.email,
          data.website,
        ]
      );
      console.log("Data saved successfully:", results);
      res.status(200).json({ message: "Data saved successfully." });
    } else {
      res.status(400).json({ message: "Invalid data sent." });
    }
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Failed to save data." });
  }
})

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
