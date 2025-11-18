/**
 * Author: Joe Akindele
 * Date: Today
 * File: feedback/index.js
 * Description: API to fetch feedback by channel
 */

'use strict';

const express = require('express');
const router = express.Router();
const { mongo } = require('../../utils/mongo');

router.get('/by-channel/:channel', async (req, res) => {
  try {
    const channel = req.params.channel;

    const db = await mongo();
    const feedback = await db.collection('customerFeedback')
      .find({ channel: channel })
      .toArray();

    return res.status(200).json({
      message: 'Feedback retrieved successfully',
      feedback
    });

  } catch (err) {
    return res.status(500).json({
      message: 'Server Error',
      error: err.message
    });
  }
});

module.exports = router;
