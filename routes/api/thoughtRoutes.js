const router = require("express").Router();
const {Thought} = require("../../models");

// Read all thoughts
router.get("/", (req, res) => {

});

// Read a single thought by ID
router.get("/:id", (req, res) => {

});

// Create new thought
router.post("/", (req, res) => {

});

// Create new reaction to a thought by thought's ID
router.post("/:id/reactions", (req, res) => {

});

// Update a thought by ID
router.put("/:id", (req, res) => {

});

// Delete a thought by ID
router.delete("/:id", (req, res) => {

});

// Delete a reaction by the reaction's ID
router.delete("/:id/reactions/:reactionId", (req, res) => {

});

module.exports = router;
