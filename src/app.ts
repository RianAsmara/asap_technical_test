import { AppDataSource, config } from '@config/index';
import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';
import routes from './routes';
import passport from 'passport';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import session from 'express-session';
import cors from 'cors';

const app = express();

app.use(
  session({
    secret: config.sessionSecret, 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false }, 
  }),
);

// Add CORS middleware before your routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Configure the app to use Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'ASAP API',
      version: '1.0.0',
      description: 'API for ASAP',
    },
  },
  apis: ['./src/routes/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(passport.initialize());
app.use(passport.session());

// Set logger request
app.use(morgan('common'));

app.use(bodyParser.json());
app.use('/api/v1', routes);

AppDataSource.initialize()
  .then(() => {
    console.info('Connected to the database');
  })
  .catch((error) => console.error('Database connection error: ', error));

export default app;
