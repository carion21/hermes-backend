const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_CLIENT } = require('../../config/consts');
const { control_headers_for_operator, control_service_data, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "operator"

const SERVICE_TYPE = "operator_view_client"
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
  let hcontrol = await control_headers_for_operator(headers)

  if (hcontrol.success) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    if (bcontrol.success) {
      let client = await hms.User.findOne({
        where: {
          id: body.client_id,
          profile_id: USERPROFILE_TYPE_CLIENT,
          delete: 0
        }
      })
      if (client) {
        let requests = await hms.Request.findAll({
          where: {
            client_id: body.client_id,
            delete: 0
          },
          order: [
            ['id', 'DESC']
          ]
        })

        result.success = true
        result.message = "Requests found with success"
        result.data = {
          requests: await Promise.all(requests.map(async (request) => get_request_data(request)))
        }
      } else {
        result.message = "Client not found"
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