const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        default: 'Name Here'
    },
    Position: {
        type: String,
        default: 'Position Here'
    },
    Phone: {
        type: String,
        default: 'Phone: 123-456-7890'
    },
    Email: {
        type: String,
        default: 'Email: name@example.com'
    },
    Website: {
        type: String,
        default: 'Website: www.example.com'
    },
    Background: {
        type: String,
        default: '#E8E8E8'
    },
    Font: {
        type: String,
        default: 'Arial, sans-serif'
    }
});

const collection = new mongoose.model("UserCollection",UserSchema)

module.exports = collection