const {User, Thought} = require("../models");
const db = require("../config/connection");

async function seed(){
    User.collection.drop();
    Thought.collection.drop();

    await User.create([
        {
            username: "cmseibel",
            email: "cmseibel@uw.edu"
        },
        {
            username: "camerooni",
            email: "Cam.M.Seib@gmail.com"
        },
        {
            username: "newguy",
            email: "new@guy.ru"
        },
        {
            username: "SmilingFriend",
            email: "friend@smile.gov"
        }
    ]);

    await Thought.create([
        {
            thoughtText: "This is my own original thought.",
            username: "cmseibel",
            reactions: [
                {
                    reactionBody: "Wow, so brave!",
                    username: "newguy"
                }
            ]
        }
    ]);
}

seed().then(process.exit);
