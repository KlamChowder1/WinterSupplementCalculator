"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var dotenv = require("dotenv");
var WinterSupplementCalculatorUtils_js_1 = require("./WinterSupplementCalculatorUtils.js");
dotenv.config();
var BROKER_URL = 'mqtt://test.mosquitto.org';
var INPUT_TOPIC = "BRE/calculateWinterSupplementInput/".concat(process.env.MQTT_TOPIC_ID);
var OUTPUT_TOPIC = "BRE/calculateWinterSupplementOutput/".concat(process.env.MQTT_TOPIC_ID);
var client = mqtt_1.default.connect(BROKER_URL);
client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe(INPUT_TOPIC, function (err) {
        if (err) {
            console.error('Error:', err);
        }
        else {
            console.log("Subscribed to topic: ".concat(INPUT_TOPIC));
        }
    });
});
client.on('message', function (topic, message) {
    console.log("Message received on topic: ".concat(topic));
    try {
        var input = JSON.parse(message.toString());
        var output = (0, WinterSupplementCalculatorUtils_js_1.calculateWinterSupplement)(input);
        client.publish(OUTPUT_TOPIC, JSON.stringify(output), function (err) {
            if (err) {
                console.error('Publish error:', err);
            }
            else {
                console.log("Published result");
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
