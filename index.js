const express = require('express')
const app = express()
const port = 5050
const { User } = require('./models/User');

const config = require('./config/key')

// application/x-www-form-urlencoded
// application/json
app.use(express.json(), express.urlencoded({extended: true}))

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    // 이걸 써줘야 에러가 안뜸 // 하지만 6.0이상 최신 버전에선 이미 default 값이기 때문에 써있으면 에러가 남!!!!
}).then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res)=> {
  // 회원가입 필요 정보들을 client에서 가져오면 그것들을 db에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo)=> {
    if(err) res.json({ success: false, err })
    res.status(200).json({ success: true })
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})