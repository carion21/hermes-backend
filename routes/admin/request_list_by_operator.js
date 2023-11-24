const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_OPERATOR } = require('../../config/consts');
const { control_headers_for_admin, control_service_data, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_request_list_by_operator"
const hms = getModel()

router.get('/', async function (req, res, next) {

  res.render(
    "service", {
    title: APP_NAME,
    service: service
  })
});

router.post('/', async function (req, res, next) {
  let result = {
    success: false
  }
  let headers = req.headers
  let hcontrol = await control_headers_for_admin(headers)

  if (hcontrol.success) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    if (bcontrol.success) {
      let operator = await hms.User.findOne({
        where: {
          id: body.operator_id,
          profile_id: USERPROFILE_TYPE_OPERATOR,
          delete: 0
        }
      })
      if (operator) {
        let request_evolutions = await hms.RequestEvolution.findAll({
          where: {
            operator_id: body.operator_id
          }
        })
        let request_ids = request_evolutions.map(re => re.request_id)

        let requests = await hms.Request.findAll({
          where: {
            id: request_ids,
            delete: 0
          }
        })

        result.success = true
        result.message = "Requests found with success"
        result.data = {
          requests: await Promise.all(requests.map(async (request) => get_request_data(request)))
        }
      } else {
        result.message = "Operator not found"
      }
    } else {
      result.message = bcontrol.message
    }

  } else {
    result.message = hcontrol.message
  }

  res.json(result)
});

module.exports = router;