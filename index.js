const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000
app.use(bodyParser.json()) // for parsing application/json
const UsersDB = require('./users.json');
app.use(cors());
app.use((req,res,next) => {
  console.log(req.url, req.query, req.body);
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req,res) => {
  const {
    username,
    password
  } = req.body;
  for (const user of UsersDB) {
    if (user.username == username && user.password == password) {
      return res.status(200).json({
        token: user.token
      });
    }
    return res.status(401).send('not found');
  }
  

});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})