import * as express from 'express';
import db from './db/db';
import * as bodyParser from 'body-parser';

/** 
 * Set up express app
 */ 
const app = express();

/** 
 * Set up the port
 */ 
const PORT = 5000;

/** 
 * Parse incoming data
 */ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** 
 * GET all todos
 * 
 * @param req
 * @param res
 */ 
app.get('/api/v1/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

/** 
 * POST
 */ 

/** 
 * Listen to PORT
 * 
 * @param PORT
 */ 
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
