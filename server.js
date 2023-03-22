const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6402515',
  password: '6402515',
  database: 'u6402515_mobile',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

app.get('/customers', function(req, res) {
  connection.query(
    'SELECT * FROM a1_customer',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/orders', function(req, res) {
  connection.query(
    'SELECT * FROM a1_order',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/products', function(req, res) {
  connection.query(
    'SELECT * FROM a1_product',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

// เรียงลับดับจากคนที่ซื้อเยอะ => น้อยที่สุด
app.get("/top_customers", function (req, res) {
  connection.query(
    `SELECT 
    C.firstname, 
    SUM(O.quantity*P.price) AS price_sum 
  FROM a1_customer AS C 
    INNER JOIN a1_order AS O ON C.Cid = O.Oid
    INNER JOIN a1_product AS P ON O.Pid = P.Pid 
  GROUP BY 
    C.Cid 
  ORDER BY 
    price_sum DESC;`,
    function (err, results) {
      res.json(results);
    }
  );
});

// เรียงลับดับจากคนที่ซื้อเยอะ => น้อยที่สุด
app.get('/top_products', function(req, res){
  connection.query(
    `SELECT O.id, P.Pname, O.quantity, SUM(O.quantity*P.price) as Total_quantity FROM a1_order as O INNER JOIN a1_product as P ON O.Pid= P.Pid GROUP BY O.id, P.Name, O.quantity, P.price ORDER BY Total_quantity DESC;`,
    function (err, results) {
      res.json(results);
    }
  );
});


app.post("/createusers", function (req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const address = req.body.address;
  const phone = req.body.phone;
  connection.query(
    `INSERT INTO a1_customer (firstname, lastname, email, address, phone) VALUES (?, ?, ?, ?, ? )`,
    [firstname, lastname, email, address, phone],
    function (err, results) {
      if (err) {
        res.json(err);
      }
      res.json(results);
    }
  );
});

app.post('/orders', function(req, res) {
  const values = req.body
  console.log(values)
  connection.query(
    'INSERT INTO a1_order (Oid, Cid, Pid, quantity) VALUES ?', [values],
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})


app.listen(5000, () => {
  console.log("Server is started.");
});