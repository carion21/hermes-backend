const express = require('express');

const { getAppName, getMoment, getModel, genUserCode, isInt, getHashpass, genUuid, genJwtToken } = require('../../config/utils');
const { compareWithBcrypt } = require('../../config/hashub');
const { DEFAULT_DESC_APIKEY_BACKOFFICE } = require('../../config/consts');
const { control_headers_for_security, get_user_data, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "security"

const SERVICE_TYPE = "security_sign_in"
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
      let username = body.username
      let password = body.password

      let exist = await hms.User.findOne({
        where: {
          username: username,
          delete: 0
        }
      })
      if (exist) {
        if (exist.enable == 1) {
          if (exist.confirmation_token == null && exist.confirmation_code == null) {
            let verify = compareWithBcrypt(password, exist.password)
            if (verify) {
              let usertoken = await hms.UserToken.create({
                token: genUuid(),
                expiration: moment().add(1, 'days').format("YYYY-MM-DD HH:mm:ss"),
                user_id: exist.id,
                apikey_id: hcontrol.apikey.id,
                enable: 1,
                delete: 0
              })
              console.log("usertoken", usertoken);
              if (usertoken) {
                result.success = true
                result.message = "User logged with success"
                let rdata = {
                  userdata: await get_user_data(exist),
                  token: usertoken.token,
                  expiration: usertoken.expiration
                }
                let jwt_token = genJwtToken(rdata)
                rdata.jwt_token = jwt_token
                result.data = rdata
              } else {
                result.message = "error creating usertoken"
              }
            } else {
              result.message = "password is not valid"
            }
          } else {
            result.message = "user is not confirmed"
          }
        } else {
          result.message = "user is not enabled"
        }
      } else {
        result.message = "user not found"
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