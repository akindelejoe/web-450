'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

const router = express.Router();

// GET /channel-rating-by-month
router.get('/channel-rating-by-month', (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return next(createError(400, 'month and channel are required'));
    }

    mongo(async db => {
      const data = await db
        .collection('customerFeedback')
        .aggregate([
          { $addFields: { date: { $toDate: '$date' } } },
          {
            $group: {
              _id: { channel: '$channel', month: { $month: '$date' } },
              ratingAvg: { $avg: '$rating' },
            },
          },
          { $match: { '_id.month': Number(month) } },
          {
            $project: {
              _id: 0,
              channel: '$_id.channel',
              ratingAvg: 1,
            },
          },
        ])
        .toArray();

      res.send(data);
    }, next);
  } catch (err) {
    next(err);
  }
});

// GET /feedback-by-channel
router.get('/feedback-by-channel', (req, res, next) => {
  try {
    mongo(async db => {
      const data = await db.collection('customerFeedback').aggregate([
        {
          $group: {
            _id: '$channel',
            total: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            channel: '$_id',
            total: 1,
          },
        },
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
