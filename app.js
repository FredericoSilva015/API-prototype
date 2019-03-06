import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

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
 * Generic routing aproach
 */ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** 
 * GET handles database request
 * 
 * @param req wont be used in this instance, but is required
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
 * POST add's 1 entry to db
 * 
 * @param req must have title and description on body
 * @param res
 */
app.post('/api/v1/todos', (req, res) => {

  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }

  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description
  }

  db.push(todo);

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo
  });   
}); 

/** 
 * Listen to PORT
 * 
 * @param PORT
 */ 
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
