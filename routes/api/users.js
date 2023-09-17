const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


// GET all
router.get('/', allUsers);

// GET id
router.get('/:userId', getUserById);

// POST new user
router.post('/', newUser);

// PUT by id
router.put('/:userId', updateUser);

// DELETE by id
router.delete('/:userId', deleteUser);

// POST to friendId
router.post('/:userId/friends/:friendId', addFriend);

// DELETE from friendID
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;