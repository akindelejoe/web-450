/**
 * @description
 * GET /performance-by-feedback
 * Fetches agent performance data grouped by customer feedback (positive, neutral, negative)
 *
 * Example:
 * fetch('/api/reports/agent-performance/performance-by-feedback?startDate=2024-01-01&endDate=2024-01-31')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
'use strict';

//required statements
const express = require('express');
const { mongo } = require('../../../utils/mongo');
const createError = require('http-errors');

//API configuration
const router = express.Router(); 

//API call
router.get('/call-duration-by-date-range', (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(createError(400, 'Start date and end date are required'));
    }

    console.log('Fetching agent performance by feedback:', startDate, endDate);

    mongo(async db => {
      const data = await db.collection('agentPerformance').aggregate([
        {
          $match: {
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        },
        {
          $lookup: {
            from: 'customerFeedback',
            localField: 'agentId',
            foreignField: 'agentId',
            as: 'feedbackDetails'
          }
        },
        { $unwind: '$feedbackDetails' },
        {
          $group: {
            _id: '$feedbackDetails.rating',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            feedback: '$_id',
            count: 1
          }
        }
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error('Error in /performance-by-feedback', err);
    next(err);
  }
});

module.exports = router;