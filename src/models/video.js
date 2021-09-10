const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    _id: {
      type: String,
      required: true  
    },
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;