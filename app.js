const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/config')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const models = require('./models');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API Documentation',
        version: '1.0.0',
        description: 'API documentation using Swagger UI',
        contact: {
          name: 'API Support',
          email: 'support@example.com'
        }
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server'
        }
      ]
    },
    // Path to the API routes
    apis: ['./routes/*.js']
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors({
    origin: '*',  // Your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

const product = require('./routes/product');
const brand = require('./routes/brand')
const category = require('./routes/category');
const user = require('./routes/user');
const order = require('./routes/order');
const sequelize = require('./config/database');

app.use('', product);
app.use('', category);
app.use('', brand);
app.use( '', user);
app.use('', order);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(config.API.PORT , function(){
    console.log(`Server is running at http://localhost:${config.API.PORT}`);
});