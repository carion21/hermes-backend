const express = require('express');

const { getMoment, getModel, getHashpass } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_OPERATOR, DEFAULT_PASSWORD_BACKOFFICE } = require('../../config/consts');
const { control_headers_for_admin, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_reset_operator_password"
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
        operator.password = getHashpass(DEFAULT_PASSWORD_BACKOFFICE)
        await operator.save()

        result.success = true
        result.message = "Operator password reseted with success"
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