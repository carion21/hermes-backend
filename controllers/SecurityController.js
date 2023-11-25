const express = require('express');
const router = express.Router();

const service = 'security'

// routers
const index = require('../routes/' + service + '/index')
const sign_in = require('../routes/' + service + '/sign_in')
const sign_out = require('../routes/' + service + '/sign_out')

const init_system = require('../routes/' + service + '/init_system')

// routes with each router
router.use('/', index)
router.use('/sign_in', sign_in)
router.use('/sign_out', sign_out)

// router.use('/init_system', init_system)


module.exports = router;