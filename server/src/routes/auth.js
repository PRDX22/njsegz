const express = require('express');
const joi = require('joi');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DB_CONFIG = require('../middleware/config');

const router = express.Router();

const authSchema = joi.object({
  full_name: joi.string(),
  email: joi.string().required().email(),
  password: joi.string().min(4).required(),
});

router.post('/register', async (req, res) => {
  const { full_name: name, email, password } = req.body;
  try {
    await authSchema.validateAsync({ full_name: name, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await mysql.createConnection(DB_CONFIG);
    // check, if email already exist
    const [rows] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    if (rows.length > 0) {
      return res.status(400).json({
        status: 'Bad Request!',
        error: 'Email already registered!',
      });
    }
    const [response] = await connection.query('INSERT INTO users SET ?', {
      full_name: name,
      email,
      password: hashedPassword,
    });
    await connection.end();

    return res.json({
      response,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await authSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [user] = await connection.query(
      `SELECT * FROM users WHERE email="${email}"`,
    );
    await connection.end();
    if (user.length === 0) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'User not found!' });
    }
    const compare = await bcrypt.compare(password, user[0].password);
    if (!compare) {
      return res
        .status(400)
        .json({ status: 'Bad Request!', error: 'Password is incorrect!' });
    }
    const token = jwt.sign(
      {
        id: user[0].id,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      user: {
        id: user[0].id,
        name: user[0].full_name,
        created_at: user[0].reg_timestamp,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
