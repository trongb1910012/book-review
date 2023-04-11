const express = require("express");
const bookreviews = require("../controllers/bookreview.controller");

module.exports = app => {
    const router = express.Router();


    router.post("/", bookreviews.create);
    router.get("/", bookreviews.findAll);
    router.get("/favorite", bookreviews.findAllFavorite);
    router.get("/:id", bookreviews.findOne);
    router.put("/:id", bookreviews.update);
    router.delete("/:id", bookreviews.delete);
    router.delete("/", bookreviews.deleteAll);

    app.use("/api/bookreviews", router);
};