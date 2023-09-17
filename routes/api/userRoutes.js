const userController = require('../../controllers/userController');

//get all
router.get('/', userController.getAllUsers);

//new
router.post('/', userController.createUser);

//update
router.put('/:userId', userController.updateUser);

//delete
router.delete('/:userId', userController.deleteUser);

module.exports = router;