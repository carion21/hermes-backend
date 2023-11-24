
const express = require('express');

const { getMoment, getModel, genUserCode, getHashpass, genStageCode } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_client, control_service_data, get_message_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "client"

const SERVICE_TYPE = "client_message_list_by_request"
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
        let messages = await hms.Message.findAll({
          where: {
            request_id: request.id,
            archive: 0
          },
          order: [
            ['id', 'ASC']
          ]
        })

        result.success = true
        result.message = "Messages found with success"
        result.data = {
          messages: messages.map(message => get_message_data(message))
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