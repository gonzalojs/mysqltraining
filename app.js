const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

// Connect
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('MySql Connected')
})

const app = express()

// create table
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Post Table Created...')
  })
})


// Create Db
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('database created...')
  })
})

// insert post 1
app.get('/addpost1', (req, res) => {
  let post = {
    title: 'Post One',
    body: 'This is post number one'
  }
  let sql = 'INSERT INTO posts SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('post one added')
  })
})

app.listen('3000', () => {
  console.log('server started on port 3000')
})