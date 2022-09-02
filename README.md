## Run E2E UI tests in Local
Prerequisites : Node.js 12 or 14 and above
 
1. Clone repository to your local
2. Navigate to pipedrive-tests/e2e-ui-tests in terminal
3. Run "npm install"

#### Run tests in headless mode with Chrome
 npx cypress run --browser chrome
###### Reports : 
After tests are executed, report can be found in "reports/html/index.html"

#### Run with cypress UI
 npx cypress open

## Run E2E UI tests in Docker
If you have docker installed, you can just pull the image I have created and run tests with it. The docker will volume the results report at the end of tests to your local machine.

## Run in Windows/linux/mac(amd64)

1. Pull the docker image: ```docker pull rasanjana29/pipedrive-e2e-tests:2.0.0-amd64```
2. Run the docker ```docker run -t -i -v ${PWD}/PipeDrive-ui-test-reports:/e2e-test/cypress/reports rasanjana29/pipedrive-e2e-tests:2.0.0-amd64 npx cypress run --browser chrome```

In the above command you can also change the browser you want to run the tests in with headless mode. 
Ex:
* --browser firefox
* --browser edge
* --browser chromium

## Run in mac M1(arm64)

1. Pull the docker image: ```docker pull rasanjana29/pipedrive-e2e-tests:2.0.0-arm64```
2. Run the docker ```docker run -t -i -v ${PWD}/PipeDrive-ui-test-reports:/e2e-test/cypress/reports rasanjana29/pipedrive-e2e-tests:2.0.0-arm64 npx cypress run```

After the tests are executed, a test report will be generated in the current directory of the terminal with name “Veriff-ui-test-reports/html/index.html”.


html report : 
<img width="1423" alt="report  2022-09-02 at 2 11 51 PM" src="https://user-images.githubusercontent.com/32265029/188100657-383e7924-8752-4f4a-a529-cbec0ebe9482.png">

