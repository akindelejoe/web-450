'use strict'

const express = require ('express')
const mongo = require ('../../../utils/mongo');

const router = express.Router();

/**
 * GET /api/reports/sales/regions
 * Returns distinct list of regions from the sales collection.
 */
router.get('/regions', async (req, res, next)=> {
 try {
   await mongo(async db => {
    const region = await db.collection('sales').distinct('regions');
    res.status(200).send(regions);
   }, next)
} catch (err) {
    console.error('Error getting regions: ',err);
    next (err);
 }
});

/**
 * GET /api/reports/sales/by-region/:region
 * Returns totals per salesperson for a given region.
 */

router.get('/by-region/:region', async(req, res, next) => {
    try{
        const { region } = req.params;

        await mongo(async db => {
          const results = await db.collection('sales').aggregate([
            { $match: { region } },
            {
              $group: {
                _id: '$salesperson',
                total: { $sum: '$amount' }
              }
            },
            {
              $project: {
                _id: 0,
                salesperson: '$_id',
                total: 1
              }
            },
            { $sort: { salesperson: 1 } }
          ]).toArray();
    
          res.status(200).send(results);
        }, next);


    } catch (err) {
        console.error ('Error getting sales data for region: ', err);
        next(err);
    }
});

module.exports = router;