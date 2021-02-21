const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

app.listen(PORT, () => {
  console.log(`server is running in PORT ${PORT}`);
});
