const { Router } = require('express');
const CountryRoute = require('./CountryRoute')
const ActivityRoute = require('./ActivityRoute')

const router = Router();

router.use('/countries', CountryRoute)
router.use('/activities', ActivityRoute)

module.exports = router;
