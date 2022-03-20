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
        get: time => formatDate(time)
    }
},
{
    _id: false
});

reactionSchema.set("toJSON", {getters: true});
reactionSchema.set("toObject", {getters: true});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        get: (text) => `${text} boop.`
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: time => formatDate(time)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.set("toJSON", {getters: true});
thoughtSchema.set("toObject", {getters: true});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
