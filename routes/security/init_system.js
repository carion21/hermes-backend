const express = require('express');
const { DEFAULT_VALUE_APIKEY_BACKOFFICE, DEFAULT_DESC_APIKEY_BACKOFFICE, DEFAULT_ADMINS, USERPROFILE_TYPE_ADMIN, USERPROFILE_TYPES, APP_NAME, DEFAULT_DESC_APIKEY_MOBILE, REQUEST_STATUSES, REQUEST_STATUSES_LABELS, REQUEST_TYPES, REQUEST_TYPES_LABELS, DEFAULT_VALUE_APIKEY_MOBILE } = require('../../config/consts');
const { genUserProfile, genUserCode, getHashpass, getMoment, getModel, genApiKeyCode, generateApiKey, genRequestStatusCode, genRequestTypeCode } = require('../../config/utils');

const router = express.Router();

const moment = getMoment();
const service = "security"

const hms = getModel()

router.get('/', async function (req, res, next) {

  let apikey_backoffice = {
    code: genApiKeyCode(),
    // key: generateApiKey(),
    key: DEFAULT_VALUE_APIKEY_BACKOFFICE,
    description: DEFAULT_DESC_APIKEY_BACKOFFICE,
    enable: 1,
    delete: 0
  }
  let sys_apikey_backoffice =  await hms.ApiKey.create(apikey_backoffice)
  console.log("sys_apikey_backoffice", sys_apikey_backoffice);

  let apikey_mobile = {
    code: genApiKeyCode(),
    // key: generateApiKey(),
    key: DEFAULT_VALUE_APIKEY_MOBILE,
    description: DEFAULT_DESC_APIKEY_MOBILE,
    enable: 1,
    delete: 0
  }

  let sys_apikey_mobile =  await hms.ApiKey.create(apikey_mobile)
  console.log("sys_apikey_mobile", sys_apikey_mobile);

  for (let i = 0; i < USERPROFILE_TYPES.length; i++) {
    const userprofile = USERPROFILE_TYPES[i];
    let profile = {
      code: genUserProfile(),
      label: userprofile.label,
      description: userprofile.description,
      enable: 1,
      delete: 0
    }
    let sys_profile =  await hms.Profile.create(profile)
    console.log("sys_profile", sys_profile);
  }

  for (let i = 0; i < DEFAULT_ADMINS.length; i++) {
    const dadmin = DEFAULT_ADMINS[i];
    let admin = {
      code: genUserCode(),
      username: dadmin.username,
      password: getHashpass(dadmin.password),
      firstname: dadmin.firstname,
      lastname: dadmin.lastname,
      profile_id: USERPROFILE_TYPE_ADMIN,
      enable: 1,
      delete: 0
    }
    let sys_admin =  await hms.User.create(admin)
    console.log("sys_admin", sys_admin);
  }

  for (let i = 0; i < REQUEST_TYPES.length; i++) {
    const rtype = REQUEST_TYPES[i];
    let type = {
      code: genRequestTypeCode(),
      label: REQUEST_TYPES_LABELS[rtype],
      description: REQUEST_TYPES_LABELS[rtype],
      enable: 1,
      delete: 0
    }
    let sys_type =  await hms.RequestType.create(type)
    console.log("sys_type", sys_type);
  }

  for (let i = 0; i < REQUEST_STATUSES.length; i++) {
    const rstatus = REQUEST_STATUSES[i];
    let status = {
      code: genRequestStatusCode(),
      label: REQUEST_STATUSES_LABELS[rstatus],
      description: REQUEST_STATUSES_LABELS[rstatus],
      enable: 1,
      delete: 0
    }
    let sys_status =  await hms.RequestStatus.create(status)
    console.log("sys_status", sys_status);
  }


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