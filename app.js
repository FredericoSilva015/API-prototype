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
 * Using a Generic routing aproach
 */ 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** 
 * GET handles database request
 * 
 * @param req - contains the request parameters 
 * @param res - contains the response parameters
 * @returns - return res with one of the status
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
 * @param req - contains the request parameters 
 * @param res - contains the response parameters
 * @returns - return res with one of the status
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
 * GET query element from database by id
 * 
 * @param req - contains the request parameters 
 * @param res - contains the response parameters
 * @returns - return res with one of the status
 */
app.get('/api/v1/todos/:id', (req, res) => {

  const id = parseInt(req.params.id, 10);

  db.map((todo) => {

    if( todo.id === id) {

      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        todo
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'todo not found'
  });
});

/** 
 * DELETE delete element from database by id
 * 
 * @param req - contains the request parameters 
 * @param res - contains the response parameters
 * @returns - return res with one of the status
 */
app.delete('/api/v1/todos/:id', (req, res) => {

  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {

    if (todo.id === id) {

      db.splice(index, 1);

      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully'
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'todo not found'
  });
}); 

/** 
 * PUT update element from database by id
 * 
 * @param req - contains the request parameters 
 * @param res - contains the response parameters
 * @returns - return res with one of the status
 */
app.put(('/api/v1/todos/:id'), (req, res) => {

  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;

  db.map((todo, index) => {

    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) {

    return res.status(404).send({
      success: 'false',
      message: 'todo not found'
    });
  }

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

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description
  };

  db.splice(itemIndex, 1, updatedTodo);

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    updatedTodo,
  });
});

/** 
 * Listen to PORT
 * 
 * @param PORT - port that the app listens to
 */ 
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
