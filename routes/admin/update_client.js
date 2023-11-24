const express = require('express');

const { getMoment, getModel, genUserCode, getHashpass } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_CLIENT } = require('../../config/consts');
const { control_headers_for_admin, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_update_client"
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
        let user = await hms.User.findOne({
          where: {
            username: body.username.toLowerCase(),
            delete: 0
          }
        })

        if (!user || user.id == client.id) {
          client.username = body.username.toLowerCase()
          client.firstname = body.firstname
          client.lastname = body.lastname
          client.email = body.email
          client.phone = body.phone
          await client.save()

          result.success = true
          result.message = "Client updated with success"
        } else {
          result.message = "Username already exists"
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