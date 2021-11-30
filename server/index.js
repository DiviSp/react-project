const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const pg = require('pg');
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'prod',
  password: 'Qwerty',
  port: 5432,
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  
    
  pool.query('INSERT INTO mern (name,age,country,position,wage) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, age, country, position, wage], (error, results) => {
    if (error) {
      console.log(error);
    }
    res.send("Values Inserted");
  })
});

app.get("/", (req, res) => {
 
  console.log("testing");
  
    pool.query('SELECT * FROM mern', (error, results) => {
      if (error) {
        console.log(error);
        
      }
     res.send(results);
    })
  });
  


app.put("/update", (req, res) => {
  const name = req.body.name;
  const wage = req.body.wage;
  pool.query(
    "UPDATE mern SET wage = $1 WHERE name = $2 ",
    [wage, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:name", (req, res) => {
  const name = req.params.name;
  pool.query("DELETE FROM mern WHERE name = $1 RETURNING *", [name], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("shit");
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
