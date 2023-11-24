const express = require('express');

var validator = require("email-validator");

const { getAppName, getMoment, getModel, genUserCode, isInt, getHashpass, genUuid } = require('../../config/utils');
const { log } = require('winston');
const { compareWithBcrypt } = require('../../config/hashub');
const { DEFAULT_DESC_APIKEY_BACKOFFICE } = require('../../config/consts');
const { control_headers_for_security, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "security"

const SERVICE_TYPE = "security_sign_out"
const hms = getModel()

router.get('/', async function (req, res, next) {

  res.render(
    "service", {
    title: getAppName(),
    service: service
  })
});

router.post('/', async function (req, res, next) {
  let result = {
    success: false
  }
  let headers = req.headers
  let hcontrol = await control_headers_for_security(headers)

  if (hcontrol.success) {
    let body = req.body
    let bcontrol = control_service_data(SERVICE_TYPE, body)

    if (bcontrol.success) {
      let usertoken = body.usertoken

      let utoken = await hms.UserToken.findOne({
        where: {
          token: usertoken,
          enable: 1,
          delete: 0
        }
      })
      if (utoken) {
        let user = await hms.User.findOne({
          where: {
            id: utoken.user_id,
            enable: 1,
            delete: 0
          }
        })
        if (user) {
          utoken.delete = 1
          await utoken.save()

          result.success = true
          result.message = "user signed out"
        } else {
          result.message = "user not found"
        }
      } else {
        result.message = "user token not found"
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