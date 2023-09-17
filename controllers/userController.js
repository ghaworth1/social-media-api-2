const { Thought, User } = require("../models");

const userController = {
    // get all users
  getAllUsers(req, res) {
    User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
  },

  // new User
    newUser(req, res) {
        User.create(req.body).then((userData) => res.json(userData)).catch((err) => res.status(500).json(err));
    },

    // pudate by id
    updateUser(req, res) {
      User.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: req.body
        },
        {
          runValidators: true,
          new: true
        })
        .then((user) => {
          !user 
          ? res.status(404).json({ message: "404: User Not Found" }) 
          : res.json(user);
        }).catch((err) => res.status(500).json(err));
    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) => 
          !user 
          ? res.status(404).json({ message: "404: User Not Found" }) 
          : Thought.deleteMany({
            _id: {
              $in: user.thoughts
              }
            }))
        .then(() => res.json({ message: "User Deleted" })).catch((err) => res.status(500).json(err));
    },

    // getUserById,
    getUserById(req, res) {
      User.findOne({ _id: req.params.id })
      .then((user) => 
        !user 
        ? res.status(404).json({ message: "404 User Not Found" }) 
        : res.json(user)).catch((err) => res.status(500).json(err));
    },

    // addFriend
    addFriend(req, res) {
      // console.log("Friend added");
      // console.log(req.body);
      User.findOneAndUpdate(
        {
        _id: req.params.id
        },
        {
          $addToSet: {
              friends: req.params.friendsId
            }
        },
        {
          runValidators: true,
          new: true
        })
        .then((user) => 
          !user 
          ? res.status(404).json({ message: "404: Friend Not Found" }) 
          : res.json(user)).catch((err) => res.status(500).json(err));
    },
    // delete friend
    deleteFriend(req, res) {
      User.findOneAndUpdate({
        _id: req.params.id
      },
      {
        $pull: 
          {
            friends: req.params.friendsId
          }
      },
      {
        runValidators: true,
        new: true
      })
      .then((user) => 
        !user 
        ? res.status(404).json({ message: "404: Friend Not Found" }) 
        : res.json(user)).catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;