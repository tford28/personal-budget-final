const mongoose = require("mongoose")
const Schema = mongoose.Schema
const usersSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: function() {
            if(this.usersType === "admin" || this.usersType === "Admin") {
                return "admin"
            } else {
                return "normal"
            }
        }
    },
});

module.exports = mongoose.model('usersCollection', usersSchema);