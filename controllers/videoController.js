import express from "express";
import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";


export const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!req.file || !title) throw new Error("Missing title or video");

    const video = await Video.create({
        title,
        description,
        videoUrl: req.file.path,
        uploadedBy: req.user.id,
    });

    res.status(201).json(video);
});

export const getVideo = asyncHandler(async (req, res) => {
  const videos = await Video.find()
    .sort({ uploadDate: -1 })
    .populate("uploadedBy", "_id name");
    res.json(videos);
});

export default router;
