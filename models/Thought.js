const {Schema, model, Types} = require("mongoose");
const { formatDate } = require("../utils");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    }
},
{
    _id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
