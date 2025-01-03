import mqtt from 'mqtt';
import * as dotenv from 'dotenv';

import { calculateWinterSupplement } from './WinterSupplementCalculatorUtils';
import { WinterSupplementInput, WinterSupplementOutput } from './types';

dotenv.config();

const BROKER_URL = 'mqtt://test.mosquitto.org';
const INPUT_TOPIC = `BRE/calculateWinterSupplementInput/${process.env.MQTT_TOPIC_ID}`;
const OUTPUT_TOPIC = `BRE/calculateWinterSupplementOutput/${process.env.MQTT_TOPIC_ID}`;

const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
  console.log(`Connected to MQTT broker ${BROKER_URL}`);

  // subscribing to the input topic
  client.subscribe(INPUT_TOPIC, (err) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log(`Subscribed to topic: ${INPUT_TOPIC}`);
    }
  });
});

client.on('message', (topic: string, message: Buffer) => {
  console.log(`Message ${message.toString()} received on topic: ${topic}`);

  try {
    const input: WinterSupplementInput = JSON.parse(message.toString());
    const output: WinterSupplementOutput = calculateWinterSupplement(input);

    // publishing results of the rules engine to the output topic
    client.publish(OUTPUT_TOPIC, JSON.stringify(output), (err) => {
      if (err) {
        console.error('Publishing error:', err);
      } else {
        console.log(
          `Published result: ${JSON.stringify(
            output
          )} to topic: ${OUTPUT_TOPIC}`
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
});
