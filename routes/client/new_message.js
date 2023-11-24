const express = require('express');

const { getMoment, getModel, genRequestCode, genMessageCode } = require('../../config/utils');
const { APP_NAME, DEFAULT_MESSAGE_USER_CLIENT, REQUEST_TYPE_STEP_1, REQUEST_TYPE_STEP_2 } = require('../../config/consts');
const { control_headers_for_client, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "client"

const SERVICE_TYPE = "client_new_message"
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

        if ([REQUEST_TYPE_STEP_1, REQUEST_TYPE_STEP_2].includes(request.requesttype_id)) {
          let message = await hms.Message.create({
            code: genMessageCode(),
            request_id: request.id,
            author: DEFAULT_MESSAGE_USER_CLIENT,
            content: body.content,
            operator_id: hcontrol.user.id,
            archive: 0
          })

          if (message) {
            result.success = true
            result.message = "Message created with success"
          } else {
            result.message = "Message not created"
          }
        } else {
          result.message = "Message not created because request type is not valid"
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