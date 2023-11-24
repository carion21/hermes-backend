const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_CLIENT } = require('../../config/consts');
const { control_headers_for_admin, control_service_data, get_user_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_delete_client"
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
      let client = await hms.User.findOne({
        where: {
          id: body.client_id,
          profile_id: USERPROFILE_TYPE_CLIENT,
          delete: 0
        }
      })
      if (client) {
        client.delete = 1
        await client.save()

        result.success = true
        result.message = "Client deleted with success"
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