const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRouter = require('./src/routes/auth');
const groupsRouter = require('./src/routes/groups');
const accRouter = require('./src/routes/acc');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/acc', accRouter);
app.all('*', (req, res) => {
  res.status(404).send('Path not found!');
});

app.listen(PORT, () => console.log(`Server is UP on:${PORT}`));
