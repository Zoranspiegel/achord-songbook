const { CLIENT_URL } = process.env;
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors({ origin: CLIENT_URL }));
server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

server.use('/api', routes);

module.exports = server;
