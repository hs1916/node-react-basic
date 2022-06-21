const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const {User} = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose');
console.log(config.mongoURI)
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('안녕하세요! Web 입니다! 변경이요')
})

app.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
