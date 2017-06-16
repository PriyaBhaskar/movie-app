**Movie Application**

This repository contains the code related to Registration Flow.
Main Focus:
  - Actual functional Implementation
  - major build tasks
  - Unit test cases
  - E2E set up ( So that automation testers can directly start to automate the testing)

## Prequisites to build stand alone FE ##

Install:
    - Git
    - NodeJS + npm
    - grunt (npm install --global grunt)

## Getting started ##
1. installing all the required parts.
2. clone the project from github using
    **git clone https://github.com/PriyaBhaskar/movie-app.git**
3. In the root of the project, where the package.json is, open the command line.
4. type:  **npm install**
    This will download and install all the required packages from grunt for development purposes. (like compass, jshint, minify, etc..)
    Also, the required libraries will be pulled into the project like Angular.
    This command will create a folder in the project root calls "node_modules"
## Build and run using grunt ##
5. type: **grunt build-feature**
   This will compile the scss, do checks , optimize, and create and concatenate all the javascripts for the app, and put in the dist folder and also start the local server.
6. open browser and type **localhost:9000/index.html**
7. run **grunt test** to only test your code

