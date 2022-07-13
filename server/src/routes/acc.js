const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../middleware/config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const accSchema = joi.object({
  group_id: joi.number().required(),
  user_id: joi.number().required(),
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(`SELECT user_id FROM accounts
    JOIN njsegz.groups ON accounts.group_id=users.id`);

    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId, user_id: userId } = req.body;
  try {
    await accSchema.validateAsync({ group_id: groupId, user_id: userId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO accounts SET ?', {
      group_id: groupId,
      user_id: userId,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
