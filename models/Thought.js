const {Schema, model} = require("mongoose")

const reactionSchema = new Schema({

})

const thoughtSchema = new Schema({
    
    reactions: [reactionSchema]
});

const Thought = model("user", thoughtSchema);

module.exports = Thought;
