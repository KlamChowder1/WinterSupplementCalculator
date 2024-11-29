# WinterSupplementCalculator

# Setup

- `git clone https://github.com/KlamChowder1/WinterSupplementCalculator.git`
- run `npm install` in the root folder
- create a `.env` file in the root folder and add `MQTT_TOPIC_ID=<id>`, replacing the `<id>` with the randomly generated MQTT topic ID from https://winter-supplement-app-d690e5-tools.apps.silver.devops.gov.bc.ca/
- run `tsc .\WinterSupplementCalculator.ts` in the root folder to compile the WinterSupplementCalculator TypeScript file
- run `node .\WinterSupplementCalculator.js` to start subscribing and publishing to the MQTT broker

# Testing

- run `tsc .\WinterSupplementCalculatorUtils.test.ts` in the root folder to compile the WinterSupplementCalculatorUtils.test.ts file
- run `npm run test` to run the test suites

# Testing with the Web Application

- Topic: BRE/calculateWinterSupplementInput/2
- select json

```
{
"id": "0",
"numberOfChildren": "int",
"familyComposition": "single",
"familyUnitInPayForDecember": true
}
```

- Search BRE in the search MQTT Explorer Search Bar
- the input will be visibile under the BRE/calculateWinterSupplementInput/2 Topic
- once you publish the json payload with the input data, you will see the output in the /calculateWinterSupplementOutput/2 Topic
