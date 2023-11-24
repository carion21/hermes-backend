const express = require('express');

const { getMoment, getModel } = require('../../config/utils');
const { APP_NAME } = require('../../config/consts');
const router = express.Router();

const moment = getMoment();
const service = "admin"

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

  res.json(result)
});

module.exports = router;