const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:7q8w9e0r!!@mymongo.gv5pbu2.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('안녕하세요! Web 입니다!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
