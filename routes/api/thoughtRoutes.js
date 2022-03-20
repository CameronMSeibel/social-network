const router = require("express").Router();
const {Thought, User} = require("../../models");
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
    const user = await User.findOne({username: req.body.username})
    if(user){
        const thought = await Thought.create(req.body);
        console.log(user);
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

});

// Delete a thought by ID
router.delete("/:id", async (req, res) => {

});

// Delete a reaction by the reaction's ID
router.delete("/:id/reactions/:reactionId", async (req, res) => {

});

module.exports = router;
