// Main entry point of server application

// At present ES6 module 'import' is not directly supported by Node.js
//  - can use '--experimental-modules' flag but requires code to live in .mjs
//    files rather than .js files
// import express from 'express';
// import http from 'http';
// import bodyParser from 'body-parser';
// import morgan from 'morgan';

// Until support is added we use the 'require' syntax instead
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router');

// App setup
const app = express();

// - use express middlewares
//  - morgan is a logging framework
//  - bodyParser attempts to parse any incoming request as JSON
app.use(morgan('combined'));
app.use(cors());   // Allow requests from any address by default
app.use(bodyParser.json({ type: '*/*' }));

// Set following properties if you want to get rid of deprecation warning from mongoose 5.4.13:
//  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Mongo DB connection 
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true});

// Wrap the app with required routes
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on port : ' + port);