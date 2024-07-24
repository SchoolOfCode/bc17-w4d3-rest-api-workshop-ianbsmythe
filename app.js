import express from "express";

import {
  deleteAstronautById,
  updateAstronautById,
  getAstronautsByName,
  replaceAstronautById,
  getAstronauts,
  createAstronaut,
  getAstronautById,
} from "./models/astronauts.js";

const app = express();

app.use(express.json());

// Task 1

/* Write a request handler to return the correct response when a `GET` request is received to `/astronauts`. Choose the appropriate 
function from the imported functions at the top of the `app.js` to get your data. */

app.get('/astronauts', async (req, res) => {
  try {
    const astronauts = await getAstronauts();
    res.json({
      success: true,
      payload: astronauts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: error.message,
    });
  }
});

// Task 2

/* Write a request handler to return the correct response and perform the correct action when a `POST` request is received to 
`/astronauts`. Choose the appropriate function from the imported functions at the top of the `app.js` to perform the action. */

app.post('/astronauts', async (req, res) => {
  try {
    const astronaut = await createAstronaut(req.body);
    res.json({
      success: true,
      payload: astronaut,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: error.message,
    });
  }
});

// Task 3

/* Write the request handler to return the data from the function getAstronautById. Have this handler listen to requests at the 
appropriate path. */

app.get('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await getAstronautById(req.params.id);
    if (astronaut) {
      res.json({
        success: true,
        payload: astronaut,
      });
    } else {
      res.status(404).json({
        success: false,
        payload: 'Astronaut not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: error.message,
    });
  }
});

// Task 4

/* Write the request handler to perform the action and return the data from the function replaceAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.put('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await replaceAstronautById(req.params.id, req.body);
    if (astronaut) {
      res.json({
        success: true,
        payload: astronaut,
      });
    } else {
      res.status(404).json({
        success: false,
        payload: 'Astronaut not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: error.message,
    });
  }
});

// Task 5

/* Write the request handler to perform the action and return the data from the function deleteAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.delete('/astronauts/:id', async (req, res) => {
  try {
    const astronaut = await deleteAstronautById(req.params.id);
    if (astronaut) {
      res.json({
        success: true,
        payload: astronaut,
      });
    } else {
      res.status(404).json({
        success: false,
        payload: 'Astronaut not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: error.message,
    });
  }
});

// Task 6

/* Write the request handler to perform the action and return the data from the function updateAstronautById. Have this handler 
listen to requests at the appropriate path. */

app.patch('/astronauts/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Get the astronaut ID from the URL parameter
    const updates = req.body;  // Get the partial data to update from the request body

    // Call the function to update the astronaut by ID with partial data
    const result = await updateAstronautById(id, updates);

    if (result) {
      res.json({
        success: true,
        payload: result,
      });
    } else {
      res.status(404).json({
        success: false,
        payload: `Astronaut with ID ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: `Error updating astronaut: ${error.message}`,
    });
  }
});

export default app;
