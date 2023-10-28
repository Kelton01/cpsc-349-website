require('dotenv').config();
const http = require("http");
const fs = require("fs");
const path = require("path");
const User = require('./database/User')

//const mysql = require("mysql2/promise");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const connectDB = require('./database/db')

connectDB();



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

function insertPostData() {
  User.insertMany([

  ])
}


app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));


});

app.post('register', async (req, res) => {
    
  // const data = new LogInCollection({
  //     name: req.body.name,
  //     password: req.body.password
  // })
  // await data.save()

  const data = {
      user: req.body.email,
      password: req.body.password
  }

  const checking = await LogInCollection.findOne({ email: req.body.email })

 try{
  if (checking.email === req.body.email && checking.password===req.body.password) {
      res.send("user details already exists")
  }
  else{
      await LogInCollection.insertMany([data])
  }
 }
 catch{
  res.send("wrong inputs")
 }

  res.status(201).sendFile(path.join(__dirname, '/public/home.html'), {
      naming: req.body.email
  })
})


  