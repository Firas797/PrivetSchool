const express = require('express');
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent
} = require('../controllers/eventController');


router.post('/', createEvent);


router.get('/', getEvents);

router.get('/:id', getEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


router.post('/:id/register', registerForEvent);

module.exports = router;