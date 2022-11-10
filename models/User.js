const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');

// Schema to create User model
const userSchema = new Schema(
    {
        username: String,
        Email: String,
        Thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        Friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.username}`;
    })
    // Setter to set the username
    .set(function (v) {
        const username = v.split(' ')[4];
        this.set({ username });
    });

    // Initialize our User model
    const User = model('user', userSchema);

    module.exports = User

