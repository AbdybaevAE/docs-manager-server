const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const cors = require('cors');
const port = 3000
app.use(bodyParser.json()) // for parsing application/json
const user = {
  username: 'aaa',
  password: 'bbb',
  token: 'this_is_token'
}
app.use(cors());
app.use((req, res, next) => {
  console.log(req.url, req.query, req.body);
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/file', (req,res) => {
  console.log(req.body);

  res.send('ok!');
})
app.post('/auth/login', (req, res) => {
  const {
    username,
    password,
    role
  } = req.body;
  if (user.username == username && user.password == password) {
    res.set('Authorization', user.token);
    res.set('Access-Control-Expose-Headers', 'Authorization');
    return res.status(200).end();
  }
  return res.status(401).send('not found');
});
app.post('/metadata/search', (req,res) => {
  console.log(req.headers);
  if (req.headers.authorization != user.token) return res.status(401).send("Unauth");
  res.status(200).json(data);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
const data = [];
for (let j = 0; j < 300; j++) {
  // generate
  const types = ['first_type', 'second_type', 'third_type'];
  const faker = require('faker');
  const item = {
    id: String(faker.random.uuid()),
    file_name: faker.system.fileName(),
    type: types[faker.random.number(1000) % types.length],
    number: String(faker.random.number(100000)),
    class: faker.company.companyName(),
    metadata: {},
    created_at: faker.date.past()
  }
  const maxMetaDataLength = 10;
  const numsOfMetadata = faker.random.number(1000) % maxMetaDataLength;
  for (let i = 0; i <= numsOfMetadata; i++) {
    item.metadata[faker.hacker.noun()] = faker.hacker.noun();
  }
  data.push(item);
}
const fs = require('fs');
fs.writeFileSync('./docs.json', JSON.stringify(data, null, 2));
