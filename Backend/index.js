const express = require('express');
const app = express();
const port = 5000;
const mongo = require("./db");

mongo();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
