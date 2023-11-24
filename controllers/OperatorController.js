const express = require('express');
const router = express.Router();

const service = 'operator'

// routers
const index = require('../routes/' + service + '/index')

const request_list = require('../routes/' + service + '/request_list')
const update_request = require('../routes/' + service + '/update_request')
const view_request = require('../routes/' + service + '/view_request')
const enable_request = require('../routes/' + service + '/enable_request')
const disable_request = require('../routes/' + service + '/disable_request')
const delete_request = require('../routes/' + service + '/delete_request')

const view_client = require('../routes/' + service + '/view_client')
const request_list_by_client = require('../routes/' + service + '/request_list_by_client')
const message_list_by_request = require('../routes/' + service + '/message_list_by_request')


// routes with each router
router.use('/', index)

router.use('/request_list', request_list)
router.use('/update_request', update_request)
router.use('/view_request', view_request)
router.use('/enable_request', enable_request)
router.use('/disable_request', disable_request)
router.use('/delete_request', delete_request)

router.use('/view_client', view_client)
router.use('/request_list_by_client', request_list_by_client)
router.use('/message_list_by_request', message_list_by_request)




module.exports = router;