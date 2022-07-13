const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../middleware/config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const groupsSchema = joi.object({
  name: joi.string().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query('SELECT * FROM njsegz.groups');
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { name } = req.body;
  try {
    await groupsSchema.validateAsync({ name });
  } catch (err) {
    return res.status(400).json({
      error: 'Required name as string and not empty!',
    });
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query(
      'INSERT INTO njsegz.groups SET ?',
      {
        name,
      },
    );
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
