const bookModel = require("../model/bookModel.js");
const userModel = require("../model/userModel");
const reviewModel = require("../model/reviewModel");
const moment = require("moment");
const { isValidObjectId } = require("mongoose");
const {isValid,isValidString,isValidRequestBody,isValidEmail,isValidPassword,isValidMobile,isValidPincode,isValidPlace }=require("../utils/validation")
const { isAuthenticated, isAuthorized } = require("../middlewares/middleware");


// ===================================== Create Books =====================================================//



const createBook = async function (req, res) {
    try {
        let body = req.body;
        let { title, excerpt,bookCover, ISBN, category, subcategory, releasedAt } = body;

        if (!isValid(title)||!isValid(bookCover) || !isValid(excerpt) || !isValid(ISBN) || !isValid(subcategory) || !isValid(category) || !isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please Provide All valid Field" });
        }

        if (!isValidString(title)|| !isValidString(bookCover) || !isValidString(ISBN) || !isValidString(category) || !isValidString(subcategory) || !isValidString(excerpt) ) {
            return res.status(400).send({ status: false, message: "Please Provide All valid Information" });
        }
        if (!isValidRequestBody(title) || !isValidRequestBody(bookCover) || !isValidRequestBody(excerpt) || !isValidRequestBody(ISBN) || !isValidRequestBody(subcategory) || !isValidRequestBody(category) || !isValidRequestBody(releasedAt)) {
            return res.status(400).send({ status: false, message: "Please Provide All valid Field" });
        }

        if (!validateISBN(ISBN)) {
            return res.status(400).send({ status: false, message: " Invalid ISBN number it should contain only 13 digits" });
        }

        const unique = await bookModel.findOne({
            $or: [{ title: title }, { ISBN: ISBN },{ bookCover: bookCover },{ title: title }]
          });

        if (unique) {
            return res.status(400).send({ status: false, message: "Book already exits" });
        }
        
        let trimReleasedAt = releasedAt.trim();

        if (moment(trimReleasedAt, "YYYY-MM-DD").format("YYYY-MM-DD") !== trimReleasedAt) {
            return res.status(400).send({ status: false, message: "Please enter the Date in the format of 'YYYY-MM-DD'." });

        }

        const bookList = await bookModel.create(body);

        res.status(201).send({ status: true, message: "Success", data: bookList });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}