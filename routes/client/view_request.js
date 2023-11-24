
const express = require('express');

const { getMoment, getModel, genUserCode, getHashpass, genStageCode } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_client, control_service_data, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "client"

const SERVICE_TYPE = "client_view_request"
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
  let hcontrol = await control_headers_for_client(headers)

  if (hcontrol.success) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    if (bcontrol.success) {
      let request = await hms.Request.findOne({
        where: {
          id: body.request_id,
          client_id: hcontrol.user.id,
          delete: 0
        }
      })

      if (request) {
        result.success = true
        result.message = "Request found with success"
        result.data = {
          request: await get_request_data(request)
        }
      } else {
        result.message = "Request not found"
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