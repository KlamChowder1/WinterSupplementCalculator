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
  const {
    id,
    numberOfChildren,
    familyComposition,
    familyUnitInPayForDecember,
  } = input;

  // familyUnitInPayForDecember determines isEligible
  const isEligible = familyUnitInPayForDecember;

  if (!isEligible) {
    return {
      id,
      isEligible,
      baseAmount: 0,
      childrenAmount: 0,
      supplementAmount: 0,
    };
  } else {
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
}

const result = calculateWinterSupplement({
  id: '123',
  numberOfChildren: 3,
  familyComposition: 'single',
  familyUnitInPayForDecember: true,
});

console.log(result);

// const test = {
//   id: '000', // ID from input
//   isEligible: true, // Eligibility, equal to "familyUnitInPayForDecember"
//   baseAmount: 123, // Base amount calculated from family composition
//   childrenAmount: 1, // Additional amount for children
//   supplementAmount: 100, // Total amount
// };

client.on('message', (topic, message) => {
  console.log(`Message received on topic: ${topic}`);
  const supplementAmount = calculateWinterSupplement(message.toString());
  console.log('message', message.toString());
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
