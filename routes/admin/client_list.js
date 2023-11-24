const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME, USERPROFILE_TYPE_CLIENT } = require('../../config/consts');
const { control_headers_for_admin, get_user_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_client_list"
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
    let clients = await hms.User.findAll({
      where: {
        profile_id: USERPROFILE_TYPE_CLIENT,
        delete: 0
      },
      order: [
        ['id', 'DESC']
      ]
    })
    result.success = true
    result.message = "Clients found with success"
    result.data = {
      clients: clients.map(client => get_user_data(client))
    }

  } else {
    result.message = hcontrol.message
  }

  res.json(result)
});

module.exports = router;