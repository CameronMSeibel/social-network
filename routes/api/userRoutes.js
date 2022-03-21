const router = require("express").Router();
const {Thought, User} = require("../../models");
const {validID} = require("../../utils");

// Read all users
router.get("/", async (req, res) => {
    const users = await User.find().select("-__v");
    res.json(users);
});

// Read a single user by id with populated thought and friends lists
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."});
    }
    const user = await User.findById(id).select("-__v");
    user ? res.json(user) : res.status(404).json({message: `No user found with ID ${id}`});
});

// Create new user
router.post("/", async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json(user);
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message: `Sorry, that ${Object.keys(error.keyValue)} is taken.`});
        }
        res.status(500).json(error)
    }
});

// Create another friend in a users friends list
router.post("/:id/friends/:friendId", async (req, res) => {
    const id = req.params.id;
    const friendId = req.params.friendId
    if(!validID(id) || !validID(friendId)){
        return res.status(400).json({message: "Provided ID is invalid."});
    }
    const firstUser = await User.findById(id);
    const secondUser = await User.findById(friendId);
    if(!firstUser.friends.includes(friendId)){
        firstUser.friends.push(friendId);
        secondUser.friends.push(id);
        firstUser.save();
        secondUser.save();
        res.json({message: `Users ${id} and ${friendId} are now friends.`});
    }else{
        res.status(400).json({message: "Provided users are already friends!"});
    }
})

// Update a user by ID
router.put("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        if(!validID(id)){
            return res.status(400).json({message: "Provided ID is invalid."});
        }
        const user = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        user ? res.json(user) : res.status(404).json({message: `No user found with ID ${id}`});
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message: `Sorry, that ${Object.keys(error.keyValue)} is taken.`});
        }
        res.status(500).json(error)
    }
});

// Delete user by ID, (potentially their posts too)
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if(!validID(id)){
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const user = await User.findByIdAndDelete(id);
    if(user){
        // Delete associated thoughts
        const thoughts = await Thought.deleteMany({username: user.username});
        // Remove from friend's friends lists
        const friends = await User.updateMany({friends: id}, {$pull: {friends: id}}, {new: true});
        return res.json({thoughts, friends});
    }
    res.status(404).json({message: `No user found with ID ${id}`});
});

// Delete a friend from a user's friends list
router.delete("/:id/friends/:friendId", async (req, res) => {
    const id = req.params.id;
    const friendId = req.params.friendId
    if(!validID(id) || !validID(friendId)){
        return res.status(400).json({message: "Provided ID is invalid."});
    }
    const user = await User.findByIdAndUpdate(id, {$pull: {friends: friendId}}, {new: true});
    const friend = await User.findByIdAndUpdate(friendId, {$pull: {friends: id}}, {new: true});
    if(user && friend){
        return res.json({message: `Friendship ENDED between users ${id} and ${friendId}`});
    }
    res.status(404).json({message: "User(s) not found"});
})

module.exports = router;
