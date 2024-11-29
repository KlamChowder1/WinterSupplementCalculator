"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var dotenv = require("dotenv");
var WinterSupplementCalculatorUtils_js_1 = require("./WinterSupplementCalculatorUtils.js");
dotenv.config();
var BROKER_URL = 'mqtt://test.mosquitto.org';
var INPUT_TOPIC_PREFIX = 'BRE/calculateWinterSupplementInput/';
var OUTPUT_TOPIC_PREFIX = 'BRE/calculateWinterSupplementOutput/';
var client = mqtt_1.default.connect(BROKER_URL);
client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe("".concat(INPUT_TOPIC_PREFIX).concat(process.env.MQTT_TOPIC_ID), function (err) {
        if (err) {
            console.error('Error:', err);
        }
        else {
            console.log("Subscribed to topic: ".concat(INPUT_TOPIC_PREFIX).concat(process.env.MQTT_TOPIC_ID));
        }
    });
});
client.on('message', function (topic, message) {
    console.log("Message received on topic: ".concat(topic));
    var supplementAmount = (0, WinterSupplementCalculatorUtils_js_1.calculateWinterSupplement)(JSON.parse(message.toString()));
    client.publish("".concat(OUTPUT_TOPIC_PREFIX).concat(process.env.MQTT_TOPIC_ID), JSON.stringify(supplementAmount), function (err) {
        if (err) {
            console.error('Publish error:', err);
        }
        else {
            console.log("Published result");
        }
    });
});
