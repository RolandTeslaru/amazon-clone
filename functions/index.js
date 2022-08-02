const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
// const {request} = require("express");

// API

//  ----App config

const app = express();

//  ----Middlewares

app.use(cors({origin: true}));
app.use(express.json());

//  ----API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

//  ----Listen

exports.api = functions.https.onRequest(app);
