# WinterSupplementCalculator

# Setup

- `git clone https://github.com/KlamChowder1/WinterSupplementCalculator.git`
- ensure you have a Node version >= 16, otherwise download it here: https://nodejs.org/en
- run `npm install` in the root folder `WinterSupplementCalculator`
- create a `.env` file in the root folder and add `MQTT_TOPIC_ID=<id>`, replacing the `<id>` with the randomly generated MQTT topic ID from https://winter-supplement-app-d690e5-tools.apps.silver.devops.gov.bc.ca/
- run `npm run start` in the root folder to start subscribing and publishing to the MQTT broker

# Testing

- run `npm run test` in the root folder to run the test suites

# Testing with the Web Application

- Since the web application of https://winter-supplement-app-d690e5-tools.apps.silver.devops.gov.bc.ca/ does not seem to be working for me, I used a third party tool called MQTT Explorer (https://mqtt-explorer.com/) to supplement my testing
- Once downloaded, run the MQTT Explorer application and connect to the MQTT broker specifying the host `mqtt://test.mosquitto.org` and port `1883`, then click `Connect`
  
![image](https://github.com/user-attachments/assets/b4fd3781-4194-4698-a2cd-ff2121865e47)

- Once connected, specify the topic and payload on the right-hand panel.
- In this example I used tge topic `BRE/calculateWinterSupplementInput/2` and the following payload

```
{
"id": "0",
"numberOfChildren": 2,
"familyComposition": "single",
"familyUnitInPayForDecember": true
}
```

![image](https://github.com/user-attachments/assets/4511781e-a5f2-40f7-8f21-2cd2c71b84f8)

- Search BRE in the search MQTT Explorer search bar

![image](https://github.com/user-attachments/assets/491f67e5-2412-4c99-9d47-7d8d57654d92)

- once you click publish for the json payload with the input data, you will see the input under the `BRE/calculateWinterSupplementInput/2` Topic and the published output from the rules engine in the `BRE/calculateWinterSupplementOutput/2` Topic

![image](https://github.com/user-attachments/assets/fbdd6183-2b71-4422-a08b-c8a3c2d5d061)

![WinterSupplementCalculator](https://github.com/user-attachments/assets/c079ffdb-a3cb-43ba-a076-455f80e9e898)


