import mqtt from 'mqtt';
import * as dotenv from 'dotenv';

import { calculateWinterSupplement } from './WinterSupplementCalculatorUtils.js';

dotenv.config();

const BROKER_URL = 'mqtt://test.mosquitto.org';
const INPUT_TOPIC_PREFIX = 'BRE/calculateWinterSupplementInput/';
const OUTPUT_TOPIC_PREFIX = 'BRE/calculateWinterSupplementOutput/';

const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  client.subscribe(
    `${INPUT_TOPIC_PREFIX}${process.env.MQTT_TOPIC_ID}`,
    (err) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log(
          `Subscribed to topic: ${INPUT_TOPIC_PREFIX}${process.env.MQTT_TOPIC_ID}`
        );
      }
    }
  );
});

client.on('message', (topic, message) => {
  console.log(`Message received on topic: ${topic}`);
  const supplementAmount = calculateWinterSupplement(
    JSON.parse(message.toString())
  );
  client.publish(
    `${OUTPUT_TOPIC_PREFIX}${process.env.MQTT_TOPIC_ID}`,
    JSON.stringify(supplementAmount),
    (err) => {
      if (err) {
        console.error('Publish error:', err);
      } else {
        console.log(`Published result`);
      }
    }
  );
});
