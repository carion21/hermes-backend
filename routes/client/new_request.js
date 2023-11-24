const express = require('express');

const { getMoment, getModel, genRequestCode } = require('../../config/utils');
const { APP_NAME, REQUEST_TYPE_STEP_1, REQUEST_STATUS_SUBMITTED } = require('../../config/consts');
const { control_headers_for_client, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "client"

const SERVICE_TYPE = "client_new_request"
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
      let stage = await hms.Stage.findOne({
        where: {
          id: body.main_stage_id,
          delete: 0
        }
      })

      if (stage) {
        let request = await hms.Request.create({
          code: genRequestCode(),
          subject: stage.label.toUpperCase(),
          requesttype_id: REQUEST_TYPE_STEP_1,
          client_id: hcontrol.user.id,
          main_stage_id: body.main_stage_id,
          enable: 1,
          delete: 0
        })

        if (request) {
          let request_evolution = await hms.RequestEvolution.create({
            request_id: request.id,
            status_id: REQUEST_STATUS_SUBMITTED,
            operator_id: hcontrol.user.id,
            enable: 1,
            delete: 0
          })

          result.success = true
          result.message = "Request created with success"
        } else {
          result.message = "Request not created"
        }

      } else {
        result.message = "Main request not found"
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