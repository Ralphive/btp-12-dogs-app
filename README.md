# 12-dogs-app
[![License: Apache2](https://img.shields.io/badge/License-Apache2-green.svg)](https://opensource.org/licenses/Apache-2.0)

## Description  
Sample [12-factor app](https://12factor.net/) implementation to run on SAP Business Technology Platform (cloud foundry)

This application can be deployed also on a Local Machine (for development purposes)

## Requirments
*  [Install the Cloud Foundry CLI](https://developers.sap.com/tutorials/cp-cf-download-cli.html)
*  [Learn the Fundamentals of SCP Cloud Foundry](https://developers.sap.com/tutorials/cp-cf-fundamentals.html)

## Deployment
**STEP 1** - Download or Clone this repository

**STEP 2** - Navigate to the directory you cloned and Push the app to Cloud Foundry
```bash
cf push --random-route
```
**STEP 3** - Set the environment variables using the following command. 
```bash
cf set-env 12-dogs DOG_BREED spaniel
cf set-env 12-dogs DOG_SUBBREED cocker
```

**STEP 4 ** - Create the DB service Instance
```bash
cf marketplace
** TO DO ** 
```

**STEP 5** - Restart the app
```bash
cf restart 12-dogs
```

**STEP 6** - Run the app on the **route** displayed in the terminal

## Support and Contributions
This repository is provided "as-is". No support is available. Feel free to open issues or provide pull requests.

## License
This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES) file.
