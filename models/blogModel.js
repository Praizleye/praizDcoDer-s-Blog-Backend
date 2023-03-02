const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "Technology and ICT",
        "Politics",
        "Places",
        "Religion",
        "Culture",
        "Fashion",
        "Random",
      ],
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", blogSchema);
