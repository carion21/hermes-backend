const express = require('express');

const { getMoment, getModel, genStageCode } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const { control_headers_for_admin, control_service_data } = require('../../config/global_functions');
const router = express.Router();

const moment = getMoment();
const service = "admin"

const SERVICE_TYPE = "admin_new_stage"
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
      let stage = null
      let parent_stage = null

      if (body.parent_stage_id) {
        parent_stage = await hms.Stage.findOne({
          where: {
            id: body.parent_stage_id,
            delete: 0
          }
        })

        if (parent_stage) {
          stage = await hms.Stage.create({
            code: genStageCode(),
            label: body.label,
            description: body.description,
            parent_stage_id: body.parent_stage_id,
            enable: 1,
            delete: 0
          })
        } else {
          result.message = "Parent stage not found"
        }
      } else {
        stage = await hms.Stage.create({
          code: genStageCode(),
          label: body.label,
          description: body.description,
          enable: 1,
          delete: 0
        })
      }

      if (stage) {
        result.success = true
        result.message = "Stage created with success"
      } else {
        result.message = "Stage not created because : " + result.message || "Unknown error"
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