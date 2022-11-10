const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: [
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

thoughtSchema
    .virtual('thoughtCount')
    // Getter
    .get(function () {
        return `${this.thoughtText}`;
    })
    // Setter to set the username
    .set(function (v) {
        const username = v.split(' ')[4];
        this.set({ username });
    });

    // Initialize our User model
    const User = model('user', userSchema);

    module.exports = User

 