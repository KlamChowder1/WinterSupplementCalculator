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

- Since the web application of https://winter-supplement-app-d690e5-tools.apps.silver.devops.gov.bc.ca/ does not seem to be working for me, I used a third party tool called MQTT Explorer to supplement my testing
- On the right hand column, specify the topic, in this example I used `BRE/calculateWinterSupplementInput/2`
- Select json and fill the payload data, for example:
```
{
"id": "0",
"numberOfChildren": "int",
"familyComposition": "single",
"familyUnitInPayForDecember": true
}
```
![image](https://github.com/user-attachments/assets/f2103b7a-e21d-4cae-bedc-34d1c3e67736)

- Search BRE in the search MQTT Explorer search bar
  
![image](https://github.com/user-attachments/assets/491f67e5-2412-4c99-9d47-7d8d57654d92)

- once you click publish for the json payload with the input data, you will see the input under the `BRE/calculateWinterSupplementInput/2` Topic and the published output from the rules engine in the `BRE/calculateWinterSupplementOutput/2` Topic

![image](https://github.com/user-attachments/assets/2a8aba35-b065-4392-9649-89aa277704a5)

