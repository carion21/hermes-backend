const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_admin, get_request_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_request_list"
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
    let requests = await hms.Request.findAll({
      where: {
        delete: 0
      },
      order: [
        ['id', 'DESC']
      ]
    })

    result.success = true
    result.message = "Requests found with success"
    result.data = {
      requests: await Promise.all(requests.map(async (request) => get_request_data(request)))
    }

  } else {
    result.message = hcontrol.message
  }

  res.json(result)
});

module.exports = router;