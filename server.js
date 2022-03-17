const express = require('express');
const cors = require('cors');
const db = require('./db')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/dist/'));

app.get('/api', (req, res) => {
  res.send("BTurl API")
})

app.get('/api/urls/:code', async (req, res) => {
  try {
    let urlCode = req.params.code
    let item = await db.urlModel.findOne({ urlCode });
    res.status(200).json(item)
  } catch (error) {
    res.status(error.status || 500).json(error.message || 'Something went wrong')
  }
})

app.post('/api/urls', async (req, res) => {
  try {
    let item = await db.urlModel.create(req.body);
    res.status(200).json(item)
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(error.message || 'Something went wrong')
  }
})

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.listen(PORT, () => {
  db.connectDB();
  console.log(`Server running in port: ${PORT}`)
});
