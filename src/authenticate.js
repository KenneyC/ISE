let elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:3000',
    log: 'trace'
})

module.exports = client;