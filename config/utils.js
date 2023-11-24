const fs = require('fs');
const crc = require('crc');
var randomstring = require("randomstring");
const moment = require('moment')
moment.locale("fr");

const jwt = require('jsonwebtoken');

const { Op, QueryTypes } = require("sequelize");

const model = require('../models')


const {
    cryptWithBcrypt,
    crypt
} = require('./hashub');

const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET, JWT_EXPIRATION } = require('./consts');

require('dotenv').config()


class Utils {

    constructor() {

    }

    static getPort() {
        return PORT_SYSTEM
    }

    static getEnvnow(req) {
        return req.app.settings.env
    }

    static getAppName() {
        return APP_NAME
    }

    static getStripeLiveKeys() {
        return {
            secretKey: process.env.STRIPE_LIVE_SECRET_KEY,
            publicKey: process.env.STRIPE_LIVE_PUBLIC_KEY
        }
    }

    static getStripeTestKeys() {
        return {
            secretKey: process.env.STRIPE_TEST_SECRET_KEY,
            publicKey: process.env.STRIPE_TEST_PUBLIC_KEY
        }
    }


    static genReferenceKey(reference) {
        let refkey = crc.crc32(reference)
        return refkey
    }

    static generateCode(keyword) {
        let now = moment()
        let suffix = now.format("YYYYMMDDHH_mmss").substr(2) + "_" + Utils.generateNumberCodeSpecial()
        // remove 2 first chars
        let code = keyword + suffix
        return code
    }

    static genApiKeyCode() {
        return Utils.generateCode("API")
    }

    static genUserCode() {
        return Utils.generateCode("USR")
    }

    static genUserProfile() {
        return Utils.generateCode("USP")
    }

    static genStageCode() {
        return Utils.generateCode("STG")
    }

    static genRequestCode() {
        return Utils.generateCode("REQ")
    }

    static genRequestTypeCode() {
        return Utils.generateCode("RQT")
    }

    static genRequestStatusCode() {
        return Utils.generateCode("RQS")
    }

    static genMessageCode() {
        return Utils.generateCode("MSG")
    }

    static getMoment() {
        return moment
    }

    static getModel() {
        return model
    }

    static getOp() {
        return Op
    }

    static getHashemail(email) {
        //return crypt(email)
        return email
    }

    static getHashphone(telephone) {
        //return crypt(telephone)
        return telephone
    }

    static getHashpass(motdepasse) {
        return cryptWithBcrypt(motdepasse)
    }

    static genUuid() {
        return uuidv4()
    }

    static generateApiKey() {
        return randomstring.generate({
            length: 32
        }).toUpperCase();
    }

    static generateNumberCode() {
        return randomstring.generate({
            length: 6,
            charset: '1234567890'
        });
    }

    static generateNumberCodeSpecial() {
        return randomstring.generate({
            length: 4,
            charset: '1234567890'
        });
    }

    static generateWorkflowVersionNumber(current_total) {
        let new_total = current_total + 1
        let version_number = new_total.toString().padStart(4, '0').split('').join('.')
        return version_number
    }

    static isInteger(value) {
        return typeof value === 'number' && Number.isInteger(value);
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isObject(value) {
        return value !== null && typeof value === 'object' && value.constructor === Object;
    }

    static isArray(value) {
        return value !== null && typeof value === 'object' && value.constructor === Array;
    }

    static isArrayOfString(value) {
        return Utils.isArray(value) && value.every(Utils.isString) && value.length > 0;
    }

    static isArrayOfObject(value) {
        return Utils.isArray(value) && value.every(Utils.isObject) && value.length > 0;
    }

    static isArrayOfInteger(value) {
        return Utils.isArray(value) && value.every(Utils.isInteger) && value.length > 0;
    }

    static isArrayOfNumber(value) {
        return Utils.isArray(value) && value.every(Utils.isNumber) && value.length > 0;
    }

    static isArrayOfBoolean(value) {
        return Utils.isArray(value) && value.every(Utils.isBoolean) && value.length > 0;
    }

    static genJwtToken(payload) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION
        })
    }

    /**
     * 
     * @param {*} str 
     * @returns 
     */
    static removeExtraSpace(str) {
        //str = str.replace(/[\s]{1,}/g, ""); // Enlève les espaces doubles, triples, etc.
        str = str.replace(/^[\s]{1,}/, ""); // Enlève les espaces au début
        str = str.replace(/[\s]{1,}$/, ""); // Enlève les espaces à la fin
        return str;
    }

    static cleanBlank(str) {
        return String(str).split(' ').join('') || "NA"
    }

    /* static formatDate(str) {
        console.log(str);
        let ndate = new Date(str)
        return moment(ndate).format('YYYY-MM-DD')
    } */

    static formatDate(str) {
        return moment(str, 'DD/MM/YYYY').format('YYYY-MM-DD')
    }



}

module.exports = Utils