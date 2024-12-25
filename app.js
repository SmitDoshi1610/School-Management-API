const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Js Student Management Project',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/v1', routes);

// Error Handler
app.use(errorHandler);

module.exports = app;