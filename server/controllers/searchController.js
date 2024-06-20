const express = require("express");
const searchService = require("../service/searchService");

const searchController = express.Router();

searchController.get("/", searchService.searchTitle);

module.exports = { searchController };
