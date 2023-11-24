
const express = require('express');

const { getMoment, getModel, genUserCode, getHashpass, genStageCode } = require('../../config/utils');
const { APP_NAME, OPERATOR_REQUEST_STATUSES_STEPS } = require('../../config/consts');
const { control_headers_for_operator, control_service_data, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "operator"

const SERVICE_TYPE = "operator_update_request"
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
      let request = await hms.Request.findOne({
        where: {
          id: body.request_id,
          delete: 0
        }
      })

      if (request) {

        console.log(Object.keys(OPERATOR_REQUEST_STATUSES_STEPS));

        if (Object.keys(OPERATOR_REQUEST_STATUSES_STEPS).includes(body.request_status.toString())) {
          let previous_evolution = await hms.RequestEvolution.findOne({
            where: {
              request_id: request.id
            },
            order: [
              ['id', 'DESC']
            ]
          })

          if (previous_evolution && OPERATOR_REQUEST_STATUSES_STEPS[body.request_status.toString()].includes(previous_evolution.status_id)) {
            let request_evolution = await hms.RequestEvolution.create({
              request_id: request.id,
              status_id: body.request_status,
              operator_id: hcontrol.user.id,
              enable: 1,
              delete: 0
            })

            if (request_evolution) {
              result.success = true
              result.message = "Request updated with success"
            } else {
              result.message = "Request not updated"
            }

          } else if (previous_evolution && previous_evolution.status_id == body.request_status) {
            result.message = "Request already in this status"
          } else {
            result.message = "Request can't be in this status"
          }

        } else {
          result.message = "Permission denied"
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