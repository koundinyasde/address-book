const express = require('express');
const jwt = require('jsonwebtoken');
const { authorizeToken } = require('../controller/contacts');
const Book = require('../models');
const constants = require('../utils/constants');
const router = express.Router();

// Get contacts including pagination and search on name and mobile and filter on id
router.get('/', async (req, res) => {
  try {
    const verify = authorizeToken(req);
    if (verify.error) {
      return res.status(400).json(verify);
    }
    const search = ['first_name', 'mobile', 'last_name'];
    console.log('query params', req.query);
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    var filters = { $or: [] };
    if (req.query._id) {
      filters._id = req.query._id;
    }
    search.forEach((item) => {
      if (Object.keys(req.query).includes(item)) {
        filters.$or.push({ item: { $regex: '.*' + req.query[item] + '.*' } });
      }
    });
    if (filters.$or.length == 0) {
      delete filters['$or'];
    }
    console.log('get filters', filters);
    const contacts = await Book.find(filters).limit(limit).skip(offset);
    return res.status(200).json({ status: 'success', data: contacts, status_code: 200 });
  } catch (err) {
    console.log('Error while getting contacts', err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// Adding single contact into the collection payload should be an object
router.post('/add', async (req, res) => {
  try {
    const verify = authorizeToken(req);
    if (verify.error) {
      return res.status(400).json(verify);
    }
    console.log('body', req.body);
    const contact = await Book.insertMany([req.body]);
    return res.status(200).json({ status: 'success', data: contact, status_code: 200 });
  } catch (err) {
    console.log('Error while adding single contact', err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// Adding bulk contacts into the collection payload should be an array of objects
router.post('/bulk', async (req, res) => {
  try {
    const verify = authorizeToken(req);
    if (verify.error) {
      return res.status(400).json(verify);
    }
    console.log('body', req.body);
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ status_code: 400, message: 'Request payload should be an array' });
    }
    const contact = await Book.insertMany(req.body);
    return res.status(200).json({ status: 'success', data: contact, status_code: 200 });
  } catch (err) {
    console.log('Error while adding bulk contacts', err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// To delete a document
router.delete('/:id', async (req, res) => {
  try {
    const verify = authorizeToken(req);
    if (verify.error) {
      return res.status(400).json(verify);
    }
    const contact = await Book.remove({ _id: req.params.id });
    return res.status(200).json({ status: 'success', data: contact, status_code: 200 });
  } catch (err) {
    console.log('Error while deleting contact', err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// To update any documment
router.put('/', async (req, res) => {
  try {
    const verify = authorizeToken(req);
    if (verify.error) {
      return res.status(400).json(verify);
    }
    const id = req.body._id;
    if (!id) {
      return res.status(400).json({ status_code: 400, message: 'Request payload should contain id' });
    }
    const contact = await Book.updateOne({ _id: req.body._id }, req.body);
    return res.status(200).json({ status: 'success', data: contact, status_code: 200 });
  } catch (err) {
    console.log('Error while updating contact', err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// Api for generating token
router.get('/get/token', async (req, res) => {
  try {
    //Creating jwt token
    const token = jwt.sign({}, constants.SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({ status: 'success', token, status_code: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

// verify token
router.post('/verify/token', async (req, res) => {
  try {
    //Creating jwt token
    const token = authorizeToken(req);
    if (token.error) {
      return res.status(400).json(token);
    }
    return res.status(200).json({ status: 'success', token, status_code: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'failed', status_code: 500, message: err.message || err, err: err });
  }
});

module.exports = router;
