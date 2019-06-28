'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
	// API_HOST:'"http://172.16.213.210:8080/ERP"'
	// API_HOST:'"http://172.16.2.203:8080/Erp"',
	API_HOST:'"http://172.16.2.248:8080/Erp"'
})
