const mongoose = require("mongoose");
const createBookreviewModel = require("./bookreview.model");
const createReviewerModel = require("./reviewer.model");
const createAuthorModel = require("./author.model");
const createUserModel = require("./user.model");

const db = {};
db.mongoose = mongoose;
db.Bookreview = createBookreviewModel(mongoose);
db.Reviewer = createReviewerModel(mongoose);
db.Author = createAuthorModel(mongoose);
db.User = createUserModel(mongoose);

module.exports = db;