import mongoose from "mongoose";

const videoSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  videoUrl: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
