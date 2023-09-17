const { Thought, User } = require("../models");

const thoughtController = {

  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
  },

  // new thought
  newThought(req, res) {
    Thought.create(req.body)
    .then((thoughtData) => {
      return User.findOneAndUpdate(
        {_id:req.body.userID},
        {$push:{ thoughts:thoughtData._id}},
        {new:true}
       )
    })
    .then(userData => res.json(userData))
    .catch((err) => res.status(500).json(err));
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
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
    .then((thought) => {
      !thought 
      ? res.status(404).json({message: "404: No Thought by that ID"}) 
      : res.json(thought);
    }).catch((err) => res.status(500).json(err));
  },

  // thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thoughtData) => {
        //console.log("got thought by id")
        if (!thoughtData) {
          res.status(404).json({ message: "404: No Thought by That ID" });
          return;
        } res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },

  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.id})
      .then((thought) => {
        //console.log("deleted thought")
        if(!thought){
          res.status(404).json({message: "404: No Thought by That ID"}) 
        }      
        return User.findOneAndUpdate(
          {_id:req.body.userID},
          {$pull:{thoughts:thought._id}},
          {new:true}
        )
    }).then(() => res.json({message: "Thought Deleted"})).catch((err) => res.status(500).json(err));
  },

  // add Reaction
  addReaction(req, res) {
    // console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
      //console.log("added reaction")
        !thought
          ? res
            .status(404)
            .json({ message: "404: No Reaction by That ID" })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

  //delete Reaction
  deleteReaction(req, res) {
    console.log(req.params)
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
      ).then((thought) =>
        // console.log("deleted reaction")
          !thought
            ? res
              .status(404)
              .json({ message: "404: No Reaction by that ID" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
}

module.exports = thoughtController;