const express = require('express')
const app = express();
const path = require('path');

app.use("/static", express.static('./static/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});