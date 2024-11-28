const mqtt = require('mqtt');
const dotenv = require('dotenv');

dotenv.config();

const BROKER_URL = 'mqtt://test.mosquitto.org';
const INPUT_TOPIC_PREFIX = 'BRE/calculateWinterSupplementInput/';

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
  console.log(message.toString());
});
