const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');
const reactionController = require('../../controllers/reactionController');

//THOUGHTS

//get all
router.get('/', thoughtController.getAllThoughts);

//new
router.post('/', thoughtController.createThought);

//update (put)
router.put('/:thoughtId', thoughtController.updateThought);

//delete
router.delete('/:thoughtId', thoughtController.deleteThought);


//REACTIONS
//get all
router.get('/', reactionController.getAllReactions);

//new
router.post('/', reactionController.createReaction);

//update
router.put('/:reactionId', reactionController.updateReaction);

//delete
router.delete('/:reactionId', reactionController.deleteReaction);

module.exports = router;