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

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Video.countDocuments();
  const videos = await Video.find()
    .sort({ uploadDate: -1 })
    .skip(skip)
    .limit(limit)
    .populate("uploadedBy", "name");

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    videos,
  });
});

export const recommendedVideos = asyncHandler(async (req, res) => {
  const count = await Video.countDocuments();
  const random = Math.max(0, Math.floor(Math.random() * (count - 5)));

  const recommended = await Video.find()
    .skip(random)
    .limit(5)
    .populate("uploadedBy", "name");

  res.json(recommended);
});
