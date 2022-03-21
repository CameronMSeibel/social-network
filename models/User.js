const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^([a-z\d_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
});

userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});

userSchema.set("toJSON", {virtuals: true});

const User = model("user", userSchema);

module.exports = User;
