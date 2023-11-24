const express = require('express');
const router = express.Router();

const service = 'admin'

// routers
const index = require('../routes/' + service + '/index')

const stage_list = require('../routes/' + service + '/stage_list')
const new_stage = require('../routes/' + service + '/new_stage')
const update_stage = require('../routes/' + service + '/update_stage')
const view_stage = require('../routes/' + service + '/view_stage')
const enable_stage = require('../routes/' + service + '/enable_stage')
const disable_stage = require('../routes/' + service + '/disable_stage')
const delete_stage = require('../routes/' + service + '/delete_stage')

const request_list_by_stage = require('../routes/' + service + '/request_list_by_stage')

const operator_list = require('../routes/' + service + '/operator_list')
const new_operator = require('../routes/' + service + '/new_operator')
const update_operator = require('../routes/' + service + '/update_operator')
const view_operator = require('../routes/' + service + '/view_operator')
const enable_operator = require('../routes/' + service + '/enable_operator')
const disable_operator = require('../routes/' + service + '/disable_operator')
const delete_operator = require('../routes/' + service + '/delete_operator')
const reset_operator_password = require('../routes/' + service + '/reset_operator_password')

const request_list_by_operator = require('../routes/' + service + '/request_list_by_operator')

const client_list = require('../routes/' + service + '/client_list')
const new_client = require('../routes/' + service + '/new_client')
const update_client = require('../routes/' + service + '/update_client')
const view_client = require('../routes/' + service + '/view_client')
const enable_client = require('../routes/' + service + '/enable_client')
const disable_client = require('../routes/' + service + '/disable_client')
const delete_client = require('../routes/' + service + '/delete_client')
const reset_client_password = require('../routes/' + service + '/reset_client_password')

const request_list_by_client = require('../routes/' + service + '/request_list_by_client')

const request_list = require('../routes/' + service + '/request_list')
const view_request = require('../routes/' + service + '/view_request')


// routes with each router
router.use('/', index)

router.use('/stage_list', stage_list)
router.use('/new_stage', new_stage)
router.use('/update_stage', update_stage)
router.use('/view_stage', view_stage)
router.use('/enable_stage', enable_stage)
router.use('/disable_stage', disable_stage)
router.use('/delete_stage', delete_stage)

router.use('/request_list_by_stage', request_list_by_stage)

router.use('/operator_list', operator_list)
router.use('/new_operator', new_operator)
router.use('/update_operator', update_operator)
router.use('/view_operator', view_operator)
router.use('/enable_operator', enable_operator)
router.use('/disable_operator', disable_operator)
router.use('/delete_operator', delete_operator)
router.use('/reset_operator_password', reset_operator_password)

router.use('/request_list_by_operator', request_list_by_operator)

router.use('/client_list', client_list)
router.use('/new_client', new_client)
router.use('/update_client', update_client)
router.use('/view_client', view_client)
router.use('/enable_client', enable_client)
router.use('/disable_client', disable_client)
router.use('/delete_client', delete_client)
router.use('/reset_client_password', reset_client_password)

router.use('/request_list_by_client', request_list_by_client)

router.use('/request_list', request_list)
router.use('/view_request', view_request)


module.exports = router;