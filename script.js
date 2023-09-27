console.log("Starting program.")
// const flag = require('./databasepg')
const express = require('express');
const app = express();
const port = 3000; // You can change the port as needed

//
const { Pool } = require('pg');


async function checkDatabaseConnection() {
  const dbConfig = {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "900900",
    database: "test"
  };
  const pool = new Pool(dbConfig);
  // Replace these with your actual PostgreSQL database credentials

  try {
    // Attempt to connect to the PostgreSQL database
    const client = await pool.connect();
    console.error('Checkpoint 1');
    // If the connection is successful, release it and return true
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  } finally {
    pool.end();
  }

  // flag = false;
  // client.query("select * from users", (err, res) => {
  //   if (!err) {
  //     console.log(res.rows);
  //     flag = true;
  //   } else {
  //     console.log(err.message);
  //     flag =  false;
  //   }
  // })
  // return flag;
  // client.end();

}
//


// Middleware to add Cache-Control header
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  // Simulate a database connection check (replace with your own logic)
  const isDBConnected = checkDatabaseConnection();

  if (isDBConnected) {
    res.status(200).send();
    console.log("200");
  } else {
    res.status(503).send();
    console.log("503");
  }
});
// Handle unsupported HTTP methods for /healthz
app.all('/healthz', (req, res) => {
  res.status(405).send();
  console.log("405")
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
