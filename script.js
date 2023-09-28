console.log("Starting program.")
// const flag = require('./databasepg')
const express = require('express');
const app = express();
const port = 3000; // Connects to localhost:3000

//
const { Pool } = require('pg');


async function checkDatabaseConnection() {
  // The object below has the postgres test DB credentials / configurations. Port : 5432, name : test, user : postgres.
  const dbConfig = {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "900900",
    database: "test"
  };
  const pool = new Pool(dbConfig);


  try {
    // The line below connects to the main test postgres DB.
    const client = await pool.connect();
    // Releases the resource on successful connection.
    client.release();
    return true;
  } catch (error) {
    //console.error('Database connection error:', error);
    return false;
  } finally {
    pool.end();
  }

}
//


// Adds the Cache-control on the Header.
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  // Simulate a database connection check (replace with your own logic)
  const isDBConnected = checkDatabaseConnection();
  let flag = isDBConnected.then((result) => {
    //console.log(result); // "Promise resolved"
    if (result) {
      res.status(200).send();
      console.log("200");
    } else {
      res.status(503).send();
      console.log("503");
    }
  })
});
// The following code handles all other HTTP requests. Sends 405.
app.all('/healthz', (req, res) => {
  res.status(405).send();
  console.log("405");
});


// Starts the server, on port 3000.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
