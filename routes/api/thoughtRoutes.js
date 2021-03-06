const router = require("express").Router();
const {ObjectId} = require("mongoose").Types
const {Thought, User} = require("../../models");
const { findByIdAndDelete, findById, findOne } = require("../../models/Thought");
const {validID} = require("../../utils");

// Read all thoughts
router.get("/", async (req, res) => {
    const thoughts = await Thought.find().select("-__v");
    res.json(thoughts);
});

// Read a single thought by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const thought = await Thought.findById(id).select("-__v");
    thought ? res.json(thought) : res.status(404).json({message: `No thought found with ID ${id}`});
});

// Create new thought
router.post("/", async (req, res) => {
    // Ensure new thought is associated with a user.
    const user = await User.findOne({username: req.body.username})
    if(user){
        const thought = await Thought.create(req.body);
        // Associate thought with user.
        user.thoughts.push(thought._id);
        user.save();
        res.json(thought);
    }else{
        res.status(404).json({message: `No user found with username ${req.body.username}`});
    }
});

// Create new reaction to a thought by thought's ID
router.post("/:id/reactions", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    let thought = await Thought.findById(id);
    if(!thought){
        return res.status(404).json({message: `No thought found with ID ${id}`});
    }
    thought.reactions.push(req.body);
    thought = await thought.save();
    res.json(thought); 
});

// Update a thought by ID
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const thought = await Thought.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    thought ? res.json(thought) : res.status(404).json({message: `No thought found with ID ${id}`});
});

// Delete a thought by ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const thought = await Thought.findByIdAndDelete(id);
    if(thought){
        // Find user associated with thought and delete thought from thoughts list.
        const user = await User.findOne({username: thought.username});
        const i = user.thoughts.indexOf(ObjectId(thought._id));
        user.thoughts.splice(i, 1);
        await user.save();
        return res.json(thought);
    }
    res.status(404).json({message: `No thought found with ID ${id}`});
});

// Delete a reaction by the reaction's ID
router.delete("/:id/reactions/:reactionId", async (req, res) => {
    const id = req.params.id;
    const reactionId = req.params.reactionId;
    if(!validID(id) || !validID(reactionId)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const thought = await Thought.findByIdAndUpdate(id, {$pull: {reactions: {reactionId}}}, {new: true});
    thought ? res.json(thought) : res.status(404).json({message: `No thought found with ID ${id}`});
});

module.exports = router;
