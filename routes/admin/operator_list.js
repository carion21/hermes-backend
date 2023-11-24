const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_ADMIN, USERPROFILE_TYPE_OPERATOR } = require('../../config/consts');
const { control_headers_for_admin, get_user_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_operator_list"
const hms = getModel()

// router.get('/', async function (req, res, next) {

//   res.render(
//     "service", {
//     title: APP_NAME,
//     service: service
//   })
// });

router.get('/', async function (req, res, next) {
  let result = {
    success: false
  }
  let headers = req.headers
  let hcontrol = await control_headers_for_admin(headers)

  if (hcontrol.success) {
    let operators = await hms.User.findAll({
      where: {
        profile_id: USERPROFILE_TYPE_OPERATOR,
        delete: 0
      },
      order: [
        ['id', 'DESC']
      ]
    })
    result.success = true
    result.message = "Operators found with success"
    result.data = {
      operators: operators.map(operator => get_user_data(operator))
    }

  } else {
    result.message = hcontrol.message
  }

  res.json(result)
});

module.exports = router;