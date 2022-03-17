const router = require("express").Router();
const {User} = require("../../models");
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
        return res.status(400).json({message: "Provided ID is invalid."})
    }
    const user = await User.findById(id).select("-__v");
    user ? res.json(user) : res.status(404).json({message: `No user found with ID ${id}`});
});

// Create new user
router.post("/", (req, res) => {

});

// Create another friend in a users friends list
router.post("/:id/friends/:_id", (req, res) => {

})

// Update a user by ID
router.put("/:id", (req, res) => {

});

// Delete user by ID, (potentially their posts too)
router.delete("/:id", (req, res) => {

});

// Delete a friend from a user's friends list
router.delete("/:id/friends/:friendId", (req, res) => {

})

module.exports = router;
