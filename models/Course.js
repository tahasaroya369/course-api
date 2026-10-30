const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
title: {
type: String,
required: [true, "Course title is required"],
trim: true,
},
description: {
type: String,
required: [true, "Course description is required"],
trim: true,
},
instructor: {
type: String,
required: [true, "Instructor name is required"],
trim: true,
},
price: {
type: Number,
required: [true, "Course price is required"],
min: 0,
},
category: {
type: mongoose.Schema.Types.ObjectId,
ref: "Category",
required: [true, "Course category is required"],
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
