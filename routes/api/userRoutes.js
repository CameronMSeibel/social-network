const router = require("express").Router();
const {User} = require("../../models");

// Read all users
router.get("/", (req, res) => {

});

// Read a single user by id with populated thought and friends lists
router.get("/:id", (req, res) => {

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
