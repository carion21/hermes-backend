const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_admin, get_stage_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_stage_list"
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
    let stages = await hms.Stage.findAll({
      where: {
        delete: 0
      },
      order: [
        ['id', 'DESC']
      ]
    })

    result.success = true
    result.message = "Stages found with success"
    result.data = {
      stages: stages.map(stage => get_stage_data(stage))
    }

  } else {
    result.message = hcontrol.message
  }

  res.json(result)
});

module.exports = router;