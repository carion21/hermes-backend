const { USERPROFILE_TYPE_ROOT, USERPROFILE_TYPE_ADMIN, DEFAULT_DESC_APIKEY_BACKOFFICE, USERPROFILE_TYPE_OPERATOR, SERVICE_TYPES_FIELDS, USERPROFILE_TYPES, USERPROFILE_TYPE_CLIENT, REQUEST_STATUSES_LABELS } = require("./consts")
const { cryptWithBcrypt } = require("./hashub")
const { getModel, getMoment, isObject, isInteger, isBoolean, isString, isNumber, isArray, isArrayOfString, isArrayOfInteger } = require("./utils")

const validator = require("email-validator");

const hms = getModel()
const moment = getMoment()

const control_headers_for_security = (async (headers) => {
  let result = {
    success: false
  }

  let hmskey = headers.hmskey
  let error = ""

  if (hmskey) {
    let apikey = await hms.ApiKey.findOne({
      where: {
        key: hmskey,
        description: DEFAULT_DESC_APIKEY_BACKOFFICE,
        enable: 1,
        delete: 0
      }
    })
    if (apikey) {
      result.success = true
      result.message = "apikey found"
      result.apikey = apikey
    } else {
      error = "apikey not found"
    }
  } else {
    error = "hmskey is required"
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const control_headers_for_user = (async (headers, profile_id) => {
  let result = {
    success: false
  }

  let hmskey = headers.hmskey
  let hmstoken = headers.hmstoken
  let error = ""

  if (hmskey && hmstoken) {
    let apikey = await hms.ApiKey.findOne({
      where: {
        key: hmskey,
        description: DEFAULT_DESC_APIKEY_BACKOFFICE,
        enable: 1,
        delete: 0
      }
    })
    if (apikey) {

      let user_token = await hms.UserToken.findOne({
        where: {
          token: hmstoken,
          enable: 1,
          delete: 0
        }
      })
      if (user_token) {
        let user_token_expiration = user_token.expiration
        let now = moment().format("YYYY-MM-DD HH:mm:ss")
        // let verify = moment(now).isBefore("2023-05-21 13:20:43")
        let verify = moment(now).isBefore(user_token_expiration)

        if (verify) {
          let user = await hms.User.findOne({
            where: {
              id: user_token.user_id,
              profile_id: profile_id,
              enable: 1,
              delete: 0
            }
          })

          if (user) {

            if (!error) {
              result.success = true
              result.message = "apikey and user found"
              result.apikey = apikey
              result.user = user
            }

          } else {
            error = "user not found or not active"
          }
        } else {
          user_token.enable = 0
          user_token.delete = 1
          await user_token.save()
          error = "token expired"
        }
      } else {
        error = "token not found"
      }
    } else {
      error = "apikey not found or not active"
    }
  } else {
    error = "hmskey and hmstoken are required to access this service"
  }

  if (error != "") {
    result.message = error
  }

  return result
})


const control_headers_for_root = (async (headers) => {
  return await control_headers_for_user(headers, USERPROFILE_TYPE_ROOT)
})

const control_headers_for_admin = (async (headers) => {
  return await control_headers_for_user(headers, USERPROFILE_TYPE_ADMIN)
})

const control_headers_for_operator = (async (headers) => {
  return await control_headers_for_user(headers, USERPROFILE_TYPE_OPERATOR)
})

const control_headers_for_client = (async (headers) => {
  return await control_headers_for_user(headers, USERPROFILE_TYPE_CLIENT)
})


const control_service_data = ((service_type_value, service_data) => {
  let result = {
    success: false
  }

  let error = ""

  try {
    if (isObject(service_data)) {
      let authorized_services = Object.keys(SERVICE_TYPES_FIELDS)

      if (authorized_services.includes(service_type_value)) {
        if (service_type_value == "undefined") {
          result.success = true
        } else {
          let rcontrol_basic = execute_service_basic_control_field(service_type_value, service_data)

          if (rcontrol_basic.success) {
            result.success = true
          } else {
            error = rcontrol_basic.message
          }
        }
      } else {
        error = "service_type is not valid or not implemented"
      }
    } else {
      error = "service_data must be an object"
    }
  } catch (err) {
    error = "big error when controlling service data : " + err.toString()
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const execute_service_basic_control_field = ((service_type_value, service_data) => {
  let result = {
    success: false
  }

  let error = ""

  try {
    let data_fields = Object.keys(service_data)
    let data_values = Object.values(service_data)

    let authorized_fields = SERVICE_TYPES_FIELDS[service_type_value].fields
    let authorized_types = SERVICE_TYPES_FIELDS[service_type_value].types

    let present_fields = data_fields.filter(field => authorized_fields.includes(field))
    let present_types = present_fields.map(field => authorized_types[authorized_fields.indexOf(field)])

    let required_fields = SERVICE_TYPES_FIELDS[service_type_value].required
    // let required_types = required_fields.map(field => authorized_types[authorized_fields.indexOf(field)])
    // verify if each element of required_fields is in data_fields
    if (required_fields.every(field => data_fields.includes(field))) {
      let rcontrol_fields_type = control_fields_type(present_fields, present_types, data_fields, data_values)

      if (rcontrol_fields_type.success) {
        result.success = true
      } else {
        error = rcontrol_fields_type.message
      }
    } else {
      error = "the authorized fields for service_type " + service_type_value + " are : " + authorized_fields.join(", ")
    }
  } catch (err) {
    error = "big error while executing service basic control field : " + err.toString()
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const control_fields_type = ((rfields, rtypes, dfields, dvalues) => {
  let result = {
    success: false
  }

  let error = ""

  result.success = true

  for (let i = 0; i < rfields.length; i++) {
    const field = rfields[i];
    const ftype = rtypes[i];
    const index = dfields.indexOf(field)
    if (index != -1) {
      const value = dvalues[index];
      let rcontrol_field_type = control_field_type(field, value, ftype)
      if (!rcontrol_field_type.success) {
        error = rcontrol_field_type.message
        result.success = false
        break;
      }
    } else {
      error = "the field " + field + " is required"
      result.success = false
      break;
    }
  }

  if (error != "") {
    result.message = error
  }

  return result
})

const control_field_type = ((field, value, field_type) => {
  let result = {
    success: false
  }

  let error = ""

  switch (field_type) {
    case "string":
      if (isString(value) && value != "") {
        result.success = true
      } else {
        error = "the field " + field + " must be a string"
      }
      break;
    case "string_not_empty":
      if (isString(value) && value != "") {
        result.success = true
      } else {
        error = "the field " + field + " must be a string and not empty"
      }
      break;
    case "string_email":
      if (isString(value) && value != "") {
        if (validator.validate(value)) {
          result.success = true
        } else {
          error = "the field " + field + " must be a string email"
        }
      } else {
        error = "the field " + field + " must be a string and not empty"
      }
      break;
    case "string_date":
      if (isString(value) && value != "") {
        if (moment(value, "YYYY-MM-DD HH:mm:ss").isValid() || moment(value, "YYYY-MM-DD").isValid()) {
          result.success = true
        }
      }
      if (!result.success) {
        error = "the field " + field + " must be a string date"
      }
      break;
    case "integer":
      if (isInteger(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an integer"
      }
      break;
    case "boolean":
      if (isBoolean(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be a boolean"
      }
      break;
    case "object":
      if (isObject(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an object"
      }
      break;
    case "array":
      if (isArray(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array"
      }
      break;
    case "number":
      if (isNumber(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be a number"
      }
      break;
    case "array_of_string":
      if (isArrayOfString(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array of string"
      }
      break;
    case "array_of_integer":
      if (isArrayOfInteger(value)) {
        result.success = true
      } else {
        error = "the field " + field + " must be an array of integer"
      }
      break;
    case "undefined":
      result.success = true
      break;
    default:
      error = "the field " + field + " has an unknown type"
      break;
  }

  if (error != "") {
    result.message = error
  }

  return result
})



const control_vartype = ((param, value, vartype) => {
  let result = {
    success: false
  }

  let error = ""

  if (vartype == "string" && !isString(value)) {
    error = "parameter " + param + " must be a string"
  }

  if (vartype == "number" && !isNumber(value)) {
    error = "parameter " + param + " must be a number"
  }

  if (error != "") {
    result.message = error
  } else {
    result.success = true
  }

  return result
})


const get_user_data = ((user) => {
  return {
    id: user.id,
    code: user.code,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    profile: USERPROFILE_TYPES[user.profile_id - 1].label,
    is_active: user.enable == 1 ? true : false,
    created_at: moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss")
  }
})

const get_stage_data = ((stage) => {
  return {
    id: stage.id,
    parent_stage_id: stage.parent_stage_id,
    code: stage.code,
    label: stage.label,
    description: stage.description,
    is_active: stage.enable == 1 ? true : false,
    created_at: moment(stage.createdAt).format("YYYY-MM-DD HH:mm:ss")
  }
})

const get_request_type_data = ((request_type) => {
  return {
    id: request_type.id,
    code: request_type.code,
    label: request_type.label,
    description: request_type.description,
    is_active: request_type.enable == 1 ? true : false,
    created_at: moment(request_type.createdAt).format("YYYY-MM-DD HH:mm:ss")
  }
})

const get_request_data = (async (request) => {
  let request_data ={
    id: request.id,
    code: request.code,
    subject: request.subject,
    description: request.description
  }
  let stage = await hms.Stage.findOne({
    where: {
      id: request.main_stage_id
    }
  })
  request_data.main_stage = get_stage_data(stage)
  let request_type = await hms.RequestType.findOne({
    where: {
      id: request.requesttype_id
    }
  })
  request_data.request_type = get_request_type_data(request_type)
  let client = await hms.User.findOne({
    where: {
      id: request.client_id
    }
  })
  request_data.client = get_user_data(client)
  let request_evolutions = await hms.RequestEvolution.findAll({
    where: {
      request_id: request.id
    },
    order: [
      ['id', 'DESC']
    ]
  })
  request_data.actual_evolution = await get_request_evolution_data(request_evolutions[0])
  request_data.evolution_list = await Promise.all(request_evolutions.map(async (request_evolution) => get_request_evolution_data(request_evolution)))
  request_data.is_active = request.enable == 1 ? true : false
  request_data.created_at = moment(request.createdAt).format("YYYY-MM-DD HH:mm:ss")
  return request_data
})

const get_request_evolution_data = (async (request_evolution) => {
  let evolution_data = {
    id: request_evolution.id,
    status_id: request_evolution.status_id,
    status_label: REQUEST_STATUSES_LABELS[request_evolution.status_id.toString()]
  }
  let operator = await hms.User.findOne({
    where: {
      id: request_evolution.operator_id
    }
  })
  evolution_data.operator = get_user_data(operator)
  evolution_data.is_active = request_evolution.enable == 1 ? true : false
  evolution_data.created_at = moment(request_evolution.createdAt).format("YYYY-MM-DD HH:mm:ss")
  return evolution_data
})

const get_message_data = ((message) => {
  return {
    id: message.id,
    code: message.code,
    request_id: message.request_id,
    author: message.author,
    content: message.content,
    is_archive: message.archive == 1 ? true : false,
    created_at: moment(message.createdAt).format("YYYY-MM-DD HH:mm:ss")
  }
})



module.exports = {
  control_headers_for_security,
  control_headers_for_admin,
  control_headers_for_operator,
  control_headers_for_client,
  control_service_data,
  get_user_data,
  get_stage_data,
  get_request_data,
  get_request_evolution_data,
  get_message_data
}