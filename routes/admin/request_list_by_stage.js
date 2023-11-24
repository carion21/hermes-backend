
const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_admin, control_service_data, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_request_list_by_stage"
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
      let stage = await hms.Stage.findOne({
        where: {
          id: body.stage_id,
          delete: 0
        }
      })

      if (stage) {
        let requests = await hms.Request.findAll({
          where: {
            main_stage_id: body.stage_id,
            delete: 0
          }
        })

        result.success = true
        result.message = "Requests found with success"
        result.data = {
          requests: await Promise.all(requests.map(async (request) => get_request_data(request)))
        }
      } else {
        result.message = "Stage not found"
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