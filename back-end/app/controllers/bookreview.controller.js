const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Bookreview = db.Bookreview;

// Create and Save a new Bookreview
exports.create = async(req, res, next) => {
    // Validate request
    if (!req.body.title) {
        return next(new BadRequestError(400, "Title can not be empty"));
    }
    if (!req.body.bookname) {
        return next(new BadRequestError(400, "Book name can not be empty"));
    }
    if (!req.body.author) {
        return next(new BadRequestError(400, "Author can not be empty"));
    }
    if (!req.body.reviewer) {
        return next(new BadRequestError(400, "Reviewer can not be empty"));
    }
    if (!req.body.intro) {
        return next(new BadRequestError(400, "Intro can not be empty"));
    }
    if (!req.body.content) {
        return next(new BadRequestError(400, "Content can not be empty"));
    }

    // Create a bookreview
    const bookreview = new Bookreview({
        title: req.body.title,
        bookname: req.body.bookname,
        author: req.body.author,
        reviewer: req.body.reviewer,
        intro: req.body.intro,
        content: req.body.content,
        favorite: String(req.body.favorite).toLowerCase() === "true",
        ownerId: req.userId,
    });

    // Save bookreview in the database
    const [error, document] = await handle(bookreview.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the book review"
            )
        );
    }

    return res.send(document);
};

// Retrieve all book reviews of a user from the database
exports.findAll = async(req, res, next) => {
    const condition = { ownerId: req.userId };
    const title = req.query.title;
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }

    const [error, documents] = await handle(
        Bookreview.find(condition, "-ownerId")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving book reviews"
            )
        );
    }

    return res.send(documents);
};

// Find a single bookreview with an id
exports.findOne = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Bookreview.findOne(condition, "-ownerId")
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving book review with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Book review not found"));
    }

    return res.send(document);
};

// Update a bookreview by the id in the request
exports.update = async(req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Bookreview.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating book review with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Book review not found"));
    }

    return res.send({ message: "Book review was updated successfully" });
};

// Delete a bookreview with the specified id in the request
exports.delete = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Bookreview.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete book review with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Book review not found"));
    }

    return res.send({ message: "Book review was deleted successfully" });
};

// Delete all book reviews of a user from the database
exports.deleteAll = async(req, res, next) => {
    const [error, data] = await handle(
        Bookreview.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all book reviews"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} book reviews were deleted successfully`,
    });
};

// Find all favorite book reviews of a user
exports.findAllFavorite = async(req, res, next) => {
    const [error, documents] = await handle(
        Bookreview.find({
                favorite: true,
                ownerId: req.userId,
            },
            "-ownerId"
        )
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving favorite book reviews"
            )
        );
    }

    return res.send(documents);
};