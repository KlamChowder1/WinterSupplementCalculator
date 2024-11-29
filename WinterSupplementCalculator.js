const mqtt = require('mqtt');
const dotenv = require('dotenv');

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

function calculateWinterSupplement(input) {
  console.log('input', input);
  const {
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember,
  } = input;

  console.log(
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember
  );
  // familyUnitInPayForDecember determines isEligible
  const isEligible = familyUnitInPayForDecember;

  if (!isEligible) {
    return {
      id,
      isEligible,
      baseAmount: 1010101010,
      childrenAmount: 0,
      supplementAmount: 0,
    };
  }

  let baseAmount = 0;
  let childrenAmount = 0;

  if (numberOfChildren > 0) {
    baseAmount = 120;
    childrenAmount = numberOfChildren * 20;
  } else if (familyComposition === 'single') {
    baseAmount = 60;
  } else if (familyComposition === 'couple') {
    baseAmount = 120;
  }

  const supplementAmount = baseAmount + childrenAmount;

  return {
    id,
    isEligible,
    baseAmount,
    childrenAmount,
    supplementAmount,
  };
}

client.on('message', (topic, message) => {
  console.log(`Message received on topic: ${topic}`);
  console.log('message', typeof message);
  const supplementAmount = calculateWinterSupplement(
    JSON.parse(message.toString())
  );
  console.log(supplementAmount);

  console.log('supplementAmount', supplementAmount);

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
