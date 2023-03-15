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

app.listen(5000, () => {
  console.log('Server is started.')
})
