const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const DB_CONFIG = require('../middleware/config');
const isLoggedIn = require('../middleware/authorization');

const router = express.Router();

const accSchema = joi.object({
  group_id: joi.number().required(),
});

router.get('/?', isLoggedIn, async (req, res) => {
  const { userId } = req.query;
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.query(`SELECT *
    FROM ((accounts
    JOIN njsegz.groups ON accounts.group_id = njsegz.groups.id)
    JOIN users ON accounts.user_id = users.id) WHERE user_id="${userId}"`);
    await connection.end();
    return res.json(rows);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', isLoggedIn, async (req, res) => {
  const { group_id: groupId } = req.body;
  try {
    await accSchema.validateAsync({ group_id: groupId });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [response] = await connection.query('INSERT INTO accounts SET ?', {
      user_id: req.userId,
      group_id: groupId,
    });
    await connection.end();
    return res.json(response);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
