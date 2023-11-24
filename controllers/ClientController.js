const express = require('express');
const router = express.Router();

const service = 'client'

// routers
const index = require('../routes/' + service + '/index')

const request_list = require('../routes/' + service + '/request_list')
const new_request = require('../routes/' + service + '/new_request')
const update_request = require('../routes/' + service + '/update_request')
const view_request = require('../routes/' + service + '/view_request')

const message_list_by_request = require('../routes/' + service + '/message_list_by_request')
const new_message = require('../routes/' + service + '/new_message')


// routes with each router
router.use('/', index)

router.use('/request_list', request_list)
router.use('/new_request', new_request)
router.use('/update_request', update_request)
router.use('/view_request', view_request)

router.use('/message_list_by_request', message_list_by_request)
router.use('/new_message', new_message)


module.exports = router;