'use strict';

const dataGenerator = require('./dataGenerator');

dataGenerator.createTenants(10);
dataGenerator.createServices();
dataGenerator.generateData()